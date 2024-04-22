import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
   username:{
    type:String,
    required:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true,
   },
   role:{
    type:String,
    enum:["Buyer","Seller"],
   },
   profilepic:{
      type:String,
      default:"defaultprofile.jpg",
   }
},{timestamps:true})

const User=mongoose.models.User || mongoose.model("User",userSchema);
module.exports=User;