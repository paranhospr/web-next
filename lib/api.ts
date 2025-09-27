
import { Territory, Municipality, HealthResponse, UpdateMunicipalityData } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.paranhospr.com.br';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Dados de fallback quando API não estiver disponível
const FALLBACK_TERRITORIES: Territory[] = [
  {
    id: "1",
    name: "Território Norte",
    description: "Região norte de Paranhos PR, caracterizada por municípios de grande potencial agropecuário",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z"
  },
  {
    id: "2", 
    name: "Território Central",
    description: "Região central com municípios urbanos e industriais de Paranhos PR",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z"
  },
  {
    id: "3",
    name: "Território Sul", 
    description: "Região sul focada no desenvolvimento sustentável e turismo rural",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z"
  }
];

// Função auxiliar para obter dados de municípios com territórios associados
function getMunicipalitiesWithTerritories(): Municipality[] {
  return [
    {
      id: "1",
      name: "Paranhos",
      slug: "paranhos",
      description: "Município principal da região, centro administrativo e comercial",
      classification: "OURO",
      isOurs: true,
      population: 25000,
      area: 1250,
      territoryId: "1",
      territory: FALLBACK_TERRITORIES.find(t => t.id === "1"),
      createdAt: "2024-01-15T10:00:00.000Z",
      updatedAt: "2024-01-15T10:00:00.000Z"
    },
    {
      id: "2", 
      name: "São Vicente",
      slug: "sao-vicente",
      description: "Município com forte vocação agrícola e pecuária", 
      classification: "PRATA",
      isOurs: true,
      population: 18000,
      area: 980,
      territoryId: "1",
      territory: FALLBACK_TERRITORIES.find(t => t.id === "1"),
      createdAt: "2024-01-15T10:00:00.000Z",
      updatedAt: "2024-01-15T10:00:00.000Z"
    },
    {
      id: "3",
      name: "Vila Nova",
      slug: "vila-nova", 
      description: "Município emergente com foco no desenvolvimento urbano",
      classification: "BRONZE",
      isOurs: false,
      population: 12000,
      area: 650,
      territoryId: "2",
      territory: FALLBACK_TERRITORIES.find(t => t.id === "2"),
      createdAt: "2024-01-15T10:00:00.000Z", 
      updatedAt: "2024-01-15T10:00:00.000Z"
    },
    {
      id: "4",
      name: "Campo Verde",
      slug: "campo-verde",
      description: "Município com grande potencial turístico e cultural",
      classification: "PRATA", 
      isOurs: true,
      population: 22000,
      area: 890,
      territoryId: "3",
      territory: FALLBACK_TERRITORIES.find(t => t.id === "3"),
      createdAt: "2024-01-15T10:00:00.000Z",
      updatedAt: "2024-01-15T10:00:00.000Z"
    },
    {
      id: "5",
      name: "Águas Claras", 
      slug: "aguas-claras",
      description: "Município conhecido pelos recursos hídricos e agricultura sustentável",
      classification: "OURO",
      isOurs: true,
      population: 31000,
      area: 1450,
      territoryId: "3",
      territory: FALLBACK_TERRITORIES.find(t => t.id === "3"),
      createdAt: "2024-01-15T10:00:00.000Z",
      updatedAt: "2024-01-15T10:00:00.000Z"
    },
    {
      id: "6",
      name: "Monte Alto",
      slug: "monte-alto",
      description: "Município de desenvolvimento emergente com foco em inovação", 
      classification: "SEM",
      isOurs: false,
      population: 8500,
      area: 420,
      territoryId: "2",
      territory: FALLBACK_TERRITORIES.find(t => t.id === "2"),
      createdAt: "2024-01-15T10:00:00.000Z",
      updatedAt: "2024-01-15T10:00:00.000Z"
    }
  ];
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // Timeout rápido para evitar espera desnecessária
    signal: AbortSignal.timeout(5000),
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API Error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    // Tratar todos os erros de forma uniforme para usar fallback
    if (error instanceof TypeError || 
        error instanceof DOMException || 
        (error instanceof Error && error.name === 'AbortError')) {
      throw new ApiError(0, 'API temporarily unavailable');
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, `Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Função auxiliar para fazer fetch com fallback silencioso
async function fetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallbackData: T,
  warningMessage: string
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.warn(warningMessage);
    }
    return fallbackData;
  }
}

const USE_FALLBACK_DATA = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';

export const api = {
  // Health check
  health: async (): Promise<HealthResponse> => {
    if (USE_FALLBACK_DATA) {
      return {
        status: 'error',
        message: 'Executando em modo demonstrativo com dados simulados',
        timestamp: new Date().toISOString()
      };
    }
    
    try {
      const response = await fetchApi<any>('/health');
      return {
        status: response.ok ? 'ok' : 'error',
        message: 'API disponível e funcionando',
        timestamp: response.ts || new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'API temporariamente indisponível',
        timestamp: new Date().toISOString()
      };
    }
  },

  // Territories
  getTerritories: async (): Promise<Territory[]> => {
    if (USE_FALLBACK_DATA) {
      return FALLBACK_TERRITORIES;
    }
    
    return fetchWithFallback(
      () => fetchApi<Territory[]>('/territories'),
      FALLBACK_TERRITORIES,
      'API territories endpoint unavailable, using fallback data'
    );
  },

  // Municipalities  
  getMunicipalities: async (): Promise<Municipality[]> => {
    if (USE_FALLBACK_DATA) {
      return getMunicipalitiesWithTerritories();
    }
    
    return fetchWithFallback(
      () => fetchApi<Municipality[]>('/municipalities'),
      getMunicipalitiesWithTerritories(),
      'API municipalities endpoint unavailable, using fallback data'
    );
  },

  getMunicipalityBySlug: async (slug: string): Promise<Municipality> => {
    if (USE_FALLBACK_DATA) {
      const municipalities = getMunicipalitiesWithTerritories();
      const municipality = municipalities.find(m => m.slug === slug);
      if (!municipality) {
        throw new ApiError(404, 'Município não encontrado');
      }
      return municipality;
    }
    
    try {
      return await fetchWithFallback(
        () => fetchApi<Municipality>(`/municipalities/${slug}`),
        {} as Municipality,
        'API municipality endpoint unavailable, using fallback data'
      );
    } catch {
      const municipalities = getMunicipalitiesWithTerritories();
      const municipality = municipalities.find(m => m.slug === slug);
      if (!municipality) {
        throw new ApiError(404, 'Município não encontrado');
      }
      return municipality;
    }
  },

  updateMunicipality: (id: string, data: UpdateMunicipalityData): Promise<Municipality> =>
    fetchApi<Municipality>(`/municipalities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Admin endpoints (to be implemented as needed)
  adminStats: (): Promise<any> =>
    fetchApi<any>('/admin/stats'),
};

export default api;
