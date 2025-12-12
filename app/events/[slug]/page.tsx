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
 const {event:{title,description,location,tags,image,date,time,email}}= await res.json()
 if (!session) {
    return (<ErrorPage/>)
 } else {
  return (
    <div>
    <h1 className="text-center mt-5">Event Details</h1>
    <div className="md:flex justify-between w-7/8 mx-auto pb-15 "> 
    <div className="bg-[#24335f] border-4 border-[#24335f] rounded-2xl mt-10 flex flex-col gap-4">
      <Image src={image} alt="image" width={900} height={900}/>
      <hr/>
      <h1>{title}</h1>
      <hr/>
      <p className="text-2xl">{description}</p>
      <div className="flex gap-1 justify-baseline">
      {tags.map((tag:string)=>(
            <p className="bg-black p-1 border-2 border-white rounded m-1 mt-2 text-center min-w-12" key={tag}>{tag}</p>
        ))}
      </div>
      <p>&#128205; {location}</p>
      <p>&#128197; {date}: &#128336; {time}</p>
      <Link href={`http://localhost:3000/user/${email}`} className="text-teal-300"><p>Posted by: {email}</p></Link>
    </div>
    <div className="bg-[#24335f] border-4 border-[#24335f] rounded-2xl mt-10 max-h-60">
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