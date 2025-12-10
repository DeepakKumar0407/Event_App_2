import ConnectDb from "../../../lib/mongoDb";
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
        console.log("hello")
        const uploadResult = await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'Events'},(error,result)=>{
                if(error){
                    return reject(error)
                }
                return resolve(result)
            }).end(buffer)
        })
        console.log("hello")
        console.log((uploadResult as {secure_url:string}).secure_url)
        const event = {
            title:data.get('title'),
            description:data.get('description'),
            location:data.get('location'),
            date:data.get("date"),
            time:data.get('time'),
            email:data.get("email"),
            image:(uploadResult as {secure_url:string}).secure_url,
            tags:data.get('tags')?.toString().split(','),
        }
        const createdEvent = await Event.create(event)
        return NextResponse.json({message:"Created",event:createdEvent},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Error uploading"},{status:500})
    }
    
}
export async function GET(req:NextRequest){
    try {
        await ConnectDb()
          const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});
    console.log("JWT token:", token);
        const data = await Event.find().sort({createdAt:-1})
        return NextResponse.json({massage:'data fetched',data},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Cant get data"},{status:500})
    }

}