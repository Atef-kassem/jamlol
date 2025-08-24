import { jamlolApi } from "./api";


export const countryApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: () => ({
        url: '/countries',
        method: 'GET',
      }),
      transformResponse: (response) => response.countries,
      providesTags: ['Countries'],
    }),
    createCountry: builder.mutation({
      query: (data) => ({
        url: '/countries',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.country,
      invalidatesTags: ['Countries'],
    }),
    updateCountry: builder.mutation({
      query: ({id, data}) => ({
        url: `/countries/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.country,
      invalidatesTags: ['Countries'],
    }),
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `/countries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Countries'],
    }),
  }),
});

export const { useGetAllCountriesQuery, useCreateCountryMutation, useUpdateCountryMutation, useDeleteCountryMutation } = countryApi;