import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        
        // Always allow health checks (for monitoring)
        if (pathname.startsWith('/admin/health')) {
          return true
        }
        
        // Always allow login page
        if (pathname.startsWith('/admin/login')) {
          return true
        }
        
        // Allow mock API routes (they're part of the app, not protected resources)
        if (pathname.startsWith('/api/mock')) {
          return true
        }
        
        // Allow NextAuth API routes (prevent redirect loops)
        if (pathname.startsWith('/api/auth')) {
          return true
        }
        
        // All other /admin routes require authentication
        if (pathname.startsWith('/admin')) {
          return !!token
        }
        
        // Allow everything else
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/admin/:path*', '/api/mock/:path*']
}
