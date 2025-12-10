"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <li className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10">
        <button onClick={() => signOut()}>Logout</button>
      </li>
    );
  }

  return <li className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10"><button onClick={() => signIn("github")}>Login</button></li>
}
