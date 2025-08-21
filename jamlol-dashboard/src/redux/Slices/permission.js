import { jamlolApi } from "./api";


export const permissionApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPermissions: builder.query({
      query: () => ({
        url: '/permissions',
        method: 'GET',
      }),
      transformResponse: (response) => response.permissions,
      providesTags: ['Permissions'],
    }),
    createPermission: builder.mutation({
      query: (data) => ({
        url: '/permissions',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.permission,
      invalidatesTags: ['Permissions'],
    }),
    updatePermission: builder.mutation({
      query: ({id, data}) => ({
        url: `/permissions/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.permission,
      invalidatesTags: ['Permissions'],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Permissions'],
    }),
  }),
});

export const { useCreatePermissionMutation,useDeletePermissionMutation,useGetAllPermissionsQuery,useUpdatePermissionMutation } = permissionApi;