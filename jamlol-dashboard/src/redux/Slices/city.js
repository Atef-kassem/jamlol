import { jamlolApi } from "./api";


export const cityApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCities: builder.query({
      query: () => ({
        url: '/cities',
        method: 'GET',
      }),
      transformResponse: (response) => response.cities,
      providesTags: ['Cities'],
    }),
    createCity: builder.mutation({
      query: (data) => ({
        url: '/cities',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.country,
      invalidatesTags: ['Cities'],
    }),
    updateCity: builder.mutation({
      query: ({id, data}) => ({
        url: `/cities/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.city,
      invalidatesTags: ['Cities'],
    }),
    deleteCity: builder.mutation({
      query: (id) => ({
        url: `/cities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cities'],
    }),
    getCitiesByCountry: builder.query({
      query: (countryId) => ({
        url: `/cities?country_id=${countryId}`,
        method: 'GET',
      }),
      transformResponse: (response) => response.cities,
      providesTags: ['Cities'],
    }),
  }),
});

export const { useGetAllCitiesQuery, useCreateCityMutation, useUpdateCityMutation, useDeleteCityMutation, useGetCitiesByCountryQuery } = cityApi;