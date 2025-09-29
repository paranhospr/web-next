import Hero from "@/components/Hero"
import Section from "@/components/Section"
import Stat from "@/components/Stat"

async function getStats(){
  try{
    const base = process.env.NEXT_PUBLIC_USE_MOCKS ? '/api/mock' : (process.env.NEXT_PUBLIC_API_URL || '')
    const [muns, terrs] = await Promise.all([
      fetch(`${base}/municipios`, { cache:'no-store' }).then(r=>r.ok?r.json():[]),
      fetch(`${base}/territorios`, { cache:'no-store' }).then(r=>r.ok?r.json():[]),
    ])
    const totalMun = (muns||[]).length || 0
    const totalTerr = (terrs||[]).length || 0
    const pop = (muns||[]).reduce((acc:any, m:any)=> acc + (m.populacao||0), 0)
    return { totalMun, totalTerr, pop }
  }catch(_e){ return { totalMun:0, totalTerr:0, pop:0 } }
}

export default async function Home(){
  const stats = await getStats()
  return (
    <>
      <Hero />
      <main className="container">
        <div className="kpis">
          <Stat label="Municípios cadastrados" value={String(stats.totalMun)} />
          <Stat label="Territórios" value={String(stats.totalTerr)} />
          <Stat label="População somada" value={stats.pop.toLocaleString('pt-BR')} />
        </div>
      </main>
      <Section title="O que você encontra aqui">
        <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:10}}>
          <li style={{background:'#0f1830',border:'1px solid #334',borderRadius:12,padding:14}}>Agenda pública — eventos e deslocamentos.</li>
          <li style={{background:'#0f1830',border:'1px solid #334',borderRadius:12,padding:14}}>Municípios e territórios — dados e indicadores por região.</li>
          <li style={{background:'#0f1830',border:'1px solid #334',borderRadius:12,padding:14}}>Gestão interna — uploads e aprovações (acesso restrito).</li>
        </ul>
      </Section>
      <footer style={{padding:'24px',background:'#0b1020',color:'#9fb0c9',borderTop:'1px solid #223'}}>
        <div className="container">Paranhos PR • <a href="/admin/login" style={{color:'#93c5fd'}}>Área Administrativa</a> • <a href="/admin/health" style={{color:'#93c5fd'}}>Status</a></div>
      </footer>
    </>
  )
}
