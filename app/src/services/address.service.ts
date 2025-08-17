import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const addressServiceApi = createApi({
  reducerPath: "addressApiService",
  refetchOnFocus: true,
  tagTypes: ["Address"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/addresses",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllAddress: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["Address"],
    }),
    findOneAddress: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Address"],
    }),
    createAddress: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Address", id }],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useFindAllAddressQuery,
  useFindOneAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressServiceApi;
