
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Login Admin</h1>
      <form className="flex flex-col gap-2 w-64">
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Senha" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
