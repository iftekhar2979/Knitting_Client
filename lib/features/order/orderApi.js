import { apiSlice } from "../apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // Order and Buyer Related Endpoints
        addOrder: builder.mutation({
            query: (body) => ({
                url: '/order',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Order']
        }),
        getOrder: builder.query({
            query: () => '/order',
            keepUnusedDataFor: 60,
            providesTags: ['Order']
        }),
        editOrder:builder.mutation({
            query:({id,body})=>({
                url: `/order/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Order']
        }),
        deleteOrder:builder.mutation({
            query:(id)=>({
                url: `/order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        })
  }),
});
export const {
    useGetOrderQuery,
    useAddOrderMutation,
    useDeleteOrderMutation,
    useEditOrderMutation
} = orderApiSlice;