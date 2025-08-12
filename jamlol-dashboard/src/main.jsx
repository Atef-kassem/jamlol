import React from 'react'
import { createRoot } from 'react-dom/client'
import MainLayout from './layout/MainLayout'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/Store';

console.log("🚀 Starting Jamlool App...");

try {
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
      <MainLayout />
      </Provider>
    </React.StrictMode>
  );
  console.log("✅ App rendered successfully");
} catch (error) {
  console.error("❌ Error rendering app:", error);
}