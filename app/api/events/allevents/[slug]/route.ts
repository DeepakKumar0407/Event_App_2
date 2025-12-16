import ConnectDb from "../../../../../lib/mongoDb";
import { NextRequest,NextResponse } from "next/server";
import Event from "@/app/database/events.model";
import { arrayBuffer } from "stream/consumers";
import cloudinary from "@/lib/cloudinary";
import { getToken } from "next-auth/jwt";


export async function POST(req:NextRequest){
    try {
        await ConnectDb()
        const data = await req.formData()
        const image = data.get('image') as File
        const arrayBuffer = await image.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const uploadResult = await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'Events'},(error,result)=>{
                if(error){
                    return reject(error)
                }
                return resolve(result)
            }).end(buffer)
        })
        const event = {
            title:data.get('title'),
            description:data.get('description'),
            number:data.get('number'),
            location:data.get('location'),
            date:data.get("date"),
            time:data.get('time'),
            email:data.get("email"),
            image:(uploadResult as {secure_url:string}).secure_url,
            tags:data.get('tags')?.toString().split(','),
        }
        const createdEvent = await Event.create(event)
        return NextResponse.json({message:"success",event:createdEvent},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Error uploading"},{status:500})
    }
    
}
export async function GET(req:NextRequest,{params}:{params:Promise<{slug:number}>}){
    try {
        await ConnectDb()
        let {slug:page} = await params
        const eventPerPage = 6
        let eventToSkip = page ===1?0:((page-1)*eventPerPage)
        const total = await Event.find().countDocuments()
        const data = await Event.find().sort({createdAt:-1}).skip(eventToSkip).limit(eventPerPage)
        return NextResponse.json({massage:'data fetched',data,total},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Cant get data"},{status:500})
    }

}