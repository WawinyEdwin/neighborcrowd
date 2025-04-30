import {
  createUserProfile,
  getUserProfileByEmail,
} from "@/app/lib/services/userprofiles";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const existingUser = await getUserProfileByEmail(user.email);

      if (!existingUser) {
        const { error } = await createUserProfile({
          email: user.email!,
          name: user.name!,
          avatar_url: user.image!,
        });

        if (error) {
          console.error("Error creating user profile:", error);
          return false;
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        const data = await getUserProfileByEmail(session.user.email);

        if (data) {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.sub,
              profile: data,
            },
          };
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
