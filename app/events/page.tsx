import EventCard from "../components/EventCard"; 
import { IEvent } from "../database/events.model"; 
import { getServerSession } from "next-auth/next";
import ErrorPage from "../error/page";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Pagination from "../components/pagination";
export default async function Events({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const session = await getServerSession(authOptions)
  const {page:currentPage} = await searchParams
  const res = await fetch(`http://localhost:3000/api/events/allevents/${currentPage}`)
  const {data:events,total} = await res.json()
  if(!session){
    return(
    <ErrorPage/>
    )
  }else{
  return (
    <div className="pb-14">
      <h1 className="text-center mt-5 mb-5">All Events</h1>
      <div className="flex justify-baseline gap-4 flex-wrap w-3/4 mx-auto">
      {events.map((event:IEvent)=>(
        <EventCard key={event.slug} prop={event}/>
      ))}
      </div>
      <Pagination prop={total}/>
    </div>
  );}
}