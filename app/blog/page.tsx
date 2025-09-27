
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { faq } from '@/lib/data/leonaldo-content';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Leonaldo Paranhos',
  description: 'Artigos, reflexões e perguntas frequentes sobre a atuação de Leonaldo Paranhos.'
};

// Mock posts para demonstração
const mockPosts = [
  {
    id: 1,
    titulo: "Modernização da Gestão Pública: A Experiência de Cascavel",
    resumo: "Análise dos processos de digitalização implementados na administração municipal e seus resultados para a eficiência do serviço público.",
    data: "2024-09-15",
    categoria: "Gestão Pública",
    leitura: "8 min"
  },
  {
    id: 2,
    titulo: "Desenvolvimento Sustentável do Turismo no Paraná",
    resumo: "Estratégias para fortalecer o setor turístico estadual, aproveitando potencialidades regionais de forma sustentável.",
    data: "2024-08-28",
    categoria: "Turismo",
    leitura: "6 min"
  },
  {
    id: 3,
    titulo: "Educação Municipal: Investimentos e Resultados",
    resumo: "Balanço da expansão da rede escolar em Cascavel e impactos na qualidade do ensino público municipal.",
    data: "2024-08-10",
    categoria: "Educação",
    leitura: "10 min"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600">
            Reflexões sobre gestão pública, desenvolvimento e políticas públicas
          </p>
          <div className="w-24 h-1 bg-purple-600 mx-auto mt-6"></div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mockPosts.map((post) => (
            <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.categoria}</Badge>
                  <span className="text-sm text-gray-500">{post.leitura}</span>
                </div>
                <CardTitle className="text-xl text-gray-900 leading-tight">
                  {post.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.resumo}
                </p>
                <div className="text-sm text-gray-500">
                  {new Date(post.data).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faq.map((item, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {item.pergunta}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.resposta}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/realizacoes">
            <Button variant="outline" className="w-full md:w-auto">
              ← Realizações
            </Button>
          </Link>
          <Link href="/sobre">
            <Button className="w-full md:w-auto">
              Sobre Leonaldo →
            </Button>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/">
            <Button variant="ghost" className="text-purple-600 hover:text-purple-800">
              Voltar ao início
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
