export const isMocks = !!process.env.NEXT_PUBLIC_USE_MOCKS
export const API_BASE = isMocks ? '/api/mock' : (process.env.NEXT_PUBLIC_API_URL || '')

export async function getJSON<T>(url: string): Promise<T> {
  const r = await fetch(url, { cache:'no-store' })
  if(!r.ok) throw new Error('HTTP '+r.status)
  return r.json() as Promise<T>
}

export const api = {
  municipios: () => getJSON<any[]>(`${API_BASE}/municipios`),
  territorios: () => getJSON<any[]>(`${API_BASE}/territorios`),
}