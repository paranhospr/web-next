export default function Kpis({ totalMun, totalTerr, pop }:{ totalMun:number; totalTerr:number; pop:number }) {
  const Card = (l:string,v:string)=>(
    <div style={{background:'#0f1830',color:'#fff',border:'1px solid #334',borderRadius:12,padding:16}}>
      <div style={{opacity:.7,fontSize:12}}>{l}</div>
      <div style={{fontSize:26,fontWeight:800}}>{v}</div>
    </div>
  )
  return (
    <div className="kpis">
      {Card('Municípios', String(totalMun))}
      {Card('Territórios', String(totalTerr))}
      {Card('População somada', pop.toLocaleString('pt-BR'))}
    </div>
  )
}