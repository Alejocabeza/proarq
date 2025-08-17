import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const serviceCategoryServiceApi = createApi({
  reducerPath: "serviceCategoryApiService",
  refetchOnFocus: true,
  tagTypes: ["ServiceCategory"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/service_categories",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllServiceCategory: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["ServiceCategory"],
    }),
    findOneServiceCategory: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["ServiceCategory"],
    }),
    createServiceCategory: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceCategory"],
    }),
    updateServiceCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ServiceCategory", id },
      ],
    }),
    deleteServiceCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceCategory"],
    }),
  }),
});

export const {
  useFindAllServiceCategoryQuery,
  useFindOneServiceCategoryQuery,
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} = serviceCategoryServiceApi;
