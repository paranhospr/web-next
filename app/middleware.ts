import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Allow health check without authentication
    if (req.nextUrl.pathname.startsWith('/admin/health')) {
      return NextResponse.next();
    }
    
    // Continue with authentication for other admin routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow health check without token
        if (req.nextUrl.pathname.startsWith('/admin/health')) {
          return true;
        }
        // Require token for other admin routes
        return !!token;
      }
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"]
};
