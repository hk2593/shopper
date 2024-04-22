import Link from 'next/link';
import React from 'react';

const ProductCard = ({ searchResults,setSearchResults }) => {
  return (
    <div className='z-50 bg-slate-50 rounded-md '>
      {
        searchResults.map((product)=>(

          <div key={product._id} onClick={()=>setSearchResults([])} className='flex flex-row gap-2 items-center' >
          <Link href={`${product._id}`}>
            <div className='flex flex-row gap-2 items-center'>
        <img src={product.Image.secure_url} alt={product.Product_name} className="w-16 h-16 object-contain" />
       <div className="p-4">
       <h2 className="text-xl font-semibold"><span className=' text-black'>{product.Product_name}</span></h2>
       </div>
       </div></Link>
       </div>
        ))
        
      }
        
</div>
  );
};

export default ProductCard;