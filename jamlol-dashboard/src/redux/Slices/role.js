import { jamlolApi } from "./api";


export const roleApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        url: '/roles',
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Roles'],
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: `/roles`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.role,
      invalidatesTags: ['Roles'],
    }),
  }),
});

export const { useGetAllRolesQuery, useCreateRoleMutation } = roleApi;