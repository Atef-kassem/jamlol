import { jamlolApi } from "./api";


export const managementApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllManagements: builder.query({
      query: () => ({
        url: '/management',
        method: 'GET',
      }),
      transformResponse: (response) => response.managements,
      providesTags: ['Managements'],
    }),
    createManagement: builder.mutation({
      query: (data) => ({
        url: '/management',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.management,
      invalidatesTags: ['Managements'],
    }),
    updateManagement: builder.mutation({
      query: ({id, data}) => ({
        url: `/management/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.management,
      invalidatesTags: ['Managements'],
    }),
    deleteManagement: builder.mutation({
      query: (id) => ({
        url: `/management/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Managements'],
    }),
    getManagementsWithPermissions: builder.query({
      query: () => ({
        url: '/management/permissions',
        method: 'GET',
      }),
      transformResponse: (response) => response.managements,
      providesTags: ['Managements'],
    }),
  }),
});

export const { useGetAllManagementsQuery, useCreateManagementMutation, useUpdateManagementMutation, useDeleteManagementMutation, useGetManagementsWithPermissionsQuery } = managementApi;