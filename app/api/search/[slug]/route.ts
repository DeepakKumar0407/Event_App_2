import Event from "@/app/database/events.model";
import ConnectDb from "@/lib/mongoDb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    await ConnectDb()
    const {slug} = await params
    const searchTerm = decodeURIComponent(slug).replace(/[^a-zA-Z0-9\s]/g, " ").trim().split(/\s+/).join('|');
    const fields = ['title','description','location',"tags","email","number"]
    const query = {$or: fields.map(field=>(({[field]: { $regex: searchTerm, $options: "i" }})))}
    console.log(query,'query')
    const data = await Event.find(query).sort({createdAt:-1})
    console.log(data,"data")
    return NextResponse.json({message:"success",data},{status:200})
}