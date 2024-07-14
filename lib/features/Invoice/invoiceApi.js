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
        createBillInformation:builder.mutation({
            query: (body) => ({
                url: '/v1/bill',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ["Bill",'Order']
        }),
        getPerformaInvoiceList: builder.query({
            query: () => '/v1/bill',
            keepUnusedDataFor: 60,
            providesTags: ["Bill"]
        }),
        getSinglePerformaInvoiceList: builder.query({
            query: (id) => `/v1/proformainvoice/${id}`,
            keepUnusedDataFor: 60,
            providesTags: ["Bill"]
        }),
        getSingleBill: builder.query({
            query: (id) => `/v1/bill/${id}`,
            keepUnusedDataFor: 60,
            providesTags: ["Bill"]
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
    useDeleteSingleProformaInvoiceMutation,
    useCreateBillInformationMutation,
    useGetSingleBillQuery
 
} = invoiceApiSlice;
