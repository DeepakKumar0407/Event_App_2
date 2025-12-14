import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import EventCard from "@/app/components/EventCard"
import { IEvent } from "@/app/database/events.model"
import ErrorPage from "@/app/error/page"
import { getServerSession } from "next-auth" 
import Image from "next/image"
import { headers } from "next/headers"
import ProfileStateHandler from "@/app/components/profileStateHandler"
import Link from "next/link"

const UserProfile = async ({params}:{params:Promise<{slug:string}>}) => {
    const {slug} = await params
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const name = session?.user?.name
    const image = session?.user?.image
    const userName = session?.user?.githubUsername
    const h = await headers();
    const res = await fetch(`http://localhost:3000/api/user/${slug}`,{
                method: "GET",
                headers:Object.fromEntries(h.entries()),
                })
    const {data:{userEvents,registeredEventsDetails}} = await res.json()
    if(!session){
    return(
    <ErrorPage/>
    )
  }else if(session&&encodeURIComponent(email as string) === slug){
  return (
    <div>
    <h1 className="text-center mt-5">User Profile</h1>
    <div className="flex justify-between w-7/8 mx-auto pb-15 gap-2">
    <div className="bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded-2xl mt-10 p-3 flex flex-col gap-3 h-110">
        <Image src={image!} alt="user image" width={300} height={300}/>
        <h2 className="text-xl">{name}</h2>
        <p>&#9993; {email}</p>
        <Link href={`https://github.com/${userName}`}>&#128279; To github profile</Link>
    </div>
    <div className="bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded-2xl mt-10 w-3/5 mx-auto p-2">
    <ProfileStateHandler props={{userEvents,registeredEventsDetails}}/>
    </div>
    </div>
    </div>
  )}else if(session&&session.user.email !== slug){
    return(
    <div>
      <h2 className="text-2xl m-5">More from {decodeURIComponent(slug)}: </h2>
    <div className="gap-8 bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded-2xl mt-10 w-5/10 mx-auto p-2">
      <ProfileStateHandler props={{userEvents,registeredEventsDetails}}/>
    </div>
    </div>
    )
  }
}
export default UserProfile