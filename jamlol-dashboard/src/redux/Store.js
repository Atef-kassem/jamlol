import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jamlolApi } from "./Slices/api";
export const store = configureStore({
  reducer: {
    [jamlolApi.reducerPath]: jamlolApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jamlolApi.middleware),
});

setupListeners(store.dispatch);
