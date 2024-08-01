import { createSlice } from '@reduxjs/toolkit'

const initialState = { selectedValues: [], selectedCompany: [], selectedCompanyName: "" }

const invoiceSlice = createSlice({
  name: 'invoiceSlice',
  initialState,
  reducers: {
    pushingOnSelectedValue(state, action) {
      if (state.selectedValues.includes(action.payload)) {
        const findIndex = (value) => {
          const indexValue = state.selectedValues.findIndex(e => e === action.payload)
          return indexValue
        }
        state.selectedValues.splice(findIndex(action.payload), 1)

      } else {
        state.selectedValues.push(action.payload)
      }
    
    },
    selectCompanyName(state, action) {
      state.selectedCompanyName = action.payload
      if(state.selectedValues.length===0){
         state.selectedCompanyName = ""
      }
    },
    clearingSelectedValue(state, action) {
      state.selectedValues = []
      state.selectedCompany = []
      state.selectedCompanyName = ""
    }
  },

},
)

export const { pushingOnSelectedValue, clearingSelectedValue,selectCompanyName } = invoiceSlice.actions
export default invoiceSlice.reducer