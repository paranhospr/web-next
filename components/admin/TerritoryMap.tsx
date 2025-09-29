'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const MapClient = dynamic(() => import('./_Leaflet').then(m => m.MapClient), { ssr: false })

export function TerritoryMap({ items }:{ items: { nome:string, municipios:string[] }[] }){
  return (
    <div className="rounded-2xl border p-2 bg-white h-[500px]">
      <MapClient items={items} />
    </div>
  )
}
