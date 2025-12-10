'use client'

import Image from "next/image"
import Link from "next/link"
import LoginButton from "./LoginButton"
import { useSession } from "next-auth/react"

const Navbar = () => {
  const {data:session} = useSession()
  if(session){
  return (
    <div className="flex justify-between bg-linear-to-r from-[#87a1e4] to-[#24335f]">
        <div className="ml-10 mt-5 mb-5">
        <img src="/logo.png" alt="logo"width={180} />
        </div>
        <ul className="flex justify-around gap-4 mr-10">
            <li className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10"><Link href="/">Home</Link></li>
            <li className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10"><Link href="/events">Event</Link></li>
            <li className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10"><Link href="/create">Create</Link></li>
            <li className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10"><Link href="/about">About</Link></li>
            <LoginButton/>
        </ul>
    </div>
  )}else{
    return(
    <div className="flex justify-between bg-linear-to-r from-[#87a1e4] to-[#24335f]">
        <div className="ml-10 mt-5 mb-5">
        <img src="/logo.png" alt="logo"width={180} />
        </div>
        <ul className="flex justify-around gap-4 mr-10">
            <li className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10"><Link href="/">Home</Link></li>
            <LoginButton/>
        </ul>
    </div>
  )}
}
export default Navbar