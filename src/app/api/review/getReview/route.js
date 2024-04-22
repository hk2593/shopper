import dbconnect from "@/config/dbconnect";
import Review from '@/models/review'
import { NextResponse } from "next/server";

export async function POST(req){
    await dbconnect();
    const {productId}=await req.json();
    
    const reviews=await Review.find({productId}).populate('userId').exec(); 
     
    return NextResponse.json({reviews},{status:200});
}