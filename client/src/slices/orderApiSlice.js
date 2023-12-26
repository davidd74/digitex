import { BASE_URL, GET_ORDER_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: ({ page, limit }) => {
        console.log(page);
        console.log(limit);
        return {
          url: `${BASE_URL}/orders/user`,
          credentials: "include",
          params: {
            page: page || 1,
            limit: limit,
          },
        };
      },
      providesTags: ["Order"],
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${GET_ORDER_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/order`,
        credentials: "include",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
} = orderApiSlice;
