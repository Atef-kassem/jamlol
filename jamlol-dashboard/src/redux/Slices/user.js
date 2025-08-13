import { jamlolApi } from "./api";

export const userApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Users'],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.user,
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: ({id, data}) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.user,
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Users'],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.user,
      providesTags: ['Users'],
    }),
  }),
});

export const { useGetAllUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetUserByIdQuery } = userApi;