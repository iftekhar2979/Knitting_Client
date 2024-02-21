import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_DEVELOPMENT_URL}`,
    credentials: "include",
  });
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery,
    tagTypes: ['Product', 'company',],
    endpoints: (builder) => ({
        // Company and Buyer Related Endpoints
        addCompany: builder.mutation({
            query: (body) => ({
                url: '/company',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['company']
        }),
        getCompany: builder.query({
            query: () => '/company',
            keepUnusedDataFor: 60,
            providesTags: ['company']
        }),
 
    }),

})
export const { 
    useAddCompanyMutation,
    useGetCompanyQuery, } = apiSlice










