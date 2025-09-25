
"""
LangGraph orchestrator definition
Defines the workflow for task execution with planning, execution, verification and auto-remediation
"""
import os
from typing import Dict, Any, List, Optional
from datetime import datetime

from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage
from pydantic import BaseModel

from .schemas import TaskStatus
from .tools.github_ops import GitHubOpsTool
from .tools.render_deploy import RenderDeployTool
from .tools.cloudflare_dns import CloudflareDNSTool
from .tools.supabase_db import SupabaseDBTool
from .tools.google_calendar import GoogleCalendarTool
from .tools.verifier import VerifierTool
from .tools.human_gate import HumanGateTool


class OrchestratorState(BaseModel):
    """State model for the orchestrator graph"""
    task_id: str
    task_type: str
    payload: Dict[str, Any]
    status: TaskStatus
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    steps: List[Dict[str, Any]] = []
    auto_fix_attempts: int = 0
    messages: Optional[List[BaseMessage]] = []
    
    class Config:
        arbitrary_types_allowed = True


def add_step(state: Dict[str, Any], step_name: str, step_result: Dict[str, Any]) -> Dict[str, Any]:
    """Helper to add execution step to state"""
    step = {
        "name": step_name,
        "timestamp": datetime.utcnow().isoformat(),
        "result": step_result
    }
    new_steps = state.get("steps", []) + [step]
    return {"steps": new_steps}


async def planner_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Planning node - determines which tools to use based on task type
    """
    print(f"🧠 Planning task: {state['task_type']}")
    
    # Plan based on task type
    plan = {
        "task_type": state["task_type"],
        "tools_needed": [],
        "execution_order": []
    }
    
    if state["task_type"] == "deploy":
        plan["tools_needed"] = ["render_deploy"]
        plan["execution_order"] = ["render_deploy"]
        
    elif state["task_type"] == "dns_sync":
        plan["tools_needed"] = ["cloudflare_dns"]
        plan["execution_order"] = ["cloudflare_dns"]
        
    elif state["task_type"] == "import_municipios":
        plan["tools_needed"] = ["supabase_db"]
        plan["execution_order"] = ["supabase_db"]
        
    elif state["task_type"] == "verify":
        plan["tools_needed"] = ["verifier"]
        plan["execution_order"] = ["verifier"]
        
    elif state["task_type"] == "comment_pr":
        plan["tools_needed"] = ["github_ops"]
        plan["execution_order"] = ["github_ops"]
        
    else:
        print(f"📋 Plan created: {plan}")
        return {
            "error": f"Unknown task type: {state['task_type']}",
            "status": TaskStatus.FAILED,
            **add_step(state, "planner", plan)
        }
    
    print(f"📋 Plan created: {plan}")
    return add_step(state, "planner", plan)


async def github_ops_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """Execute GitHub operations"""
    print("🐙 Executing GitHub operations")
    
    try:
        tool = GitHubOpsTool()
        result = await tool.execute(state["payload"])
        updates = add_step(state, "github_ops", result)
        
        if not result.get("success", False):
            updates.update({
                "error": result.get("error", "GitHub operation failed"),
                "status": TaskStatus.FAILED
            })
            
    except Exception as e:
        updates = add_step(state, "github_ops", {"error": str(e)})
        updates.update({
            "error": f"GitHub ops error: {str(e)}",
            "status": TaskStatus.FAILED
        })
        
    return updates


async def render_deploy_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """Execute Render deployment"""
    print("🚀 Executing Render deployment")
    
    try:
        tool = RenderDeployTool()
        result = await tool.execute(state["payload"])
        updates = add_step(state, "render_deploy", result)
        
        if not result.get("success", False):
            updates.update({
                "error": result.get("error", "Render deployment failed"),
                "status": TaskStatus.FAILED
            })
            
    except Exception as e:
        updates = add_step(state, "render_deploy", {"error": str(e)})
        updates.update({
            "error": f"Render deploy error: {str(e)}",
            "status": TaskStatus.FAILED
        })
        
    return updates


async def cloudflare_dns_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """Execute Cloudflare DNS operations"""
    print("☁️ Executing Cloudflare DNS operations")
    
    try:
        tool = CloudflareDNSTool()
        result = await tool.execute(state["payload"])
        updates = add_step(state, "cloudflare_dns", result)
        
        if not result.get("success", False):
            updates.update({
                "error": result.get("error", "Cloudflare DNS operation failed"),
                "status": TaskStatus.FAILED
            })
            
    except Exception as e:
        updates = add_step(state, "cloudflare_dns", {"error": str(e)})
        updates.update({
            "error": f"Cloudflare DNS error: {str(e)}",
            "status": TaskStatus.FAILED
        })
        
    return updates


async def supabase_db_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """Execute Supabase database operations"""
    print("🗄️ Executing Supabase database operations")
    
    try:
        tool = SupabaseDBTool()
        result = await tool.execute(state["payload"])
        updates = add_step(state, "supabase_db", result)
        
        if not result.get("success", False):
            updates.update({
                "error": result.get("error", "Supabase operation failed"),
                "status": TaskStatus.FAILED
            })
            
    except Exception as e:
        updates = add_step(state, "supabase_db", {"error": str(e)})
        updates.update({
            "error": f"Supabase DB error: {str(e)}",
            "status": TaskStatus.FAILED
        })
        
    return updates


async def google_calendar_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """Execute Google Calendar operations"""
    print("📅 Executing Google Calendar operations")
    
    try:
        tool = GoogleCalendarTool()
        result = await tool.execute(state["payload"])
        updates = add_step(state, "google_calendar", result)
        
        if not result.get("success", False):
            updates.update({
                "error": result.get("error", "Google Calendar operation failed"),
                "status": TaskStatus.FAILED
            })
            
    except Exception as e:
        updates = add_step(state, "google_calendar", {"error": str(e)})
        updates.update({
            "error": f"Google Calendar error: {str(e)}",
            "status": TaskStatus.FAILED
        })
        
    return updates


async def verifier_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """Execute verification checks"""
    print("✅ Executing verification checks")
    
    try:
        tool = VerifierTool()
        result = await tool.execute(state["payload"])
        updates = add_step(state, "verifier", result)
        
        if not result.get("success", False):
            updates.update({
                "error": result.get("error", "Verification failed"),
                "status": TaskStatus.FAILED
            })
        else:
            updates.update({
                "status": TaskStatus.COMPLETED,
                "result": result
            })
            
    except Exception as e:
        updates = add_step(state, "verifier", {"error": str(e)})
        updates.update({
            "error": f"Verifier error: {str(e)}",
            "status": TaskStatus.FAILED
        })
        
    return updates


async def human_gate_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """Human approval gate"""
    print("👤 Human gate checkpoint")
    
    try:
        tool = HumanGateTool()
        result = await tool.execute(state["payload"])
        updates = add_step(state, "human_gate", result)
        
        if not result.get("approved", False):
            updates.update({
                "error": "Human approval required but not granted",
                "status": TaskStatus.FAILED
            })
            
    except Exception as e:
        updates = add_step(state, "human_gate", {"error": str(e)})
        updates.update({
            "error": f"Human gate error: {str(e)}",
            "status": TaskStatus.FAILED
        })
        
    return updates


async def auto_remediator_node(state: Dict[str, Any]) -> Dict[str, Any]:
    """Auto-remediation node for failed tasks"""
    print("🔧 Attempting auto-remediation")
    
    max_attempts = int(os.getenv("MAX_FIX_ATTEMPTS", "3"))
    
    if state.get("auto_fix_attempts", 0) >= max_attempts:
        return {
            "error": f"Max auto-fix attempts ({max_attempts}) exceeded",
            "status": TaskStatus.FAILED
        }
    
    new_attempts = state.get("auto_fix_attempts", 0) + 1
    
    # Simple retry logic - in production this would be more sophisticated
    try:
        # Add remediation step
        remediation_result = {
            "attempt": new_attempts,
            "action": "retry",
            "timestamp": datetime.utcnow().isoformat()
        }
        updates = add_step(state, "auto_remediator", remediation_result)
        
        # Reset error state for retry
        updates.update({
            "error": None,
            "status": TaskStatus.RUNNING,
            "auto_fix_attempts": new_attempts
        })
        
        print(f"🔄 Auto-fix attempt {new_attempts}/{max_attempts}")
        
    except Exception as e:
        updates = add_step(state, "auto_remediator", {"error": str(e)})
        updates.update({
            "error": f"Auto-remediation error: {str(e)}",
            "status": TaskStatus.FAILED
        })
        
    return updates


def should_auto_fix(state: Dict[str, Any]) -> str:
    """Conditional edge: determine if auto-fix should be attempted"""
    auto_fix_enabled = os.getenv("AUTO_FIX", "false").lower() == "true"
    max_attempts = int(os.getenv("MAX_FIX_ATTEMPTS", "3"))
    
    if (auto_fix_enabled and 
        state.get("status") == TaskStatus.FAILED and 
        state.get("auto_fix_attempts", 0) < max_attempts):
        return "auto_remediator"
    
    return END


def route_to_tool(state: Dict[str, Any]) -> str:
    """Route to appropriate tool based on task type"""
    task_type = state.get("task_type")
    
    routing_map = {
        "deploy": "render_deploy",
        "dns_sync": "cloudflare_dns", 
        "import_municipios": "supabase_db",
        "verify": "verifier",
        "comment_pr": "github_ops"
    }
    
    return routing_map.get(task_type, END)


def should_use_human_gate(state: Dict[str, Any]) -> str:
    """Conditional edge: determine if human gate is needed"""
    human_gate_enabled = os.getenv("ENABLE_HUMAN_GATE", "false").lower() == "true"
    
    if human_gate_enabled:
        return "human_gate"
    
    return "verifier"


def create_orchestrator_graph() -> StateGraph:
    """Create and configure the orchestrator graph"""
    
    # Create the graph with dict state
    workflow = StateGraph(dict)
    
    # Add nodes
    workflow.add_node("planner", planner_node)
    workflow.add_node("github_ops", github_ops_node)
    workflow.add_node("render_deploy", render_deploy_node)
    workflow.add_node("cloudflare_dns", cloudflare_dns_node)
    workflow.add_node("supabase_db", supabase_db_node)
    workflow.add_node("verifier", verifier_node)
    workflow.add_node("human_gate", human_gate_node)
    workflow.add_node("auto_remediator", auto_remediator_node)
    
    # Define edges
    workflow.set_entry_point("planner")
    
    # Route from planner to appropriate tool
    workflow.add_conditional_edges(
        "planner",
        route_to_tool,
        {
            "github_ops": "github_ops",
            "render_deploy": "render_deploy", 
            "cloudflare_dns": "cloudflare_dns",
            "supabase_db": "supabase_db",
            "verifier": "verifier",
            END: END
        }
    )
    
    # All tool nodes go to human gate check
    for tool_node in ["github_ops", "render_deploy", "cloudflare_dns", "supabase_db"]:
        workflow.add_conditional_edges(
            tool_node,
            should_use_human_gate,
            {
                "human_gate": "human_gate",
                "verifier": "verifier"
            }
        )
    
    # Human gate goes to verifier
    workflow.add_edge("human_gate", "verifier")
    
    # Verifier can go to auto-remediator or end
    workflow.add_conditional_edges(
        "verifier",
        should_auto_fix,
        {
            "auto_remediator": "auto_remediator",
            END: END
        }
    )
    
    # Auto-remediator loops back to planner or ends
    workflow.add_conditional_edges(
        "auto_remediator", 
        lambda state: "planner" if state.get("status") == TaskStatus.RUNNING else END,
        {
            "planner": "planner",
            END: END
        }
    )
    
    # Compile the graph
    return workflow.compile()
