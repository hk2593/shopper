import dbconnect from "@/config/dbconnect";
import Order from "@/models/order";
import { NextResponse } from "next/server";


export async function POST(req){
    await dbconnect();
    const {orderId}=await req.json();
    const order=await Order.findOne({_id:orderId});
    order.status="Completed";
    const result=await order.save();
    return NextResponse.json({result},{status:200});
}