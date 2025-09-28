export default function AdminDashboard() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard Administrativo</h1>
      <p>Painel de controle da Prefeitura de Paranhos.</p>
      <div style={{ marginTop: 20 }}>
        <a href="/admin" style={{ padding: '10px 16px', background: '#6c757d', color: '#fff', textDecoration: 'none', borderRadius: 6 }}>← Voltar ao Admin</a>
      </div>
    </div>
  );
}
