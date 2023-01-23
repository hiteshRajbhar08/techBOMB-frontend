import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
  },
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUserInfo: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { getUserInfo, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;
