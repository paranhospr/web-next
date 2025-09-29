
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Verificação com credenciais de ambiente
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@paranhospr.com.br';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: '1',
            email: adminEmail,
            name: 'Administrador',
            role: 'admin'
          };
        }

        // Credenciais de teste
        if (credentials.email === 'john@doe.com' && credentials.password === 'johndoe123') {
          return {
            id: '2',
            email: 'john@doe.com',
            name: 'John Doe',
            role: 'admin'
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === 'production',
};
