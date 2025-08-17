import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const adminExpensesServiceApi = createApi({
  reducerPath: "adminExpensesApiService",
  refetchOnFocus: true,
  tagTypes: ["AdminExpenses"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/admin_expenses",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllAdminExpenses: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["AdminExpenses"],
    }),
    findOneAdminExpenses: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["AdminExpenses"],
    }),
    createAdminExpenses: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminExpenses"],
    }),
    updateAdminExpenses: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AdminExpenses", id },
      ],
    }),
    deleteAdminExpenses: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminExpenses"],
    }),
  }),
});

export const {
  useFindAllAdminExpensesQuery,
  useFindOneAdminExpensesQuery,
  useCreateAdminExpensesMutation,
  useUpdateAdminExpensesMutation,
  useDeleteAdminExpensesMutation,
} = adminExpensesServiceApi;
