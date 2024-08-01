import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 range:""
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
   setRange:(state,action)=>{
    state.range=action.payload
   }
  },
});

export const { setRange } = dashboardSlice.actions;
export default dashboardSlice.reducer;
