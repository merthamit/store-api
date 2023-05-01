import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  singleProduct: {},
  cart: [],
  error: null,
  status: 'idle',
};

export const getProducts = createAsyncThunk('getProducts', async () => {
  const products = await axios.get(
    'https://fakestoreapi.com/products?limit=15'
  );
  return products.data;
});

export const getSingleProduct = createAsyncThunk(
  'getSingleProduct',
  async (id) => {
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return product.data;
  }
);

const fakeStoreSlice = createSlice({
  name: 'fakeStore',
  initialState,
  reducers: {
    addToCart: {
      reducer: (state, action) => {
        const existingPost = state.cart.find(
          (item) => item.id === action.payload.id
        );
        if (existingPost) {
          const newArr = state.cart.map((item) => {
            return item.id === existingPost.id
              ? { ...item, count: item.count + action.payload.count }
              : item;
          });
          state.cart = newArr;
          return;
        }
        state.cart.push(action.payload);
      },
      prepare: (product, count) => {
        return {
          payload: {
            ...product,
            count,
          },
        };
      },
    },
    removeToCart: (state, action) => {
      const existingPost = state.cart.find(
        (item) => item.id === action.payload.id
      );
      // Minus
      if (existingPost && existingPost.count > 1) {
        const newArr = state.cart.map((item) => {
          return item.id === existingPost.id
            ? { ...item, count: item.count - 1 }
            : item;
        });
        state.cart = newArr;
        return;
      }
      // Remove
      const removedArr = state.cart.filter(
        (item) => item.id !== existingPost.id
      );
      state.cart = removedArr;
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.products = [...action.payload];
      state.status = 'success';
      state.error = null;
    },
    [getProducts.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getProducts.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
      state.status = 'success';
      state.error = null;
    },
    [getSingleProduct.pending]: (state, action) => {
      state.singleProduct = {};
      state.status = 'loading';
      state.error = null;
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
  },
});

export default fakeStoreSlice.reducer;

export const getStore = (state) => state.fakeStore;

export const { addToCart, removeToCart } = fakeStoreSlice.actions;
