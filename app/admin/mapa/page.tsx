'use client'
import React, { useEffect, useState } from 'react'
import { api } from '@/lib/api/fetchers'
import { TerritoryMap } from '@/components/admin/TerritoryMap'

export default function MapaPage(){
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{ api.territorios().then(setItems) }, [])
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-3">Mapa por Territórios</h1>
      <TerritoryMap items={items} />
    </main>
  )
}
