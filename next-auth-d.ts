//This file is for declaring the type for user roll (or any other future cutome fields) used in auth.js

import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  //customFiled: String
  role: UserRole;
  isTwoFactorEnabled: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
