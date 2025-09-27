
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, Calendar, Building, ExternalLink } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { Municipality } from "@/lib/types";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

async function getMunicipality(slug: string): Promise<Municipality | null> {
  try {
    return await api.getMunicipalityBySlug(slug);
  } catch (error) {
    console.error('Erro ao buscar município:', error);
    return null;
  }
}

export default async function MunicipioPage({ params }: Props) {
  const municipality = await getMunicipality(params.slug);

  if (!municipality) {
    notFound();
  }

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/municipios">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Municípios
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {municipality.name}
          </h1>
          <div className="flex justify-center gap-3 mb-6">
            <Badge className={getClassificationColor(municipality.classification)} variant="secondary">
              {municipality.classification}
            </Badge>
            {municipality.isOurs && (
              <Badge className="bg-blue-100 text-blue-700">
                NOSSO MUNICÍPIO
              </Badge>
            )}
          </div>
          {municipality.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {municipality.description}
            </p>
          )}
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Territory Information */}
          {municipality.territory && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Território
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">{municipality.territory.name}</p>
                  {municipality.territory.description && (
                    <p className="text-gray-600">{municipality.territory.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Population Information */}
          {municipality.population && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  População
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900">
                  {municipality.population.toLocaleString('pt-BR')}
                </p>
                <p className="text-gray-600">habitantes</p>
              </CardContent>
            </Card>
          )}

          {/* Area Information */}
          {municipality.area && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-purple-600" />
                  Área
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900">
                  {municipality.area.toLocaleString('pt-BR')}
                </p>
                <p className="text-gray-600">km²</p>
              </CardContent>
            </Card>
          )}

          {/* Creation Date */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Cadastrado em
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(municipality.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/municipios">
                Ver Outros Municípios
              </Link>
            </Button>
            {municipality.territory && (
              <Button variant="outline" size="lg" asChild>
                <Link href="/territorios">
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver Territórios
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
