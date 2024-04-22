'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { setAllorders, setCartItems, setLogin, setProducts } from '@/store/authSlice';
import {  useDispatch  } from 'react-redux';
import Link from 'next/link';
const LoginPage = () => {
  const dispatch=useDispatch();
  const [details, setDetails] = useState({
    role: "", 
    email: "", 
    password: "",
  });  
  const router=useRouter(); 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const response=await axios.post(`${process.env.API_URL}/api/auth/login`,
      details,
    ) 
    
    const userId=response.data.userId;
    if(response.data.token){
    const getallproducts=async()=>{
    
    const products=await axios.get(`${process.env.API_URL}/api/products`)
    const cart_items=await axios.post(`${process.env.API_URL}/api/cart/user_cart`,{userId})
    const orders=await axios.get(`${process.env.API_URL}/api/orders`)
    
     if(!orders.data.allorders){
      dispatch(setAllorders([]))
     }
     if(orders.data.allorders){
      dispatch(setAllorders(orders.data.allorders))
     }
     dispatch(setProducts(products.data.data))
     if(!cart_items.data.cart_items){
      dispatch(setCartItems([]))
     }
     else{
     dispatch(setCartItems(cart_items.data.cart_items.Items)) }
    
    }
    getallproducts();
    }
    dispatch(setLogin({
      user:response.data.username,
      token:response.data.token,
      role:response.data.role,
      userId:response.data.userId
    }))
    
     router.push('/');     
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
              value={details.email} 
              onChange={(e) => setDetails(prevState => ({ ...prevState, email: e.target.value }))}
              id="email" name="email" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
              value={details.password} 
              onChange={(e) => setDetails(prevState => ({ ...prevState, password: e.target.value }))} 
              id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
            </div>
            <div>
              <label htmlFor="role" className="sr-only">Role</label>
              <select
              value={details.role} 
              onChange={(e) => setDetails(prevState => ({ ...prevState, role: e.target.value }))}
              id="role" name="role"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                <option value="">Select Role</option>
                <option value="Buyer">Buyer</option> 
                <option value="Seller">Seller</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/lock-closed */}
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  <path d="M5 10V8a5 5 0 1110 0v2a2 2 0 011.999 1.999L17 14c0 1.103-.897 2-2 2H5c-1.103 0-2-.897-2-2l.001-2A2 2 0 015 10zm7-2a1 1 0 10-2 0v2a1 1 0 102 0V8z"/>
                </svg>
              </span>
              Login
            </button>
            <p className='mt-4'>Not Registered? <Link href={'/signup'}><span className='text-blue-400'>Signup</span></Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
