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
    const {id,
        Product_name,
        Category,
        Price,
        Description,
        image,publicId}=await req.json();
        let cloudImg="";
        if(image!=""){
            const public_id=publicId
            await cloudinary.v2.uploader.destroy(public_id)
            cloudImg = await cloudinary.v2.uploader.upload(image, {
            folder: "EcommerceImg",
        });}
        const product_finded=await Product.findOne({_id:id});
        product_finded.Product_name=Product_name;
        product_finded.Category=Category;
        product_finded.Price=Price;
        product_finded.Description=Description;
        if(cloudImg!=""){
            product_finded.Image.secure_url=cloudImg.secure_url;
            product_finded.Image.publicId=cloudImg.public_id;
        }
        const result=await product_finded.save();
        return NextResponse.json({result},{status:200});
       
} 