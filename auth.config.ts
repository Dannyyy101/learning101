import type { DefaultSession, NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface JWT{
    id:string
  }
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
  
} satisfies NextAuthConfig;