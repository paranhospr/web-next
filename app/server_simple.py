"""
FastAPI server for the Orchestrator Agent (Simplified version without LangGraph)
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


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    await state_store.initialize()
    print("🚀 Orchestrator Agent started successfully (Simple mode)")
    
    yield
    
    # Shutdown
    await state_store.close()
    print("👋 Orchestrator Agent shutdown complete")


# FastAPI app
app = FastAPI(
    title="Orchestrator Agent (Simple)",
    description="DevOps task orchestration system (without LangGraph for demo)",
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
        "service": "Orchestrator Agent (Simple)",
        "status": "running",
        "timestamp": datetime.utcnow().isoformat(),
        "note": "This is a simplified version without LangGraph for demonstration"
    }


@app.post("/task", response_model=TaskResponse)
async def execute_task(
    task_request: TaskRequest,
    token: str = Depends(verify_token)
):
    """
    Execute a DevOps task (simplified version)
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
        
        # Simulate task execution (in real version, this would use LangGraph)
        try:
            # Simple simulation based on task type
            if task_request.type == "deploy":
                result = {
                    "success": True,
                    "message": f"Deploy {task_request.service} completed (simulated)",
                    "service": task_request.service,
                    "branch": getattr(task_request, 'branch', 'main')
                }
            elif task_request.type == "dns_sync":
                result = {
                    "success": True,
                    "message": f"DNS sync for {task_request.domain} completed (simulated)",
                    "domain": task_request.domain
                }
            elif task_request.type == "verify":
                result = {
                    "success": True,
                    "message": f"Verification of {len(task_request.targets)} targets completed (simulated)",
                    "targets_checked": task_request.targets,
                    "all_healthy": True
                }
            elif task_request.type == "comment_pr":
                result = {
                    "success": True,
                    "message": f"Comment added to PR #{task_request.pr} (simulated)",
                    "repo": task_request.repo,
                    "pr_number": task_request.pr
                }
            elif task_request.type == "import_municipios":
                result = {
                    "success": True,
                    "message": "Municipalities import completed (simulated)",
                    "rows_imported": 100,
                    "xlsx_url": task_request.xlsx_url
                }
            else:
                result = {
                    "success": False,
                    "message": f"Unknown task type: {task_request.type}",
                    "error": "Unsupported task type"
                }
            
            # Update final state
            final_status = TaskStatus.COMPLETED if result["success"] else TaskStatus.FAILED
            await state_store.store_task(
                task_id=task_id,
                status=final_status,
                task_type=task_request.type,
                payload=task_request.dict(),
                result=result,
                error=result.get("error")
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
            status=TaskStatus.COMPLETED,  # Immediate completion in simple mode
            message=f"Task {task_request.type} completed successfully (simulated)"
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
        "app.server_simple:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8080)),
        reload=os.getenv("ENVIRONMENT") == "development"
    )
