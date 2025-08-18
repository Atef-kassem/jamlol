
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jamlolApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users", "App","Roles", "Permissions", "Geography", "OverallStat", "Dashboard"],
  endpoints: () => ({}),
});