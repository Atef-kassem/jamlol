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
    updateRole: builder.mutation({
      query: ({id, data}) => ({
        url: `/roles/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.role,
      invalidatesTags: ['Roles'],
    }),
    assignPermissionsToRole: builder.mutation({
      query: ({id, permissions}) => ({
        url: `/roles/${id}/assign-permissions`,
        method: 'PATCH',
        body: permissions,
      }),
      transformResponse: (response) => response.role,
      invalidatesTags: ['Roles'],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Roles'],
    }),
  }),
});

export const { useGetAllRolesQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation, useAssignPermissionsToRoleMutation } = roleApi;