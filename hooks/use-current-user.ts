import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Optionally handle loading state
    return null;
  }

  if (status === "authenticated") {
    return session.user;
  }

  return null; // or handle unauthenticated state
};
