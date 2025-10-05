'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Paranhos PR - Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-600">
            Bem-vindo ao sistema administrativo do Paranhos PR.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold">Estatísticas</h3>
              <p className="mt-2 text-sm text-gray-600">Em desenvolvimento</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold">Conteúdo</h3>
              <p className="mt-2 text-sm text-gray-600">Em desenvolvimento</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold">Configurações</h3>
              <p className="mt-2 text-sm text-gray-600">Em desenvolvimento</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
