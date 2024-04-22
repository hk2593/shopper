import dbconnect from "@/config/dbconnect";
import Order from '@/models/order';
import { NextResponse } from "next/server";

export async function GET(req){
    await dbconnect();
    const allorders=await Order.find({}).populate('Items.productId');
    return NextResponse.json({allorders},{status:200});
}