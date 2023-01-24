import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: null,
    ordersStatus: '',
    ordersMessage: '',
    orderPay: null,
    ordersPayStatus: '',
    ordersPayMessage: '',
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
    orderPayRequest: (state) => {
      state.ordersPayStatus = 'pending';
    },
    orderPayError: (state, action) => {
      state.ordersPayStatus = 'error';
      state.ordersPayMessage = action.payload;
    },
    orderPay: (state, action) => {
      state.orderPay = action.payload;
      state.ordersPayStatus = 'success';
    },
    orderResetPay: (state) => {
      state.orderPay = null;
      state.ordersPayStatus = '';
      state.ordersPayMessage = '';
    },
  },
});

export const {
  orderAddItem,
  orderAddItemError,
  orderAddItemRequest,
  orderAddItemReset,
  orderPay,
  orderPayError,
  orderPayRequest,
  orderResetPay,
} = orderSlice.actions;
export default orderSlice.reducer;
