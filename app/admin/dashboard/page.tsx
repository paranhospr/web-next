export default function DashboardPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h1 style={{ color: '#2c3e50', fontSize: '2.2rem', marginBottom: '10px' }}>📊 Dashboard Administrativo</h1>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>Visão geral do sistema Paranhos PR</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#3498db', marginBottom: '15px' }}>🌐 Status do Site</h3>
            <div style={{ fontSize: '2rem', color: '#27ae60', marginBottom: '10px' }}>✅ Online</div>
            <p style={{ color: '#7f8c8d' }}>Site funcionando normalmente</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>🔗 API Status</h3>
            <div style={{ fontSize: '2rem', color: '#27ae60', marginBottom: '10px' }}>✅ Ativa</div>
            <p style={{ color: '#7f8c8d' }}>API respondendo corretamente</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#9b59b6', marginBottom: '15px' }}>🏛️ Municípios</h3>
            <div style={{ fontSize: '2rem', color: '#3498db', marginBottom: '10px' }}>399</div>
            <p style={{ color: '#7f8c8d' }}>Municípios cadastrados</p>
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginTop: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '20px' }}>🚀 Ações Rápidas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <a href="/admin/config" style={{ 
              display: 'block', padding: '20px', backgroundColor: '#3498db', color: 'white', 
              textDecoration: 'none', borderRadius: '8px', textAlign: 'center'
            }}>🔧 Configurações</a>
            <a href="/admin/settings" style={{ 
              display: 'block', padding: '20px', backgroundColor: '#2ecc71', color: 'white', 
              textDecoration: 'none', borderRadius: '8px', textAlign: 'center'
            }}>⚙️ Ajustes</a>
            <a href="/admin" style={{ 
              display: 'block', padding: '20px', backgroundColor: '#95a5a6', color: 'white', 
              textDecoration: 'none', borderRadius: '8px', textAlign: 'center'
            }}>🏠 Voltar</a>
          </div>
        </div>
      </div>
    </div>
  );
}
