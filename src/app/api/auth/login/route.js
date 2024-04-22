import dbconnect from '@/config/dbconnect';
import User from '@/models/user'
import { NextResponse } from 'next/server';
import  Jwt  from 'jsonwebtoken';   
import { cookies } from 'next/headers'; 
import bcrypt from 'bcrypt';

export  async function POST(req){
    await dbconnect();
    const {role,email,password}=await req.json();
    
    const user=await User.findOne({email});
    const username=user.username;
    if(!user){
        return NextResponse.json({msg:"user not found"},{status:400});
    } 
    if(user.role!==role){
        return NextResponse.json({msg:"user role not matched"},{status:400});
    }
    const userpassword=user.password;
    
    const ismatched=await bcrypt.compare(password,userpassword); 
   
    if(!ismatched){
        return NextResponse.json({msg:'password is incorrect'},{status:400}); 
    }
    const token=Jwt.sign({userId:user._id,role:role},"harsh");
    cookies().set('token',token,{httpOnly:true});
    const userId=user._id;
    return NextResponse.json({token,username,role,userId},{status:200});
}