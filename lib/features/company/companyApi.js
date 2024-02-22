import { apiSlice } from "../apiSlice";

export const companySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // Company and Buyer Related Endpoints
        addCompany: builder.mutation({
            query: (body) => ({
                url: '/company',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['company']
        }),
        getCompany: builder.query({
            query: () => '/company',
            keepUnusedDataFor: 60,
            providesTags: ['company']
        }),
        editCompany:builder.mutation({
            query:({id,body})=>({
                url: `/company/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['company']
        }),
        addBuyer:builder.mutation({
            query:(body)=>({
                url: '/buyer',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['company']
        }),
        deleteCompany:builder.mutation({
            query:(id)=>({
                url: `/company/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['company']
        })
  }),
});
export const {
    useGetCompanyQuery,
    useAddCompanyMutation,
    useAddBuyerMutation,
    useDeleteCompanyMutation,
    useEditCompanyMutation
} = companySlice;
