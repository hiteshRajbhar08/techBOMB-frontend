import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    pages: '',
    page: '',
    status: '',
    message: '',
  },
  reducers: {
    getProductListRequest: (state) => {
      state.status = 'pending';
    },
    getProductListError: (state, action) => {
      state.status = 'error';
      state.message = action.payload;
    },
    getProductList: (state, action) => {
      state.products = action.payload.products;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
      state.status = 'success';
    },
  },
});

export const { getProductList, getProductListError, getProductListRequest } =
  productsSlice.actions;
export default productsSlice.reducer;
