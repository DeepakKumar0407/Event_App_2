'use client'
import Navbar from "./components/navbar";
import ConnectDb from "../lib/mongoDb";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export default function Home() {
  const {data:session,status} = useSession()
  return (
    <div>
      <h1 className="text-center">Featured Events</h1>
      <p>{session?.user?.email}</p>
    </div>
  );
}
