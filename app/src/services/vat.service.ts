import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const vatServiceApi = createApi({
  reducerPath: "vatApiService",
  refetchOnFocus: true,
  tagTypes: ["Vat"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/vats",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllVat: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["Vat"],
    }),
    findOneVat: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Vat"],
    }),
    createVat: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vat"],
    }),
    updateVat: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Vat", id }],
    }),
    deleteVat: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vat"],
    }),
  }),
});

export const {
  useFindAllVatQuery,
  useFindOneVatQuery,
  useCreateVatMutation,
  useUpdateVatMutation,
  useDeleteVatMutation,
} = vatServiceApi;
