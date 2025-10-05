import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('[NextAuth] Authorize called')
        console.log('[NextAuth] Credentials received:', { 
          email: credentials?.email, 
          hasPassword: !!credentials?.password 
        })
        
        // STRICT ENV CHECK - NO FALLBACKS
        const adminEmail = process.env.ADMIN_EMAIL?.trim()
        const adminPassword = process.env.ADMIN_PASSWORD?.trim()
        
        if (!adminEmail || !adminPassword) {
          console.error('[NextAuth] CRITICAL: ADMIN_EMAIL or ADMIN_PASSWORD not set in environment')
          return null
        }
        
        const email = credentials?.email?.trim()
        const password = credentials?.password?.trim()
        
        console.log('[NextAuth] Environment check:', {
          hasAdminEmail: !!adminEmail,
          hasAdminPassword: !!adminPassword,
          adminEmail: adminEmail,
          inputEmail: email,
          emailMatch: email === adminEmail,
          passwordMatch: password === adminPassword
        })
        
        if (!email || !password) {
          console.log('[NextAuth] Missing email or password in credentials')
          return null
        }
        
        if (email === adminEmail && password === adminPassword) {
          console.log('[NextAuth] Authentication successful!')
          return { id: "admin-1", name: "Admin", email: adminEmail }
        }
        
        console.log('[NextAuth] Authentication failed - credentials mismatch')
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('[NextAuth] JWT callback - adding user to token')
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        console.log('[NextAuth] Session callback - adding token to session')
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  },
  debug: true
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
