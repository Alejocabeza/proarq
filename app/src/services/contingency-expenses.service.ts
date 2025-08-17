import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const contingencyExpensesServiceApi = createApi({
  reducerPath: "contingencyExpensesApiService",
  refetchOnFocus: true,
  tagTypes: ["ContingencyExpenses"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/contingency_expenses",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllContingencyExpenses: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["ContingencyExpenses"],
    }),
    findOneContingencyExpenses: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["ContingencyExpenses"],
    }),
    createContingencyExpenses: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContingencyExpenses"],
    }),
    updateContingencyExpenses: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ContingencyExpenses", id },
      ],
    }),
    deleteContingencyExpenses: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ContingencyExpenses"],
    }),
  }),
});

export const {
  useFindAllContingencyExpensesQuery,
  useFindOneContingencyExpensesQuery,
  useCreateContingencyExpensesMutation,
  useUpdateContingencyExpensesMutation,
  useDeleteContingencyExpensesMutation,
} = contingencyExpensesServiceApi;
