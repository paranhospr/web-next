
"""
Verifier Tool
Handles health checks and verification of services
"""
import os
import httpx
from typing import Dict, Any, List
from datetime import datetime
import asyncio

from ..schemas import ToolResult, VerifyResult


class VerifierTool:
    """Tool for service verification and health checks"""
    
    def __init__(self):
        self.timeout = int(os.getenv("VERIFY_TIMEOUT", "30"))
        self.max_retries = int(os.getenv("VERIFY_MAX_RETRIES", "3"))
    
    async def execute(self, payload: Dict[str, Any]) -> VerifyResult:
        """Execute verification checks based on payload"""
        try:
            targets = payload.get("targets", [])
            
            if not targets:
                return VerifyResult(
                    success=False,
                    message="No targets specified for verification",
                    error="targets parameter is required and must be a non-empty list"
                )
            
            return await self._verify_targets(targets)
            
        except Exception as e:
            return VerifyResult(
                success=False,
                message="Verification operation failed",
                error=str(e)
            )
    
    async def _verify_targets(self, targets: List[str]) -> VerifyResult:
        """Verify health of multiple targets"""
        try:
            print(f"🔍 Verifying {len(targets)} targets")
            
            # Run health checks concurrently
            tasks = [self._check_target_health(target) for target in targets]
            health_results = await asyncio.gather(*tasks, return_exceptions=True)
            
            # Process results
            health_details = {}
            all_healthy = True
            
            for i, target in enumerate(targets):
                result = health_results[i]
                
                if isinstance(result, Exception):
                    health_details[target] = {
                        "healthy": False,
                        "error": str(result),
                        "timestamp": datetime.utcnow().isoformat()
                    }
                    all_healthy = False
                else:
                    health_details[target] = result
                    if not result.get("healthy", False):
                        all_healthy = False
            
            # Summary
            healthy_count = sum(1 for details in health_details.values() if details.get("healthy", False))
            
            return VerifyResult(
                success=True,
                message=f"Verification completed: {healthy_count}/{len(targets)} targets healthy",
                data={
                    "targets_checked": targets,
                    "healthy_count": healthy_count,
                    "total_count": len(targets),
                    "all_healthy": all_healthy,
                    "health_details": health_details,
                    "timestamp": datetime.utcnow().isoformat()
                },
                targets_checked=targets,
                all_healthy=all_healthy,
                health_details=health_details
            )
            
        except Exception as e:
            return VerifyResult(
                success=False,
                message="Failed to verify targets",
                error=str(e)
            )
    
    async def _check_target_health(self, target: str) -> Dict[str, Any]:
        """Check health of a single target"""
        try:
            print(f"🏥 Checking health of: {target}")
            
            # Ensure target is a valid URL
            if not target.startswith(('http://', 'https://')):
                target = f"https://{target}"
            
            start_time = datetime.utcnow()
            
            # Perform health check with retries
            for attempt in range(self.max_retries):
                try:
                    async with httpx.AsyncClient() as client:
                        response = await client.get(
                            target,
                            timeout=self.timeout,
                            follow_redirects=True
                        )
                        
                        end_time = datetime.utcnow()
                        response_time = (end_time - start_time).total_seconds()
                        
                        # Determine health based on status code
                        healthy = 200 <= response.status_code < 400
                        
                        return {
                            "healthy": healthy,
                            "status_code": response.status_code,
                            "response_time": response_time,
                            "attempt": attempt + 1,
                            "timestamp": end_time.isoformat(),
                            "headers": dict(response.headers) if healthy else None,
                            "error": None if healthy else f"HTTP {response.status_code}"
                        }
                        
                except httpx.TimeoutException:
                    if attempt == self.max_retries - 1:
                        return {
                            "healthy": False,
                            "status_code": None,
                            "response_time": self.timeout,
                            "attempt": attempt + 1,
                            "timestamp": datetime.utcnow().isoformat(),
                            "error": f"Timeout after {self.timeout} seconds"
                        }
                    else:
                        # Wait before retry
                        await asyncio.sleep(1)
                        
                except httpx.ConnectError:
                    if attempt == self.max_retries - 1:
                        return {
                            "healthy": False,
                            "status_code": None,
                            "response_time": None,
                            "attempt": attempt + 1,
                            "timestamp": datetime.utcnow().isoformat(),
                            "error": "Connection failed"
                        }
                    else:
                        # Wait before retry
                        await asyncio.sleep(1)
                        
                except Exception as e:
                    if attempt == self.max_retries - 1:
                        return {
                            "healthy": False,
                            "status_code": None,
                            "response_time": None,
                            "attempt": attempt + 1,
                            "timestamp": datetime.utcnow().isoformat(),
                            "error": str(e)
                        }
                    else:
                        # Wait before retry
                        await asyncio.sleep(1)
            
            # Should not reach here
            return {
                "healthy": False,
                "error": "Unexpected error in health check loop"
            }
            
        except Exception as e:
            return {
                "healthy": False,
                "status_code": None,
                "response_time": None,
                "attempt": 1,
                "timestamp": datetime.utcnow().isoformat(),
                "error": str(e)
            }
    
    async def verify_single_target(self, target: str) -> Dict[str, Any]:
        """Verify a single target (helper method)"""
        return await self._check_target_health(target)
    
    async def verify_deployment(self, service: str, expected_urls: List[str]) -> VerifyResult:
        """Verify deployment by checking expected URLs"""
        try:
            print(f"🚀 Verifying {service} deployment")
            
            # Add service-specific health check logic
            health_endpoints = []
            for url in expected_urls:
                # Add common health check endpoints
                base_url = url.rstrip('/')
                health_endpoints.extend([
                    base_url,
                    f"{base_url}/health",
                    f"{base_url}/api/health",
                    f"{base_url}/status"
                ])
            
            # Remove duplicates
            health_endpoints = list(set(health_endpoints))
            
            # Check all endpoints
            results = await self._verify_targets(health_endpoints)
            
            # Customize result for deployment verification
            results.message = f"Deployment verification for {service}: {results.message}"
            
            return results
            
        except Exception as e:
            return VerifyResult(
                success=False,
                message=f"Failed to verify {service} deployment",
                error=str(e)
            )
    
    def _is_healthy_status_code(self, status_code: int) -> bool:
        """Determine if status code indicates healthy service"""
        # 2xx and 3xx are generally healthy
        # 401/403 might be healthy but require auth
        # 404 might be healthy if it's expected
        healthy_codes = list(range(200, 400)) + [401, 403]
        return status_code in healthy_codes
