import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/admin",
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
    }),
    deleteUsers: builder.mutation({
      query: ({ userIds }) => ({
        url: `/users/delete`,
        method: 'POST',
        body: { userIds },
      }),
    }),
  }),
});

export const {
  useDeleteUsersMutation,
  useGetActiveUsersLast30DaysQuery,
  useGetTotalUsersQuery,
  useGetUsersCreatedThisWeekQuery,
  useGetUsersCreatedLastWeekQuery,
  useGetAllUsersQuery,
} = UserApi;
