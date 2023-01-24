import axios from 'axios';
import {
  cartAddItem,
  cartAddItemError,
  cartAddItemRequest,
  cartRemoveItem,
  cartSaveAddress,
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
        image: data.image,
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

// remove items from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(cartRemoveItem(id));

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// shipping address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(cartSaveAddress(data));
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
