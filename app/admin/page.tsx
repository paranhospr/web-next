'use client';


'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Ainda carregando
    if (!session) {
      router.push('/admin/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const adminCards = [
    {
      title: 'Perfil e Biografias',
      description: 'Gerenciar biografias (curta, média, longa) e informações do perfil',
      href: '/admin/conteudo/perfil',
      icon: '👤',
      color: 'bg-blue-500'
    },
    {
      title: 'Timeline/Trajetória',
      description: 'Adicionar, editar ou remover marcos da trajetória profissional',
      href: '/admin/conteudo/timeline',
      icon: '📅',
      color: 'bg-green-500'
    },
    {
      title: 'Realizações',
      description: 'Gerenciar realizações com indicadores quantificados',
      href: '/admin/conteudo/realizacoes',
      icon: '🏆',
      color: 'bg-purple-500'
    },
    {
      title: 'Configurações',
      description: 'Cores do site, contatos, redes sociais e configurações gerais',
      href: '/admin/config',
      icon: '⚙️',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Bem-vindo, {session.user?.email}. Gerencie o conteúdo do portal.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">Páginas Públicas</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-600">Marcos Timeline</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">10</div>
            <div className="text-sm text-gray-600">Realizações</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-600">FAQs</div>
          </div>
        </div>

        {/* Admin Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {adminCards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <Link href={card.href}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${card.color} flex items-center justify-center text-white text-lg`}>
                      {card.icon}
                    </div>
                    <span>{card.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {card.description}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" target="_blank">
            <Button variant="outline" className="w-full sm:w-auto">
              Ver Site Público
            </Button>
          </Link>
          <Link href="/api/auth/signout">
            <Button variant="destructive" className="w-full sm:w-auto">
              Sair
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
