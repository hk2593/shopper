import dbconnect from "@/config/dbconnect";
import Cart from '@/models/cart';
import { NextResponse } from "next/server";
export async function POST(req){
    await dbconnect();
    const {userId}=await req.json();
    console.log(userId)
    const cart_items=await Cart.findOne({userId}).populate('Items.productId');
    return NextResponse.json({cart_items},{status:200})

} 