"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Logout = () => {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/auth/signin");
        },
      },
    });
  };
  return (
    <button onClick={handleLogout} className="cursor-pointer">
      Logout
    </button>
  );
};

export default Logout;
