export const dynamic = 'force-dynamic'
export async function GET(){
  return Response.json([
    { nome:'Oeste' },
    { nome:'Metropolitano' },
  ])
}