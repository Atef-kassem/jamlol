import { jamlolApi } from "./api";


export const driverApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDrivers: builder.query({
      query: () => ({
        url: '/drivers',
        method: 'GET',
      }),
      transformResponse: (response) => response.drivers,
      providesTags: ['Drivers'],
    }),
    createDriver: builder.mutation({
      query: (data) => ({
        url: '/drivers',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.driver,
      invalidatesTags: ['Drivers'],
    }),
    updateDriver: builder.mutation({
      query: ({id, data}) => ({
        url: `/drivers/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.driver,
      invalidatesTags: ['Drivers'],
    }),
    deleteDriver: builder.mutation({
      query: (id) => ({
        url: `/drivers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Drivers'],
    }),
  }),
});

export const { useGetAllDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } = driverApi;