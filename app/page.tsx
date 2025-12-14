import EventCard from "./components/EventCard";
import { IEvent } from "./database/events.model";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/events")
  const {data:events} = await res.json()
  return (
    <div className="pb-14">
      <h1 className="text-center mt-5 mb-5">Featured Events</h1>
      <div className="flex justify-baseline gap-4 flex-wrap w-3/4 mx-auto">
      {events.slice(0,6).map((event:IEvent)=>(
        <EventCard key={event.slug} prop={event}/>
      ))}
      </div>
    </div>
  );
}
