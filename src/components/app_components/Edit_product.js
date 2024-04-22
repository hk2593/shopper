'use client'
import { setProducts } from '@/store/authSlice';
import axios from 'axios';
import React, {  useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux';

const Edit_product = ({ product,editbtn,seteditbtn }) => {
    const dispatch = useDispatch()
    console.log(product)
    const [details, setDetails] = useState({
      id: product._id,
      Product_name: product.Product_name,
      Category: product.Category,
      Price: product.Price,
      Description: product.Description,
      image: "",
      publicId:product.Image.publicId
    });
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setDetails((prev) => ({
            ...prev, image: fileReader.result
          }))
        }
      };
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await axios.post(`${process.env.API_URL}/api/products/edit_products`, details);
      console.log(response)
      if (response.status === 200) {
        const getallproducts = async () => {
          const products = await axios.get(`${process.env.API_URL}/api/products`)
          dispatch(setProducts(products.data.data))
        }
        getallproducts();
        seteditbtn(!editbtn)
      }
    }
  
    return (
      <div class="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              onChange={(e) => setDetails((prevState) => ({ ...prevState, Product_name: e.target.value }))}
              value={details.Product_name}
              type="text"
              id="productName"
              name="productName"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <select
    onChange={(e) => setDetails((prevState) => ({ ...prevState, Category: e.target.value }))}
    value={details.Category}
    id="category"
    name="category"
    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
>
    <option value="" disabled>Select a category</option>
    <option value="electronics" selected={details.Category === "electronics"}>Electronics</option>
    <option value="clothes" selected={details.Category === "clothes"}>Clothing</option>
    <option value="stationary" selected={details.Category === "stationary"}>Stationary</option>
</select>

          </div>
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input
              onChange={(e) => setDetails((prevState) => ({ ...prevState, Price: e.target.value }))}
              value={details.Price}
              type="text"
              id="price"
              name="price"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              onChange={(e) => setDetails((prevState) => ({ ...prevState, Description: e.target.value }))}
              value={details.Description}
              id="description"
              name="description"
              rows="3"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              onChange={handleImageChange}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Edit Product
          </button>
        </form>
      </div>
    )
  }
  
  export default Edit_product
  