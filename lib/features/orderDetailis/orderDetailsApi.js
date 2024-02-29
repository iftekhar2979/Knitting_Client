import { apiSlice } from "../apiSlice";

export const orderDetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // Order and Buyer Related Endpoints
        addOrderDetails: builder.mutation({
            query: (body) => ({
                url: '/order/details',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Order']
        }),
        getOrderDetails: builder.query({
            query: () => '/order/details',
            keepUnusedDataFor: 60,
            providesTags: ['Order']
        }),
        getSingleOrderDetails: builder.query({
            query: (id) => `/order/details/${id}`,
            keepUnusedDataFor: 600,
            providesTags: ['Order']
        }),
        editOrderDetails:builder.mutation({
            query:({id,body})=>({
                url: `/order/details/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Order']
        }),
        deleteOrderDetails:builder.mutation({
            query:(id)=>({
                url: `/order/details/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        })
  }),
});
export const {
    useGetOrderDetailsQuery,
    useAddOrderDetailsMutation,
    useGetSingleOrderDetailsQuery,
    useDeleteOrderDetailsMutation,
    useEditOrderDetailsMutation
} = orderDetailsApi;
