
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, MapPin, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { Municipality, Territory } from "@/lib/types";

export function MunicipalitiesContent() {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerritory, setSelectedTerritory] = useState<string>('all');
  const [selectedClassification, setSelectedClassification] = useState<string>('all');

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
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMunicipalities = municipalities.filter((municipality) => {
    const matchesSearch = municipality.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTerritory = selectedTerritory === 'all' || municipality.territoryId === selectedTerritory;
    const matchesClassification = selectedClassification === 'all' || municipality.classification === selectedClassification;
    
    return matchesSearch && matchesTerritory && matchesClassification;
  });

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'OURO':
        return 'bg-yellow-100 text-yellow-800';
      case 'PRATA':
        return 'bg-gray-100 text-gray-700';
      case 'BRONZE':
        return 'bg-orange-100 text-orange-700';
      case 'SEM':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando municípios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar municípios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedTerritory} onValueChange={setSelectedTerritory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Território" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Territórios</SelectItem>
              {territories.map((territory) => (
                <SelectItem key={territory.id} value={territory.id}>
                  {territory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedClassification} onValueChange={setSelectedClassification}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Classificação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Classes</SelectItem>
              <SelectItem value="OURO">OURO</SelectItem>
              <SelectItem value="PRATA">PRATA</SelectItem>
              <SelectItem value="BRONZE">BRONZE</SelectItem>
              <SelectItem value="SEM">SEM CLASSIFICAÇÃO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-sm text-gray-600">
            {filteredMunicipalities.length} de {municipalities.length} municípios
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedTerritory('all');
              setSelectedClassification('all');
            }}
          >
            <Filter className="w-4 h-4 mr-2" />
            Limpar Filtros
          </Button>
        </div>
      </Card>

      {/* Municipalities List */}
      <div className="grid gap-4">
        {filteredMunicipalities.map((municipality) => (
          <Card key={municipality.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {municipality.name}
                    </h3>
                    <Badge className={getClassificationColor(municipality.classification)}>
                      {municipality.classification}
                    </Badge>
                    {municipality.isOurs && (
                      <Badge variant="default" className="bg-blue-100 text-blue-700">
                        NOSSO
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {municipality.territory && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {municipality.territory.name}
                      </div>
                    )}
                    {municipality.population && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {municipality.population.toLocaleString('pt-BR')} hab.
                      </div>
                    )}
                  </div>
                  
                  {municipality.description && (
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {municipality.description}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/municipios/${municipality.slug}`}>
                      Ver Detalhes
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMunicipalities.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum município encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros para encontrar os municípios desejados.
          </p>
        </div>
      )}
    </div>
  );
}
