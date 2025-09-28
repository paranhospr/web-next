export default function LoginPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#34495e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#2c3e50', fontSize: '2rem', marginBottom: '10px' }}>🔐 Login Administrativo</h1>
          <p style={{ color: '#7f8c8d' }}>Paranhos PR - Acesso Restrito</p>
        </div>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontWeight: 'bold' }}>👤 Usuário:</label>
            <input 
              type="text" 
              placeholder="Digite seu usuário"
              style={{ 
                width: '100%', padding: '12px', border: '2px solid #ecf0f1', borderRadius: '8px', 
                fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontWeight: 'bold' }}>🔑 Senha:</label>
            <input 
              type="password" 
              placeholder="Digite sua senha"
              style={{ 
                width: '100%', padding: '12px', border: '2px solid #ecf0f1', borderRadius: '8px', 
                fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s'
              }}
            />
          </div>
          
          <button 
            type="submit"
            style={{ 
              padding: '15px', backgroundColor: '#3498db', color: 'white', border: 'none', 
              borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            🚀 Entrar
          </button>
        </form>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="/admin" style={{ color: '#3498db', textDecoration: 'none' }}>← Voltar ao Admin</a>
        </div>
        
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
          <small style={{ color: '#7f8c8d' }}>
            🛡️ Área restrita - Acesso apenas para administradores autorizados
          </small>
        </div>
      </div>
    </div>
  );
}
