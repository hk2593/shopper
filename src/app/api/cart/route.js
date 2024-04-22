import dbconnect from "@/config/dbconnect";
import Cart from '@/models/cart';
import { NextResponse } from "next/server";

export async function POST(req){
    await dbconnect();
    const {userId,productId}=await req.json();
    const Quantity=1;
    
    const cart=await Cart.findOne({userId});
    const isexisting=cart?.Items.some(item => item.productId.toString() === productId.toString());
    if(isexisting){
        return NextResponse.json({msg:"product already exists"},{status:200});
    }
    const isemptycart=await Cart.findOne({userId});
    if(!isemptycart){
        const create_cart=await Cart.create({
            userId,
            Items:[{
                productId:productId,
                Quantity:Quantity
            }],
           
        })
        return NextResponse.json({create_cart},{status:200});
    }
    
       isemptycart.Items.push({productId,Quantity});
       
       const result=await isemptycart.save();
       return NextResponse.json({result},{status:200});
    
}
