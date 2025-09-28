export default function AdminLogin() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '50px auto',
      border: '1px solid #dee2e6',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ textAlign: 'center' }}>Login Administrativo</h1>
      <form style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Usuário:</label>
          <input 
            type="text" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '5px',
              boxSizing: 'border-box'
            }} 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input 
            type="password" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '5px',
              boxSizing: 'border-box'
            }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Entrar
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="/admin" style={{ color: '#3498db', textDecoration: 'none' }}>
          ← Voltar ao Admin
        </a>
      </div>
    </div>
  );
}
