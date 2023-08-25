import {prisma} from '@/src/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from 'bcryptjs'
import { login } from '@/src/lib/auth';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login"
  },
  // NOTE: Without this session property, authenticating via credentials will NOT WORK
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const user = await login(
            credentials.email,
            credentials.password
          );
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
      credentials: {
        email: {label: "Email", type: "Email"},
        password: { label: "Password", type: "password" },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  secret: process.env.SECRET,
  callbacks: {
    // Called when checking the session object based on the current session token
    async session({session, token, user}) {
      // console.log("Session Object", session)
      // console.log("Session User", user)
      // console.log("Session Token", token)
      if (token ){
        session.user.id = token.id;
        // session.user.extra = "My Extra";
      }
      return session;
    },
    // Happens on first creation of user token
    async jwt({token, session, user}) {
      // console.log("Token User", user)
      if (user) {
        token.id = user.id;
        token.extra = "Extra";
      }
      return token;
    }
  }
}

export default authOptions