import dbconnect from '@/config/dbconnect';
import User from '@/models/user'
import Cart from '@/models/cart'
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
export  async function POST(req){
    await dbconnect();
    const {email,password,username,role} =await req.json();
    const hashedpassword=await bcrypt.hash(password,10);
    
    const created=await User.create({ 
        username,email,password:hashedpassword,role
    })
    return NextResponse.json({created},{status:200});


} 