import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  path:['about', 'service', 'contact', 'login']
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.path=['about', 'service', 'contact', 'dashboard']
    },
    removeCredentials: (state, action) => {
      state.userInfo = null;
      state.path=['about', 'service', 'contact', 'login']
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
