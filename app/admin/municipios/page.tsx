'use client'
import React, { useEffect, useState } from 'react'
import { api } from '@/lib/api/fetchers'
import { SimpleTable } from '@/components/admin/SimpleTable'

type Mun = { id:number, nome:string, territorio:string, classificacao:string, populacao:number, valoresDestinados:number }

export default function MunicipiosPage(){
  const [data, setData] = useState<Mun[]>([])

  useEffect(()=>{ api.municipios().then(setData) }, [])

  const columns = [
    { name:'Município', selector:(r:Mun)=>r.nome, sortable:true },
    { name:'Território', selector:(r:Mun)=>r.territorio||'-' },
    { name:'Classificação', selector:(r:Mun)=>r.classificacao||'-' },
    { name:'População', selector:(r:Mun)=> (r.populacao||0).toLocaleString('pt-BR'), right:true },
    { name:'Valores (R$)', selector:(r:Mun)=> (r.valoresDestinados||0).toLocaleString('pt-BR'), right:true },
  ] as any

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-3">Municípios</h1>
      <SimpleTable<Mun> columns={columns} data={data} />
    </main>
  )
}
