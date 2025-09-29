import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // Critical for Render/Cloudflare deployment
  useSecureCookies: true, // Force secure cookies in production
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email === process.env.ADMIN_EMAIL && 
            credentials?.password === process.env.ADMIN_PASSWORD) {
          return {
            id: '1',
            email: credentials.email,
            name: 'Admin'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Prevent redirect loops
      if (url.includes('/admin/login') && url.includes('/api/auth/signin')) {
        return `${baseUrl}/admin/dashboard`
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  }
})

export { handler as GET, handler as POST }