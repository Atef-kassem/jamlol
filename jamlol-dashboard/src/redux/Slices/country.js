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
      query: (data) => {
        console.log("Sending country creation request with data:", data);
        return {
          url: '/countries',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response) => {
        console.log("Raw API response:", response);
        return response.country || response;
      },
      invalidatesTags: ['Countries'],
    }),
    updateCountry: builder.mutation({
      query: ({id, data}) => {
        console.log("Sending country update request:", { id, data });
        return {
          url: `/countries/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      transformResponse: (response) => {
        console.log("Country update response:", response);
        return response.country || response;
      },
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