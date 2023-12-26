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
  }),
});

export const { useUpdateUserDetailsMutation, useSetUserAddressMutation } =
  userApiSlice;
