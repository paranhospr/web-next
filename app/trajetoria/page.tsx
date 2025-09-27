
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { timeline } from '@/lib/data/leonaldo-content';
import Link from 'next/link';

export const metadata = {
  title: 'Trajetória | Leonaldo Paranhos',
  description: 'Timeline da carreira de Leonaldo Paranhos: marcos, conquistas e evolução profissional ao longo dos anos.'
};

export default function TrajetoriaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trajetória Profissional
          </h1>
          <p className="text-xl text-gray-600">
            Marcos e conquistas de uma carreira dedicada ao serviço público
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-blue-200"></div>
          
          {timeline.map((item, index) => (
            <div key={index} className="relative flex items-center mb-12">
              
              {/* Year Badge */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm md:text-base">
                  {item.ano}
                </div>
              </div>

              {/* Content Card */}
              <Card className={`ml-12 md:ml-0 md:w-5/12 shadow-lg ${
                index % 2 === 0 ? 'md:mr-auto md:translate-x-8' : 'md:ml-auto md:-translate-x-8'
              }`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.titulo}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {item.descricao}
                  </p>
                  <div className="text-xs text-blue-600 font-medium">
                    Fonte: {item.fonte}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          <Link href="/sobre">
            <Button variant="outline" className="w-full md:w-auto">
              ← Biografia
            </Button>
          </Link>
          <Link href="/realizacoes">
            <Button className="w-full md:w-auto">
              Ver Realizações →
            </Button>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              Voltar ao início
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
