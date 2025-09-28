export default function AdminPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '10px', borderBottom: '4px solid #3498db', paddingBottom: '15px' }}>
          🏛️ Área Administrativa - Paranhos PR
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d', marginBottom: '40px' }}>
          Portal administrativo para gestão de conteúdo e configurações
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginTop: '40px' }}>
          <a href="/admin/dashboard" style={{ 
            display: 'block', padding: '30px', backgroundColor: '#3498db', color: 'white', 
            textDecoration: 'none', borderRadius: '10px', textAlign: 'center', fontSize: '1.1rem',
            transition: 'transform 0.2s', boxShadow: '0 2px 10px rgba(52,152,219,0.3)'
          }}>
            📊 Dashboard<br/>
            <small style={{ opacity: '0.9', fontSize: '0.9rem' }}>Visão geral do sistema</small>
          </a>
          
          <a href="/admin/login" style={{ 
            display: 'block', padding: '30px', backgroundColor: '#2ecc71', color: 'white', 
            textDecoration: 'none', borderRadius: '10px', textAlign: 'center', fontSize: '1.1rem',
            transition: 'transform 0.2s', boxShadow: '0 2px 10px rgba(46,204,113,0.3)'
          }}>
            🔐 Login<br/>
            <small style={{ opacity: '0.9', fontSize: '0.9rem' }}>Autenticação</small>
          </a>
          
          <a href="/admin/settings" style={{ 
            display: 'block', padding: '30px', backgroundColor: '#e74c3c', color: 'white', 
            textDecoration: 'none', borderRadius: '10px', textAlign: 'center', fontSize: '1.1rem',
            transition: 'transform 0.2s', boxShadow: '0 2px 10px rgba(231,76,60,0.3)'
          }}>
            ⚙️ Configurações<br/>
            <small style={{ opacity: '0.9', fontSize: '0.9rem' }}>Ajustes do sistema</small>
          </a>
          
          <a href="/admin/config" style={{ 
            display: 'block', padding: '30px', backgroundColor: '#9b59b6', color: 'white', 
            textDecoration: 'none', borderRadius: '10px', textAlign: 'center', fontSize: '1.1rem',
            transition: 'transform 0.2s', boxShadow: '0 2px 10px rgba(155,89,182,0.3)'
          }}>
            🔧 Configuração<br/>
            <small style={{ opacity: '0.9', fontSize: '0.9rem' }}>Parâmetros gerais</small>
          </a>
        </div>
        
        <div style={{ marginTop: '50px', padding: '20px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>📋 Status do Sistema</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px' }}>
              <strong style={{ color: '#27ae60' }}>✅ Frontend:</strong> Online
            </div>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px' }}>
              <strong style={{ color: '#27ae60' }}>✅ API:</strong> Funcionando
            </div>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px' }}>
              <strong style={{ color: '#27ae60' }}>✅ DNS:</strong> Configurado
            </div>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px' }}>
              <strong style={{ color: '#27ae60' }}>✅ SSL:</strong> Ativo
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'center', color: '#7f8c8d' }}>
          <p>Paranhos PR - Sistema Administrativo v1.0</p>
          <p style={{ fontSize: '0.9rem' }}>Desenvolvido para gestão municipal eficiente</p>
        </div>
      </div>
    </div>
  );
}
