import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { string } from "zod";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    // this signIn page is for redirecting the user after login error (such as trying to log in using a provider with an account utilizing an already existing email)
    signIn: "/auth/login",
    // this error page is for any other errors that may accure during the login process besides wrong credentials or using the same email etc.
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   if (!user.id) {
    //     return false; // or handle the error appropriately
    //   }
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },

    async signIn({ user, account }) {
      if (!user.id) {
        return false; // or handle the error appropriately
      }

      // allow OAuth without emial verification
      if (account?.provider !== "credentials") {
        return true;
      }

      // prevent signin without email verification
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      // TODO: add 2fa check

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.sub && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
