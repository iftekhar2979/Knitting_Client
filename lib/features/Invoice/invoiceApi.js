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
            query: ({ page = 1, limit = 50, term = '', companyName = '', buyerName = '', sort = 'desc' }) => {
                let params = new URLSearchParams();
                params.append("page", page);
                params.append("limit", limit);
                if (term) params.append("term", term);
                if (companyName) params.append("companyName", companyName);
                if (buyerName) params.append("buyerName", buyerName);
                if (sort) params.append("sort", sort);
                
                return `/v1/bill?${params.toString()}`;
            },
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
