import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: null,
    ordersStatus: '',
    ordersMessage: '',
  },
  reducers: {
    orderAddItemRequest: (state) => {
      state.ordersStatus = 'pending';
    },
    orderAddItemError: (state, action) => {
      state.ordersStatus = 'error';
      state.ordersMessage = action.payload;
    },
    orderAddItem: (state, action) => {
      state.ordersStatus = 'success';
      state.orders = action.payload;
    },
    orderAddItemReset: (state) => {
      state.ordersStatus = '';
      state.orders = null;
    },
  },
});

export const {
  orderAddItem,
  orderAddItemError,
  orderAddItemRequest,
  orderAddItemReset,
} = orderSlice.actions;
export default orderSlice.reducer;
