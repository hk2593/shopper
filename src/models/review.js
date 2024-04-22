import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
   
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    review:{
        type:String,
        required:true,
    }
    

},{timestamps:true})

const Review=mongoose.models.Review || mongoose.model("Review",reviewSchema);
module.exports=Review;