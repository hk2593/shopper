import dbconnect from "@/config/dbconnect";
import Review from '@/models/review'
import { NextResponse } from "next/server";

export async function POST(req){
     
    await dbconnect();
    const {userId,productId,review}=await req.json();
    
    const result =await Review.create({review,productId,userId});
    return NextResponse.json({result},{status:200});
}