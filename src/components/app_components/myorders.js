'use client'
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux'

const Myorders = () => {
  const userId=useSelector((state)=>state.auth.userId);
  const orders=useSelector((state)=>state.auth.allorders);
  console.log(orders)
  const myorders=orders.filter((order)=>order.userId==userId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
  };

  return (
    <div>
    {myorders.map((order)=><div key={order._id}>
      <div>
    <div className='flex flex-wrap flex-row items-center gap-4'>
        <h1 className="text-lg">Items: {order.Items.length}</h1>
        <h1 className="text-lg">Date: {formatDate(order.createdAt)}</h1>
        <h1 className="text-lg">Price: ₹{order.TotalPrice}</h1>
        {
          order.status=='Completed' && <h1 className="text-lg">Status: <span className='text-lg  text-green-600'>{order.status}</span></h1>
        }
        {
          order.status=='Pending' && <h1 className="text-lg">Status: <span className='text-lg text-red-600'>{order.status}</span></h1>
        }
        <Link href={`/invoice/${order._id}`}>
        <button 
            className="inline-block outline-none cursor-pointer text-white font-semibold rounded-lg px-4 py-2 border-none transition duration-200 ease-in-out bg-gradient-to-r from-red-500 to-purple-600"
        >
            Invoice 
        </button></Link>
    </div>
    </div>
      <hr class="border-t-2 border-gray-800 my-1"></hr>
    </div>)}
    </div>
  )
}

export default Myorders
