// lib/api/fetchers.ts
export const isMocks = !!process.env.NEXT_PUBLIC_USE_MOCKS
export const API_BASE = isMocks ? '/api/mock' : (process.env.NEXT_PUBLIC_API_URL || '')

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`)
  return res.json() as Promise<T>
}

export const api = {
  health: () => getJSON<{ok:boolean, ts:string}>(`${API_BASE}/health`),
  municipios: (q='') => getJSON<any[]>(`${API_BASE}/municipios${q ? `?q=${encodeURIComponent(q)}`:''}`),
  autoridades: (q='') => getJSON<any[]>(`${API_BASE}/autoridades${q ? `?q=${encodeURIComponent(q)}`:''}`),
  natal: (q='') => getJSON<any[]>(`${API_BASE}/natal${q ? `?q=${encodeURIComponent(q)}`:''}`),
  agenda: (q='') => getJSON<any[]>(`${API_BASE}/agenda${q ? `?q=${encodeURIComponent(q)}`:''}`),
  territorios: () => getJSON<any[]>(`${API_BASE}/territorios`),
}
