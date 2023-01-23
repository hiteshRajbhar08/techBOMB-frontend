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
  },
});

export const {
  getUserInfo,
  removeUserInfo,
  getUserDetailsInfo,
  getUserDetailsError,
  getUserDetailsRequest,
} = userSlice.actions;
export default userSlice.reducer;
