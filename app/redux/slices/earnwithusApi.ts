// store/api/settingsApi.ts
import { API } from "@/app/utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const earnwithusApi = createApi({
  reducerPath: "earnwithusApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
  endpoints: (builder) => ({
    fetchEarnWithUs: builder.query({
      query: (userId) => `/earnwithus/${userId}`,
    }),
  }),
});

export const { useFetchEarnWithUsQuery } = earnwithusApi;
