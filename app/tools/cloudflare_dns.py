
"""
Cloudflare DNS Tool
Handles DNS record management via Cloudflare API
"""
import os
import httpx
from typing import Dict, Any, List
from datetime import datetime

from ..schemas import ToolResult, DNSResult


class CloudflareDNSTool:
    """Tool for Cloudflare DNS operations"""
    
    def __init__(self):
        self.api_token = os.getenv("CLOUDFLARE_API_TOKEN")
        self.zone_id = os.getenv("CLOUDFLARE_ZONE_ID")
        
        if not all([self.api_token, self.zone_id]):
            raise ValueError("Cloudflare configuration missing: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID required")
        
        self.base_url = "https://api.cloudflare.com/client/v4"
        self.headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }
    
    async def execute(self, payload: Dict[str, Any]) -> DNSResult:
        """Execute DNS sync operation based on payload"""
        try:
            domain = payload.get("domain")
            api_cname = payload.get("apiCNAME")
            web_cname = payload.get("webCNAME")
            redirect_root = payload.get("redirect_root", True)
            targets = payload.get("targets", [])
            
            if not all([domain, api_cname, web_cname]):
                return DNSResult(
                    success=False,
                    message="Missing required DNS parameters",
                    error="domain, apiCNAME, and webCNAME are required"
                )
            
            return await self._sync_dns_records(
                domain=domain,
                api_cname=api_cname,
                web_cname=web_cname,
                redirect_root=redirect_root,
                targets=targets
            )
            
        except Exception as e:
            return DNSResult(
                success=False,
                message="DNS sync operation failed",
                error=str(e)
            )
    
    async def _sync_dns_records(
        self,
        domain: str,
        api_cname: str,
        web_cname: str,
        redirect_root: bool = True,
        targets: List[str] = None
    ) -> DNSResult:
        """Sync DNS records for the domain"""
        try:
            updated_records = []
            
            # Get existing DNS records
            existing_records = await self._get_dns_records()
            if existing_records is None:
                return DNSResult(
                    success=False,
                    message="Failed to fetch existing DNS records",
                    error="Could not retrieve current DNS records"
                )
            
            # Create/update API CNAME record (api.domain.com -> api_cname)
            api_subdomain = f"api.{domain}"
            api_record = await self._upsert_cname_record(
                existing_records, api_subdomain, api_cname
            )
            if api_record:
                updated_records.append(f"api.{domain} -> {api_cname}")
            
            # Create/update Web CNAME record (www.domain.com -> web_cname)
            www_subdomain = f"www.{domain}"
            www_record = await self._upsert_cname_record(
                existing_records, www_subdomain, web_cname
            )
            if www_record:
                updated_records.append(f"www.{domain} -> {web_cname}")
            
            # Handle root domain redirect if requested
            if redirect_root:
                root_record = await self._upsert_cname_record(
                    existing_records, domain, web_cname
                )
                if root_record:
                    updated_records.append(f"{domain} -> {web_cname}")
            
            # Handle additional targets if provided
            if targets:
                for target in targets:
                    if target and target != domain:
                        target_record = await self._upsert_cname_record(
                            existing_records, target, web_cname
                        )
                        if target_record:
                            updated_records.append(f"{target} -> {web_cname}")
            
            return DNSResult(
                success=True,
                message=f"DNS records synced successfully for {domain}",
                data={
                    "domain": domain,
                    "api_cname": api_cname,
                    "web_cname": web_cname,
                    "redirect_root": redirect_root,
                    "targets": targets,
                    "updated_records": updated_records,
                    "timestamp": datetime.utcnow().isoformat()
                },
                domain=domain,
                records_updated=updated_records
            )
            
        except Exception as e:
            return DNSResult(
                success=False,
                message="Failed to sync DNS records",
                error=str(e),
                domain=domain
            )
    
    async def _get_dns_records(self) -> List[Dict[str, Any]]:
        """Get all DNS records for the zone"""
        try:
            url = f"{self.base_url}/zones/{self.zone_id}/dns_records"
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=self.headers, timeout=30.0)
                
                if response.status_code == 200:
                    data = response.json()
                    return data.get("result", [])
                else:
                    print(f"Failed to get DNS records: {response.status_code} - {response.text}")
                    return None
                    
        except Exception as e:
            print(f"Error getting DNS records: {str(e)}")
            return None
    
    async def _upsert_cname_record(
        self,
        existing_records: List[Dict[str, Any]],
        name: str,
        content: str
    ) -> bool:
        """Create or update a CNAME record"""
        try:
            # Find existing record
            existing_record = None
            for record in existing_records:
                if record.get("name") == name and record.get("type") == "CNAME":
                    existing_record = record
                    break
            
            if existing_record:
                # Update existing record if content is different
                if existing_record.get("content") != content:
                    return await self._update_dns_record(existing_record["id"], name, content)
                else:
                    print(f"CNAME record {name} already up to date")
                    return True
            else:
                # Create new record
                return await self._create_dns_record(name, content)
                
        except Exception as e:
            print(f"Error upserting CNAME record {name}: {str(e)}")
            return False
    
    async def _create_dns_record(self, name: str, content: str) -> bool:
        """Create a new CNAME DNS record"""
        try:
            url = f"{self.base_url}/zones/{self.zone_id}/dns_records"
            
            data = {
                "type": "CNAME",
                "name": name,
                "content": content,
                "ttl": 300  # 5 minutes
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    url, json=data, headers=self.headers, timeout=30.0
                )
                
                if response.status_code == 200:
                    print(f"Created CNAME record: {name} -> {content}")
                    return True
                else:
                    print(f"Failed to create CNAME record: {response.status_code} - {response.text}")
                    return False
                    
        except Exception as e:
            print(f"Error creating DNS record {name}: {str(e)}")
            return False
    
    async def _update_dns_record(self, record_id: str, name: str, content: str) -> bool:
        """Update an existing DNS record"""
        try:
            url = f"{self.base_url}/zones/{self.zone_id}/dns_records/{record_id}"
            
            data = {
                "type": "CNAME",
                "name": name,
                "content": content,
                "ttl": 300  # 5 minutes
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.put(
                    url, json=data, headers=self.headers, timeout=30.0
                )
                
                if response.status_code == 200:
                    print(f"Updated CNAME record: {name} -> {content}")
                    return True
                else:
                    print(f"Failed to update CNAME record: {response.status_code} - {response.text}")
                    return False
                    
        except Exception as e:
            print(f"Error updating DNS record {name}: {str(e)}")
            return False
    
    async def _delete_dns_record(self, record_id: str) -> bool:
        """Delete a DNS record"""
        try:
            url = f"{self.base_url}/zones/{self.zone_id}/dns_records/{record_id}"
            
            async with httpx.AsyncClient() as client:
                response = await client.delete(url, headers=self.headers, timeout=30.0)
                
                if response.status_code == 200:
                    print(f"Deleted DNS record: {record_id}")
                    return True
                else:
                    print(f"Failed to delete DNS record: {response.status_code} - {response.text}")
                    return False
                    
        except Exception as e:
            print(f"Error deleting DNS record {record_id}: {str(e)}")
            return False
    
    async def list_dns_records(self) -> List[Dict[str, Any]]:
        """List all DNS records (helper method)"""
        return await self._get_dns_records() or []
