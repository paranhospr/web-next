
"""
FastAPI server for the Orchestrator Agent
Provides endpoints for task execution and status monitoring
"""
import os
import uuid
from datetime import datetime
from typing import Dict, Any, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .graph import create_orchestrator_graph
from .state_store import StateStore
from .schemas import TaskRequest, TaskResponse, StatusResponse, TaskStatus


# Security
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify Bearer token authentication"""
    expected_token = os.getenv("AGENT_API_KEY")
    if not expected_token:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="API key not configured"
        )
    
    if credentials.credentials != expected_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    return credentials.credentials


# Global state store
state_store = StateStore()

# LangGraph instance
orchestrator_graph = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    global orchestrator_graph
    
    # Startup
    await state_store.initialize()
    orchestrator_graph = create_orchestrator_graph()
    print("🚀 Orchestrator Agent started successfully")
    
    yield
    
    # Shutdown
    await state_store.close()
    print("👋 Orchestrator Agent shutdown complete")


# FastAPI app
app = FastAPI(
    title="Orchestrator Agent",
    description="DevOps task orchestration system using LangGraph",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "Orchestrator Agent",
        "status": "running",
        "timestamp": datetime.utcnow().isoformat()
    }


@app.post("/task", response_model=TaskResponse)
async def execute_task(
    task_request: TaskRequest,
    token: str = Depends(verify_token)
):
    """
    Execute a DevOps task using the orchestrator graph
    
    Supported task types:
    - deploy: Deploy services to Render
    - dns_sync: Sync DNS records with Cloudflare
    - import_municipios: Import municipalities from Excel to Supabase
    - verify: Verify service health
    - comment_pr: Comment on GitHub PR
    """
    try:
        # Generate unique task ID
        task_id = str(uuid.uuid4())
        
        # Store initial task state
        await state_store.store_task(
            task_id=task_id,
            status=TaskStatus.RUNNING,
            task_type=task_request.type,
            payload=task_request.dict(),
            result=None,
            error=None
        )
        
        # Execute task asynchronously using LangGraph
        # Note: In production, this should be run in background task
        try:
            # Prepare initial state for the graph
            initial_state = {
                "task_id": task_id,
                "task_type": task_request.type,
                "payload": task_request.dict(),
                "status": TaskStatus.RUNNING,
                "result": None,
                "error": None,
                "steps": [],
                "auto_fix_attempts": 0
            }
            
            # Execute the graph
            final_state = await orchestrator_graph.ainvoke(initial_state)
            
            # Update final state in store
            await state_store.store_task(
                task_id=task_id,
                status=final_state.get("status", TaskStatus.COMPLETED),
                task_type=task_request.type,
                payload=task_request.dict(),
                result=final_state.get("result"),
                error=final_state.get("error")
            )
            
        except Exception as e:
            # Update error state
            await state_store.store_task(
                task_id=task_id,
                status=TaskStatus.FAILED,
                task_type=task_request.type,
                payload=task_request.dict(),
                result=None,
                error=str(e)
            )
        
        return TaskResponse(
            task_id=task_id,
            status=TaskStatus.RUNNING,
            message=f"Task {task_request.type} started successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to execute task: {str(e)}"
        )


@app.get("/status/{task_id}", response_model=StatusResponse)
async def get_task_status(
    task_id: str,
    token: str = Depends(verify_token)
):
    """Get the status of a specific task"""
    try:
        task_data = await state_store.get_task(task_id)
        
        if not task_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task {task_id} not found"
            )
        
        return StatusResponse(
            task_id=task_id,
            status=task_data["status"],
            task_type=task_data["task_type"],
            payload=task_data["payload"],
            result=task_data["result"],
            error=task_data["error"],
            created_at=task_data["created_at"],
            updated_at=task_data["updated_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get task status: {str(e)}"
        )


@app.get("/tasks")
async def list_tasks(
    limit: int = 50,
    offset: int = 0,
    token: str = Depends(verify_token)
):
    """List recent tasks with pagination"""
    try:
        tasks = await state_store.list_tasks(limit=limit, offset=offset)
        return {
            "tasks": tasks,
            "limit": limit,
            "offset": offset,
            "total": len(tasks)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to list tasks: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.server:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8080)),
        reload=os.getenv("ENVIRONMENT") == "development"
    )
