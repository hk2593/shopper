import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
   
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    Items:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        Quantity:{
            type:Number,
            required:true,
        }
    }],
    TotalPrice:{
        type:Number,
        default:0,
    }

},{timestamps:true})

const Cart=mongoose.models.Cart || mongoose.model("Cart",cartSchema);
module.exports=Cart;