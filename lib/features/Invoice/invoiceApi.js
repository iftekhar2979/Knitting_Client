import { apiSlice } from "../apiSlice";

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // Order and Buyer Related Endpoints
        getOrdersInvoice: builder.mutation({
            query: (body) => ({
                url: '/api/v1/order/invoice',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Order']
        }),

  }),
});
export const {
  
    useGetOrdersInvoiceMutation,
 
} = invoiceApiSlice;
