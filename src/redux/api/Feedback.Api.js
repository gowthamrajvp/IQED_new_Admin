import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FeedbackApi = createApi({
  reducerPath: "FeedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/admin",
    // baseUrl: "https://iqed-backend.vercel.app/user",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["feed"],
  endpoints: (builder) => ({
    getAllFeedback: builder.query({
      query: () => "feedback", // Updated endpoint
      providesTags:["feed"]
    }),
    getFeedbackById: builder.query({
      query: (id) => `feedback/${id}`, // Updated endpoint
    }),
    deleteFeedback: builder.mutation({
      query: (data) => ({
        url: "dlefeedback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["feed"],
    }),
  }),
});

export const { useGetAllFeedbackQuery, useGetFeedbackByIdQuery,useDeleteFeedbackMutation } = FeedbackApi;
