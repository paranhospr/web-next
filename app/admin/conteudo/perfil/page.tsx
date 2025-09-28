
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { biografias } from '@/lib/data/leonaldo-content';
import Link from 'next/link';

export default function AdminPerfil() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [bioData, setBioData] = useState({
    curta: biografias.curta,
    media: biografias.media,
    longa: biografias.longa
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/admin/login');
      return;
    }
  }, [session, status, router]);

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // Simular save (em um app real, isso iria para um backend/banco de dados)
    setTimeout(() => {
      setSaveStatus('saved');
      setIsEditing(false);
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleCancel = () => {
    setBioData({
      curta: biografias.curta,
      media: biografias.media,
      longa: biografias.longa
    });
    setIsEditing(false);
    setSaveStatus('idle');
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/admin" className="hover:text-blue-600">Admin</Link>
            <span>→</span>
            <span>Perfil e Biografias</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciar Perfil
          </h1>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              Editar Biografias
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleSave} 
                disabled={saveStatus === 'saving'}
                className="bg-green-600 hover:bg-green-700"
              >
                {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
              <Button 
                onClick={handleCancel} 
                variant="outline"
                disabled={saveStatus === 'saving'}
              >
                Cancelar
              </Button>
            </>
          )}
        </div>

        {/* Save Status */}
        {saveStatus === 'saved' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✅ Biografias atualizadas com sucesso!
          </div>
        )}

        {/* Biografia Curta */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Biografia Curta</span>
              <span className="text-sm font-normal text-gray-500">
                {bioData.curta.length} caracteres
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="bio-curta" className="text-sm text-gray-600 mb-2 block">
              Biografia de apresentação (80-120 palavras)
            </Label>
            {isEditing ? (
              <Textarea
                id="bio-curta"
                value={bioData.curta}
                onChange={(e) => setBioData({...bioData, curta: e.target.value})}
                rows={4}
                className="w-full"
                placeholder="Digite a biografia curta..."
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-gray-700 leading-relaxed">{bioData.curta}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Biografia Média */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Biografia Média</span>
              <span className="text-sm font-normal text-gray-500">
                {bioData.media.length} caracteres
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="bio-media" className="text-sm text-gray-600 mb-2 block">
              Biografia intermediária (250-350 palavras)
            </Label>
            {isEditing ? (
              <Textarea
                id="bio-media"
                value={bioData.media}
                onChange={(e) => setBioData({...bioData, media: e.target.value})}
                rows={8}
                className="w-full"
                placeholder="Digite a biografia média..."
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{bioData.media}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Biografia Longa */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Biografia Longa</span>
              <span className="text-sm font-normal text-gray-500">
                {bioData.longa.length} caracteres
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="bio-longa" className="text-sm text-gray-600 mb-2 block">
              Biografia completa (600-900 palavras)
            </Label>
            {isEditing ? (
              <Textarea
                id="bio-longa"
                value={bioData.longa}
                onChange={(e) => setBioData({...bioData, longa: e.target.value})}
                rows={12}
                className="w-full"
                placeholder="Digite a biografia longa..."
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{bioData.longa}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="pt-4">
          <Link href="/admin">
            <Button variant="ghost">
              ← Voltar ao Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
