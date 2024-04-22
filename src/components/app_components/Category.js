'use client'

import Custom_card from '@/components/app_components/custom_card'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Category = ({params}) => {
    const [products,setProducts]=useState([])
  let p=useSelector((state)=>state.auth.user_products);
  const [filter,setfilter]=useState(1000000000000);
  const category=params.category_name;
  const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
  useEffect(()=>{
     p=p.filter((t)=>(t.Category==category && t.Price<=filter));
     console.log(p)
     setProducts(p);
     
  },[filter])
  return (
    <div className='flex flex-wrap flex-row gap-10 items-center justify-center mt-10'>
    <div className='flex flex-col justify-center gap-4'>
        
            Filters
            <div className='relative'>
            <button onClick={toggleDropdown} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <span className='w-48'>Menu</span>
                <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-.707.293z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute w-48 right-0 mt-2 flex justify-center bg-white rounded-md shadow-lg z-30">
                    <ul className='w-48'>
                        <li className='cursor-pointer' onClick={()=>setfilter(10000)}>Less than 10000</li>
                        <li className='cursor-pointer'  onClick={()=>setfilter(50000)}>Less than 50000</li>
                        <li className='cursor-pointer'  onClick={()=>setfilter(1000000000000)}>all {params.category_name} products</li>
                    </ul>

                </div>
            )}
            </div>
    </div>
    <div className=''>
      <Custom_card products={products}></Custom_card>
    </div>
    </div>
  )
}

export default Category
