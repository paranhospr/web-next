export const dynamic = 'force-dynamic'

export async function GET(req: Request){
  const data = [
  {
    "id": 1,
    "nome": "Cascavel",
    "territorio": "Oeste",
    "classificacao": "Ouro",
    "populacao": 348051,
    "valoresDestinados": 12500000
  },
  {
    "id": 2,
    "nome": "Curitiba",
    "territorio": "Metropolitano",
    "classificacao": "Ouro",
    "populacao": 1963726,
    "valoresDestinados": 32700000
  },
  {
    "id": 3,
    "nome": "Foz do Iguaçu",
    "territorio": "Oeste",
    "classificacao": "Prata",
    "populacao": 289655,
    "valoresDestinados": 6200000
  }
]

  const q = (new URL(req.url)).searchParams.get('q')?.toLowerCase() || ''
  const out = q ? data.filter(item => (item['nome']||'').toLowerCase().includes(q) || (item['territorio']||'').toLowerCase().includes(q) || (item['classificacao']||'').toLowerCase().includes(q)) : data
  return Response.json(out)
}
