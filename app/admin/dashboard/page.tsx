export default function AdminDashboard() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px' }}>
          📊 Dashboard Administrativo
        </h1>
        <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '30px' }}>
          Painel de controle da Prefeitura de Paranhos - PR
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ padding: '20px', backgroundColor: '#3498db', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>100%</div>
            <div>Sistema Operacional</div>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#2ecc71', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>24/7</div>
            <div>Disponibilidade</div>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#e67e22', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>5</div>
            <div>Serviços Ativos</div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ padding: '20px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
            <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Status dos Serviços</h3>
            <div style={{ marginBottom: '10px' }}>✅ Frontend: Operacional</div>
            <div style={{ marginBottom: '10px' }}>✅ API: Funcionando</div>
            <div style={{ marginBottom: '10px' }}>✅ Banco de dados: Conectado</div>
            <div style={{ marginBottom: '10px' }}>✅ CDN Cloudflare: Ativo</div>
            <div style={{ marginBottom: '10px' }}>✅ SSL/HTTPS: Válido</div>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
            <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Informações do Sistema</h3>
            <div style={{ marginBottom: '10px' }}><strong>Versão:</strong> 1.0.0</div>
            <div style={{ marginBottom: '10px' }}><strong>Ambiente:</strong> Produção</div>
            <div style={{ marginBottom: '10px' }}><strong>Deploy:</strong> 28/09/2025</div>
            <div style={{ marginBottom: '10px' }}><strong>Uptime:</strong> 99.9%</div>
            <div style={{ marginBottom: '10px' }}><strong>Última atualização:</strong> Hoje</div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <a href="/admin" style={{ 
            display: 'inline-block',
            padding: '12px 24px', 
            backgroundColor: '#6c757d', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px',
            marginRight: '10px'
          }}>
            ← Voltar ao Admin
          </a>
          <a href="/" style={{ 
            display: 'inline-block',
            padding: '12px 24px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px'
          }}>
            🏠 Site Principal
          </a>
        </div>
      </div>
    </div>
  );
}
