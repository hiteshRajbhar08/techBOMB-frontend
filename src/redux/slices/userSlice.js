import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
    userDetails: {},
    userDetailsStatus: '',
    userDetailsMessage: '',
    userUpdateDetailsStatus: '',
    userUpdateDetailsMessage: '',
  },
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUserInfo: (state, action) => {
      state.userInfo = null;
    },
    getUserDetailsRequest: (state) => {
      state.userDetailsStatus = 'pending';
    },
    getUserDetailsError: (state, action) => {
      state.userDetailsMessage = action.payload;
      state.userDetailsStatus = 'error';
    },
    getUserDetailsInfo: (state, action) => {
      state.userDetails = action.payload;
      state.userDetailsMessage = '';
      state.userDetailsStatus = 'success';
    },
    updateUserDetailsRequest: (state) => {
      state.userUpdateDetailsStatus = 'pending';
    },
    updateUserDetailsError: (state, action) => {
      state.userUpdateDetailsMessage = action.payload;
      state.userUpdateDetailsStatus = 'error';
    },
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.userUpdateDetailsMessage = '';
      state.userUpdateDetailsStatus = 'success';
    },
    updateResetUserDetails: (state) => {
      state.userDetails = {};
      state.userUpdateDetailsMessage = '';
      state.userUpdateDetailsStatus = '';
    },
  },
});

export const {
  getUserInfo,
  removeUserInfo,
  getUserDetailsInfo,
  getUserDetailsError,
  getUserDetailsRequest,
  updateResetUserDetails,
  updateUserDetails,
  updateUserDetailsError,
  updateUserDetailsRequest,
} = userSlice.actions;
export default userSlice.reducer;
