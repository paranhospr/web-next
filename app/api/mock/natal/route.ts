export const dynamic = 'force-dynamic'

export async function GET(req: Request){
  const data = [
  {
    "id": 101,
    "municipioId": 1,
    "solicitante": "Associação Bairro X",
    "descricao": "Cestas de Natal",
    "quantidade": 120,
    "status": "pendente"
  },
  {
    "id": 102,
    "municipioId": 2,
    "solicitante": "ONG Esperança",
    "descricao": "Brinquedos",
    "quantidade": 300,
    "status": "aprovado"
  }
]

  const q = (new URL(req.url)).searchParams.get('q')?.toLowerCase() || ''
  const out = q ? data.filter(item => (item['solicitante']||'').toLowerCase().includes(q) || (item['descricao']||'').toLowerCase().includes(q)) : data
  return Response.json(out)
}
