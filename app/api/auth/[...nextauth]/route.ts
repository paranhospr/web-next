import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  strategy: 'jwt',
  trustHost: true,
  useSecureCookies: true,
  pages: { signIn: '/admin/login' },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        
        if (!credentials?.email || !credentials?.password) return null
        if (!adminEmail || !adminPassword) return null
        
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: "admin-1",
            name: "Admin",
            email: adminEmail
          }
        }
        return null
      }
    })
  ]
})

export { handler as GET, handler as POST }