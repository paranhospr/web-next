import Topbar from '@/components/Topbar'
import Hero from '@/components/Hero'
import Kpis from '@/components/Kpis'
import Section from '@/components/Section'

async function getStats(){
  try{
    const base = process.env.NEXT_PUBLIC_USE_MOCKS ? '/api/mock' : (process.env.NEXT_PUBLIC_API_URL || '')
    const [muns, terrs] = await Promise.all([
      fetch(`${base}/municipios`, { cache:'no-store' }).then(r=>r.ok?r.json():[]),
      fetch(`${base}/territorios`, { cache:'no-store' }).then(r=>r.ok?r.json():[]),
    ])
    const totalMun = (muns||[]).length||0
    const totalTerr = (terrs||[]).length||0
    const pop = (muns||[]).reduce((acc:number, m:any)=> acc + (m.populacao||0), 0)
    return { totalMun, totalTerr, pop }
  }catch{ return { totalMun:0, totalTerr:0, pop:0 } }
}

export default async function Home(){
  const { totalMun, totalTerr, pop } = await getStats()
  return (
    <>
      <Topbar/>
      <Hero/>
      <main className="container">
        <Kpis totalMun={totalMun} totalTerr={totalTerr} pop={pop}/>
      </main>
      <Section title="O que você encontra aqui">
        <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:10}}>
          <li>Agenda pública — eventos e deslocamentos.</li>
          <li>Municípios e territórios — dados e indicadores por região.</li>
          <li>Gestão interna — uploads e aprovações (acesso restrito).</li>
        </ul>
      </Section>
      <footer style={{padding:'24px 0',borderTop:'1px solid #e5e7eb',color:'#6b7280'}}>
        <div className="container">
          Paranhos PR • <a href="/admin/login">Área Administrativa</a> • <a href="/admin/health">Status</a>
        </div>
      </footer>
    </>
  )
}