import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
  SellerId:{
    type:String,
    required:true,
  },
   Product_name:{
    type:String,
    required:true,
   },
   Category:{
    type:String,
    required:true,
   },
   Price:{
    type:Number,
    required:true,
   },
   Description:{
    type:String,
    required:true,
   },
   Image:{
    secure_url:{
      type:String,
      required:true,
    },
    publicId:{type:String,
    required:true,}
   },
   Orders:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   }]

},{timestamps:true})

const Product=mongoose.models.Product || mongoose.model("Product",productSchema);
module.exports=Product;