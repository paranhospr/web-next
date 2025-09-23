'use client'
import { useEffect, useState } from 'react'

const api = process.env.NEXT_PUBLIC_API_URL || ''

export default function Municipalities(){
  const [data,setData]=useState<any[]>([])
  const [q,setQ]=useState('')
  const [name,setName]=useState('')
  const [slug,setSlug]=useState('')
  const [saving,setSaving]=useState(false)

  const load=()=> fetch(api+'/municipalities'+(q?`?q=${encodeURIComponent(q)}`:''))
    .then(r=>r.json()).then(setData).catch(()=>setData([]))

  useEffect(()=>{ load() },[])

  async function create(){
    setSaving(true)
    await fetch(api+'/municipalities',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,slug})})
    setName(''); setSlug(''); setSaving(false); load()
  }

  return <main>
    <h2>Municípios</h2>
    <div style={{display:'flex',gap:8,margin:'12px 0'}}>
      <input placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
      <button onClick={load}>Filtrar</button>
    </div>
    <div style={{border:'1px solid #ddd',padding:12,borderRadius:8,marginBottom:16}}>
      <h3>Novo município</h3>
      <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="slug-exemplo" style={{marginLeft:8}} value={slug} onChange={e=>setSlug(e.target.value)} />
      <button disabled={saving} onClick={create} style={{marginLeft:8}}>Salvar</button>
    </div>
    <table>
      <thead><tr><th>ID</th><th>Nome</th><th>Slug</th></tr></thead>
      <tbody>
        {data.map((m:any)=>(<tr key={m.id}><td>{m.id}</td><td>{m.name}</td><td>{m.slug}</td></tr>))}
      </tbody>
    </table>
  </main>
}
