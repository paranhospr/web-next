
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Edit, Save, X, Users, MapPin } from "lucide-react";
import { Municipality, Territory, UpdateMunicipalityData } from "@/lib/types";
import api from "@/lib/api";

interface Props {
  municipalities: Municipality[];
  territories: Territory[];
  onUpdate: () => void;
}

export function MunicipalityManagement({ municipalities, territories, onUpdate }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<UpdateMunicipalityData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const filteredMunicipalities = municipalities.filter((municipality) =>
    municipality.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (municipality: Municipality) => {
    setEditingId(municipality.id);
    setEditData({
      classification: municipality.classification,
      isOurs: municipality.isOurs,
      territoryId: municipality.territoryId || '',
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    if (!editingId) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.updateMunicipality(editingId, editData);
      setSuccess('Município atualizado com sucesso!');
      setEditingId(null);
      onUpdate();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao atualizar município');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setError('');
    setSuccess('');
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Municípios</CardTitle>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar municípios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge variant="outline">
            {filteredMunicipalities.length} de {municipalities.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {filteredMunicipalities.map((municipality) => (
            <div key={municipality.id} className="border rounded-lg p-4">
              {editingId === municipality.id ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-lg">{municipality.name}</h4>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={loading}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="classification">Classificação</Label>
                      <Select
                        value={editData.classification}
                        onValueChange={(value: 'OURO' | 'PRATA' | 'BRONZE' | 'SEM') =>
                          setEditData(prev => ({ ...prev, classification: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar classificação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OURO">OURO</SelectItem>
                          <SelectItem value="PRATA">PRATA</SelectItem>
                          <SelectItem value="BRONZE">BRONZE</SelectItem>
                          <SelectItem value="SEM">SEM CLASSIFICAÇÃO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="territory">Território</Label>
                      <Select
                        value={editData.territoryId}
                        onValueChange={(value) =>
                          setEditData(prev => ({ ...prev, territoryId: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar território" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Nenhum território</SelectItem>
                          {territories.map((territory) => (
                            <SelectItem key={territory.id} value={territory.id}>
                              {territory.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isOurs"
                        checked={editData.isOurs}
                        onCheckedChange={(checked: boolean) =>
                          setEditData(prev => ({ ...prev, isOurs: checked }))
                        }
                      />
                      <Label htmlFor="isOurs">É nosso município</Label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-lg">{municipality.name}</h4>
                      <Badge className={getClassificationColor(municipality.classification)}>
                        {municipality.classification}
                      </Badge>
                      {municipality.isOurs && (
                        <Badge className="bg-blue-100 text-blue-700">NOSSO</Badge>
                      )}
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
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
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(municipality)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              )}
            </div>
          ))}

          {filteredMunicipalities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum município encontrado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
