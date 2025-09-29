'use client'
import React, { useEffect, useState } from 'react'
import { api } from '@/lib/api/fetchers'
import { SimpleTable } from '@/components/admin/SimpleTable'

type N = { id:number, municipioId:number, solicitante:string, descricao:string, quantidade:number, status:string }

export default function NatalPage(){
  const [data, setData] = useState<N[]>([])
  useEffect(()=>{ api.natal().then(setData) }, [])

  const columns = [
    { name:'ID', selector:(r:N)=>r.id, right:true },
    { name:'Solicitante', selector:(r:N)=>r.solicitante },
    { name:'Descrição', selector:(r:N)=>r.descricao },
    { name:'Qtd', selector:(r:N)=>r.quantidade, right:true },
    { name:'Status', selector:(r:N)=>r.status },
  ] as any

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-3">Solicitações de Natal</h1>
      <SimpleTable<N> columns={columns} data={data} />
    </main>
  )
}
