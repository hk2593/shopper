import dbconnect from '@/config/dbconnect';
import Product from '@/models/product'
import { NextResponse } from 'next/server';
export async function POST(req){
    
       await dbconnect();
       
       const {id}=await req.json();
       const products=await Product.find({SellerId:id});
       return NextResponse.json({products},{status:200});
}  