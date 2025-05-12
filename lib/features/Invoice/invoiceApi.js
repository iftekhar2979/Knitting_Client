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
            query: ({page,limit,term}) => `/v1/bill?page=${page}&limit=${limit}&term=${term}`,
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
        deleteSingleBill:builder.mutation({
            query:(id)=>({
                url:  `/v1/bill/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bill',"Order"]
        }),
        updateBillNumber:builder.mutation({
            query: ({id,billNumber}) => ({
                url: `/v1/billNumber/${id}?billNumber=${billNumber}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Bill",'Order']
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
    useGetSingleBillQuery,
    useDeleteSingleBillMutation,
    useUpdateBillNumberMutation,
    // useUpdateBillNumberbyChalanMutation
} = invoiceApiSlice;
