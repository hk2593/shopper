'use client'
import { setProducts } from '@/store/authSlice';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddProduct = ({setActiveButton}) => {
  const id=useSelector((state)=>state.auth.userId)
  const [details, setDetails] = useState({
    SellerId: id, // Assuming this will be set elsewhere
    Product_name: '',
    Category: 'electronics',
    Price: '',
    Description: '',
    image: '',
  });
  const dispatch=useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setDetails((prev) => ({
          ...prev,
          image: fileReader.result,
        }));
      }
    };
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(details)
    const response=await axios.post(`${process.env.API_URL}/api/products`,details);
    console.log(response)
    if(response.status===200){ 
      const getallproducts=async()=>{

        const products=await axios.get(`${process.env.API_URL}/api/products`)
   
         dispatch(setProducts(products.data.data))
        }
        getallproducts();
    }
    setActiveButton('My Products')
    
  }
  return (
    <div className="bg-gray-200 p-8 mt-6 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            onChange={(e) => setDetails((prev) => ({ ...prev, Product_name: e.target.value }))}
            type="text"
            id="productName"
            name="productName"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            onChange={(e) => setDetails((prev) => ({ ...prev, Category: e.target.value }))}
            id="category"
            name="category"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="" disabled>Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothes">Clothing</option>
            <option value="stationary">Stationary</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            onChange={(e) => setDetails((prev) => ({ ...prev, Price: e.target.value }))}
            type="text"
            id="price"
            name="price"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            onChange={(e) => setDetails((prev) => ({ ...prev, Description: e.target.value }))}
            id="description"
            name="description"
            rows="3"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

