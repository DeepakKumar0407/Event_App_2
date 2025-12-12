import Event from "@/app/database/events.model";
import ConnectDb from "@/lib/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    try{
        await ConnectDb()
        const {slug} = await params
        const event = await Event.findOne({slug:slug})
        return NextResponse.json({message:"Hello",event})
    }catch(e){
        console.log(e)
        return NextResponse.json({error:'Error',e})
    }
}