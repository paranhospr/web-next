
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { realizacoes } from '@/lib/data/leonaldo-content';
import Link from 'next/link';

export const metadata = {
  title: 'Realizações | Leonaldo Paranhos',
  description: 'Principais realizações e indicadores quantificados da gestão pública de Leonaldo Paranhos.'
};

export default function RealizacoesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Principais Realizações
          </h1>
          <p className="text-xl text-gray-600">
            Resultados quantificados e indicadores de gestão
          </p>
          <div className="w-24 h-1 bg-green-600 mx-auto mt-6"></div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">25</div>
            <div className="text-sm text-gray-600">Novas Escolas</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">Cobertura Saúde</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">21k+</div>
            <div className="text-sm text-gray-600">Processos Digitais</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-orange-600">71,73%</div>
            <div className="text-sm text-gray-600">Aprovação</div>
          </div>
        </div>

        {/* Realizações Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {realizacoes.map((item, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-start justify-between">
                  <span className="flex-1 mr-4">{item.titulo}</span>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    {item.periodo}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {item.resultado}
                </p>
                
                {/* Indicador Destacado */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {item.indicador}
                  </div>
                </div>

                {/* Fonte */}
                <div className="text-xs text-gray-500 border-t pt-3">
                  <strong>Fonte:</strong> {item.fonte}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/trajetoria">
            <Button variant="outline" className="w-full md:w-auto">
              ← Trajetória
            </Button>
          </Link>
          <Link href="/blog">
            <Button className="w-full md:w-auto">
              Ver Blog →
            </Button>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/">
            <Button variant="ghost" className="text-green-600 hover:text-green-800">
              Voltar ao início
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
