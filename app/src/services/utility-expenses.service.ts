import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const utilityExpensesServiceApi = createApi({
  reducerPath: "utilityExpensesApiService",
  refetchOnFocus: true,
  tagTypes: ["UtilityExpenses"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/utility_expenses",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllUtilityExpenses: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["UtilityExpenses"],
    }),
    findOneUtilityExpenses: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["UtilityExpenses"],
    }),
    createUtilityExpenses: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UtilityExpenses"],
    }),
    updateUtilityExpenses: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "UtilityExpenses", id },
      ],
    }),
    deleteUtilityExpenses: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UtilityExpenses"],
    }),
  }),
});

export const {
  useFindAllUtilityExpensesQuery,
  useFindOneUtilityExpensesQuery,
  useCreateUtilityExpensesMutation,
  useUpdateUtilityExpensesMutation,
  useDeleteUtilityExpensesMutation,
} = utilityExpensesServiceApi;
