import { apiSlice } from "../apiSlice";

export const deliveryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // Order and Buyer Related Endpoints
        getSingleDelivery: builder.query({
            query: (id) => `/delivery/${id}`,
            keepUnusedDataFor: 600,
            providesTags: ['Delivery']
        }),
        getAllDeliveryforAnSingleOrder: builder.query({
          query: (id) => `/order/delivery/${id}`,
          keepUnusedDataFor: 600,
          providesTags: ['Delivery']
      }),
        getAllDelivery: builder.query({
          query: ({ 
            page = 1, 
            limit = 50,
            id = "",
            orderNumber = "",
            companyName = "",
            buyerName = ""
          }) => {
            let params = new URLSearchParams();
            params.append("page", page);
            params.append("limit", limit);
            if (id) params.append("id", id);
            if (orderNumber) params.append("orderNumber", orderNumber);
            if (companyName) params.append("companyName", companyName);
            if (buyerName) params.append("buyerName", buyerName);
            return `delivery?${params.toString()}`;
          },
          keepUnusedDataFor: 600,
          providesTags: ['Delivery']
      }),
      deleteDelivery:builder.mutation({
        query:(id)=>({
            url: `/delivery?from=${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Delivery',"Order"]
    }),
    getAllDeliveryMan: builder.query({
      query: () => `/deliveryman`,
      keepUnusedDataFor: 600,
      
  }),
  createBillFromChalan: builder.mutation({
    query: (query) => ({
        url: '/delivery/bill',
        method: 'PATCH',
        body: query
    }),
    invalidatesTags: ['Delivery',"Order"]
}),
getBillForSingleOrder: builder.query({
  query: (id) => `/delivery/bill/${id}`,
  keepUnusedDataFor: 600,
  providesTags: ['Delivery']
}),
getAllDeliveryBills:builder.query({
  query: ({page,limit}) => `/delivery/bills?page=${page}&limit=${limit}`,
  keepUnusedDataFor: 600,
  providesTags: ['Delivery']
}),
updateBillNumberbyChalan:builder.mutation({
  query: ({id,billNumber}) => ({
      url: `/delivery/billNumber/${id}?billNumber=${billNumber}`,
      method: 'PATCH',
  }),
  invalidatesTags: ["Delivery"]
}),
deleteDeliveryBill:builder.mutation({
  query:(id)=>({
      url: `/delivery/billNumber/${id}`,
      method: 'POST',
  }),
  invalidatesTags: ['Delivery',"Order"]
}),
  }),
});
export const {
   useGetSingleDeliveryQuery,
   useGetAllDeliveryforAnSingleOrderQuery,
   useGetAllDeliveryQuery,
   useDeleteDeliveryMutation,
   useGetAllDeliveryManQuery,
   useCreateBillFromChalanMutation,
   useGetBillForSingleOrderQuery,
   useGetAllDeliveryBillsQuery,
   useUpdateBillNumberbyChalanMutation,
   useDeleteDeliveryBillMutation
   
} = deliveryApiSlice;
