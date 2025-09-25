
"""
Render Deploy Tool
Handles deployment operations to Render services
"""
import os
import httpx
from typing import Dict, Any
from datetime import datetime

from ..schemas import ToolResult, DeployResult


class RenderDeployTool:
    """Tool for Render deployment operations"""
    
    def __init__(self):
        self.api_hook = os.getenv("RENDER_DEPLOY_HOOK_API")
        self.web_hook = os.getenv("RENDER_DEPLOY_HOOK_WEB")
        
        if not all([self.api_hook, self.web_hook]):
            raise ValueError("Render configuration missing: RENDER_DEPLOY_HOOK_API, RENDER_DEPLOY_HOOK_WEB required")
    
    async def execute(self, payload: Dict[str, Any]) -> DeployResult:
        """Execute Render deployment based on payload"""
        try:
            service = payload.get("service")
            branch = payload.get("branch", "main")
            
            if not service:
                return DeployResult(
                    success=False,
                    message="Service parameter required",
                    error="service parameter is required (api or web)"
                )
            
            if service == "api":
                return await self._deploy_api(branch)
            elif service == "web":
                return await self._deploy_web(branch)
            else:
                return DeployResult(
                    success=False,
                    message=f"Unknown service: {service}",
                    error=f"Service must be 'api' or 'web', got: {service}"
                )
                
        except Exception as e:
            return DeployResult(
                success=False,
                message="Render deployment failed",
                error=str(e)
            )
    
    async def _deploy_api(self, branch: str = "main") -> DeployResult:
        """Deploy API service to Render"""
        try:
            deploy_url = f"{self.api_hook}?branch={branch}"
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    deploy_url,
                    timeout=60.0  # Render deployments can take time
                )
                
                if response.status_code in [200, 201, 202]:
                    return DeployResult(
                        success=True,
                        message=f"API deployment triggered successfully for branch: {branch}",
                        data={
                            "service": "api",
                            "branch": branch,
                            "deploy_hook": self.api_hook,
                            "response_status": response.status_code,
                            "timestamp": datetime.utcnow().isoformat()
                        },
                        service="api",
                        branch=branch,
                        deploy_url=deploy_url
                    )
                else:
                    return DeployResult(
                        success=False,
                        message=f"API deployment failed with status: {response.status_code}",
                        error=f"HTTP {response.status_code}: {response.text}",
                        service="api",
                        branch=branch
                    )
                    
        except httpx.TimeoutException:
            return DeployResult(
                success=False,
                message="API deployment request timed out",
                error="Request timeout after 60 seconds",
                service="api",
                branch=branch
            )
        except Exception as e:
            return DeployResult(
                success=False,
                message="API deployment failed",
                error=str(e),
                service="api",
                branch=branch
            )
    
    async def _deploy_web(self, branch: str = "main") -> DeployResult:
        """Deploy Web service to Render"""
        try:
            deploy_url = f"{self.web_hook}?branch={branch}"
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    deploy_url,
                    timeout=60.0  # Render deployments can take time
                )
                
                if response.status_code in [200, 201, 202]:
                    return DeployResult(
                        success=True,
                        message=f"Web deployment triggered successfully for branch: {branch}",
                        data={
                            "service": "web",
                            "branch": branch,
                            "deploy_hook": self.web_hook,
                            "response_status": response.status_code,
                            "timestamp": datetime.utcnow().isoformat()
                        },
                        service="web",
                        branch=branch,
                        deploy_url=deploy_url
                    )
                else:
                    return DeployResult(
                        success=False,
                        message=f"Web deployment failed with status: {response.status_code}",
                        error=f"HTTP {response.status_code}: {response.text}",
                        service="web",
                        branch=branch
                    )
                    
        except httpx.TimeoutException:
            return DeployResult(
                success=False,
                message="Web deployment request timed out",
                error="Request timeout after 60 seconds",
                service="web",
                branch=branch
            )
        except Exception as e:
            return DeployResult(
                success=False,
                message="Web deployment failed",
                error=str(e),
                service="web",
                branch=branch
            )
    
    async def get_deployment_status(self, service: str) -> Dict[str, Any]:
        """Get deployment status (helper method - requires Render API key)"""
        # Note: This would require Render API key, not just deploy hooks
        # For now, return placeholder
        return {
            "service": service,
            "status": "unknown",
            "message": "Status check requires Render API key (not implemented with deploy hooks only)"
        }
    
    async def deploy_both_services(self, branch: str = "main") -> Dict[str, DeployResult]:
        """Deploy both API and Web services"""
        try:
            api_result = await self._deploy_api(branch)
            web_result = await self._deploy_web(branch)
            
            return {
                "api": api_result,
                "web": web_result,
                "overall_success": api_result.success and web_result.success
            }
            
        except Exception as e:
            error_result = DeployResult(
                success=False,
                message="Failed to deploy both services",
                error=str(e)
            )
            return {
                "api": error_result,
                "web": error_result,
                "overall_success": False
            }
