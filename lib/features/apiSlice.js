import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:8000`,
    
  });
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery,
    tagTypes: ['Product', 'company',],
    endpoints: (builder) => ({
   
    }),

})
export const {  } = apiSlice










