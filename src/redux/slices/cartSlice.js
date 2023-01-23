import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartItemsFromStorage,
    status: '',
    message: '',
  },
  reducers: {
    cartAddItemRequest: (state) => {
      state.status = 'pending';
    },
    cartAddItemError: (state, action) => {
      state.status = 'error';
      state.message = action.payload;
    },
    cartAddItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existingItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.status = 'success';
    },
  },
});

export const { cartAddItem, cartAddItemError, cartAddItemRequest } =
  cartSlice.actions;
export default cartSlice.reducer;
