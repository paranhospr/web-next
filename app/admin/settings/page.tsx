export default function AdminSettings() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Configurações do Sistema</h1>
      <p>Painel de configurações da Prefeitura de Paranhos</p>
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #dee2e6', 
          borderRadius: '5px',
          margin: '10px 0'
        }}>
          <h3>Configurações Gerais</h3>
          <p>• Nome do site: Prefeitura de Paranhos</p>
          <p>• Versão: 1.0.0</p>
          <p>• Ambiente: Produção</p>
          <p>• Última atualização: 28/09/2025</p>
        </div>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#e8f5e8', 
          border: '1px solid #c3e6c3', 
          borderRadius: '5px',
          margin: '10px 0'
        }}>
          <h3>Status dos Serviços</h3>
          <p>✅ Frontend: Operacional</p>
          <p>✅ API: Operacional</p>
          <p>✅ Banco de dados: Conectado</p>
          <p>✅ CDN: Ativo</p>
        </div>
        <a href="/admin" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          backgroundColor: '#6c757d', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px'
        }}>
          ← Voltar ao Admin
        </a>
      </div>
    </div>
  );
}
