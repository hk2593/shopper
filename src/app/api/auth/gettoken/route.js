import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req){
    const token= cookies().get('token');
    return NextResponse.json({token});
}