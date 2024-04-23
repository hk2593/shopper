'use client'
import React, { useState } from 'react'
import PendingStatus from '../PendingStatus';
import CompletedStatus from '../CompletedStatus';

const Orders = () => {
    const [activeButton, setActiveButton] = useState('Pending');

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };
  
  return (
    <div className='content-center mt-6'>
      <div className='flex items-center gap-4'>
            <button
              className={`px-4 py-2 text-sm w-full sm:text-md sm:w-auto font-bold text-white rounded hover:bg-blue-700 ${activeButton === 'Pending' ? 'bg-blue-900' : 'bg-blue-500'}`}
              onClick={() => handleButtonClick('Pending')}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 text-sm w-full sm:text-md sm:w-auto font-bold text-white rounded hover:bg-blue-700 ${activeButton === 'Completed' ? 'bg-blue-900' : 'bg-blue-500'}`}
              onClick={() => handleButtonClick('Completed')}
            >
              Completed
            </button>
       </div>
       {
        activeButton=='Pending' && <PendingStatus></PendingStatus>
       }  
       {
        activeButton=='Completed' && <CompletedStatus></CompletedStatus>
       }   
    </div>
  )
}

export default Orders
