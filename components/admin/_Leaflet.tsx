'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type Item = { nome:string, municipios:string[] }

export function MapClient({ items }:{ items: Item[] }){
  const center:[number, number] = [-24.5, -51.5]
  return (
    <MapContainer center={center} zoom={6} style={{height:'100%', width:'100%'}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {items.map((t, i)=> (
        <Marker key={i} position={[center[0] + (i*0.6-0.6), center[1] + (i*0.6-0.6)]}>
          <Popup>
            <strong>{t.nome}</strong><br/>
            Municípios: {t.municipios.slice(0,5).join(', ')}{t.municipios.length>5?'...':''}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
