
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  trustHost: true,
  useSecureCookies: true,
  pages: { 
    signIn: '/admin/login',
    error: '/admin/login'
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL?.trim()
        const adminPassword = process.env.ADMIN_PASSWORD?.trim()
        const email = credentials?.email?.trim()
        const password = credentials?.password?.trim()
        
        if (!email || !password || !adminEmail || !adminPassword) return null
        
        if (email === adminEmail && password === adminPassword) {
          return { id: "admin-1", name: "Admin", email: adminEmail }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
