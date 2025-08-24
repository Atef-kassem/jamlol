import { jamlolApi } from "./api";


export const naqelApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNaqels: builder.query({
      query: () => ({
        url: '/naqlens',
        method: 'GET',
      }),
      transformResponse: (response) => response.naqleen,
      providesTags: ['Naqleen'],
    }),
    createNaqel: builder.mutation({
      query: (data) => ({
        url: '/naqlens',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.naqel,
      invalidatesTags: ['Naqleen'],
    }),
    updateNaqel: builder.mutation({
      query: ({id, data}) => ({
        url: `/naqlens/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.naqel,
      invalidatesTags: ['Naqleen'],
    }),
    deleteNaqel: builder.mutation({
      query: (id) => ({
        url: `/naqlens/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Naqleen'],
    }),
  }),
});

export const { useGetAllNaqelsQuery, useCreateNaqelMutation, useUpdateNaqelMutation, useDeleteNaqelMutation } = naqelApi;