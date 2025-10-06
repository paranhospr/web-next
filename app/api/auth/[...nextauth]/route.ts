
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24*60*60 },
  providers: [
    Credentials({
      name:"Credentials",
      credentials:{ email:{}, password:{} },
      async authorize(c){
        const adminEmail = process.env.ADMIN_EMAIL?.trim();
        const adminPass  = process.env.ADMIN_PASSWORD?.trim();
        const email = c?.email?.trim(); const pass = c?.password?.trim();
        if(!adminEmail || !adminPass) return null;
        return (email===adminEmail && pass===adminPass)
          ? { id:"admin-1", name:"Admin", email:adminEmail }
          : null;
      }
    })
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
