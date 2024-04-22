'use client'
import React, { useState } from 'react';
import MyProducts from './MyProducts';
import AddProduct from './AddProduct';
import Orders from './Orders';
import { useSelector } from 'react-redux';

const Mainpage = () => {
  const [activeButton, setActiveButton] = useState('My Products');
  const role=useSelector(state=>state.auth.role);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='flex flex-col gap-6'>
      {role=='Seller' && <div className='w-full bg-slate-900 text-white flex p-4 text-xl font-bold items-center h-12'>Admin Panel</div>}
      {role=='Buyer' && <div className='w-full bg-slate-900 text-white flex p-4 text-xl font-bold items-center h-12'>User Panel</div>}
      <div className='w-full flex justify-center'>
        <div className=' w-5/6 flex flex-col overflow-x-hidden justify-center items-center'>
          <div className='flex items-center gap-4'>
            {role=='Seller' && <button
              className={`px-4 py-2 text-sm w-full sm:text-lg sm:w-auto font-bold text-white rounded hover:bg-blue-700 ${activeButton === 'My Products' ? 'bg-blue-900' : 'bg-blue-500'}`}
              onClick={() => handleButtonClick('My Products')}
            >
              My Products
            </button> }
            {role =='Seller' && <button
              className={`px-4 py-2 text-sm w-full sm:text-lg sm:w-auto font-bold text-white rounded hover:bg-blue-700 ${activeButton === 'Add Product' ? 'bg-blue-900' : 'bg-blue-500'}`}
              onClick={() => handleButtonClick('Add Product')}
            >
              Add Product
            </button> }
           
            <button
              className={`px-4 py-2 text-sm w-full sm:text-lg sm:w-auto font-bold text-white rounded hover:bg-blue-700 ${activeButton === 'Orders' ? 'bg-blue-900' : 'bg-blue-500'}`}
              onClick={() => handleButtonClick('Orders')}
            >
              Orders
            </button>
            
          </div>
          {
            activeButton=='My Products' && <MyProducts></MyProducts>
          }
          {
            activeButton=='Add Product' && <AddProduct setActiveButton={setActiveButton}></AddProduct>
          }
          {
            activeButton=='Orders' && <Orders></Orders>
          }
        </div>
      </div>
    </div>
  );
};

export default Mainpage;

