import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: { reviews: [] },
    status: '',
    message: '',
  },
  reducers: {
    getProductRequest: (state) => {
      state.status = 'pending';
    },
    getProductError: (state, action) => {
      state.status = 'error';
      state.message = action.payload;
    },
    getProduct: (state, action) => {
      state.product = action.payload.product;
      state.status = 'success';
    },
  },
});

export const { getProduct, getProductError, getProductRequest } =
  productSlice.actions;
export default productSlice.reducer;
