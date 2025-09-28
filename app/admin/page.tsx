export default function AdminPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Área Administrativa</h1>
      <p>Portal administrativo da Prefeitura de Paranhos</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/admin/dashboard" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          backgroundColor: '#3498db', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px',
          margin: '5px'
        }}>
          Dashboard
        </a>
        <a href="/admin/login" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          backgroundColor: '#2ecc71', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px',
          margin: '5px'
        }}>
          Login
        </a>
        <a href="/admin/settings" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          backgroundColor: '#e74c3c', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px',
          margin: '5px'
        }}>
          Configurações
        </a>
      </div>
    </div>
  );
}
