
'use client';

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MapPin, 
  BarChart3, 
  LogOut, 
  Settings,
  TrendingUp,
  Activity
} from "lucide-react";
import { MunicipalityManagement } from "@/components/municipality-management";
import api from "@/lib/api";
import { Municipality, Territory } from "@/lib/types";

export function AdminDashboard() {
  const { data: session } = useSession();
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("municipalities");
  const [stats, setStats] = useState({
    total: 0,
    ouro: 0,
    prata: 0,
    bronze: 0,
    sem: 0,
    nossos: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [municipalitiesData, territoriesData] = await Promise.all([
        api.getMunicipalities(),
        api.getTerritories()
      ]);
      
      setMunicipalities(municipalitiesData);
      setTerritories(territoriesData);
      
      // Calcular estatísticas
      const stats = {
        total: municipalitiesData.length,
        ouro: municipalitiesData.filter(m => m.classification === 'OURO').length,
        prata: municipalitiesData.filter(m => m.classification === 'PRATA').length,
        bronze: municipalitiesData.filter(m => m.classification === 'BRONZE').length,
        sem: municipalitiesData.filter(m => m.classification === 'SEM').length,
        nossos: municipalitiesData.filter(m => m.isOurs).length,
      };
      setStats(stats);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600">
              Bem-vindo, {session?.user?.name || 'Administrador'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Municípios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                +{territories.length} territórios
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nossos Municípios</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.nossos}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.nossos / stats.total) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classificação OURO</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ouro}</div>
              <div className="flex gap-1 mt-1">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                  OURO: {stats.ouro}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Online</span>
              </div>
              <p className="text-xs text-muted-foreground">
                api.paranhospr.com.br
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Classifications Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Distribuição por Classificação
            </CardTitle>
            <CardDescription>
              Breakdown dos municípios por categoria de classificação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-100 text-yellow-800">OURO</Badge>
                <span className="text-sm font-medium">{stats.ouro} municípios</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gray-100 text-gray-700">PRATA</Badge>
                <span className="text-sm font-medium">{stats.prata} municípios</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-orange-100 text-orange-700">BRONZE</Badge>
                <span className="text-sm font-medium">{stats.bronze} municípios</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-100 text-red-700">SEM CLASSIFICAÇÃO</Badge>
                <span className="text-sm font-medium">{stats.sem} municípios</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-400">
            <TabsTrigger 
              value="municipalities"
              onClick={() => setActiveTab("municipalities")}
            >
              Gerenciar Municípios
            </TabsTrigger>
            <TabsTrigger 
              value="territories"
              onClick={() => setActiveTab("territories")}
            >
              Territórios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="municipalities">
            <MunicipalityManagement 
              municipalities={municipalities}
              territories={territories}
              onUpdate={loadData}
            />
          </TabsContent>

          <TabsContent value="territories">
            <Card>
              <CardHeader>
                <CardTitle>Territórios Cadastrados</CardTitle>
                <CardDescription>
                  Lista de todos os territórios no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {territories.map((territory) => (
                    <div key={territory.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{territory.name}</h4>
                        {territory.description && (
                          <p className="text-sm text-gray-600">{territory.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {municipalities.filter(m => m.territoryId === territory.id).length} municípios
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {territories.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum território encontrado
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
