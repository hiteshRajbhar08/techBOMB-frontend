import axios from 'axios';
import {
  orderAddItem,
  orderAddItemError,
  orderAddItemRequest,
} from '../slices/orderSlice';

// create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderAddItemRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };
    const { data } = await axios.post('/api/orders', order, config);

    dispatch(orderAddItem(data));
  } catch (error) {
    dispatch(
      orderAddItemError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// get order
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderAddItemRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch(orderAddItem(data));
  } catch (error) {
    dispatch(
      orderAddItemError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
