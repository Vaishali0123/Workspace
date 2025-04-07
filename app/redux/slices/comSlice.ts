// store/api/settingsApi.ts
import { API } from "@/app/utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetchComApi = createApi({
  reducerPath: "fetchComApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
  endpoints: (builder) => ({
    fetchCom: builder.query({
      query: (userId) => `/getcommunities/${userId}`,
    }),
  }),
});

export const { useFetchComQuery } = fetchComApi;
