import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './features/apiSlice'
import { counterSlice } from './features/counter'
import { addOrder } from './features/addOrder/addOrderSlice'
import chalanSlice from './features/Chalan/chalanSlice'

export const store = configureStore({
  reducer: {
    addOrder:addOrder.reducer,
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    chalanSlice:chalanSlice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

