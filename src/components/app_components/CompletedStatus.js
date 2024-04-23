'use client'
import { setAllorders } from '@/store/authSlice';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CompletedStatus = () => {
  let allorders=useSelector((state)=>state.auth.allorders);
  const role=useSelector(state=>state.auth.role);
  const userId=useSelector(state=>state.auth.userId);
   const dispatch=useDispatch();
   const x=allorders.filter((order)=>order.status=="Completed")
   let orders=x.reverse();
   if(role=='Buyer'){
    orders=orders.filter(order=>order.userId==userId);
  }
   console.log(orders.length)
   const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
  };

  const handleCompleted=async({orderId})=>{
      const response=await axios.post(`${process.env.API_URL}/api/orders/update_status`,{orderId});
      if(response.status==200){
        const orders=await axios.get(`${process.env.API_URL}/api/orders`);
        dispatch(setAllorders(orders.data.allorders))
      }
  }

  return (
    <div className='flex mt-6 flex-col gap-3'>
    <div className='flex  justify-center'>
        <h1 className='font-bold text-3xl'>Transactions</h1>
        
    </div>
    {
        orders.length==0 && <div className='mt-20 h-screen flex justify-center '>
        <div className='text-center'>
            <img src='/checklist.png' className='h-40 w-40'></img>
            <h1 className='font-bold text-blue-500 text-3xl'>No Completed Transactions</h1>
        </div>
        </div>
        }
    <div className='flex gap-3 justify-center flex-col'>
        {orders && orders.map((order) => (
            <div className='flex justify-center' key={order._id}>
                <div>
                    <div className='flex flex-wrap flex-row items-center gap-4'>
                        <h1 className="text-lg">Items: {order.Items.length}</h1>
                        <h1 className="text-lg">Date: {formatDate(order.createdAt)}</h1>
                        <h1 className="text-lg">Price: ₹{order.TotalPrice}</h1>
                        <h1 className="text-lg">Status: {order.status}</h1>
                        <Link href={`/invoice/${order._id}`}><button 
                            className="inline-block outline-none cursor-pointer text-white font-semibold rounded-lg px-4 py-2 border-none transition duration-200 ease-in-out bg-gradient-to-r from-red-500 to-purple-600"
                        >
                            Invoice 
                        </button></Link>
                    </div>
                    {/* Add the following line */}
                    <hr className="border-t-2 border-gray-800 my-1" />
                </div>
            </div>
        ))}
    </div>
</div>

  )
}

export default CompletedStatus
