'use client'
import Link from 'next/link'
import React from 'react'


const Custom_card = ({products}) => {
 
     console.log(products)
  return (
    <div className='w-full'>
  <div className=' mx-auto'>
    <div className="flex gap-2 flex-wrap justify-center"> {/* Add justify-center here */}
      {
        products.map((product)=>(
          <div key={product._id} className="rounded-xl border-spacing-2 shadow-lg z-10  w-48 h-64 bg-gray-900 text-white flex flex-col overflow-hidden">
            <Link href={`/${product._id}`}>
              <div className="w-full h-40 overflow-hidden bg-white">
                <img className="hover:scale-110 w-full h-40 object-contain " src={product.Image.secure_url} alt="Product Image"/>
              </div>
              <div className="px-4 py-2 z-20">
                <h3 className="text-lg font-semibold mb-2 truncate">{product.Product_name}</h3>
                <p className="text-sm">Price: <span className=' text-green-500'>₹{product.Price}</span></p>
              </div>
            </Link>  
          </div>
        )) 
      }
    </div>
  </div>
</div>

  )
}

export default Custom_card
