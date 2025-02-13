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
  tagTypes: ["User","challenge","Question"],
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
    getAllTopic: builder.query({
      query: () => "/topics",
    }),
    DeleteChallenge: builder.mutation({
      query: (data) => ({
        url: "/challenge/delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["challenge"],
    }),
    getAllChallenge: builder.query({
      query: () => "/challenge",
      providesTags: ["challenge"],
    }),
    getAllQuestion: builder.query({
      query: () => "/question",
      providesTags: ["Question"],
    }),
    CreateChallenge: builder.mutation({
      query: (data) => ({
        url: "/challengeCreate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["challenge"],
    }),
    DeleteQuestion: builder.mutation({
      query: (data) => ({
        url: "/question/delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Question"],
    }),

  }),
});


export const {
  useCreateChallengeMutation,
  useUpdateUserMutation, 
  useDeleteUsersMutation,
  useGetActiveUsersLast30DaysQuery,
  useGetTotalUsersQuery,
  useGetUsersCreatedThisWeekQuery,
  useGetUsersCreatedLastWeekQuery,
  useGetAllUsersQuery,
  useGetAllChallengeQuery,
  useGetAllTopicQuery,
  useDeleteChallengeMutation,
  useGetAllQuestionQuery,
  useDeleteQuestionMutation
} = UserApi;
