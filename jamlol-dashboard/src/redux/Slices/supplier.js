import { jamlolApi } from "./api";

export const supplierApi = jamlolApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Suppliers
    getAllSuppliers: builder.query({
      query: () => ({
        url: "/suppliers",
        method: "GET",
      }),
      transformResponse: (response) => response.suppliers, // حسب الريسبونس عندك
      providesTags: ["Suppliers"],
    }),

    // Get Supplier By Id
    getSupplierById: builder.query({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.supplier,
      providesTags: ["Suppliers"],
    }),

    // Get Suppliers By Region
    getSuppliersByRegion: builder.query({
      query: (regionId) => ({
        url: `/suppliers/region/${regionId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.suppliers,
      providesTags: ["Suppliers"],
    }),

    // Create Supplier
    createSupplier: builder.mutation({
      query: (data) => ({
        url: "/suppliers",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.supplier,
      invalidatesTags: ["Suppliers"],
    }),

    // Update Supplier
    updateSupplier: builder.mutation({
      query: ({ id, data }) => ({
        url: `/suppliers/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.supplier,
      invalidatesTags: ["Suppliers"],
    }),

    // Delete Supplier
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetAllSuppliersQuery,
  useGetSupplierByIdQuery,
  useGetSuppliersByRegionQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
