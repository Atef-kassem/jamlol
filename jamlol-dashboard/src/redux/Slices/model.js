import { jamlolApi } from "./api";


export const modelApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllModels: builder.query({
      query: () => ({
        url: '/models',
        method: 'GET',
      }),
      transformResponse: (response) => response.models,
      providesTags: ['Models'],
    }),
    createModel: builder.mutation({
      query: (data) => ({
        url: '/models',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.model,
      invalidatesTags: ['Models'],
    }),
    updateModel: builder.mutation({
      query: ({id, data}) => ({
        url: `/models/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.model,
      invalidatesTags: ['Models'],
    }),
    deleteModel: builder.mutation({
      query: (id) => ({
        url: `/models/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Models'],
    }),
  }),
});

export const { useGetAllModelsQuery, useCreateModelMutation, useUpdateModelMutation, useDeleteModelMutation } = modelApi;