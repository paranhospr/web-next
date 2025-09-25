
"""
Supabase Database Tool
Handles database operations like importing Excel data
"""
import os
import httpx
import pandas as pd
from typing import Dict, Any, List
from datetime import datetime
from io import BytesIO

from ..schemas import ToolResult, ImportResult


class SupabaseDBTool:
    """Tool for Supabase database operations"""
    
    def __init__(self):
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.service_role_key = os.getenv("SUPABASE_SERVICE_ROLE")
        
        if not all([self.supabase_url, self.service_role_key]):
            raise ValueError("Supabase configuration missing: SUPABASE_URL, SUPABASE_SERVICE_ROLE required")
        
        self.headers = {
            "apikey": self.service_role_key,
            "Authorization": f"Bearer {self.service_role_key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }
    
    async def execute(self, payload: Dict[str, Any]) -> ImportResult:
        """Execute database operation based on payload"""
        try:
            task_type = payload.get("type")
            
            if task_type == "import_municipios":
                return await self._import_municipios(payload)
            else:
                return ImportResult(
                    success=False,
                    message=f"Unknown database operation: {task_type}",
                    error=f"Unsupported task type: {task_type}"
                )
                
        except Exception as e:
            return ImportResult(
                success=False,
                message="Database operation failed",
                error=str(e)
            )
    
    async def _import_municipios(self, payload: Dict[str, Any]) -> ImportResult:
        """Import municipalities from Excel file to Supabase"""
        try:
            xlsx_url = payload.get("xlsx_url")
            sheet_index = payload.get("sheet", 0)
            
            if not xlsx_url:
                return ImportResult(
                    success=False,
                    message="Excel URL required",
                    error="xlsx_url parameter is required"
                )
            
            # Download Excel file
            print(f"📥 Downloading Excel file from: {xlsx_url}")
            excel_data = await self._download_excel_file(xlsx_url)
            if not excel_data:
                return ImportResult(
                    success=False,
                    message="Failed to download Excel file",
                    error=f"Could not download file from: {xlsx_url}"
                )
            
            # Parse Excel file
            print(f"📊 Parsing Excel sheet {sheet_index}")
            df = pd.read_excel(BytesIO(excel_data), sheet_name=sheet_index)
            
            if df.empty:
                return ImportResult(
                    success=False,
                    message="Excel file is empty",
                    error="No data found in the specified sheet"
                )
            
            # Clean and prepare data
            df = self._clean_municipios_data(df)
            
            # Convert to records
            records = df.to_dict('records')
            print(f"📋 Prepared {len(records)} records for import")
            
            # Import to Supabase
            table_name = "municipios"
            imported_count = await self._bulk_insert_records(table_name, records)
            
            if imported_count > 0:
                return ImportResult(
                    success=True,
                    message=f"Successfully imported {imported_count} municipalities",
                    data={
                        "table_name": table_name,
                        "rows_imported": imported_count,
                        "source_url": xlsx_url,
                        "sheet_index": sheet_index,
                        "timestamp": datetime.utcnow().isoformat()
                    },
                    rows_imported=imported_count,
                    table_name=table_name
                )
            else:
                return ImportResult(
                    success=False,
                    message="No records were imported",
                    error="Import operation completed but no records were inserted"
                )
                
        except Exception as e:
            return ImportResult(
                success=False,
                message="Failed to import municipalities",
                error=str(e)
            )
    
    async def _download_excel_file(self, url: str) -> bytes:
        """Download Excel file from URL"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, timeout=60.0)
                
                if response.status_code == 200:
                    return response.content
                else:
                    print(f"Failed to download Excel file: {response.status_code}")
                    return None
                    
        except Exception as e:
            print(f"Error downloading Excel file: {str(e)}")
            return None
    
    def _clean_municipios_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Clean and standardize municipalities data"""
        try:
            # Make a copy to avoid modifying original
            cleaned_df = df.copy()
            
            # Common column name mappings
            column_mappings = {
                'Município': 'municipio',
                'Municipio': 'municipio',
                'Nome': 'municipio',
                'Estado': 'estado',
                'UF': 'estado',
                'Código': 'codigo',
                'Codigo': 'codigo',
                'ID': 'codigo',
                'População': 'populacao',
                'Populacao': 'populacao',
                'Habitantes': 'populacao'
            }
            
            # Rename columns
            for old_name, new_name in column_mappings.items():
                if old_name in cleaned_df.columns:
                    cleaned_df = cleaned_df.rename(columns={old_name: new_name})
            
            # Ensure required columns exist
            required_columns = ['municipio']
            for col in required_columns:
                if col not in cleaned_df.columns:
                    # Try to find the first string column as municipio
                    string_cols = cleaned_df.select_dtypes(include=['object']).columns
                    if len(string_cols) > 0:
                        cleaned_df = cleaned_df.rename(columns={string_cols[0]: 'municipio'})
                    else:
                        raise ValueError(f"Required column '{col}' not found")
            
            # Clean string data
            if 'municipio' in cleaned_df.columns:
                cleaned_df['municipio'] = cleaned_df['municipio'].astype(str).str.strip()
            
            if 'estado' in cleaned_df.columns:
                cleaned_df['estado'] = cleaned_df['estado'].astype(str).str.strip().str.upper()
            
            # Remove empty rows
            cleaned_df = cleaned_df.dropna(subset=['municipio'])
            cleaned_df = cleaned_df[cleaned_df['municipio'] != '']
            
            # Add metadata
            cleaned_df['imported_at'] = datetime.utcnow().isoformat()
            
            print(f"🧹 Cleaned data: {len(cleaned_df)} rows, columns: {list(cleaned_df.columns)}")
            
            return cleaned_df
            
        except Exception as e:
            print(f"Error cleaning data: {str(e)}")
            raise
    
    async def _bulk_insert_records(self, table_name: str, records: List[Dict[str, Any]]) -> int:
        """Bulk insert records into Supabase table"""
        try:
            url = f"{self.supabase_url}/rest/v1/{table_name}"
            
            # Insert in batches to avoid payload size limits
            batch_size = 100
            total_inserted = 0
            
            for i in range(0, len(records), batch_size):
                batch = records[i:i + batch_size]
                
                async with httpx.AsyncClient() as client:
                    response = await client.post(
                        url,
                        json=batch,
                        headers=self.headers,
                        timeout=60.0
                    )
                    
                    if response.status_code in [200, 201]:
                        total_inserted += len(batch)
                        print(f"✅ Inserted batch {i//batch_size + 1}: {len(batch)} records")
                    else:
                        print(f"❌ Failed to insert batch {i//batch_size + 1}: {response.status_code} - {response.text}")
                        # Continue with other batches
            
            return total_inserted
            
        except Exception as e:
            print(f"Error bulk inserting records: {str(e)}")
            return 0
    
    async def _table_exists(self, table_name: str) -> bool:
        """Check if table exists in Supabase"""
        try:
            url = f"{self.supabase_url}/rest/v1/{table_name}?limit=1"
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=self.headers, timeout=30.0)
                
                return response.status_code == 200
                
        except Exception:
            return False
    
    async def _create_municipios_table(self) -> bool:
        """Create municipalities table if it doesn't exist"""
        try:
            # This would require direct database access or Supabase management API
            # For now, assume table exists or is created manually
            print("⚠️ Table creation requires manual setup or database admin access")
            return True
            
        except Exception as e:
            print(f"Error creating table: {str(e)}")
            return False
    
    async def get_table_info(self, table_name: str) -> Dict[str, Any]:
        """Get table information (helper method)"""
        try:
            url = f"{self.supabase_url}/rest/v1/{table_name}?limit=1"
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=self.headers, timeout=30.0)
                
                if response.status_code == 200:
                    return {
                        "exists": True,
                        "accessible": True,
                        "sample_data": response.json()
                    }
                else:
                    return {
                        "exists": False,
                        "accessible": False,
                        "error": f"HTTP {response.status_code}"
                    }
                    
        except Exception as e:
            return {
                "exists": False,
                "accessible": False,
                "error": str(e)
            }
