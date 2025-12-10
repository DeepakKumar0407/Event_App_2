import NextAuth,{AuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions ={
    session: {
    strategy: "jwt",
    },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
  async jwt({ token, user }) {
    if (user) token.email = user.email || null;
    return token;
  },
  async session({ session, token }) {
    if (session.user) session.user.email = token.email || null;
    return session;
  },
},

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }