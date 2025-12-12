import User from "@/app/database/user.model";
import ConnectDb from "@/lib/mongoDb";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
    await ConnectDb()
    const user = await req.json()
    const createUser = await User.create(user)
    return NextResponse.json({message:"success",createUser},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'Failed to register',e:error})
    }
}