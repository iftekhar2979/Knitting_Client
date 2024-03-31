import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:8000`,
    credentials: "include",
    
  });
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery,
    tagTypes: ['Product', 'company',"Order","Yarn","Delivery","ProfromaInvoice"],
    endpoints: (builder) => ({
   
    }),

})
export const {  } = apiSlice










