import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
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
    order: orderReducer,
  },
});

export default store;
