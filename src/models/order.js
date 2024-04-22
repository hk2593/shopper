import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
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
        },
        Price:{
            type:Number,
            required:true,
        }
    }],
    Address:{
       state:{
        type:String,
        required:true,
       },
       city:{
        type:String,
        required:true,
       },
       pincode:{
        type:Number,
        required:true,
       },
       house:{
        type:String,
        required:true,
       }
    },
    TotalPrice:{
        type:Number,
        default:0,
        required:true,
    },
    status:{
        type:String,
        enum:["Completed","Pending"], 
        default:"Pending"
    },
   
},{timestamps:true});

const Order=mongoose.models.Order || mongoose.model("Order",orderSchema);
module.exports=Order;