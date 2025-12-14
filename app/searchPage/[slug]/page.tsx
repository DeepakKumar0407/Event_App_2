import EventCard from "@/app/components/EventCard"; 
import { IEvent } from "@/app/database/events.model"; 
import { getServerSession } from "next-auth/next";
import ErrorPage from "@/app/error/page"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
export default async function SearchPage({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params
  console.log(slug,"hi")
  const session = await getServerSession(authOptions)
  const res = await fetch(`http://localhost:3000/api/search/${slug}`)
  const {data:events} = await res.json()
  if(!session){
    return(
    <ErrorPage/>
    )
  }else{
  return (
    <div className="pb-14">
      <h1 className="text-center mt-5 mb-5">Search results</h1>
      <div className="flex justify-baseline gap-4 flex-wrap w-3/4 mx-auto">
      {events.map((event:IEvent)=>(
        <EventCard key={event.slug} prop={event}/>
      ))}
      </div>
    </div>
  );}
}