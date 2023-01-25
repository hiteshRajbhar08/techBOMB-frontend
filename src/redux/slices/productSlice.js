import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: { reviews: [] },
    status: '',
    message: '',
    deleteStatus: '',
    deleteMessage: '',
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
    deleteProductRequest: (state) => {
      state.deleteStatus = 'pending';
    },
    deleteProductError: (state, action) => {
      state.deleteStatus = 'error';
      state.deleteMessage = action.payload;
    },
    deleteProduct: (state) => {
      state.deleteStatus = 'success';
      state.deleteMessage = '';
    },
  },
});

export const {
  getProduct,
  getProductError,
  getProductRequest,
  deleteProduct,
  deleteProductError,
  deleteProductRequest,
} = productSlice.actions;
export default productSlice.reducer;
