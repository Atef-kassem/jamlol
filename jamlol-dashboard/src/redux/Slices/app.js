import { jamlolApi } from "./api";


export const appApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApps: builder.query({
      query: () => ({
        url: '/app',
        method: 'GET',
      }),
      transformResponse: (response) => response.app[0],

      providesTags: ['App'],
    }),
    updateApp: builder.mutation({
      query: ({ formData }) => ({
        url: `/app/${formData.get('id')}`,
        method: 'PATCH',
        body: formData,
      }),
      transformResponse: (response) => response.app,
      invalidatesTags: ['App'],
    }),
  }),
});

export const { useGetAllAppsQuery, useUpdateAppMutation } = appApi;