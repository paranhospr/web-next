'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const ReBarChart = dynamic(() => import('./ReBarChart').then(m => m.ReBarChart), { ssr: false })

export function BarMini({ data }: { data: {name:string, value:number}[] }){
  return (
    <div className="rounded-2xl border p-4 bg-white">
      <div className="text-sm text-gray-600 mb-2">Distribuição</div>
      <div className="h-40">
        <ReBarChart data={data} />
      </div>
    </div>
  )
}
