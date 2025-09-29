import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow /admin/health without authentication
        if (req.nextUrl.pathname.startsWith('/admin/health')) {
          return true
        }
        // Require authentication for all other /admin routes
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ['/admin/:path*']
}