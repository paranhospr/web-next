import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { 
    strategy: "jwt", 
    maxAge: 24 * 60 * 60 
  },
  
  // Configuração de páginas customizadas - ESSENCIAL para evitar loop
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  
  // Configuração de cookies seguros para produção
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { 
        email: { label: "Email", type: "email" }, 
        password: { label: "Password", type: "password" } 
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL?.trim();
        const adminPass = process.env.ADMIN_PASSWORD?.trim();
        const email = credentials?.email?.trim();
        const pass = credentials?.password?.trim();
        
        if (!adminEmail || !adminPass) {
          console.error('❌ ADMIN_EMAIL ou ADMIN_PASSWORD não configurados');
          return null;
        }
        
        if (email === adminEmail && pass === adminPass) {
          console.log('✅ Login bem-sucedido para:', email);
          return { 
            id: "admin-1", 
            name: "Admin", 
            email: adminEmail 
          };
        }
        
        console.log('❌ Credenciais inválidas para:', email);
        return null;
      }
    })
  ],
  
  // Callbacks para garantir persistência de dados na sessão
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
