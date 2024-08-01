import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  path:['about', 'service', 'contact', 'login'],
  notify:0,
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
    setNavbar:(state,action)=>{
      state.path=['about', 'service', 'contact', 'login']
    },
    setNotification:(state,action)=>{
      state.notify++
    }
  },
});

export const { setCredentials, removeCredentials,setNavbar,setNotification } = authSlice.actions;
export default authSlice.reducer;
