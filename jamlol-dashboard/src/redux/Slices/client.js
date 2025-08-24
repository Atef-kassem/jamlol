// src/redux/api/clientApi.js
import { jamlolApi } from "./api";

export const clientApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===== Get all clients =====
    getAllClients: builder.query({
      query: () => ({
        url: "/clients",
        method: "GET",
      }),
      transformResponse: (response) => response.clients,
      providesTags: ["Clients"],
    }),

    // ===== Get client by ID =====
    getClientById: builder.query({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.client,
      providesTags: (result, error, id) => [{ type: "Clients", id }],
    }),

    // ===== Create new client =====
    createClient: builder.mutation({
      query: (data) => ({
        url: "/clients",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.client,
      invalidatesTags: ["Clients"],
    }),

    // ===== Update client =====
    updateClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/clients/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.client,
      invalidatesTags: ["Clients"],
    }),

    // ===== Delete client =====
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),

    // ===== Get clients by region =====
    getClientsByRegion: builder.query({
      query: (regionId) => ({
        url: `/clients/region/${regionId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.clients,
      providesTags: ["Clients"],
    }),
  }),
});

// Export hooks
export const {
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetClientsByRegionQuery,
} = clientApi;
