'use client'
import { setCartItems, setLogout } from '@/store/authSlice';
import Link from 'next/link';
import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cart_component from './cart_component';
import ProductCard from './ProductCard';


const Navbar = () => {
    const router=useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const token=useSelector((state)=>state.auth.token);
    const username=useSelector((state)=>state.auth.user);
    const cart_items=useSelector((state)=>state.auth.CartItems);
     const dispatch=useDispatch();
    const role=useSelector((state)=>state.auth.role)
    // CSS classes for the logout, transactions, and profile dropdown menu
    const dropdownMenuClasses = "absolute z-10 flex flex-col bg-gray-100 shadow-md border border-gray-300 py-2 px-2 rounded";

    // CSS classes for the dropdown items
    const dropdownItemClasses = "py-1 px-2 hover:text-gray-700";
    const [iscartopen,setiscartopen]=useState(false);
    const [data,setsearchedData]=useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch=async(e)=>{
      
       setsearchedData(e.target.value);
       const data = e.target.value.trim();
       
      if(data==""||!data){
         setSearchResults([]);
      }
      else{
      const result=await axios.post(`${process.env.API_URL}/api/searchRoute`,{data});
        setSearchResults(result.data.products);
      }
      
      
    }

   

   
    const handlelogout=async()=>{
      const response=await axios.post(`${process.env.API_URL}/api/auth/logout`);
      console.log(response);
      dispatch(setLogout())
      dispatch(setCartItems([]))
      router.push('/')
    }
    const [isOpen, setIsOpen] = useState(false);
 
  return ( 
    <>
    <div className='flex h-full flex-col gap-2'>
    <div className='flex  items-center justify-between'>
        <div className='flex gap-1 items-center' >
            <Link href={"/"} className='flex gap-1 items-center'>
            <img src='/shopify.png' className='h-12 px-2 py-2'></img>
            <span className='text-black font-extrabold  text-sm sm:text-2xl'>Shopee</span></Link>
        </div>
        <div className='relative flex gap-2 items-center'>
        <div className='relative flex flex-col gap-2 items-center'>
    <div className="relative rounded-md shadow-sm overflow-hidden">
    <input
      value={data}
      onChange={handleSearch}
      type="search"
      className="hidden md:block relative h-8 px-2 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-10 pr-4"
      placeholder="Search..."
      aria-label="Search"
    />
        { data!="" &&
            <span onClick={()=>setSearchResults([])}>
              <Link 
           href={`/search/${data}`}>  <img src='/search.png' className='absolute h-7 right-2 top-1/2 transform -translate-y-1/2' alt="Search" />
            </Link></span>
        
        }
       
    </div>
    <div className='hidden absolute z-50 top-full w-full sm:flex justify-center'>
        {<ProductCard searchResults={searchResults} setSearchResults={setSearchResults}></ProductCard>}
    </div>
</div>
        
       <span className='hidden sm:block sm:relative sm: w-20' onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                   <div className='flex  items-center gap-2 '>
                    <span className='text-sm sm:text-base'>products</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 font-lg top-1/2 right-2 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L10 5.414 3.707 11.707a1 1 0 1 1-1.414-1.414l7-7A1 1 0 0 1 10 3zm0 4a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 0 1-1.414-1.414l7-7A1 1 0 0 1 10 7z" clipRule="evenodd" />
                    </svg></div>
                    {isDropdownOpen && (
                        <div className="absolute z-20  bg-white border border-gray-300 py-2 px-4 rounded shadow-md">
                            <ul className="list-none p-0">
                                <li className="py-2 hover:bg-gray-100"><Link href={'/category/stationary'}>Stationary</Link></li>
                                <li className="py-2 hover:bg-gray-100"><Link href={'/category/electronics'}>Electronics</Link></li>
                                <li className="py-2 hover:bg-gray-100"><Link href={'/category/clothes'}>Clothes</Link></li>
                            </ul>
                        </div>
                    )}
                </span>
       </div>
       
       {/* login signup */}
        <div className='flex gap-6 mr-5 items-center'>
        <div onClick={() => setiscartopen(!iscartopen)} className='relative'>
      <img src='/shopping_cart.png' className='h-6 sm:h-8' alt='absolute Shopping Cart' />
      {cart_items?.length > 0 && (
        <span className='absolute top-0 left-5 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs'>
        {cart_items?.length}
      </span>
      )}
     </div>
          {
            iscartopen && <Cart_component iscartopen={iscartopen} setiscartopen={setiscartopen}></Cart_component>
          }
          
          <div className='flex gap-2'>
          {!token && <>
           <Link href={"/login"}>
        <button class="bg-blue-500 hover:bg-blue-700 text-sm sm:text-base text-white font-bold py-1 px-2 rounded flex items-center">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5l5-2.5L14 9V4m0 12v5l-5-2.5L4 17v-5m16-3v6h-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v6H0V9c0-1.1.9-2 2-2h12a2 2 0 012 2v7h4V9a2 2 0 00-2-2h-2"/>
         </svg>
           Login 
        </button></Link>
        <Link href={"/signup"}>
        <button class="hidden  hover:bg-blue-700 bg-blue-500 text-white text-sm sm:text-base font-bold p-1 sm:py-1 sm:px-2 rounded sm:flex items-center">
         <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6a2 2 0 01-2-2V4a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2z"/>
        </svg>
        Signup 
       </button>
       </Link></>}
        {
          token && <>
<span class="relative mr-4 w-20  cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
  <div class="flex items-center gap-2">
    <span class="font-bold text-gray-700">{username}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={`h-4 w-4 text-blue-500 hover:text-blue-700 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 3a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L10 5.414 3.707 11.707a1 1 0 1 1-1.414-1.414l7-7A1 1 0 0 1 10 3zm0 4a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 0 1-1.414-1.414l7-7A1 1 0 0 1 10 7z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
  {isOpen && (
                                <div className={`${dropdownMenuClasses} right-0`}>
                                    <ul className="list-none p-0">
                                        <li className={dropdownItemClasses}>
                                            <Link href={"/profile"}>Profile</Link>
                                        </li>
                                        {/* {role=='Seller' && <li className={dropdownItemClasses}>
                                            <Link href={"/Transactions"}>Transactions</Link>
                                        </li>} */}
                                        <li className={dropdownItemClasses} onClick={handlelogout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
</span>


      </>
          
          
        }
        </div>
    </div>
        </div>
    {/* commented div */}
    <div className='sm:hidden p-1 flex items-start  gap-2'>
        <span className=' w-1/3' onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                   <div className='flex  items-center gap-2 '>
                    <span className='text-sm'>products</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 font-lg top-1/2 right-2 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L10 5.414 3.707 11.707a1 1 0 1 1-1.414-1.414l7-7A1 1 0 0 1 10 3zm0 4a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 0 1-1.414-1.414l7-7A1 1 0 0 1 10 7z" clipRule="evenodd" />
                    </svg></div>
                    {isDropdownOpen && (
                        <div className="absolute z-20  bg-white border border-gray-300 py-2 px-2 rounded shadow-md">
                            <ul className="list-none p-0">
                                <li className="py-2 text-sm hover:bg-gray-100"><Link href={'/category/stationary'}>Stationary</Link></li>
                                <li className="py-2 text-sm hover:bg-gray-100"><Link href={'/category/electronics'}>Electronics</Link></li>
                                <li className="py-2 text-sm hover:bg-gray-100"><Link href={'/category/clothes'}>Clothes</Link></li>
                            </ul>
                        </div>
                    )}
                </span>      
    <div className='sm:hidden relative mb-2 flex flex-col gap-2 items-center'>
          <div className="relative rounded-md shadow-sm overflow-hidden">
            <input
              value={data}
              onChange={handleSearch}
              type="search"
              className="relative h-8 px-2 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-10 pr-4"
              placeholder="Search..."
              aria-label="Search"
            />
            {data !== "" &&
              <span onClick={() => setSearchResults([])}>
                <Link href={`/search/${data}`}>
                  <img src='/search.png' className='absolute h-7 right-2 top-1/2 transform -translate-y-1/2' alt="Search" />
                </Link>
              </span>
            }
          </div>
          <div className='absolute z-50 top-full w-full flex justify-center'>
            {<ProductCard searchResults={searchResults} setSearchResults={setSearchResults}></ProductCard>}
          </div>
        </div>

        </div>
    </div>
   
    </>
  );
};

export default Navbar;
