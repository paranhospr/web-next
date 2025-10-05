import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

// Proteger apenas rotas /admin/* EXCETO /admin/login e /admin/health
export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/settings/:path*',
    '/admin/users/:path*',
    '/admin/content/:path*',
  ]
}
