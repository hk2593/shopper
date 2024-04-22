import dbconnect from "@/config/dbconnect";
import Cart from '@/models/cart';
import { NextResponse } from "next/server";

export async function POST(req){
    await dbconnect();
    const {userId,cart_id}=await req.json();
    const usercart=await Cart.findOne({userId});
  
    usercart.Items=usercart.Items.filter((item)=>item._id!=cart_id);
    await usercart.save();
    return NextResponse.json({usercart},{status:200});
}