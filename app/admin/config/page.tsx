'use client';

export const dynamic = 'force-dynamic';


import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface ConfigData {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
  meta: {
    siteName: string;
    description: string;
    keywords: string;
  };
}

export default function AdminConfig() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [config, setConfig] = useState<ConfigData>({
    colors: {
      primary: '#2563eb',
      secondary: '#16a34a',
      accent: '#7c3aed'
    },
    contact: {
      email: 'contato@paranhospr.com.br',
      phone: '(45) 99999-9999',
      address: 'Cascavel, Paraná'
    },
    social: {
      instagram: 'https://instagram.com/leonaldoparanhos',
      linkedin: 'https://linkedin.com/in/leonaldo-paranhos',
      facebook: 'https://facebook.com/leonaldoparanhos'
    },
    meta: {
      siteName: 'Leonaldo Paranhos - Portal Institucional',
      description: 'Portal institucional de Leonaldo Paranhos, empresário e gestor público',
      keywords: 'leonaldo paranhos, gestor público, cascavel, paraná, administração'
    }
  });
  
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
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const updateConfig = (section: keyof ConfigData, key: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
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
            <span>Configurações</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Configurações do Site
          </h1>
        </div>

        {/* Save Status */}
        {saveStatus === 'saved' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✅ Configurações salvas com sucesso!
          </div>
        )}

        <div className="space-y-6">
          
          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle>🎨 Cores do Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={config.colors.primary}
                      onChange={(e) => updateConfig('colors', 'primary', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      value={config.colors.primary}
                      onChange={(e) => updateConfig('colors', 'primary', e.target.value)}
                      placeholder="#2563eb"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={config.colors.secondary}
                      onChange={(e) => updateConfig('colors', 'secondary', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      value={config.colors.secondary}
                      onChange={(e) => updateConfig('colors', 'secondary', e.target.value)}
                      placeholder="#16a34a"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="accent-color">Cor de Destaque</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accent-color"
                      type="color"
                      value={config.colors.accent}
                      onChange={(e) => updateConfig('colors', 'accent', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      value={config.colors.accent}
                      onChange={(e) => updateConfig('colors', 'accent', e.target.value)}
                      placeholder="#7c3aed"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>📞 Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-email">E-mail</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={config.contact.email}
                    onChange={(e) => updateConfig('contact', 'email', e.target.value)}
                    placeholder="contato@paranhospr.com.br"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact-phone">Telefone</Label>
                  <Input
                    id="contact-phone"
                    value={config.contact.phone}
                    onChange={(e) => updateConfig('contact', 'phone', e.target.value)}
                    placeholder="(45) 99999-9999"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact-address">Endereço</Label>
                  <Input
                    id="contact-address"
                    value={config.contact.address}
                    onChange={(e) => updateConfig('contact', 'address', e.target.value)}
                    placeholder="Cascavel, Paraná"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>📱 Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="social-instagram">Instagram</Label>
                  <Input
                    id="social-instagram"
                    value={config.social.instagram}
                    onChange={(e) => updateConfig('social', 'instagram', e.target.value)}
                    placeholder="https://instagram.com/leonaldoparanhos"
                  />
                </div>
                
                <div>
                  <Label htmlFor="social-linkedin">LinkedIn</Label>
                  <Input
                    id="social-linkedin"
                    value={config.social.linkedin}
                    onChange={(e) => updateConfig('social', 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/leonaldo-paranhos"
                  />
                </div>
                
                <div>
                  <Label htmlFor="social-facebook">Facebook</Label>
                  <Input
                    id="social-facebook"
                    value={config.social.facebook}
                    onChange={(e) => updateConfig('social', 'facebook', e.target.value)}
                    placeholder="https://facebook.com/leonaldoparanhos"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meta Information */}
          <Card>
            <CardHeader>
              <CardTitle>🔍 SEO e Metadados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="meta-sitename">Nome do Site</Label>
                  <Input
                    id="meta-sitename"
                    value={config.meta.siteName}
                    onChange={(e) => updateConfig('meta', 'siteName', e.target.value)}
                    placeholder="Leonaldo Paranhos - Portal Institucional"
                  />
                </div>
                
                <div>
                  <Label htmlFor="meta-description">Descrição</Label>
                  <Input
                    id="meta-description"
                    value={config.meta.description}
                    onChange={(e) => updateConfig('meta', 'description', e.target.value)}
                    placeholder="Portal institucional de Leonaldo Paranhos..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="meta-keywords">Palavras-chave (separadas por vírgula)</Label>
                  <Input
                    id="meta-keywords"
                    value={config.meta.keywords}
                    onChange={(e) => updateConfig('meta', 'keywords', e.target.value)}
                    placeholder="leonaldo paranhos, gestor público, cascavel..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Save Button */}
        <div className="mt-8">
          <Button 
            onClick={handleSave} 
            disabled={saveStatus === 'saving'}
            className="bg-green-600 hover:bg-green-700"
          >
            {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>

        {/* Back Button */}
        <div className="pt-6">
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
