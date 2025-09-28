'use client';

import { useState } from 'react';

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<string>('');

  const checkApi = async () => {
    try {
      const response = await fetch('https://api.paranhospr.com.br/health');
      const data = await response.json();
      setApiStatus(`API OK: ${JSON.stringify(data)}`);
    } catch (error) {
      setApiStatus(`API Error: ${error}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Portal Paranhos PR</h1>
      <p>Portal em implantação - Sistema completo em breve!</p>
      <button onClick={checkApi} style={{ padding: '10px 20px', margin: '10px 0' }}>
        Testar API
      </button>
      {apiStatus && <div style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0' }}>{apiStatus}</div>}
    </div>
  );
}
