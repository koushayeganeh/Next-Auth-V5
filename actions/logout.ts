"use server";

import { signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
import { DEFAULT_LOGOUT_REDIRECT } from "@/routes";

export const logout = async () => {
  await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT });
};
