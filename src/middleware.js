import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'; 

export function middleware(request) {
  const token=cookies().get('token');
  
  if(!token){
  return NextResponse.redirect(new URL('/', request.url))}
  else{
    NextResponse.next();
  }
}
 

export const config = {
  matcher: ['/profile/:path*','/api/cart/:path*']
}