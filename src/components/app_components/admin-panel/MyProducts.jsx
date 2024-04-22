'use client'
import { setProducts } from '@/store/authSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';



const MyProducts = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [details, setDetails] = useState({
    id: '',
    Product_name: '',
    Category: '',
    Price: '',
    Description: '',
    image: '',
    publicId: '',
  });
  const [products,setproducts]=useState([]);
  const userId=useSelector((state)=>state.auth.userId);
  const role=useSelector(state=>state.auth.role);
  const state_products=useSelector((state)=>state.auth.user_products);
  useEffect(() => {
    const filteredProducts = state_products.filter(product => product.SellerId === userId);
    setproducts(filteredProducts);
    
  }, [state_products]);
  
  const filteredData = products.filter(item => {
    const regex = new RegExp(searchTerm, 'i'); // 'i' flag for case-insensitive matching
    return regex.test(item.Product_name);
  });

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setDetails({
      id: product._id,
      Product_name: product.Product_name,
      Category: product.Category,
      Price: product.Price,
      Description: product.Description,
      image: '',
      publicId: product.Image.publicId,
    });
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
  };

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
      setEditingProduct(null)
    }
  }

  return (
    <div className='w-5/6'>
      {role=='Seller' && <input
      type="text"
      className="w-full mt-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />}

      {filteredData.map((data) => (
        <div key={data._id} className='mt-6 p-4 flex flex-col overflow-x-hidden flex-wrap border-2 justify-start sm:flex-row gap-6'>
          <div className='content-center flex sm:flex-row sm:items-center sm:justify-between flex-col gap-4'>
            <img className='w-60 h-36 sm:h-40' src={data.Image.secure_url} alt={data.Product_name} />
            <button
              onClick={() => handleEditClick(data)}
              className={`px-4 py-2 text-sm w-60 sm:text-lg sm:w-60 sm:h-12 font-bold text-white bg-slate-800 rounded hover:bg-blue-700 ${editingProduct === data._id ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Edit Product
            </button>
          </div>
          <div className='flex flex-wrap flex-col gap-2 sm:w-full'>
          <Link href={`/${data._id}`}><h1 className='font-bold truncate flex flex-wrap text-sm sm:text-lg'>Product Name : <div className='truncate flex flex-wrap break-words text-green-400 w:2/3 sm:w-auto'>{data.Product_name}</div></h1></Link>
            <h1 className='font-bold flex text-sm flex-wrap sm:text-lg'>Product Price : <span className='text-green-400'>₹{data.Price}</span></h1>
            <h1 className='font-bold flex text-sm flex-wrap sm:text-lg'>Product Category : <span className='text-green-400'>{data.Category}</span></h1>
          </div>
          {editingProduct === data._id && (
            <div className='w-auto mx-auto bg-white p-8 rounded-md shadow-md'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Edit Product</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor='productName' className='block text-sm font-medium text-gray-700'>Product Name</label>
                  <input
                    onChange={(e) => setDetails((prevState) => ({ ...prevState, Product_name: e.target.value }))}
                    value={details.Product_name}
                    type='text'
                    id='productName'
                    name='productName'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
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
                </div>
                {/* Add other fields here */}
                <button
                  type='submit'
                  className='w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700'
                >
                  Edit Product
                </button>
                <button
                  onClick={handleEditCancel}
                  className='mt-2 w-full bg-gray-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyProducts;

