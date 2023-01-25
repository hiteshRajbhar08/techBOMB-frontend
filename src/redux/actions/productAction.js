import axios from 'axios';
import {
  createProductError,
  createProductRequest,
  createProductSuccess,
  deleteProduct,
  deleteProductError,
  deleteProductRequest,
  getProduct,
  getProductError,
  getProductRequest,
  updateProductError,
  updateProductRequest,
  updateProductSuccess,
} from '../slices/productSlice';
import {
  getProductList,
  getProductListError,
  getProductListRequest,
} from '../slices/productsSlice';

// fetch all products
export const listProducts =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch(getProductListRequest());

      const { data } = await axios.get(`/api/products?keyword=${keyword}`);

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

// delete product
export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteProductRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch(deleteProduct());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(deleteProductError(message));
  }
};

// create product
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(createProductRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch(createProductSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(createProductError(message));
  }
};

// update product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(updateProductRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    dispatch(updateProductSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(updateProductError(message));
  }
};
