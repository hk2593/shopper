'use client'
import { setAllorders, setCartItems } from '@/store/authSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cart_component = ({iscartopen,setiscartopen}) => {
  const dispatch=useDispatch();
  const router=useRouter();
  const cart_items=useSelector((state)=>state.auth.CartItems);
  console.log('yeh rahe mere cart items',cart_items)
  const arr=[];
  for(let i=0;i<cart_items?.length;i++){
    const obj={
      productId:cart_items[i].productId._id,
      Quantity:cart_items[i].Quantity,
      Price:cart_items[i].productId.Price
    }
    arr.push(obj);
  }
  
    // State variables to hold form field values
    const [formData, setFormData] = useState({
      state: '',
      city: '',
      pincode: '',
      house: '',
    });
  
    // Function to handle form field changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

  const userId=useSelector((state)=>state.auth.userId)
  const Items=cart_items;
  const [checkout,setcheckout]=useState(false);
  let price=0;
  Items?.forEach(item => {
    price += item.Quantity * item.productId.Price;
  });
  const token=useSelector((state)=>state.auth.token);
  const handleQuantity=async({Quantity,cart_id})=>{
      
      const updateQuantity=await axios.post(`${process.env.API_URL}/api/cart/update_cart`,{userId,Quantity,cart_id});
      const cart_items=await axios.post(`${process.env.API_URL}/api/cart/user_cart`,{userId})
      if(token){
      dispatch(setCartItems(cart_items.data.cart_items?.Items));}
      else{
        dispatch(setCartItems([]));
      }
  }
  const handleDeleteItem=async({cart_id})=>{
    const updatecart=await axios.post(`${process.env.API_URL}/api/cart/delete_cart`,{userId,cart_id});
    const cart_items=await axios.post(`${process.env.API_URL}/api/cart/user_cart`,{userId})
    if(token){
      dispatch(setCartItems(cart_items.data.cart_items?.Items));}
      else{
        dispatch(setCartItems([]));
      }
  }

  const handleSubmitAddress=async(e)=>{
    e.preventDefault();
    const result=await axios.post(`${process.env.API_URL}/api/orders/create_order`,
              {userId,formData,TotalPrice:price,Items:arr}
              );
    console.log(result);
    if(result.status==200){
      const deletedcart=await axios.post(`${process.env.API_URL}/api/cart/delete_user_cart`,{userId});
      const cart_items=await axios.post(`${process.env.API_URL}/api/cart/user_cart`,{userId});
      const orders=await axios.get(`${process.env.API_URL}/api/orders`);
      dispatch(setAllorders(orders.data.allorders))
      console.log(cart_items);
      dispatch(setCartItems(cart_items.data.cart_items?.Items))
      router.push("/");
      setiscartopen(!iscartopen)}
  }


  return (
    <> 
     <div className='fixed inset-0 flex flex-col gap-4 justify-center items-center z-50 bg-black bg-opacity-50'>
       <div className='bg-white flex flex-col gap-2 p-4 rounded-lg'>
        {
          cart_items?.length==0 && <div>
             <img src='/shopping.png' className=' h-40 w-40'></img>
            </div>
        }
       {!checkout && <div> { Items?.map(Item=>(
          <div key={Item._id} className='flex flex-row items-center gap-6'>
           <img src={Item.productId.Image.secure_url} className=' h-12 w-12'></img>
           <h1>{Item.productId.Product_name}</h1> 
           <h1>₹{Item.productId.Price}</h1>
           <div className='flex flex-row items-center gap-2'>
           <button onClick={()=>handleQuantity({Quantity:Item.Quantity+1,cart_id:Item._id})} className='font-bold border-black' >+</button>
            <h1>{Item.Quantity}</h1>
           
           <button onClick={()=>{
            if(Item.Quantity>1){
              handleQuantity({Quantity:Item.Quantity-1,cart_id:Item._id})
            }
           }} className='font-bold border-black' >
            -
          </button>
          </div>
         
         <img src='/delete.png' onClick={()=>handleDeleteItem({cart_id:Item._id})} className='h-6 w-6'></img>
         
         </div>
        ))}</div>}

        {
          checkout && <div class="p-6">
          <form class="space-y-4">
            <div>
              <label for="state" class="block text-sm font-medium text-gray-700">State:</label>
              <input value={formData.state}
                onChange={handleInputChange} type="text" id="state" name="state" required
                     class="mt-1 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"/>
            </div>
            
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">City:</label>
              <input value={formData.city}
                onChange={handleInputChange} type="text" id="city" name="city" required
                     class="mt-1 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"/>
            </div>
            
            <div>
              <label for="pincode" class="block text-sm font-medium text-gray-700">Pincode:</label>
              <input value={formData.pincode}
                onChange={handleInputChange} type="number" id="pincode" name="pincode" required
                     class="mt-1 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"/>
            </div>
            
            <div>
              <label for="house" class="block text-sm font-medium text-gray-700">House:</label>
              <input value={formData.house}
                onChange={handleInputChange} type="text" id="house" name="house" required
                     class="mt-1 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"/>
            </div>
            <h1>Total Price  ₹{price}</h1>
            <div className='flex flex-row justify-between'>
          <button onClick={handleSubmitAddress}
           className="inline-block outline-none cursor-pointer  text-white font-semibold rounded-lg px-4 py-2 border-none transition duration-200 ease-in-out bg-gradient-to-r from-red-500 to-purple-600"
           >
       
          paynow
        
          </button>
          <button onClick={()=>setiscartopen(!iscartopen)} className="inline-block outline-none cursor-pointer text-black font-semibold rounded-lg px-4 py-2 border border-solid border-black transition duration-200 ease-in-out bg-white hover:border hover:border-black hover:bg-gray-200">
           Close Cart
          </button>
        </div>
          </form>
        </div>
        
        }
         
         {!checkout && <h1>Total Price  ₹{price}</h1>}
        {!checkout && <div className='flex flex-row gap-2 items-center'>
        <button onClick={()=>cart_items.length>0 && setcheckout(!checkout)}
        className="inline-block outline-none cursor-pointer  text-white font-semibold rounded-lg px-4 py-2 border-none transition duration-200 ease-in-out bg-gradient-to-r from-red-500 to-purple-600"
        >
       
        Checkout
        
       </button>
       <button onClick={()=>setiscartopen(!iscartopen)} className="inline-block outline-none cursor-pointer text-black font-semibold rounded-lg px-4 py-2 border border-solid border-black transition duration-200 ease-in-out bg-white hover:border hover:border-black hover:bg-gray-200">
        Close Cart
       </button>
       </div>}
     
       </div>
       
    </div>
    </>
  )
}

export default Cart_component
