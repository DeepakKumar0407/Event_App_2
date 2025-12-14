import NextAuth,{AuthOptions} from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"

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
  async jwt({ token, user,profile }) {
    if (user) token.email = user.email || null;
    if(profile){
    const githubProfile = profile as GithubProfile
    token.githubUsername = githubProfile.login
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user){ session.user.email = token.email || null;
    session.user.githubUsername = token.githubUsername as string
    }
    return session;
  },
},

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }