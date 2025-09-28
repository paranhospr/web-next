export default function SettingsPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h1 style={{ color: '#2c3e50', fontSize: '2.2rem', marginBottom: '10px' }}>⚙️ Configurações do Sistema</h1>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>Ajustes e parâmetros do portal Paranhos PR</p>
        </div>
        
        <div style={{ display: 'grid', gap: '25px' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#3498db', marginBottom: '20px' }}>🌐 Configurações Gerais</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ecf0f1' }}>
                <span style={{ color: '#34495e' }}>Nome do Site:</span>
                <span style={{ color: '#7f8c8d', fontWeight: 'bold' }}>Paranhos PR</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ecf0f1' }}>
                <span style={{ color: '#34495e' }}>Domínio:</span>
                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>www.paranhospr.com.br</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ecf0f1' }}>
                <span style={{ color: '#34495e' }}>SSL:</span>
                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>✅ Ativo</span>
              </div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#e74c3c', marginBottom: '20px' }}>🔧 Configurações da API</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ecf0f1' }}>
                <span style={{ color: '#34495e' }}>Endpoint API:</span>
                <span style={{ color: '#3498db', fontWeight: 'bold' }}>api.paranhospr.com.br</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ecf0f1' }}>
                <span style={{ color: '#34495e' }}>Status:</span>
                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>✅ Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ecf0f1' }}>
                <span style={{ color: '#34495e' }}>CORS:</span>
                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>✅ Configurado</span>
              </div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#9b59b6', marginBottom: '20px' }}>📊 Estatísticas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', color: '#3498db', marginBottom: '5px' }}>399</div>
                <div style={{ color: '#7f8c8d' }}>Municípios</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', color: '#2ecc71', marginBottom: '5px' }}>100%</div>
                <div style={{ color: '#7f8c8d' }}>Uptime</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '5px' }}>v1.0</div>
                <div style={{ color: '#7f8c8d' }}>Versão</div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginTop: '30px', textAlign: 'center' }}>
          <a href="/admin" style={{ 
            display: 'inline-block', padding: '15px 30px', backgroundColor: '#34495e', color: 'white', 
            textDecoration: 'none', borderRadius: '8px', fontSize: '1.1rem'
          }}>← Voltar ao Admin</a>
        </div>
      </div>
    </div>
  );
}
