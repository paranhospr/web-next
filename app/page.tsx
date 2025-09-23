
'use client';

import { useState } from 'react';

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.paranhospr.com.br';
      const response = await fetch(`${apiUrl}/health`);
      const data = await response.json();
      setHealthStatus(`Status: ${response.status} - ${JSON.stringify(data)}`);
    } catch (error) {
      setHealthStatus(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '3rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#2c3e50',
          marginBottom: '1rem',
          fontWeight: '700'
        }}>
          Prefeitura de Paranhos
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#7f8c8d',
          marginBottom: '2rem'
        }}>
          Portal em implantação
        </p>
        
        <button
          onClick={checkHealth}
          disabled={loading}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '1rem',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? 'Verificando...' : 'Verificar Status da API'}
        </button>
        
        {healthStatus && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#ecf0f1',
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: '#2c3e50',
            wordBreak: 'break-all'
          }}>
            {healthStatus}
          </div>
        )}
      </div>
    </main>
  );
}
