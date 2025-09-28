'use client';

export default function AdminPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Área Administrativa</h1>
      <p>Sistema de administração em desenvolvimento.</p>
      <form style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" style={{ marginLeft: '10px', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Senha:</label>
          <input type="password" style={{ marginLeft: '10px', padding: '5px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
      </form>
    </div>
  );
}
