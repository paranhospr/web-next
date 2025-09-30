export default function Hero(){
  return (
    <section style={{padding:'64px 0',background:'linear-gradient(180deg,#0b1020,#0e152d)',color:'#fff'}}>
      <div className="container">
        <div style={{display:'inline-block',padding:'6px 10px',border:'1px solid rgba(14,165,233,.4)',borderRadius:999,color:'#7dd3fc',fontWeight:700,fontSize:12}}>Portal institucional</div>
        <h1 style={{margin:'10px 0 6px 0',fontSize:40,letterSpacing:.5}}>Paranhos Paraná</h1>
        <p style={{opacity:.9,maxWidth:760}}>Transparência e prestação de contas. Acompanhe dados dos municípios, agenda pública e ações em andamento.</p>
        <div style={{display:'flex',gap:12,marginTop:16,flexWrap:'wrap'}}>
          <a href="/admin/login" style={{background:'#0ea5e9',color:'#06210f',fontWeight:800,padding:'12px 16px',borderRadius:12}}>Área Administrativa</a>
          <a href="/admin/health" style={{border:'1px solid rgba(255,255,255,.25)',padding:'12px 16px',borderRadius:12,color:'#fff'}}>Status do Sistema</a>
        </div>
      </div>
    </section>
  )
}