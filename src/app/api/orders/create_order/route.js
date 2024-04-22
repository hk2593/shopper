import dbconnect from "@/config/dbconnect";
import Order from '@/models/order'
import { NextResponse } from "next/server";

export async function POST(req){
    await dbconnect();
    const {userId,Items,formData,TotalPrice}=await req.json();
    const state=formData.state;
    const city=formData.city;
    const pincode=formData.pincode;
    const house=formData.house;
    const result=await Order.create({
        userId,
        Items,
        Address:{
            state,
            city,
            pincode,
            house
        },
        TotalPrice,
    })
    return NextResponse.json({result},{status:200});
}