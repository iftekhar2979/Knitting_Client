import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_URL}/api/`,
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









