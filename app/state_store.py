
"""
SQLite-based state store for task persistence
Handles task state management and persistence
"""
import os
import json
import aiosqlite
from typing import Dict, Any, Optional, List
from datetime import datetime

from .schemas import TaskStatus


class StateStore:
    """SQLite-based state store for task management"""
    
    def __init__(self, db_path: str = None):
        self.db_path = db_path or os.getenv("DATABASE_PATH", "/tmp/orchestrator.db")
        self._db = None
    
    async def initialize(self):
        """Initialize the database and create tables"""
        self._db = await aiosqlite.connect(self.db_path)
        await self._create_tables()
        print(f"📊 State store initialized: {self.db_path}")
    
    async def close(self):
        """Close database connection"""
        if self._db:
            await self._db.close()
            print("📊 State store closed")
    
    async def _create_tables(self):
        """Create necessary database tables"""
        await self._db.execute("""
            CREATE TABLE IF NOT EXISTS tasks (
                task_id TEXT PRIMARY KEY,
                status TEXT NOT NULL,
                task_type TEXT NOT NULL,
                payload TEXT NOT NULL,
                result TEXT,
                error TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        await self._db.execute("""
            CREATE TABLE IF NOT EXISTS task_steps (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_id TEXT NOT NULL,
                step_name TEXT NOT NULL,
                step_data TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (task_id) REFERENCES tasks (task_id)
            )
        """)
        
        await self._db.execute("""
            CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)
        """)
        
        await self._db.execute("""
            CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at)
        """)
        
        await self._db.execute("""
            CREATE INDEX IF NOT EXISTS idx_task_steps_task_id ON task_steps(task_id)
        """)
        
        await self._db.commit()
    
    async def store_task(
        self,
        task_id: str,
        status: TaskStatus,
        task_type: str,
        payload: Dict[str, Any],
        result: Optional[Dict[str, Any]] = None,
        error: Optional[str] = None
    ):
        """Store or update a task in the database"""
        payload_json = json.dumps(payload)
        result_json = json.dumps(result) if result else None
        
        # Check if task exists
        cursor = await self._db.execute(
            "SELECT task_id FROM tasks WHERE task_id = ?",
            (task_id,)
        )
        exists = await cursor.fetchone()
        
        if exists:
            # Update existing task
            await self._db.execute("""
                UPDATE tasks 
                SET status = ?, result = ?, error = ?, updated_at = CURRENT_TIMESTAMP
                WHERE task_id = ?
            """, (status.value, result_json, error, task_id))
        else:
            # Insert new task
            await self._db.execute("""
                INSERT INTO tasks (task_id, status, task_type, payload, result, error)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (task_id, status.value, task_type, payload_json, result_json, error))
        
        await self._db.commit()
    
    async def get_task(self, task_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a task by ID"""
        cursor = await self._db.execute("""
            SELECT task_id, status, task_type, payload, result, error, created_at, updated_at
            FROM tasks 
            WHERE task_id = ?
        """, (task_id,))
        
        row = await cursor.fetchone()
        if not row:
            return None
        
        return {
            "task_id": row[0],
            "status": TaskStatus(row[1]),
            "task_type": row[2],
            "payload": json.loads(row[3]),
            "result": json.loads(row[4]) if row[4] else None,
            "error": row[5],
            "created_at": datetime.fromisoformat(row[6]),
            "updated_at": datetime.fromisoformat(row[7])
        }
    
    async def list_tasks(
        self,
        limit: int = 50,
        offset: int = 0,
        status_filter: Optional[TaskStatus] = None
    ) -> List[Dict[str, Any]]:
        """List tasks with pagination and optional status filter"""
        query = """
            SELECT task_id, status, task_type, created_at, updated_at
            FROM tasks
        """
        params = []
        
        if status_filter:
            query += " WHERE status = ?"
            params.append(status_filter.value)
        
        query += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
        params.extend([limit, offset])
        
        cursor = await self._db.execute(query, params)
        rows = await cursor.fetchall()
        
        return [
            {
                "task_id": row[0],
                "status": TaskStatus(row[1]),
                "task_type": row[2],
                "created_at": datetime.fromisoformat(row[3]),
                "updated_at": datetime.fromisoformat(row[4])
            }
            for row in rows
        ]
    
    async def store_task_step(
        self,
        task_id: str,
        step_name: str,
        step_data: Dict[str, Any]
    ):
        """Store a task execution step"""
        step_data_json = json.dumps(step_data)
        
        await self._db.execute("""
            INSERT INTO task_steps (task_id, step_name, step_data)
            VALUES (?, ?, ?)
        """, (task_id, step_name, step_data_json))
        
        await self._db.commit()
    
    async def get_task_steps(self, task_id: str) -> List[Dict[str, Any]]:
        """Get all steps for a task"""
        cursor = await self._db.execute("""
            SELECT step_name, step_data, timestamp
            FROM task_steps
            WHERE task_id = ?
            ORDER BY timestamp ASC
        """, (task_id,))
        
        rows = await cursor.fetchall()
        
        return [
            {
                "step_name": row[0],
                "step_data": json.loads(row[1]),
                "timestamp": datetime.fromisoformat(row[2])
            }
            for row in rows
        ]
    
    async def cleanup_old_tasks(self, days_old: int = 30):
        """Clean up tasks older than specified days"""
        await self._db.execute("""
            DELETE FROM task_steps 
            WHERE task_id IN (
                SELECT task_id FROM tasks 
                WHERE created_at < datetime('now', '-{} days')
            )
        """.format(days_old))
        
        await self._db.execute("""
            DELETE FROM tasks 
            WHERE created_at < datetime('now', '-{} days')
        """.format(days_old))
        
        await self._db.commit()
    
    async def get_task_stats(self) -> Dict[str, Any]:
        """Get task statistics"""
        # Total tasks
        cursor = await self._db.execute("SELECT COUNT(*) FROM tasks")
        total_tasks = (await cursor.fetchone())[0]
        
        # Tasks by status
        cursor = await self._db.execute("""
            SELECT status, COUNT(*) 
            FROM tasks 
            GROUP BY status
        """)
        status_counts = dict(await cursor.fetchall())
        
        # Tasks by type
        cursor = await self._db.execute("""
            SELECT task_type, COUNT(*) 
            FROM tasks 
            GROUP BY task_type
        """)
        type_counts = dict(await cursor.fetchall())
        
        # Recent activity (last 24 hours)
        cursor = await self._db.execute("""
            SELECT COUNT(*) 
            FROM tasks 
            WHERE created_at > datetime('now', '-1 day')
        """)
        recent_tasks = (await cursor.fetchone())[0]
        
        return {
            "total_tasks": total_tasks,
            "status_counts": status_counts,
            "type_counts": type_counts,
            "recent_tasks_24h": recent_tasks
        }
