import axios from 'axios';
import { showNotification } from '../slices/uiSlice';
import {
  getUserDetailsError,
  getUserDetailsInfo,
  getUserDetailsRequest,
  getUserInfo,
  removeUserInfo,
} from '../slices/userSlice';

// login user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(
      showNotification({
        status: 'pending',
        title: 'sending..',
        message: 'sending login',
      })
    );

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch(getUserInfo(data));
    localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch(
      showNotification({
        status: 'success',
        title: 'sending..',
        message: 'login successfully sent',
      })
    );
  } catch (error) {
    dispatch(
      showNotification({
        status: 'error',
        title: 'Login Error!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

// logout user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(removeUserInfo());
};

// register user
export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(
      showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending register',
      })
    );
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `/api/users`,
      { name, email, password },
      config
    );

    dispatch(getUserInfo(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      showNotification({
        status: 'error',
        title: 'Registration Error!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

// get user details
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(getUserDetailsRequest());

    const { userInfo } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch(getUserDetailsInfo(data));
  } catch (error) {
    dispatch(
      getUserDetailsError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
