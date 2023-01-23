import axios from 'axios';
import {
  cartAddItem,
  cartAddItemError,
  cartAddItemRequest,
} from '../slices/cartSlice';

// add to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch(cartAddItemRequest());

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch(
      cartAddItem({
        product: data._id,
        name: data.name,
        email: data.email,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      })
    );
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch(
      cartAddItemError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
