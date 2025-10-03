'use client';


'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { timeline, TimelineItem } from '@/lib/data/leonaldo-content';
import Link from 'next/link';

export default function AdminTimeline() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [timelineData, setTimelineData] = useState<TimelineItem[]>(timeline);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [newItem, setNewItem] = useState<Partial<TimelineItem>>({
    ano: new Date().getFullYear(),
    titulo: '',
    descricao: '',
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
      setIsEditing(false);
      setEditingId(null);
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleAddItem = () => {
    if (newItem.titulo && newItem.descricao) {
      const newItemComplete: TimelineItem = {
        ano: newItem.ano || new Date().getFullYear(),
        titulo: newItem.titulo,
        descricao: newItem.descricao,
        fonte: newItem.fonte || 'Adicionado via admin'
      };
      
      setTimelineData([...timelineData, newItemComplete].sort((a, b) => a.ano - b.ano));
      setNewItem({
        ano: new Date().getFullYear(),
        titulo: '',
        descricao: '',
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
    setTimelineData(timelineData.filter((_, i) => i !== index));
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
            <span>Timeline</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciar Timeline
          </h1>
        </div>

        {/* Save Status */}
        {saveStatus === 'saved' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✅ Timeline atualizada com sucesso!
          </div>
        )}

        {/* Add New Item */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Adicionar Novo Marco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-ano">Ano</Label>
                <Input
                  id="new-ano"
                  type="number"
                  value={newItem.ano || ''}
                  onChange={(e) => setNewItem({...newItem, ano: parseInt(e.target.value)})}
                  placeholder="2024"
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
              <Label htmlFor="new-titulo">Título</Label>
              <Input
                id="new-titulo"
                value={newItem.titulo || ''}
                onChange={(e) => setNewItem({...newItem, titulo: e.target.value})}
                placeholder="Título do marco"
              />
            </div>
            
            <div className="mt-4">
              <Label htmlFor="new-descricao">Descrição</Label>
              <Textarea
                id="new-descricao"
                value={newItem.descricao || ''}
                onChange={(e) => setNewItem({...newItem, descricao: e.target.value})}
                rows={3}
                placeholder="Descrição do marco"
              />
            </div>

            <div className="mt-4">
              <Button 
                onClick={handleAddItem}
                disabled={!newItem.titulo || !newItem.descricao || saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Adicionando...' : 'Adicionar Marco'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Items */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Marcos Existentes ({timelineData.length})
          </h2>
          
          {timelineData.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                      {item.ano}
                    </span>
                    <span>{item.titulo}</span>
                  </span>
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
                      Remover
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingId === index ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Ano</Label>
                        <Input
                          type="number"
                          value={item.ano}
                          onChange={(e) => {
                            const updated = [...timelineData];
                            updated[index].ano = parseInt(e.target.value);
                            setTimelineData(updated);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Fonte</Label>
                        <Input
                          value={item.fonte}
                          onChange={(e) => {
                            const updated = [...timelineData];
                            updated[index].fonte = e.target.value;
                            setTimelineData(updated);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={item.titulo}
                        onChange={(e) => {
                          const updated = [...timelineData];
                          updated[index].titulo = e.target.value;
                          setTimelineData(updated);
                        }}
                      />
                    </div>
                    
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={item.descricao}
                        onChange={(e) => {
                          const updated = [...timelineData];
                          updated[index].descricao = e.target.value;
                          setTimelineData(updated);
                        }}
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      Salvar Alterações
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 mb-2">{item.descricao}</p>
                    <p className="text-xs text-blue-600">Fonte: {item.fonte}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
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
