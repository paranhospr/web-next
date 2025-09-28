
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building } from "lucide-react";
import api from "@/lib/api";
import { Territory } from "@/lib/types";

async function getTerritories(): Promise<Territory[]> {
  try {
    return await api.getTerritories();
  } catch (error) {
    console.error('Erro ao buscar territórios:', error);
    return [];
  }
}

export default async function TerritoriosPage() {
  const territories = await getTerritories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Territórios de Paranhos PR
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore os diferentes territórios e suas características regionais
          </p>
        </div>

        {/* Territories Grid */}
        {territories.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {territories.map((territory) => (
              <Card key={territory.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge variant="secondary">
                      {territory.id}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {territory.name}
                  </CardTitle>
                  {territory.description && (
                    <CardDescription className="line-clamp-3">
                      {territory.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Building className="w-4 h-4 mr-2" />
                    Criado em {new Date(territory.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    Território Regional
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum território encontrado
            </h3>
            <p className="text-gray-600">
              Os territórios serão exibidos aqui quando estiverem disponíveis na API.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
