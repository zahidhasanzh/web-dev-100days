"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React, { ReactEventHandler, useEffect, useState } from "react";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { data: session, isPending, error, refetch } = authClient.useSession();

  // useEffect(() => {
  //   if (session) {
  //     redirect("/dashboard");
  //   }
  // }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: true,
        callbackURL: "/dashboard",
      },
      {}
    );
    console.log("data", data);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-800 p-4 mx-auto gap-4 w-full max-w-[350px]"
      >
        <input
          className="border p-2 border-gray-600"
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 border-gray-600"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="p-2 bg-black cursor-pointer">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SigninPage;
