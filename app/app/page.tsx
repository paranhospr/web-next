
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { biografias } from '@/lib/data/leonaldo-content';

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error' | null>(null);
  const [apiData, setApiData] = useState<any>(null);

  const checkApiStatus = async () => {
    setApiStatus('loading');
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        const data = await response.json();
        setApiData(data);
        setApiStatus('success');
      } else {
        throw new Error('API não disponível');
      }
    } catch (error) {
      console.error('Erro ao verificar API:', error);
      setApiStatus('error');
    }
  };

  return (
    <main className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Leonaldo Paranhos
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Empresário e Gestor Público
          </p>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            {biografias.curta.substring(0, 200)}...
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sobre">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3">
                Conhecer Trajetória
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              onClick={checkApiStatus}
              disabled={apiStatus === 'loading'}
            >
              {apiStatus === 'loading' ? 'Verificando...' : 'Verificar Status da API'}
            </Button>
          </div>

          {/* API Status Result */}
          {apiStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg max-w-md mx-auto">
              <p className="font-semibold">✅ API Operacional</p>
              <pre className="text-xs mt-2 overflow-x-auto">
                {JSON.stringify(apiData, null, 2)}
              </pre>
            </div>
          )}

          {apiStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg max-w-md mx-auto">
              <p className="font-semibold">❌ API Indisponível</p>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore o Conteúdo
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Sobre */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/sobre">
                <CardContent className="p-6 text-center">
                  <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Sobre
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Biografia e perfil profissional
                  </p>
                </CardContent>
              </Link>
            </Card>

            {/* Trajetória */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/trajetoria">
                <CardContent className="p-6 text-center">
                  <div className="text-green-600 mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Trajetória
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Timeline de marcos profissionais
                  </p>
                </CardContent>
              </Link>
            </Card>

            {/* Realizações */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/realizacoes">
                <CardContent className="p-6 text-center">
                  <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Realizações
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Indicadores e resultados
                  </p>
                </CardContent>
              </Link>
            </Card>

            {/* Blog */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/blog">
                <CardContent className="p-6 text-center">
                  <div className="text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Blog
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Artigos e reflexões
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Destaques da Gestão
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">25</div>
              <div className="text-gray-600">Novas Escolas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Cobertura Saúde</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">21k+</div>
              <div className="text-gray-600">Processos Digitais</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">71,73%</div>
              <div className="text-gray-600">Aprovação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-400">
            © 2024 Leonaldo Paranhos - Portal Institucional
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Site institucional sem fins eleitorais
          </p>
        </div>
      </footer>

    </main>
  );
}
