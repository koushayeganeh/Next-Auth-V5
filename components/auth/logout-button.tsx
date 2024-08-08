"use client";

import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  // const router = useRouter();
  const onClick = () => {
    // this server action cuauses problems with redirecting, so for now it's better to use signout from react
    // logout();
    signOut();
    // router.refresh(); // This forces a refresh of the current route
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
