import { BASE_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/user/update-details`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    setUserAddress: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/user/address`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/signup`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/login`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateUserDetailsMutation,
  useSetUserAddressMutation,
  useSignUpMutation,
  useLoginMutation,
} = userApiSlice;
