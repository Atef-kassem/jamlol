import { jamlolApi } from "./api";


export const carApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => ({
        url: '/cars',
        method: 'GET',
      }),
      transformResponse: (response) => response.cars,
      providesTags: ['Cars'],
    }),
    createCar: builder.mutation({
      query: (data) => ({
        url: '/cars',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.car,
      invalidatesTags: ['Cars'],
    }),
    updateCar: builder.mutation({
      query: ({id, data}) => ({
        url: `/cars/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.car,
      invalidatesTags: ['Cars'],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cars'],
    }),
  }),
});

export const { useGetAllCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation } = carApi;