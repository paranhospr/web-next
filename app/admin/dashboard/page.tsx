export default function AdminDashboard() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard Administrativo</h1>
      <p>Painel de controle da Prefeitura de Paranhos</p>
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #dee2e6', 
          borderRadius: '5px',
          margin: '10px 0'
        }}>
          <h3>Status do Sistema</h3>
          <p>✅ Sistema operacional</p>
          <p>✅ API funcionando</p>
          <p>✅ Banco de dados conectado</p>
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
