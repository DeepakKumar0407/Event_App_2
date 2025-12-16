import Event from "@/app/database/events.model";
import ConnectDb from "@/lib/mongoDb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string[]}>}){
   try {
        await ConnectDb()
        const {slug} = await params
        const search = slug[0]
        const page = Number(slug[1])
        const eventPerPage = 6
        let eventToSkip = page ===1?0:((page-1)*eventPerPage)
        const searchTerm = decodeURIComponent(search).replace(/[^a-zA-Z0-9\s]/g, " ").trim().split(/\s+/).join('|');
        const fields = ['title','description','location',"tags"]
        const query = {$or: fields.map(field=>(({[field]: { $regex: searchTerm, $options: "i" }})))}
        const total = await Event.find(query).countDocuments()
        const data = await Event.find(query).sort({createdAt:-1}).skip(eventToSkip).limit(eventPerPage)
        return NextResponse.json({message:"success",data,total},{status:200})
   } catch (error) {
     console.log(error)
     return NextResponse.json({error:"Something went wrong"},{status:400})
   }
}