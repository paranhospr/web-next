export const dynamic = 'force-dynamic'

export async function GET(req: Request){
  const data = [
  {
    "id": 201,
    "tipo": "aniversario",
    "alvo": "Prefeito de Cascavel",
    "municipioId": 1,
    "data": "2025-10-05"
  },
  {
    "id": 202,
    "tipo": "evento",
    "titulo": "Visita Hospital Universitário",
    "municipioId": 1,
    "data": "2025-10-12",
    "local": "Cascavel"
  }
]

  const q = (new URL(req.url)).searchParams.get('q')?.toLowerCase() || ''
  const out = q ? data.filter(item => (item['tipo']||'').toLowerCase().includes(q) || (item['alvo']||'').toLowerCase().includes(q) || (item['titulo']||'').toLowerCase().includes(q)) : data
  return Response.json(out)
}
