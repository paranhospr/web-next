export const dynamic = 'force-dynamic'

export async function GET(req: Request){
  const data = [
  {
    "tipo": "prefeito",
    "municipioId": 1,
    "nome": "Fulano Prefeito",
    "partido": "ABC",
    "votos": 65000,
    "percentual": 58.3,
    "mandatos": 2,
    "whatsapp": "+554599999999",
    "instagram": "@fulano",
    "email": "prefeito@cascavel.pr.gov.br",
    "nosso": true
  },
  {
    "tipo": "vice",
    "municipioId": 1,
    "nome": "Beltrano Vice",
    "partido": "ABC",
    "votos": 0,
    "percentual": 0,
    "mandatos": 1,
    "nosso": true
  },
  {
    "tipo": "presidente_camara",
    "municipioId": 1,
    "nome": "Ciclano",
    "partido": "XYZ",
    "votos": 4200,
    "percentual": 12.1,
    "mandatos": 3,
    "nosso": false
  },
  {
    "tipo": "vereador",
    "municipioId": 1,
    "nome": "Maria Silva",
    "partido": "QWE",
    "votos": 1800,
    "percentual": 3.2,
    "mandatos": 1,
    "nosso": true
  }
]

  const q = (new URL(req.url)).searchParams.get('q')?.toLowerCase() || ''
  const out = q ? data.filter(item => (item['nome']||'').toLowerCase().includes(q) || (item['tipo']||'').toLowerCase().includes(q)) : data
  return Response.json(out)
}
