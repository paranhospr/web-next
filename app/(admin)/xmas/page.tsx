'use client'
import { useEffect, useState } from 'react'
const api = process.env.NEXT_PUBLIC_API_URL || ''

export default function Xmas(){
  const [data,setData]=useState<any[]>([])
  const [title,setTitle]=useState('')
  const [municipalityId,setMunicipalityId]=useState<number>(0)
  const [saving,setSaving]=useState(false)

  const load=()=> fetch(api+'/xmas').then(r=>r.json()).then(setData).catch(()=>setData([]))
  useEffect(()=>{ load() },[])

  async function create(){
    setSaving(true)
    await fetch(api+'/xmas',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title, municipalityId:Number(municipalityId)})})
    setTitle(''); setMunicipalityId(0); setSaving(false); load()
  }

  return <main>
    <h2>Solicitações de Natal</h2>
    <div style={{border:'1px solid #ddd',padding:12,borderRadius:8,marginBottom:16}}>
      <h3>Novo pedido</h3>
      <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="ID do município" style={{marginLeft:8}} value={municipalityId} onChange={e=>setMunicipalityId(Number(e.target.value)||0)} />
      <button disabled={saving} onClick={create} style={{marginLeft:8}}>Salvar</button>
    </div>
    <table>
      <thead><tr><th>ID</th><th>Título</th><th>Município</th><th>Status</th></tr></thead>
      <tbody>
        {data.map((x:any)=>(<tr key={x.id}><td>{x.id}</td><td>{x.title}</td><td>{x.municipality?.name || x.municipalityId}</td><td>{x.status}</td></tr>))}
      </tbody>
    </table>
  </main>
}
