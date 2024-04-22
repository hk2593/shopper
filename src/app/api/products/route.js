import dbconnect from '@/config/dbconnect';
import Product from '@/models/product';
import { NextResponse } from 'next/server';


import  cloudinary from 'cloudinary';
cloudinary.config({
    secure:'true', 
    cloud_name:'ddxumqy6i',
    api_key:'516221842828815',
    api_secret:'hxdanQY2xcHe6UgVy21vz9D8x-w'
})
export async function POST(req){
    await dbconnect();
    const {SellerId,
        Product_name,
        Category,
        Price,
        Description,
        image}=await req.json();
        const cloudImg = await cloudinary.v2.uploader.upload(image, {
            folder: "EcommerceImg",
        });
        console.log(cloudImg.secure_url,cloudImg.publicId)
        const response=await Product.create({
            SellerId,
            Product_name,
            Category,
            Price,
            Description,
            Image:{
                
                    secure_url:cloudImg.secure_url,
                    publicId:cloudImg.public_id

            }
        })
    return NextResponse.json({response});
} 
export async function GET(req){
    await dbconnect();
    const data=await Product.find({});
    return NextResponse.json({data},{status:200});
}
  