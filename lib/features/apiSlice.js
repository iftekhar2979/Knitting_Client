import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

console.log(process.env.NEXT_PUBLIC_API_URL)

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: "include",
    
  });
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery,
    tagTypes: ['Product', 'company',"Order","Yarn","Delivery","ProfromaInvoice","Bill","Dashboard"],
    endpoints: (builder) => ({
    }),
})
export const {  } = apiSlice









