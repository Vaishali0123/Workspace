import { API } from "@/app/utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeAnalyticsApi = createApi({
  reducerPath: "storeAnalyticsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
  endpoints: (builder) => ({
    fetchStoreAnalytics: builder.query({
      query: ({ userId, nav }) => ({
        url: `/trackSellerOrder/${userId}`,
        params: { nav },
      }),
    }),
  }),
});

export const { useFetchStoreAnalyticsQuery } = storeAnalyticsApi;
