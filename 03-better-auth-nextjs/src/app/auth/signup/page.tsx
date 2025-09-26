"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React, { ReactEventHandler, useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await authClient.signUp.email(
      {
        name: name,
        email: email,
        password: password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          //showing loading
          console.log("making the request...");
        },
        onSuccess: (ctx) => {
          redirect("/dashboard");
        },
        onError: (ctx) => {
          console.log("err", ctx);
        },
      }
    );
    console.log("data", data);
  };
  const handleGoogleSignUp = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-800 p-4 mx-auto gap-4 w-full max-w-[350px]"
      >
        <input
          className="border p-2 border-gray-600 w-full"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button></button>
        <h1>OR</h1>
        <button onClick={handleGoogleSignUp} className="cursor-pointer">
          SignUp with Google
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
