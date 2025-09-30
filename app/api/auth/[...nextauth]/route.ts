import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: { httpOnly:true, sameSite:"lax", path:"/", secure:true }
    },
  },
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPass  = process.env.ADMIN_PASSWORD
        const email = credentials?.email?.trim()
        const pass  = credentials?.password
        if(!email || !pass || !adminEmail || !adminPass) return null
        if(email.toLowerCase() === adminEmail.toLowerCase() && pass === adminPass) {
          return { id:"admin-1", name:"Admin", email:adminEmail }
        }
        return null
      },
    })
  ],
  pages: { signIn: "/admin/login" },
})

export { handler as GET, handler as POST }