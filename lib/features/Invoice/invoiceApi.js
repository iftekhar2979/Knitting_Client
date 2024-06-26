import { apiSlice } from "../apiSlice";

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // Order and Buyer Related Endpoints
        getOrdersInvoice: builder.mutation({
            query: (body) => ({
                url: '/v1/order/invoice',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Order']
        }),
        createProformaInvoice: builder.mutation({
            query: (body) => ({
                url: '/v1/proformaInvoice',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ["ProfromaInvoice",'Order']
        }),
        getPerformaInvoiceList: builder.query({
            query: () => '/v1/proformaInvoice',
            keepUnusedDataFor: 60,
            providesTags: ["ProfromaInvoice"]
        }),
        getSinglePerformaInvoiceList: builder.query({
            query: (id) => `/v1/proformaInvoice/${id}`,
            keepUnusedDataFor: 60,
            providesTags: ["ProfromaInvoice"]
        }),
        deleteSingleProformaInvoice:builder.mutation({
            query:(id)=>({
                url:  `/v1/proformaInvoice/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProfromaInvoice',"Order"]
        }),

  }),
});
export const {
  
    useGetOrdersInvoiceMutation,
    useCreateProformaInvoiceMutation,
    useGetPerformaInvoiceListQuery,
    useGetSinglePerformaInvoiceListQuery,
    useDeleteSingleProformaInvoiceMutation
 
} = invoiceApiSlice;
