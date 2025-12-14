"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
        <button className="cursor-pointer bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]" onClick={() => signOut()}><li>
        Logout</li></button>
    );
  }

  return <button className="cursor-pointer bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]" onClick={() => signIn("github")}>
    <li>Login</li></button>
}
