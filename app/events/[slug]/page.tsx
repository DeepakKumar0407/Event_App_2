import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserForm from "@/app/components/userForm"
import { IEvent } from "@/app/database/events.model"
import ErrorPage from "@/app/error/page"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"

const EventDetails = async ({params}:{params:Promise<{slug:string}>}) => {
 const {slug} = await params
 const session = await getServerSession(authOptions)
 const res = await fetch(`http://localhost:3000/api/events/${slug}`)
 const {event:{title,description,location,tags,image,date,time,email,number}}= await res.json()
 const userName = session?.user?.name
 if (!session) {
    return (<ErrorPage/>)
 } else {
  return (
    <div>
    <h1 className="text-center mt-5">Event Details</h1>
    <div className="md:flex justify-between w-7/8 mx-auto pb-15 "> 
    <div className="bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded-2xl mt-10 flex flex-col gap-4 w-2/3 p-2">
      <Image src={image} alt="image" width={900} height={900}/>
      <hr/>
      <p className="text-3xl ml-2 w-full truncate" title={title}>{title}</p>
      <hr/>
      <p className=" ml-2 w-full overflow-hidden " title={description}>{description}</p>
      <div className="flex gap-1 justify-baseline ml-2">
      {tags.map((tag:string)=>(
            <p className="bg-black p-1 border-2 border-white rounded m-1 mt-2 text-center min-w-12 max-w-40 truncate" title={tag} key={tag}>{tag}</p>
        ))}
      </div>
      <p className="ml-2 overflow-hidden" title={location}>&#128205; {location}</p>
      <p className="ml-2">&#128197; {date}: &#128336; {time}</p>
      <p className="ml-2">&#128241; {number}</p>
      <Link href={`http://localhost:3000/user/${email}`} className="text-teal-950 ml-2 mb-2 overflow-hidden" title={email}><p>&#128279; Posted by: {email}</p></Link>
    </div>
    <div className="bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded-2xl mt-10 max-h-70">
      <h2 className="text-3xl p-2 mt-2">Book a spot</h2>
      <hr className="mb-5"/>
      <UserForm props={slug}/>
    </div>
    </div>
    </div>
  )
 }
}
export default EventDetails