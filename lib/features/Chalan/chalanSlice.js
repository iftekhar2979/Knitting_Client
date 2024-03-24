import { createSlice } from '@reduxjs/toolkit'

const initialState = { id:"",chalanName:"" }

const chalanSlice = createSlice({
  name: 'chalanSlice',
  initialState,
  reducers: {
    addingId(state,action) {
      state.id=action.payload.id,
      state.chalanName=action.payload.name
    },
   
  },
})

export const { addingId } = chalanSlice.actions
export default chalanSlice.reducer