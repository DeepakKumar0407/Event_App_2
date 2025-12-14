"use client"

import { useState } from "react"
import { IEvent } from "../database/events.model"
import EventCard from "./EventCard"

const ProfileStateHandler = ({props}:{props:any}) => {
    const {userEvents,registeredEventsDetails} = props
    const [flag,setFlag] = useState(true)
        if (flag) {
              return (
                    <div>
                    <div className="flex justify-baseline m-0 p-0 gap-4 w-full mb-5">
                        <button onClick={()=>setFlag(true)} className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded  hover:bg-[#87a1e4] cursor-pointer">Posted</button>
                        <button onClick={()=>setFlag(false)} className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded hover:bg-[#87a1e4] cursor-pointer">Registered</button>
                    </div>
                    <p className="mb-2">Posted Events</p>
                    <div className="flex justify-around gap-8 flex-wrap ">
                        {userEvents.map((userEvent:IEvent)=>(
                        <EventCard key={userEvent.slug} prop={userEvent}/>
                    ))}
                    </div>
                    </div>
                )
        } else if(!flag) {
              return (
                    <div>
                    <div className="flex justify-baseline m-0 p-0 gap-4 w-full mb-5">
                        <button onClick={()=>setFlag(true)} className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded  hover:bg-[#87a1e4]">Posted</button>
                        <button onClick={()=>setFlag(false)} className="bg-[#3a4b77] p-3 border-2 border-[#010719] rounded hover:bg-[#87a1e4]">Registered</button>
                    </div>
                    <p className="mb-2">Registered Events</p>
                    <div className="flex justify-around  gap-4 flex-wrap ">
                        {registeredEventsDetails.map((userEvent:IEvent)=>(
                        <EventCard key={userEvent.slug} prop={userEvent}/>
                    ))}
                    </div>
                    </div>
                )
        }

}
export default ProfileStateHandler