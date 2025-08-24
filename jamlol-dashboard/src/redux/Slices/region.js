import { jamlolApi } from "./api";


export const regionApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegions: builder.query({
      query: () => ({
        url: '/regions',
        method: 'GET',
      }),
      transformResponse: (response) => response.regions,
      providesTags: ['Regions'],
    }),
    createRegion: builder.mutation({
      query: (data) => ({
        url: '/regions',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.country,
      invalidatesTags: ['Regions'],
    }),
    updateRegion: builder.mutation({
      query: ({id, data}) => ({
        url: `/regions/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.region,
      invalidatesTags: ['Regions'],
    }),
    deleteRegion: builder.mutation({
      query: (id) => ({
        url: `/regions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Regions'],
    }),
  }),
});

export const { useGetAllRegionsQuery, useCreateRegionMutation, useUpdateRegionMutation, useDeleteRegionMutation } = regionApi;