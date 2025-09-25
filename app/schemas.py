
"""
Pydantic schemas for the Orchestrator Agent
Defines request/response models and task status enums
"""
from enum import Enum
from typing import Dict, Any, Optional, List, Union
from datetime import datetime
from pydantic import BaseModel, Field, validator


class TaskStatus(str, Enum):
    """Task execution status"""
    PENDING = "pending"
    RUNNING = "running" 
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class TaskType(str, Enum):
    """Supported task types"""
    DEPLOY = "deploy"
    DNS_SYNC = "dns_sync"
    IMPORT_MUNICIPIOS = "import_municipios"
    VERIFY = "verify"
    COMMENT_PR = "comment_pr"


# Task-specific payload schemas

class DeployPayload(BaseModel):
    """Deploy task payload"""
    type: str = Field(..., pattern="^deploy$")
    service: str = Field(..., pattern="^(api|web)$")
    branch: str = Field(default="main")


class DNSSyncPayload(BaseModel):
    """DNS sync task payload"""
    type: str = Field(..., pattern="^dns_sync$")
    domain: str = Field(..., min_length=1)
    apiCNAME: str = Field(..., min_length=1)
    webCNAME: str = Field(..., min_length=1)
    redirect_root: bool = Field(default=True)
    targets: List[str] = Field(..., min_items=1)


class ImportMunicipiosPayload(BaseModel):
    """Import municipalities task payload"""
    type: str = Field(..., pattern="^import_municipios$")
    xlsx_url: str = Field(..., pattern="^https://.*")
    sheet: int = Field(default=0, ge=0)


class VerifyPayload(BaseModel):
    """Verify task payload"""
    type: str = Field(..., pattern="^verify$")
    targets: List[str] = Field(..., min_items=1)


class CommentPRPayload(BaseModel):
    """Comment PR task payload"""
    type: str = Field(..., pattern="^comment_pr$")
    repo: str = Field(..., pattern="^[^/]+/[^/]+$")  # owner/repo format
    pr: int = Field(..., gt=0)
    message: str = Field(..., min_length=1)


# Union type for all task payloads
TaskRequest = Union[
    DeployPayload,
    DNSSyncPayload, 
    ImportMunicipiosPayload,
    VerifyPayload,
    CommentPRPayload
]


class TaskResponse(BaseModel):
    """Response for task creation"""
    task_id: str
    status: TaskStatus
    message: str


class StatusResponse(BaseModel):
    """Response for task status query"""
    task_id: str
    status: TaskStatus
    task_type: str
    payload: Dict[str, Any]
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class TaskListItem(BaseModel):
    """Task item for list response"""
    task_id: str
    status: TaskStatus
    task_type: str
    created_at: datetime
    updated_at: datetime


class TaskListResponse(BaseModel):
    """Response for task list query"""
    tasks: List[TaskListItem]
    limit: int
    offset: int
    total: int


# Tool execution result schemas

class ToolResult(BaseModel):
    """Base result schema for tool execution"""
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class DeployResult(ToolResult):
    """Deploy tool result"""
    service: Optional[str] = None
    branch: Optional[str] = None
    deploy_url: Optional[str] = None


class DNSResult(ToolResult):
    """DNS tool result"""
    domain: Optional[str] = None
    records_updated: Optional[List[str]] = None


class ImportResult(ToolResult):
    """Import tool result"""
    rows_imported: Optional[int] = None
    table_name: Optional[str] = None


class VerifyResult(ToolResult):
    """Verify tool result"""
    targets_checked: Optional[List[str]] = None
    all_healthy: Optional[bool] = None
    health_details: Optional[Dict[str, Any]] = None


class GitHubResult(ToolResult):
    """GitHub tool result"""
    repo: Optional[str] = None
    pr_number: Optional[int] = None
    comment_id: Optional[str] = None


# Configuration schemas

class OrchestratorConfig(BaseModel):
    """Orchestrator configuration"""
    auto_fix: bool = Field(default=False)
    max_fix_attempts: int = Field(default=3, ge=1, le=10)
    enable_human_gate: bool = Field(default=False)
    timeout_seconds: int = Field(default=300, ge=30, le=3600)


class EnvironmentConfig(BaseModel):
    """Environment configuration validation"""
    # Required variables
    agent_api_key: str = Field(..., min_length=1)
    github_token: str = Field(..., min_length=1)
    github_owner: str = Field(..., min_length=1)
    github_repo: str = Field(..., min_length=1)
    render_deploy_hook_api: str = Field(..., pattern="^https://.*")
    render_deploy_hook_web: str = Field(..., pattern="^https://.*")
    cloudflare_api_token: str = Field(..., min_length=1)
    cloudflare_zone_id: str = Field(..., min_length=1)
    supabase_url: str = Field(..., pattern="^https://.*")
    supabase_service_role: str = Field(..., min_length=1)
    google_project_id: str = Field(..., min_length=1)
    google_client_email: str = Field(..., pattern=".*@.*")
    google_private_key: str = Field(..., min_length=1)
    google_calendar_id: str = Field(..., min_length=1)
    
    # Optional variables
    auto_fix: bool = Field(default=False)
    max_fix_attempts: int = Field(default=3)
    enable_human_gate: bool = Field(default=False)
    port: int = Field(default=8080)
    environment: str = Field(default="production")


# Error schemas

class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str
    detail: Optional[str] = None
    task_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ValidationError(BaseModel):
    """Validation error details"""
    field: str
    message: str
    invalid_value: Any


class ValidationErrorResponse(ErrorResponse):
    """Validation error response"""
    validation_errors: List[ValidationError]
