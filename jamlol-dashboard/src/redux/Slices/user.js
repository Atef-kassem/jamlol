import { jamlolApi } from "./api";

export const userApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),
  
  }),
});

export const { useGetAllUsersQuery } = userApi;