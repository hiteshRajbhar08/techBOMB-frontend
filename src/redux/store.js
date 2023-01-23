import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import productsReducer from './slices/productsSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productsReducer,
    product: productReducer,
  },
});

export default store;
