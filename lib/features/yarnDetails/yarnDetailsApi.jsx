import { apiSlice } from "../apiSlice";

export const yarnDetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // Order and Buyer Related Endpoints
        addYarnDetails: builder.mutation({
            query: (body) => ({
                url: '/order/yarn/details',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Yarn']
        }),
        getYarnDetails: builder.query({
            query: () => '/order/yarn/details',
            keepUnusedDataFor: 60,
            providesTags: ['Yarn']
        }),
        getSingleYarnDetails: builder.query({
            query: (id) => `/order/yarn/details/${id}`,
            keepUnusedDataFor: 600,
            providesTags: ['Yarn']
        }),
        editYarnDetails:builder.mutation({
            query:({id,body})=>({
                url: `/order/yarn/details/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Yarn']
        }),
        deleteYarnDetails:builder.mutation({
            query:(id)=>({
                url: `/order/details/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Yarn']
        })
  }),
});
export const {
    useGetYarnDetailsQuery,
    useAddYarnDetailsMutation,
    useGetSingleYarnDetailsQuery,
    useDeleteYarnDetailsMutation,
    useEditYarnDetailsMutation
} = yarnDetailsApi;
