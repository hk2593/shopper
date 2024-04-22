
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function POST(req){
    cookies().set('token','',{httpOnly:true,expires:new Date(0)});
    return NextResponse.json({msg:'user logged out successfully'},{status:200});
}