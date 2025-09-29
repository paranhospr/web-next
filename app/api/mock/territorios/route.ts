export const dynamic = 'force-dynamic'

export async function GET(req: Request){
  const data = [
  {
    "nome": "Oeste",
    "municipios": [
      "Cascavel",
      "Foz do Iguaçu",
      "Toledo"
    ],
    "kpis": {
      "populacao": 900000,
      "investimentos": 18700000
    }
  },
  {
    "nome": "Metropolitano",
    "municipios": [
      "Curitiba",
      "São José dos Pinhais",
      "Araucária"
    ],
    "kpis": {
      "populacao": 3000000,
      "investimentos": 52000000
    }
  }
]

  const q = (new URL(req.url)).searchParams.get('q')?.toLowerCase() || ''
  const out = q ? data.filter(item => (item['nome']||'').toLowerCase().includes(q)) : data
  return Response.json(out)
}
