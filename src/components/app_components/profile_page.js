'use client'
import Product_upload from '@/components/app_components/Product_upload'
import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'
import axios from 'axios'
import Myorders from '@/components/app_components/myorders'
import Link from 'next/link'
import Edit_product from '@/components/app_components/Edit_product'

const Profile = () => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [products,setproducts]=useState([]);
  const userId=useSelector((state)=>state.auth.userId);
  const [editbtn,seteditbtn]=useState(false);
  const [productid,setproductid]=useState("");
  const state_products=useSelector((state)=>state.auth.user_products);
  useEffect(() => {
    const filteredProducts = state_products.filter(product => product.SellerId === userId);
    setproducts(filteredProducts);
    
}, [state_products]);

  const formRef = useRef(null);
  const role=useSelector((state)=>state.auth.role);
  const name=useSelector((state)=>state.auth.user);
  const toggleButton = () => {
    setButtonVisible(!buttonVisible);
  };
 
  console.log(products)
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setButtonVisible(false);
    }
  };
  return (
    <div className='flex flex-row gap-6 items-center justify-center '>
      <div className='flex mt-10 justify-center gap-10'>
      <div class="w-52 mx-auto">

        <div class="bg-white rounded-full overflow-hidden shadow-lg">
            <img class="w-full" src={'/defaultprofile.jpg'} alt="Image"/>
        </div>
        <div class="mt-4 text-center">
            <div class="text-xl font-semibold">{name}</div>
            <div class="text-gray-600">{role}</div>
            {role=='Seller' && <button 
            onClick={toggleButton} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
            Add Product
            </button>}
      {buttonVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleClickOutside}
        >
          <div ref={formRef}>
            <Product_upload />
          </div>
        </div>
      )}
        </div>
      </div>
      {
        role=='Seller' && <div className='flex flex-col gap-4'>
        <h1 className='font-bold text-3xl'>My Products</h1> 
        {products.map((product)=>(<div key={product._id}>
          <div className='flex flex-wrap flex-row gap-4 items-center'>
    <div className='rounded-full overflow-hidden h-16 w-16 bg-white'>
        <img className='object-contain h-full w-full' src={product.Image.secure_url} alt="Product Image" />
    </div>
    <div className="flex flex-col flex-grow">
        <Link href={product._id}><h1 className='text-sm font-semibold truncate' style={{ maxWidth: '150px' }}>{product.Product_name}</h1></Link>
        {/* Additional product information can be added here */}
        <p className="text-sm">Price: <span className=' text-green-500'>₹{product.Price}</span></p>
    </div>
    <button onClick={()=>(seteditbtn(!editbtn),setproductid(product._id))}
        className="inline-block outline-none cursor-pointer text-white font-semibold rounded-lg px-3 py-1.5 border-none transition duration-200 ease-in-out bg-gradient-to-r from-red-500 to-purple-600"
    > 
        Edit Product
    </button>
    {editbtn && product._id==productid && <Edit_product product={product} editbtn={editbtn} seteditbtn={seteditbtn}></Edit_product>}
    </div>
    <hr class="border-t-1 border-gray-800 my-6"></hr>
     </div>
       ))}
        </div>
      }
      
      </div>
      {role=='Buyer' && <div className='flex flex-col gap-2'>
         <h1>My Orders</h1>
         <Myorders></Myorders>
      </div>}
    </div>
    
  )
}

export default Profile