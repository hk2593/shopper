import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  role:null,
  userId:null,
  user_products:[],
  CartItems:null,
  allorders:null,
  price:0,
  // Add follow status field
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role=action.payload.role;
      state.userId=action.payload.userId
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.role=null;
      state.userId=null;
      // Clear follow status on logout
    },
    setCartItems:(state,action)=>{
      state.CartItems=action.payload;
    },
    setProducts: (state,action)=>{
      state.user_products=action.payload;
    },
    setPrice:(state,action)=>{
      state.price=action.payload;
    },
    setAllorders:(state,action)=>{
      state.allorders=action.payload;
    }
  },
});

export const { setLogin, setLogout, setProducts,setCartItems,setPrice,setAllorders} = userSlice.actions;
export default userSlice.reducer;