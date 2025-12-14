import Event from "@/app/database/events.model";
import ConnectDb from "@/lib/mongoDb";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route"; 
import User from "@/app/database/user.model";

export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    try {
        await ConnectDb()
        const session = await getServerSession({req,...authOptions})
        const {slug:email} = await params 
        const userEvents = await Event.find({email:email}).sort({createdAt:-1})
        const registeredEvents = await User.find({email:email}).sort({createdAt:-1})
        const slugs:string[] = []
        registeredEvents.map((event)=>{
            slugs.push(event.slug)
        })
        const registeredEventsDetails = await Event.find({slug:slugs}).sort({createdAt:-1})
        const data = {userEvents,registeredEventsDetails} 
        return NextResponse.json({message:"Done",data},{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error:"Error",e:error},{status:400})
    }
}
export async function DELETE(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    try {
        await ConnectDb()
        const {slug:id} = await params
        const deleteEvent = await Event.findByIdAndDelete({_id:id})
        return NextResponse.json({message:"deleted event",deleteEvent},{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error:"failed to delete"},{status:400})
    }
  

}
