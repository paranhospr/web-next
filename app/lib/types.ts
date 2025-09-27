
export interface Territory {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Municipality {
  id: string;
  name: string;
  slug: string;
  description?: string;
  territory?: Territory;
  territoryId?: string;
  classification: 'OURO' | 'PRATA' | 'BRONZE' | 'SEM';
  isOurs: boolean;
  population?: number;
  area?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

export interface UpdateMunicipalityData {
  classification?: 'OURO' | 'PRATA' | 'BRONZE' | 'SEM';
  isOurs?: boolean;
  territoryId?: string;
}
