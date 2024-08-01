import { apiSlice } from "../apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Company and Buyer Related Endpoints

    getDashboardPopularTable: builder.query({
      query: () => '/v1/analytics/popular',
      keepUnusedDataFor: 600,
      providesTags: ['Product', 'company',"Order"]
    }),
    getUnitWiseGraph: builder.query({
      query: () => '/v1/analytics/unit',
      keepUnusedDataFor: 600,
      providesTags: ['Product', 'company',"Order"]
    }),
    getProductPieChart: builder.query({
      query: () => '/v1/analytics/fabric',
      keepUnusedDataFor: 600,
      providesTags: ['Product', 'company',"Order"]
    }),
    getCompanyFabricsAndOrderCount: builder.query({
      query: (range) => `/v1/analytics/all?range=${range}`,
      keepUnusedDataFor: 600,
      providesTags: ['Product', 'company',"Order"]
    }),

  }),
});
export const {
  useGetDashboardPopularTableQuery,
  useGetUnitWiseGraphQuery,
useGetProductPieChartQuery,
useGetCompanyFabricsAndOrderCountQuery
} = dashboardApi;
