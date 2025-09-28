export default function AdminPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px' }}>
          🏛️ Área Administrativa
        </h1>
        <p style={{ fontSize: '18px', color: '#7f8c8d', marginBottom: '30px' }}>
          Portal administrativo da Prefeitura de Paranhos - PR
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
          <a href="/admin/dashboard" style={{ 
            display: 'block', 
            padding: '20px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
            <strong>Dashboard</strong>
            <div style={{ fontSize: '14px', marginTop: '5px', opacity: '0.9' }}>Painel de controle</div>
          </a>
          
          <a href="/admin/login" style={{ 
            display: 'block', 
            padding: '20px', 
            backgroundColor: '#2ecc71', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔐</div>
            <strong>Login</strong>
            <div style={{ fontSize: '14px', marginTop: '5px', opacity: '0.9' }}>Área de acesso</div>
          </a>
          
          <a href="/admin/settings" style={{ 
            display: 'block', 
            padding: '20px', 
            backgroundColor: '#e74c3c', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚙️</div>
            <strong>Configurações</strong>
            <div style={{ fontSize: '14px', marginTop: '5px', opacity: '0.9' }}>Ajustes do sistema</div>
          </a>
        </div>
        
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
          <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Status do Sistema</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', color: '#27ae60' }}>✅</div>
              <div style={{ fontSize: '14px', color: '#2c3e50' }}>Frontend</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', color: '#27ae60' }}>✅</div>
              <div style={{ fontSize: '14px', color: '#2c3e50' }}>API</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', color: '#27ae60' }}>✅</div>
              <div style={{ fontSize: '14px', color: '#2c3e50' }}>Banco</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', color: '#27ae60' }}>✅</div>
              <div style={{ fontSize: '14px', color: '#2c3e50' }}>CDN</div>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="/" style={{ 
            color: '#3498db', 
            textDecoration: 'none',
            fontSize: '16px'
          }}>
            ← Voltar ao site principal
          </a>
        </div>
      </div>
    </div>
  );
}
