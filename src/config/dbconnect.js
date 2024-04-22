import mongoose from "mongoose";
require("dotenv").config
export default async function dbconnect(){

    await mongoose.connect(process.env.MONGODB_URI).then(
        console.log("mongodb connected succefully")
    )
}