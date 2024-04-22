'use client'


import { setCartItems } from '@/store/authSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentSection from './CommentSection';
import Custom_card from './custom_card';

const Product_page_component = ({id}) => {
    const products=useSelector((state)=>state.auth.user_products);
    const userId=useSelector((state)=>state.auth.userId);
    const dispatch=useDispatch();
    
    const product=products.filter((p)=>(p._id===id));
    const productCategory=products.filter((p)=>(p._id===id))
    const productId=product[0]?._id;
    let p=products.filter((product)=>product.Category==productCategory[0]?.Category && product._id!=productCategory[0]._id)
    if(p.length>6){
      p=p.slice(0,6);
    }
    const [comments,setcomments]=useState([]);
    
    useEffect(()=>{
      const  fetchComments=async()=>{
        const comments=await axios.post(`${process.env.API_URL}/api/review/getReview`,{productId});
        setcomments(comments.data.reviews.reverse());
      } 
      fetchComments(); 
    },[])
    
    const AddtoCart=async()=>{
      console.log('yeh aaya mai idhar')
        const result=await axios.post(`${process.env.API_URL}/api/cart`,{userId,productId})
        console.log(result)
        const cart_items=await axios.post(`${process.env.API_URL}/api/cart/user_cart`,{userId})
        dispatch(setCartItems(cart_items.data.cart_items?.Items))
    }
    
  return (
    <div className=' w-720px'>
    <div className='flex flex-col gap-6'>
    <div className='flex flex-wrap items-center mt-10 justify-center gap-4 overflow-hidden'>
      <div className=' drop-shadow-2xl border-slate-950	'>
         <img src={product[0]?.Image.secure_url} className='h-60'></img>
      </div>
      <div className='flex w-60 flex-col gap-4'>
        <h1 className='font-bold text-3xl'>{product[0]?.Product_name}</h1>
        <h1><span className='font-bold text-xl'>Price</span> ₹{product[0]?.Price}</h1>
        
        <div className=''>
            <h1 className=' font-semibold'>Description</h1>
            <div className='w-60'>
               {product[0]?.Description}
            </div>
        </div>
        <div className='flex gap-4 flex-wrap'>
       
       <button onClick={AddtoCart}  className="inline-block outline-none cursor-pointer text-black font-semibold rounded-lg px-4 py-2 border border-solid border-black transition duration-200 ease-in-out bg-white hover:border hover:border-black hover:bg-gray-200">
        Add to Cart
       </button>
       </div>
      </div>
    </div>
    <div className='flex justify-center'>
  <div className='flex flex-col justify-center'>
    <h1 className='font-bold text-3xl'>Similar Products</h1>
    <Custom_card products={p} />
  </div>
  
   </div>
    <div className='flex justify-center'>
      <CommentSection productId={id} comments={comments} setcomments={setcomments}></CommentSection>
    </div>
    </div>
    </div>
  )
}

export default Product_page_component
