'use client'
import Image from "next/image"
import { IEvent } from "../database/events.model"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import DeleteEventHandeler from "./deleteEventHandeler"

const EventCard = ({prop}:{prop:IEvent}) => {
  const {data:session} = useSession()
  const pageName = usePathname()
  const userEmail = session?.user?.email 
  if((prop.email === userEmail) && pageName === `/user/${prop.email}`){
      return (
    <div className="bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded mb-10 shadow-none hover:shadow-[10px_20px_40px_rgba(0,0,0,0.80)] transition-shadow">
        <Link href={`/events/${prop.slug}`} >
        <Image src={prop.image} alt="event image" width={350} height={350} className="mb-4"/>
        <hr/>
        <p className="text-xl m-2 truncate" title={prop.title}>{prop.title}</p>
        <hr/>
        {prop.tags.map((tag)=>(
            <p className="bg-black inline-block p-1 border-2 border-white rounded m-1 mt-2 text-center min-w-12 truncate max-w-40" title={tag} key={tag}>{tag}</p>
        ))}
        </Link>
        <DeleteEventHandeler prop={prop}/>
        </div>
  )
  }else{
      return (
        <div className="bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded mb-10 shadow-none hover:shadow-[10px_20px_40px_rgba(0,0,0,0.80)] transition-shadow">
        <Link href={`/events/${prop.slug}`} >
        <Image src={prop.image} alt="event image" width={350} height={350} className="mb-4"/>
        <hr/>
        <p className="text-xl m-2 truncate" title={prop.title}>{prop.title}</p>
        <hr/>
        {prop.tags.map((tag)=>(
            <p className="bg-black inline-block p-1 border-2 border-white rounded m-1 mt-2 text-center min-w-12 max-w-40 truncate" title={tag} key={tag}>{tag}</p>
        ))}
        </Link>
        </div>
  )
  }

}
export default EventCard