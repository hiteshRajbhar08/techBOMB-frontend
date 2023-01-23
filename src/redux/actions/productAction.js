import axios from 'axios';
import {
  getProduct,
  getProductError,
  getProductRequest,
} from '../slices/productSlice';
import {
  getProductList,
  getProductListError,
  getProductListRequest,
} from '../slices/productsSlice';

// fetch all products
export const listProducts = () => async (dispatch) => {
  try {
    dispatch(getProductListRequest());

    const { data } = await axios.get('/api/products');

    dispatch(
      getProductList({
        products: data || [],
      })
    );
  } catch (error) {
    dispatch(
      getProductListError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// get single product
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(getProductRequest());

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch(
      getProduct({
        product: data || { reviews: [] },
      })
    );
  } catch (error) {
    dispatch(
      getProductError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
