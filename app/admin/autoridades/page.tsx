'use client'
import React, { useEffect, useState } from 'react'
import { api } from '@/lib/api/fetchers'
import { SimpleTable } from '@/components/admin/SimpleTable'

type A = { tipo:string, municipioId:number, nome:string, partido:string, votos:number, percentual:number, mandatos:number, nosso?:boolean }

export default function AutoridadesPage(){
  const [data, setData] = useState<A[]>([])
  useEffect(()=>{ api.autoridades().then(setData) }, [])

  const columns = [
    { name:'Tipo', selector:(r:A)=>r.tipo },
    { name:'Nome', selector:(r:A)=>r.nome, sortable:true },
    { name:'Partido', selector:(r:A)=>r.partido||'-' },
    { name:'Mandatos', selector:(r:A)=>r.mandatos||0, right:true },
    { name:'% Votação', selector:(r:A)=> (r.percentual||0).toFixed(1)+'%', right:true },
    { name:'Nosso', selector:(r:A)=> r.nosso?'Sim':'Não' },
  ] as any

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-3">Autoridades</h1>
      <SimpleTable<A> columns={columns} data={data} />
    </main>
  )
}
