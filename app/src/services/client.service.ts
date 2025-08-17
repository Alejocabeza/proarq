import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const clientServiceApi = createApi({
  reducerPath: "clientApiService",
  refetchOnFocus: true,
  tagTypes: ["Client"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/clients",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllClient: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["Client"],
    }),
    findAllClientByMonth: builder.query({
      query: () => "/by_month",
      providesTags: ["Client"],
    }),
    findOneClient: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Client"],
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    updateClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Client", id }],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useFindAllClientQuery,
  useFindAllClientByMonthQuery,
  useFindOneClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientServiceApi;
