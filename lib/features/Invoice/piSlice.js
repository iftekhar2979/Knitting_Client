import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    companyName: '',
    piNumber: '',
    piValue: [],
    tbNumbers: [],
    createdAt: '',
    billSystem:"",
    totalAmount:0,
    totalQuantity:0,
    cleared:false
}
const piSlice = createSlice({
    name: 'piSlice',
    initialState,
    reducers: {
        addPi: (state, action) => {
            let { piValue } = state
            const alreadyExist = piValue?.some((singleProduct) => singleProduct.fabricsId === action.payload.fabricsId);
            if (!alreadyExist) {
                piValue.push(action.payload)
                console.log(piValue)
            } else {
                const indexOfProductName = piValue.findIndex((singleProduct) => singleProduct.fabricsId === action.payload.fabricsId);
                piValue[indexOfProductName] = action.payload
            }
            //immutable filter 
            function mutableFilter(arr, condition) {
                for (let i = arr.length - 1; i >= 0; i--) {
                    if (!condition(arr[i])) {
                        arr.splice(i, 1); // Remove the element at index i
                    }
                }
            }
            //delete the product which perpics is equal to 0;
            mutableFilter(piValue, (item) => item.unitPrice !== 0)
        },
        totalQuantityCounting:(state,action)=>{
            state.totalAmount=state.piValue?.reduce((acc,cur)=>{
                return acc+cur?.amount
            },0)
            state.totalQuantity=state.piValue?.reduce((acc,cur)=>{
                return acc+cur?.totalQuantity
            },0)    
        },
        clearingState: (state) => {
                state.cleared=true
                state.companyName = '';
                state.piNumber = '';
                state.piValue = [];
                state.tbNumbers = [];
                state.createdAt = '';
                state.totalAmount=0;
                state.totalQuantity=0
                state.billSystem=""
        },
        addBillingSystem:(state,action)=>{
           
            state.billSystem=action.payload
        }
    }
})
export default piSlice.reducer
export const { addPi, clearingState,totalQuantityCounting,addBillingSystem} = piSlice.actions