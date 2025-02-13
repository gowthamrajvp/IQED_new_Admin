import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://iqed-backend.vercel.app/admin' 
    }), 
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getAllOrders: builder.query({
      query: () => '/orders',
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, orderStatus }) => ({
        url: `/orders/${id}/status`,
        method: 'PUT',
        body: { orderStatus },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = ordersApi;
