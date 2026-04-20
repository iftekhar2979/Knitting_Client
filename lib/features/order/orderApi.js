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
            query: ({ 
                page = 1, 
                limit = 30, 
                orderNumber = "", 
                companyName = "", 
                buyerName = "", 
                fabricsName = "", 
                season = "", 
                status = "" 
            }) => {
                let params = new URLSearchParams();
                params.append("page", page);
                params.append("limit", limit);
                if (orderNumber) params.append("orderNumber", orderNumber);
                if (companyName) params.append("companyName", companyName);
                if (buyerName) params.append("buyerName", buyerName);
                if (fabricsName) params.append("fabricsName", fabricsName);
                if (season) params.append("season", season);
                if (status) params.append("status", status);
                
                return `order?${params.toString()}`;
            },
            keepUnusedDataFor: 60,
            providesTags: ['Order']
        }),
        getInvoiceOrders: builder.query({
            query: () => '/v1/order',
            keepUnusedDataFor: 60,
            providesTags: ['Order']
        }),
        
        getSingleOrder: builder.query({
            query: (id) => `/order/${id}`,
            keepUnusedDataFor: 600,
            providesTags: ['Order']
        }),
        getSingleOrderForEdit: builder.query({
            query: (id) => `/edit/order/${id}`,
            keepUnusedDataFor: 600,
            providesTags: ['Order']
        }),
        getOnlyQuantityInfo: builder.query({
            query: (id) => `/quantity/order/${id}`,
            keepUnusedDataFor: 600,
            providesTags: ['Order',"Delivery"]
        }),
        editOrder:builder.mutation({
            query:({id,body})=>({
                url: `/order/${id}`,
                method: 'PATCH',
                body: body
            }),

            invalidatesTags: ['Order']
        }),
        editStatus:builder.mutation({
            query:({id,body})=>({
                url: `/orders/${id}/status`,
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
        }),
        createDelivery: builder.mutation({
            query: (query) => ({
                url: '/delivery',
                method: 'POST',
                body: query
            }),
            invalidatesTags: ['Delivery',"Order"]
        }),
        
  }),
});
export const {
    useGetOrderQuery,
    useAddOrderMutation,
    useGetOnlyQuantityInfoQuery,
    useGetSingleOrderQuery,
    useDeleteOrderMutation,
    useEditOrderMutation,
    useGetSingleOrderForEditQuery,
    useCreateDeliveryMutation,
    useGetInvoiceOrdersQuery,
    useEditStatusMutation
} = orderApiSlice;
