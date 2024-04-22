import dbconnect from "@/config/dbconnect";
import Product from "@/models/product"
import { NextResponse } from "next/server";
export async function POST(req){
    await dbconnect();
    const {data}=await req.json();
    const regex = new RegExp(data, "i");
    const products= await Product.find({Product_name:regex});

    return NextResponse.json({products})

}