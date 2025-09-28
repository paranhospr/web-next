export const dynamic = 'force-dynamic';
export default function AdminHealth(){
  return (
    <main style={{fontFamily:'system-ui', padding: 24}}>
      <h1>/admin/health</h1>
      <p>OK - página carregou do build atual.</p>
      <p>timestamp: {new Date().toISOString()}</p>
    </main>
  );
}
