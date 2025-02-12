import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/admin",
    // baseUrl: "http://localhost:4000/admin",
    // baseUrl: "https://iqed-backend.vercel.app/user",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getActiveUsersLast30Days: builder.query({
      query: () => "/users/active-last-30-days",
    }),
    getTotalUsers: builder.query({
      query: () => "/users/total",
    }),
    getUsersCreatedThisWeek: builder.query({
      query: () => "/users/created-this-week",
    }),
    getUsersCreatedLastWeek: builder.query({
      query: () => "/users/created-last-week",
    }),
    getAllUsers: builder.query({
      query: () => "/users/all",
      providesTags: ["User"],
    }),
    deleteUsers: builder.mutation({
      query: ({ userIds }) => ({
        url: `/users/delete`,
        method: 'POST',
        body: { userIds },
      }),
      invalidatesTags: ["User"],
    }),
    UpdateUser: builder.mutation({
      query: (data) => ({
        url: "/users/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useDeleteUsersMutation,
  useGetActiveUsersLast30DaysQuery,
  useGetTotalUsersQuery,
  useGetUsersCreatedThisWeekQuery,
  useGetUsersCreatedLastWeekQuery,
  useGetAllUsersQuery,
} = UserApi;
