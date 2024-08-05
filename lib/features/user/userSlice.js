import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  path:['about', 'service', 'contact', 'login'],
  notify:0,
  isSidebarOpenOnDashboard:false
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
    },
    setSidebarOnDesboard:(state,action)=>{
      state.isSidebarOpenOnDashboard=!action.payload
    },
    setDashboardMenu:(state,action)=>{
      state.isSidebarOpenOnDashboard=false
    }
  },
});

export const { setCredentials, removeCredentials,setNavbar,setDashboardMenu,setNotification,setSidebarOnDesboard } = authSlice.actions;
export default authSlice.reducer;
