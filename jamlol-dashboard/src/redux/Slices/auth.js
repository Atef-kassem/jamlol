import { jamlolApi } from "./api";

export const authApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        body: loginData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      // Clear token on logout
      onQueryStarted: async (_, { dispatch }) => {
        localStorage.removeItem("token");
        dispatch(userApi.util.resetApiState());
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;