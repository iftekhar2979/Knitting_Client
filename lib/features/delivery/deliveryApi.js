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
          query: () => `/delivery`,
          keepUnusedDataFor: 600,
          providesTags: ['Delivery']
      }),
      deleteDelivery:builder.mutation({
        query:(id)=>({
            url: `/delivery?from=${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Delivery',"Order"]
    })
    
  }),
});
export const {
   useGetSingleDeliveryQuery,
   useGetAllDeliveryforAnSingleOrderQuery,
   useGetAllDeliveryQuery,
   useDeleteDeliveryMutation
   
} = deliveryApiSlice;
