import { createSlice } from '@reduxjs/toolkit'

const initialState = { selectedValues: [], selectedCompany:[] }

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
  },
  pushingSelectedCompany(state, action) {

    if (state.selectedCompany.includes(action.payload)) {
      const findIndex = (value) => {
        const indexValue = state.selectedCompany.findIndex(e => e === action.payload)
        return indexValue
      }
      state.selectedCompany.splice(findIndex(action.payload), 1)
      
    } else {
      state.selectedCompany.push(action.payload)
    }
  },
},
)

export const { pushingOnSelectedValue,pushingSelectedCompany } = invoiceSlice.actions
export default invoiceSlice.reducer