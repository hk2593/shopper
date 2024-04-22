'use client'
import { setProducts } from '@/store/authSlice';
import axios from 'axios';
import React, {  useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux';

const Product_upload = () => {
  const dispatch=useDispatch()
  const id=useSelector((state)=>state.auth.userId)
  const [details,setDetails]=useState({
       SellerId:id,
       Product_name:"",
       Category:"",
       Price:"",
       Description:"",
       image:""
  });
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setDetails((prev)=>({
          ...prev,image:fileReader.result
        }))
        
      }
    };

}
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await axios.post(`${process.env.API_URL}/api/products`,details);
    console.log(response)
    if(response.status===200){
      const getallproducts=async()=>{

        const products=await axios.get(`${process.env.API_URL}/api/products`)
   
         dispatch(setProducts(products.data.data))
        }
        getallproducts();
    }
    
  }
  return (
    <div class="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Add Product</h2>
    <form onSubmit={handleSubmit}>
      <div class="mb-4">
        <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
        <input onChange={(e)=>{
            setDetails((prevState)=>({...prevState,Product_name:e.target.value})) 
        }} type="text" id="productName" name="productName" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <select onChange={(e)=>{
            setDetails((prevState)=>({...prevState,Category:e.target.value})) 
        }} id="category" name="category" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          <option value="" disabled selected>Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="clothes">Clothing</option> 
          <option value="stationary">Stationary</option>
          
        </select>
      </div>
      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
        <input onChange={(e)=>{
            setDetails((prevState)=>({...prevState,Price:e.target.value})) 
        }} type="text" id="price" name="price" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea onChange={(e)=>{
            setDetails((prevState)=>({...prevState,Description:e.target.value})) 
        }} id="description" name="description" rows="3" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
      </div>
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700">Upload Image</label>
        <input onChange={handleImageChange} type="file" id="image" name="image" accept="image/*" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>
      <button type="submit" class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Add Product</button>
    </form>
  </div>
  )
}

export default Product_upload
