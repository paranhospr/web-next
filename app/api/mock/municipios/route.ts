export const dynamic = 'force-dynamic'
export async function GET(){
  return Response.json([
    { id:1, nome:'Cascavel', populacao:348051 },
    { id:2, nome:'Curitiba', populacao:1963726 }
  ])
}