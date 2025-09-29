'use client'
import React, { useEffect, useState } from 'react'
import { api } from '@/lib/api/fetchers'
import { SimpleTable } from '@/components/admin/SimpleTable'

type E = { id:number, tipo:string, titulo?:string, alvo?:string, municipioId?:number, data:string, local?:string }

export default function AgendaPage(){
  const [data, setData] = useState<E[]>([])
  useEffect(()=>{ api.agenda().then(setData) }, [])

  const columns = [
    { name:'Data', selector:(r:E)=> new Date(r.data).toLocaleDateString('pt-BR'), sortable:true },
    { name:'Tipo', selector:(r:E)=> r.tipo },
    { name:'Título/Alvo', selector:(r:E)=> r.titulo || r.alvo || '-' },
    { name:'Município', selector:(r:E)=> r.municipioId||'-' },
    { name:'Local', selector:(r:E)=> r.local||'-' },
  ] as any

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-3">Agenda</h1>
      <SimpleTable<E> columns={columns} data={data} />
    </main>
  )
}
