// features/counter/addOrder.js
import { createSlice } from "@reduxjs/toolkit";
const initialState={
    buyers:[],

}
export const addOrder = createSlice({
  name: "addOrder",
  initialState,
  reducers: {
    setBuyer: (state,action) => {
        console.log('state',state)
      state.buyer=action.payload
    },
    setCompanyId:(state,action)=>{
        
        state.companyId=action.payload
    }
  },
});

export const { setBuyer,setCompanyId } = addOrder.actions;