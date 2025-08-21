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
      query: (data) => {
        console.log("Sending region creation request with data:", data);
        return {
          url: '/regions',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response) => {
        console.log("Raw region API response:", response);
        return response.region || response;
      },
      invalidatesTags: ['Regions'],
    }),
    updateRegion: builder.mutation({
      query: ({id, data}) => {
        console.log("Sending region update request:", { id, data });
        return {
          url: `/regions/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      transformResponse: (response) => {
        console.log("Region update response:", response);
        return response.region || response;
      },
      invalidatesTags: ['Regions'],
    }),
    deleteRegion: builder.mutation({
      query: (id) => ({
        url: `/regions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Regions'],
    }),
    getRegionsByCity: builder.query({
      query: (cityId) => ({
        url: `/regions?city_id=${cityId}`,
        method: 'GET',
      }),
      transformResponse: (response) => response.regions,
      providesTags: ['Regions'],
    }),
  }),
});

export const { useGetAllRegionsQuery, useCreateRegionMutation, useUpdateRegionMutation, useDeleteRegionMutation, useGetRegionsByCityQuery } = regionApi;