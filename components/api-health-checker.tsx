
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, RefreshCw, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import api from "@/lib/api";
import { HealthResponse } from "@/lib/types";

export function ApiHealthChecker() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.health();
      setHealth(response);
    } catch (err) {
      // Em caso de erro, mostramos informações básicas mas não como erro crítico
      setHealth({
        status: 'error',
        message: 'API temporariamente indisponível - usando dados demonstrativos',
        timestamp: new Date().toISOString()
      });
      // Não setamos erro para não confundir o usuário
      console.warn('API health check failed, using fallback mode');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const isHealthy = health?.status === 'ok' || health?.status === 'healthy';

  return (
    <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Status da API</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={checkHealth}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">API Indisponível</span>
            <Badge variant="destructive">OFFLINE</Badge>
          </div>
        )}

        {health && !error && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {health.status === 'ok' ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">API Funcionando</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    ONLINE
                  </Badge>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Modo Demonstrativo</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    OFFLINE
                  </Badge>
                </>
              )}
            </div>
            
            {health.message && (
              <p className="text-sm text-gray-600">{health.message}</p>
            )}
            
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full"
            >
              <a
                href="https://api.paranhospr.com.br/health"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Ver Status Completo
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">Verificando...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
