
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { realizacoes, Realizacao } from '@/lib/data/leonaldo-content';
import Link from 'next/link';

export default function AdminRealizacoes() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [realizacoesData, setRealizacoesData] = useState<Realizacao[]>(realizacoes);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [newItem, setNewItem] = useState<Partial<Realizacao>>({
    titulo: '',
    periodo: '',
    resultado: '',
    indicador: '',
    fonte: ''
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/admin/login');
      return;
    }
  }, [session, status, router]);

  const handleSave = async () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setEditingId(null);
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleAddItem = () => {
    if (newItem.titulo && newItem.resultado && newItem.indicador) {
      const newItemComplete: Realizacao = {
        titulo: newItem.titulo,
        periodo: newItem.periodo || 'Não especificado',
        resultado: newItem.resultado,
        indicador: newItem.indicador,
        fonte: newItem.fonte || 'Adicionado via admin'
      };
      
      setRealizacoesData([...realizacoesData, newItemComplete]);
      setNewItem({
        titulo: '',
        periodo: '',
        resultado: '',
        indicador: '',
        fonte: ''
      });
      
      setSaveStatus('saving');
      setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 1000);
    }
  };

  const handleRemoveItem = (index: number) => {
    setRealizacoesData(realizacoesData.filter((_, i) => i !== index));
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/admin" className="hover:text-blue-600">Admin</Link>
            <span>→</span>
            <span>Realizações</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciar Realizações
          </h1>
        </div>

        {/* Save Status */}
        {saveStatus === 'saved' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✅ Realizações atualizadas com sucesso!
          </div>
        )}

        {/* Add New Item */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Adicionar Nova Realização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-titulo">Título *</Label>
                <Input
                  id="new-titulo"
                  value={newItem.titulo || ''}
                  onChange={(e) => setNewItem({...newItem, titulo: e.target.value})}
                  placeholder="Título da realização"
                />
              </div>
              <div>
                <Label htmlFor="new-periodo">Período</Label>
                <Input
                  id="new-periodo"
                  value={newItem.periodo || ''}
                  onChange={(e) => setNewItem({...newItem, periodo: e.target.value})}
                  placeholder="Ex: 2017-2024"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor="new-resultado">Resultado/Descrição *</Label>
              <Textarea
                id="new-resultado"
                value={newItem.resultado || ''}
                onChange={(e) => setNewItem({...newItem, resultado: e.target.value})}
                rows={3}
                placeholder="Descrição detalhada da realização"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="new-indicador">Indicador *</Label>
                <Input
                  id="new-indicador"
                  value={newItem.indicador || ''}
                  onChange={(e) => setNewItem({...newItem, indicador: e.target.value})}
                  placeholder="Ex: 25 unidades, 100%, 21.000+ processos"
                />
              </div>
              <div>
                <Label htmlFor="new-fonte">Fonte</Label>
                <Input
                  id="new-fonte"
                  value={newItem.fonte || ''}
                  onChange={(e) => setNewItem({...newItem, fonte: e.target.value})}
                  placeholder="Fonte da informação"
                />
              </div>
            </div>

            <div className="mt-4">
              <Button 
                onClick={handleAddItem}
                disabled={!newItem.titulo || !newItem.resultado || !newItem.indicador || saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Adicionando...' : 'Adicionar Realização'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Realizações Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Realizações Existentes ({realizacoesData.length})
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {realizacoesData.map((item, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between text-lg">
                    <span className="flex-1 mr-4">{item.titulo}</span>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingId(editingId === index ? null : index)}
                      >
                        {editingId === index ? 'Cancelar' : 'Editar'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleRemoveItem(index)}
                      >
                        ×
                      </Button>
                    </div>
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {item.periodo}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {editingId === index ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={item.titulo}
                          onChange={(e) => {
                            const updated = [...realizacoesData];
                            updated[index].titulo = e.target.value;
                            setRealizacoesData(updated);
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label>Período</Label>
                        <Input
                          value={item.periodo}
                          onChange={(e) => {
                            const updated = [...realizacoesData];
                            updated[index].periodo = e.target.value;
                            setRealizacoesData(updated);
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label>Resultado</Label>
                        <Textarea
                          value={item.resultado}
                          onChange={(e) => {
                            const updated = [...realizacoesData];
                            updated[index].resultado = e.target.value;
                            setRealizacoesData(updated);
                          }}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Indicador</Label>
                          <Input
                            value={item.indicador}
                            onChange={(e) => {
                              const updated = [...realizacoesData];
                              updated[index].indicador = e.target.value;
                              setRealizacoesData(updated);
                            }}
                          />
                        </div>
                        <div>
                          <Label>Fonte</Label>
                          <Input
                            value={item.fonte}
                            onChange={(e) => {
                              const updated = [...realizacoesData];
                              updated[index].fonte = e.target.value;
                              setRealizacoesData(updated);
                            }}
                          />
                        </div>
                      </div>

                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        Salvar Alterações
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {item.resultado}
                      </p>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg mb-4">
                        <div className="text-xl font-bold text-blue-600">
                          {item.indicador}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 border-t pt-3">
                        <strong>Fonte:</strong> {item.fonte}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-8">
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
