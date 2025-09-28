export default function AdminLogin() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: 420, margin: '40px auto' }}>
      <h1 style={{ textAlign: 'center' }}>Login Administrativo</h1>
      <form style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Usuário</label>
          <input type="text" style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 6 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Senha</label>
          <input type="password" style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 6 }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, background: '#3498db', color: '#fff', border: 'none', borderRadius: 6 }}>Entrar</button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <a href="/admin" style={{ color: '#3498db' }}>← Voltar ao Admin</a>
      </div>
    </div>
  );
}
