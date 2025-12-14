'use client'

import Image from "next/image"
import Link from "next/link"
import LoginButton from "./LoginButton"
import { useSession } from "next-auth/react"
import SearchBar from "./searchBar"
import { usePathname, useSearchParams } from "next/navigation"

const Navbar = () => {
  const {data:session} = useSession()
  const pageName = usePathname()
  const searchParams = useSearchParams();
  const email = session?.user?.email
  const userName = session?.user?.name
  const userImage = session?.user?.image
  if(session){
    if (pageName==="/events" || pageName.startsWith("/searchPage")) {
      const query = searchParams.get('query')
      return (
    <div className="flex justify-between bg-linear-to-r from-[#87a1e4] to-[#24335f]">
        <div className="ml-10 mt-5 mb-5">
        <img src="/logo.png" alt="logo"width={180} />
        </div>
        <SearchBar prop={query}/>
        <ul className="flex justify-around gap-4 mr-10">
            <Link href="/" className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]"><li>Home</li></Link>
            <Link href="/events" className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]"><li>Event</li></Link>
            <Link href="/create" className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]"><li>Create</li></Link>
            <Link href="/about" className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]"><li>About</li></Link>
            <LoginButton/>
            <Link href={`/user/${email}`} >
            <Image src={userImage!} alt={userName![0].toUpperCase()} width={50} height={50} className="bg-[#3a4b77] border-2 border-[#010719] rounded-full mt-9 mb-10 hover:bg-[#87a1e4]"/>
            </Link>       
        </ul>
    </div>
      )
    } else {
      return (
    <div className="flex justify-between bg-linear-to-r from-[#87a1e4] to-[#24335f]">
        <div className="ml-10 mt-5 mb-5">
        <img src="/logo.png" alt="logo"width={180} />
        </div>
        <ul className="flex justify-around gap-4 mr-10">
            <Link href="/" className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]"><li>Home</li></Link>
            <Link href="/events" className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]"><li>Event</li></Link>
            <Link href="/create" className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]"><li>Create</li></Link>
            <Link href="/about" className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded mt-9 mb-10 hover:bg-[#87a1e4]"><li>About</li></Link>
            <LoginButton/>
            <Link href={`/user/${email}`} >
            <Image src={userImage!} alt={userName![0].toUpperCase()} width={50} height={50} className="bg-[#3a4b77] border-2 border-[#010719] rounded-full mt-9 mb-10 hover:bg-[#87a1e4]"/>
            </Link>

           
        </ul>
    </div>
      )
    }
  }else{
    return(
    <div className="flex justify-between bg-linear-to-r from-[#87a1e4] to-[#24335f] ">
        <div className="ml-10 mt-5 mb-5">
        <img src="/logo.png" alt="logo"width={180} />
        </div>
        <ul className="flex justify-around gap-4 mr-10">
            <LoginButton/>
        </ul>
    </div>
  )}
}
export default Navbar