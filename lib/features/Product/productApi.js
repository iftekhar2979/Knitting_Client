import { apiSlice } from "../apiSlice";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // Product and Buyer Related Endpoints
        addProduct: builder.mutation({
            query: (body) => ({
                url: '/product/fabrics',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Product']
        }),
        getProduct: builder.query({
            query: () => '/product/fabrics',
            keepUnusedDataFor: 60,
            providesTags: ['Product']
        }),
        editProduct:builder.mutation({
            query:({id,body})=>({
                url: `/product/fabrics/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url: `/product/fabrics/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        })
  }),
});
export const {
    useGetProductQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useEditProductMutation
} = productSlice;
