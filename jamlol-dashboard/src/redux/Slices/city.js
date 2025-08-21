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
      query: (data) => {
        console.log("Sending city creation request with data:", data);
        return {
          url: '/cities',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response) => {
        console.log("Raw city API response:", response);
        return response.city || response;
      },
      invalidatesTags: ['Cities'],
    }),
    updateCity: builder.mutation({
      query: ({id, data}) => {
        console.log("Sending city update request:", { id, data });
        return {
          url: `/cities/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      transformResponse: (response) => {
        console.log("City update response:", response);
        return response.city || response;
      },
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