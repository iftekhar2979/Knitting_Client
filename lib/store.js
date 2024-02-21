import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './features/apiSlice'
import { counterSlice } from './features/counter'

export const store = configureStore({
  reducer: {
    counter:counterSlice.reducer,
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

