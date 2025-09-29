
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Plus, Filter } from "lucide-react";
import { toast } from "sonner";

// Mock data para demonstração
const agendaItems = [
  {
    id: '1',
    title: 'Reunião dos Territórios',
    description: 'Apresentação dos resultados trimestrais e planejamento para o próximo período.',
    date: '2024-01-15',
    time: '14:00',
    location: 'Auditório Central',
    type: 'reuniao',
    participants: 25,
    status: 'confirmado'
  },
  {
    id: '2',
    title: 'Workshop de Classificação Municipal',
    description: 'Capacitação sobre os critérios de classificação OURO, PRATA e BRONZE.',
    date: '2024-01-18',
    time: '09:00',
    location: 'Sala de Treinamento',
    type: 'treinamento',
    participants: 15,
    status: 'pendente'
  },
  {
    id: '3',
    title: 'Visita aos Municípios OURO',
    description: 'Visita técnica aos municípios com melhor classificação para troca de experiências.',
    date: '2024-01-22',
    time: '08:00',
    location: 'Municípios Selecionados',
    type: 'visita',
    participants: 8,
    status: 'confirmado'
  },
  {
    id: '4',
    title: 'Assembleia Geral',
    description: 'Assembleia mensal com todos os representantes territoriais.',
    date: '2024-01-25',
    time: '16:00',
    location: 'Plenário Principal',
    type: 'assembleia',
    participants: 45,
    status: 'confirmado'
  }
];

export default function AgendaPage() {
  const handleFilter = () => {
    toast.info("Funcionalidade de filtro será implementada em breve");
  };

  const handleNewEvent = () => {
    toast.info("Formulário de novo evento será implementado em breve");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reuniao':
        return 'bg-blue-100 text-blue-700';
      case 'treinamento':
        return 'bg-green-100 text-green-700';
      case 'visita':
        return 'bg-purple-100 text-purple-700';
      case 'assembleia':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-700';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'reuniao':
        return 'Reunião';
      case 'treinamento':
        return 'Treinamento';
      case 'visita':
        return 'Visita';
      case 'assembleia':
        return 'Assembleia';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agenda Paranhos PR
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe eventos, reuniões e atividades programadas
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleFilter}>
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
          </div>
          <Button size="sm" onClick={handleNewEvent}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        {/* Agenda Items */}
        <div className="grid gap-6">
          {agendaItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </CardTitle>
                      <Badge className={getTypeColor(item.type)} variant="secondary">
                        {getTypeLabel(item.type)}
                      </Badge>
                      <Badge className={getStatusColor(item.status)} variant="secondary">
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    {new Date(item.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    {item.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-orange-500" />
                    {item.participants} participantes
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State Alternative Message */}
        <div className="mt-12 text-center">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-12 h-12 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Agenda Demonstrativa
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Esta é uma versão demonstrativa da agenda. Os eventos reais serão exibidos quando integrados com a API.
          </p>
        </div>
      </div>
    </div>
  );
}
