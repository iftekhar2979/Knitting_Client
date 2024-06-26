import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './features/apiSlice'
import { counterSlice } from './features/counter'
import { addOrder } from './features/addOrder/addOrderSlice'
import chalanSlice from './features/Chalan/chalanSlice'
import invoice from './features/Invoice/invoiceSlice'
import invoiceSlice from './features/Invoice/invoiceSlice'
import piSlice from './features/Invoice/piSlice'
import userSlice from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    addOrder:addOrder.reducer,
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    chalanSlice:chalanSlice,
    invoiceSlice:invoiceSlice,
    pI:piSlice,
    user:userSlice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

