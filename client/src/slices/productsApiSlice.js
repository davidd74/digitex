import { BASE_URL, PRODUCTS_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateCountInStock: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products/countinstock`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products/${data.productId}/reviews`,
        credentials: "include",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product, Review"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useUpdateCountInStockMutation,
  useCreateReviewMutation,
} = productsApiSlice;
