import dbconnect from "@/config/dbconnect";
import Cart from '@/models/cart';
import { NextResponse } from "next/server";

export async function POST(req){
    await dbconnect();
    const {userId}=await req.json();
    const usercart=await Cart.findOne({userId});
  
    usercart.Items=[];
    const result =await usercart.save();
    return NextResponse.json({msg:"cart items deleted",result},{status:200});
}