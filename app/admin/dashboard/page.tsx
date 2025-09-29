'use client'
import React, { useEffect, useState } from 'react'
import { api } from '@/lib/api/fetchers'
import { KpiCard } from '@/components/admin/KpiCard'
import { BarMini } from '@/components/admin/BarMini'

export default function AdminDashboard(){
  const [kpis, setKpis] = useState<any|null>(null)

  useEffect(()=>{
    Promise.all([api.municipios(), api.territorios()]).then(([muns, terrs])=>{
      const totalMun = muns.length
      const pop = muns.reduce((acc:any, m:any)=> acc + (m.populacao||0), 0)
      const inv = muns.reduce((acc:any, m:any)=> acc + (m.valoresDestinados||0), 0)
      const byClass = ['Ouro','Prata','Bronze','Sem'].map(name => ({
        name, value: muns.filter((m:any)=> (m.classificacao||'Sem') === name).length
      }))
      setKpis({ totalMun, pop, inv, byClass })
    })
  }, [])

  if(!kpis) return <div className="p-6">Carregando...</div>

  return (
    <main className="p-6 grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Municípios" value={kpis.totalMun} />
        <KpiCard title="População total" value={kpis.pop.toLocaleString('pt-BR')} />
        <KpiCard title="Investimentos (R$)" value={kpis.inv.toLocaleString('pt-BR')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarMini data={kpis.byClass} />
      </div>
    </main>
  )
}
