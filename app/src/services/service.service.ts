import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const serviceServiceApi = createApi({
  reducerPath: "serviceApiService",
  refetchOnFocus: true,
  tagTypes: ["Service"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/services",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllService: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["Service"],
    }),
    findOneService: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Service"],
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useFindAllServiceQuery,
  useFindOneServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceServiceApi;
