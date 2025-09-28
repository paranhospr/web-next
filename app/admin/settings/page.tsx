export default function AdminSettings() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Configurações</h1>
      <p>Ajustes básicos do portal.</p>
      <ul>
        <li>Nome do site: Prefeitura de Paranhos</li>
        <li>Ambiente: Produção</li>
        <li>Versão: 1.0.0</li>
      </ul>
      <div style={{ marginTop: 20 }}>
        <a href="/admin" style={{ padding: '10px 16px', background: '#6c757d', color: '#fff', textDecoration: 'none', borderRadius: 6 }}>← Voltar ao Admin</a>
      </div>
    </div>
  );
}
