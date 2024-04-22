import dbconnect from "@/config/dbconnect";
import Cart from '@/models/cart';
import { NextResponse } from "next/server";
export async function POST(req){
    await dbconnect();
    const {userId,cart_id,Quantity}=await req.json();
    
    const findcart=await Cart.findOne({userId});
    const items=findcart.Items
    let result=findcart
    for(let i=0;i<items.length;i++){
        
        if(items[i]._id==cart_id){
            items[i].Quantity=Quantity;
            result=await findcart.save();
            break;
        }
    }
 
    return NextResponse.json({result});

} 