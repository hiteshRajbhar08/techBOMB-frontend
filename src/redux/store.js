import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import productsReducer from './slices/productsSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
