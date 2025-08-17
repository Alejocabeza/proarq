import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const userServiceApi = createApi({
  reducerPath: "userApiService",
  refetchOnFocus: true,
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/users",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user.access_token) {
        headers.set("Authorization", `Bearer ${session.user.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => "",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: ``,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = userServiceApi;
