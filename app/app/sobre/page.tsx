
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { biografias } from '@/lib/data/leonaldo-content';
import Link from 'next/link';

export default function SobrePage() {
  const [showExtended, setShowExtended] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Leonaldo Paranhos
          </h1>
          <p className="text-xl text-gray-600">
            Empresário e Gestor Público
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        {/* Biografia Card */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Biografia
            </h2>
            
            {/* Bio Curta/Média */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-6">
              <p>{showExtended ? biografias.longa : biografias.media}</p>
            </div>

            {/* Toggle Extended Bio */}
            {!showExtended && (
              <Button 
                onClick={() => setShowExtended(true)}
                variant="outline"
                className="mb-4"
              >
                Ler biografia completa
              </Button>
            )}
            
            {showExtended && (
              <Button 
                onClick={() => setShowExtended(false)}
                variant="outline"
                className="mb-4"
              >
                Recolher
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/trajetoria">
              <CardContent className="p-6 text-center">
                <div className="text-blue-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Trajetória Profissional
                </h3>
                <p className="text-gray-600">
                  Conheça os marcos e conquistas ao longo da carreira pública e empresarial
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/realizacoes">
              <CardContent className="p-6 text-center">
                <div className="text-green-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Principais Realizações
                </h3>
                <p className="text-gray-600">
                  Indicadores e resultados quantificados das gestões e iniciativas implementadas
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              ← Voltar ao início
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
