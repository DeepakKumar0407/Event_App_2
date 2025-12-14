import EventCard from "../components/EventCard"; 
import { IEvent } from "../database/events.model"; 
import { getServerSession } from "next-auth/next";
import ErrorPage from "../error/page";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SearchBar from "../components/searchBar";
export default async function Events(props:{searchParams?:Promise<{query?:string}>}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query
  const session = await getServerSession(authOptions)
  const res = await fetch("http://localhost:3000/api/events")
  const {data:events} = await res.json()
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
    </div>
  );}
}