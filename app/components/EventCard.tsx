import Image from "next/image"
import { IEvent } from "../database/events.model"
import Link from "next/link"

const EventCard = async ({prop}:{prop:IEvent}) => {
  return (
    <div className="bg-[#24335f] border-4 border-[#24335f] rounded mt-10">
        <Link href={`/events/${prop.slug}`} >
        <Image src={prop.image} alt="event image" width={350} height={350} className="mb-4"/>
        <hr/>
        <p className="text-xl mt-2 mb-2">{prop.title}</p>
        <hr/>
        {prop.tags.map((tag)=>(
            <p className="bg-black inline-block p-1 border-2 border-white rounded m-1 mt-2 text-center min-w-12" key={tag}>{tag}</p>
        ))}
        </Link>
        </div>
  )
}
export default EventCard