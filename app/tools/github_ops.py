
"""
GitHub Operations Tool
Handles GitHub API operations like commenting on PRs
"""
import os
import httpx
from typing import Dict, Any, List
from datetime import datetime

from ..schemas import ToolResult, GitHubResult


class GitHubOpsTool:
    """Tool for GitHub operations"""
    
    def __init__(self):
        self.token = os.getenv("GITHUB_TOKEN")
        self.owner = os.getenv("GITHUB_OWNER")
        self.repo = os.getenv("GITHUB_REPO")
        
        if not all([self.token, self.owner, self.repo]):
            raise ValueError("GitHub configuration missing: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO required")
    
    async def execute(self, payload: Dict[str, Any]) -> GitHubResult:
        """Execute GitHub operation based on payload"""
        try:
            task_type = payload.get("type")
            
            if task_type == "comment_pr":
                return await self._comment_on_pr(payload)
            else:
                return GitHubResult(
                    success=False,
                    message=f"Unknown GitHub operation: {task_type}",
                    error=f"Unsupported task type: {task_type}"
                )
                
        except Exception as e:
            return GitHubResult(
                success=False,
                message="GitHub operation failed",
                error=str(e)
            )
    
    async def _comment_on_pr(self, payload: Dict[str, Any]) -> GitHubResult:
        """Add comment to a GitHub PR"""
        try:
            repo = payload.get("repo", f"{self.owner}/{self.repo}")
            pr_number = payload.get("pr")
            message = payload.get("message")
            
            if not all([repo, pr_number, message]):
                return GitHubResult(
                    success=False,
                    message="Missing required parameters for PR comment",
                    error="repo, pr, and message are required"
                )
            
            # Parse repo owner/name
            if "/" in repo:
                repo_owner, repo_name = repo.split("/", 1)
            else:
                repo_owner, repo_name = self.owner, repo
            
            # GitHub API request
            url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/issues/{pr_number}/comments"
            headers = {
                "Authorization": f"token {self.token}",
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Orchestrator-Agent/1.0"
            }
            
            comment_data = {
                "body": message
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    url,
                    json=comment_data,
                    headers=headers,
                    timeout=30.0
                )
                
                if response.status_code == 201:
                    comment_info = response.json()
                    return GitHubResult(
                        success=True,
                        message=f"Comment added to PR #{pr_number}",
                        data={
                            "comment_id": comment_info.get("id"),
                            "comment_url": comment_info.get("html_url"),
                            "pr_number": pr_number,
                            "repo": repo
                        },
                        repo=repo,
                        pr_number=pr_number,
                        comment_id=str(comment_info.get("id"))
                    )
                else:
                    error_msg = f"GitHub API error: {response.status_code}"
                    try:
                        error_detail = response.json().get("message", "Unknown error")
                        error_msg += f" - {error_detail}"
                    except:
                        error_msg += f" - {response.text}"
                    
                    return GitHubResult(
                        success=False,
                        message="Failed to add PR comment",
                        error=error_msg,
                        repo=repo,
                        pr_number=pr_number
                    )
                    
        except httpx.TimeoutException:
            return GitHubResult(
                success=False,
                message="GitHub API request timed out",
                error="Request timeout after 30 seconds"
            )
        except Exception as e:
            return GitHubResult(
                success=False,
                message="Failed to comment on PR",
                error=str(e)
            )
    
    async def get_pr_info(self, repo: str, pr_number: int) -> Dict[str, Any]:
        """Get PR information (helper method)"""
        try:
            if "/" in repo:
                repo_owner, repo_name = repo.split("/", 1)
            else:
                repo_owner, repo_name = self.owner, repo
            
            url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/pulls/{pr_number}"
            headers = {
                "Authorization": f"token {self.token}",
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Orchestrator-Agent/1.0"
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers, timeout=30.0)
                
                if response.status_code == 200:
                    return response.json()
                else:
                    return None
                    
        except Exception:
            return None
    
    async def list_pr_comments(self, repo: str, pr_number: int) -> List[Dict[str, Any]]:
        """List PR comments (helper method)"""
        try:
            if "/" in repo:
                repo_owner, repo_name = repo.split("/", 1)
            else:
                repo_owner, repo_name = self.owner, repo
            
            url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/issues/{pr_number}/comments"
            headers = {
                "Authorization": f"token {self.token}",
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Orchestrator-Agent/1.0"
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers, timeout=30.0)
                
                if response.status_code == 200:
                    return response.json()
                else:
                    return []
                    
        except Exception:
            return []
