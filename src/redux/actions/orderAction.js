import axios from 'axios';
import {
  orderAddItem,
  orderAddItemError,
  orderAddItemRequest,
  orderGetMyorders,
  orderGetMyordersError,
  orderGetMyordersRequest,
  orderPay,
  orderPayError,
  orderPayRequest,
  ordersGetList,
  ordersGetListError,
  ordersGetListRequest,
  orderToDelivered,
  orderToDeliveredError,
  orderToDeliveredRequest,
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

// pay order
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayRequest());

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch(orderPay(data));
    } catch (error) {
      dispatch(
        orderPayError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

// list my orders
export const listMyorders = () => async (dispatch, getState) => {
  try {
    dispatch(orderGetMyordersRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch(orderGetMyorders(data));
  } catch (error) {
    dispatch(
      orderGetMyordersError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// get all orders
export const ListOrders = () => async (dispatch, getState) => {
  try {
    dispatch(ordersGetListRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`, config);

    dispatch(ordersGetList(data));
  } catch (error) {
    dispatch(
      ordersGetListError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// order deliver
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderToDeliveredRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch(orderToDelivered(data));
  } catch (error) {
    dispatch(
      orderToDeliveredError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
