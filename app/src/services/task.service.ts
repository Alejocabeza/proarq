import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const taskServiceApi = createApi({
  reducerPath: "taskApiService",
  refetchOnFocus: true,
  tagTypes: ["task"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/tasks",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAllTask: builder.query({
      query: ({ limit, offset }) => {
        let query = "?limit=" + limit + "&offset=" + offset;
        if (!offset) query = "?limit=" + limit;
        if (!limit) query = "?offset=" + offset;
        if (!limit && !offset) query = "";
        return query;
      },
      providesTags: ["task"],
    }),
    findTaskCount: builder.query({
      query: ({ status }) => {
        return "/status?status=" + status;
      },
      providesTags: ["task"],
    }),
    findOneTask: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["task"],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task"],
    }),
  }),
});

export const {
  useFindAllTaskQuery,
  useFindTaskCountQuery,
  useFindOneTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskServiceApi;
