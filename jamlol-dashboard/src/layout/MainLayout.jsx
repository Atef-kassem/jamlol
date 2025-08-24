import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./SharedLayout";
import ProtectedRoutes from "./ProtectedRoutes";

// Import your pages
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import TransportDashboard from "@/pages/TransportDashboard";
import UserProfile from "@/pages/UserProfile";
import UserSettings from "@/pages/UserSettings";
import CompanySettings from "@/pages/Settings/CompanySettings";
import UsersSettings from "@/pages/Settings/UsersSettings";
import RolesPermissions from "@/pages/Settings/RolesPermissions";
import ManagementSettings from "@/pages/Settings/ManagementSettings";
import AddSupplier from "@/pages/Suppliers/AddSupplier";
import SupplierApproval from "@/pages/Suppliers/SupplierApproval";
import SupplierProducts from "@/pages/Suppliers/SupplierProducts";
import SuppliersList from "@/pages/Suppliers/SuppliersList";
import SupplierDetails from "@/pages/Suppliers/SupplierDetails";
import ClientsList from "@/pages/Clients/ClientsList";
import ClientRegistration from "@/pages/Clients/ClientRegistration";
import ClientDetails from "@/pages/Clients/ClientDetails";
import ActiveOrders from "@/pages/Clients/ActiveOrders";
import PurchaseHistory from "@/pages/Clients/PurchaseHistory";
import ClientEvaluation from "@/pages/Clients/ClientEvaluation";
import ClientReports from "@/pages/Clients/ClientReports";
import CarriersList from "@/pages/Carriers/CarriersList";
import CarrierVehicles from "@/pages/Carriers/CarrierVehicles";
import CarrierPricing from "@/pages/Carriers/CarrierPricing";
import DriversList from "@/pages/Carriers/DriversList";
import CarrierReports from "@/pages/Carriers/CarrierReports";
import OrdersList from "@/pages/Orders/OrdersList";
import ProductsList from "@/pages/Products/ProductsList";
import ProductCategories from "@/pages/Products/ProductCategories";
import ProductUnits from "@/pages/Products/ProductUnits";
import ApprovedProducts from "@/pages/Products/ApprovedProducts";
import PendingProducts from "@/pages/Products/PendingProducts";
import ProductReports from "@/pages/Products/ProductReports";
import ReportsDashboard from "@/pages/Reports/ReportsDashboard";
import SalesReports from "@/pages/Reports/SalesReports";
import FinancialReports from "@/pages/Reports/FinancialReports";
import ReportsSettings from "@/pages/Reports/ReportsSettings";
import { AddressProvider } from '../contexts/AddressContext';
import { TransportProvider } from '../contexts/TransportContext';
import GeolocationSettings from "../pages/Settings/GeoLocationSettings";

export default function MainLayout() {
  return (
      <BrowserRouter>
        <Routes>
          {/* صفحة تسجيل الدخول خارج أي layout أو حماية */}
          <Route path="/login" element={<Login />} />
          {/* كل الصفحات المحمية داخل ProtectedRoutes وSharedLayout */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<TransportDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="user-settings" element={<UserSettings />} />
                             <Route path="settings/company" element={
                 <AddressProvider>
                 <CompanySettings />
                 </AddressProvider>} />
               <Route path="settings/managements" element={<ManagementSettings />} />
               <Route path="settings/users" element={<UsersSettings />} />
               <Route path="settings/roles" element={<RolesPermissions />} />
               <Route path="settings/geolocation" element={ 
               <AddressProvider>
               <GeolocationSettings />
               </AddressProvider>} />
              <Route path="suppliers/add" element={
                <AddressProvider>
                  <AddSupplier />
                 </AddressProvider>} />
              <Route path="suppliers/edit/:id" element={<AddSupplier />} />
              <Route path="suppliers/details/:id" element={<SupplierDetails />} />
              <Route path="suppliers/approval" element={<SupplierApproval />} />
              <Route path="suppliers/products" element={<SupplierProducts />} />
              <Route path="suppliers/list" element={<SuppliersList />} />
              <Route path="clients/list" element={<ClientsList />} />
              <Route path="clients/add" element={<ClientRegistration />} />
              <Route path="clients/edit/:id" element={<ClientRegistration />} />
              <Route path="clients/details/:id" element={<ClientDetails />} />
              <Route path="clients/registration" element={<ClientRegistration />} />
              <Route path="clients/orders" element={<ActiveOrders />} />
              <Route path="clients/purchase-history" element={<PurchaseHistory />} />
              <Route path="clients/reports" element={<ClientReports />} />
              <Route path="clients/evaluation" element={<ClientEvaluation />} />
              <Route path="carriers" element={<CarriersList />} />
              <Route path="carriers/list" element={<CarriersList />} />
                             <Route path="carriers/vehicles" element={<TransportProvider><CarrierVehicles /></TransportProvider>} />
              <Route path="carriers/pricing" element={<CarrierPricing />} />
              <Route path="carriers/drivers" element={<DriversList />} />
              <Route path="carriers/reports" element={<CarrierReports />} />
              <Route path="orders/pending" element={<OrdersList />} />
              <Route path="orders/processing" element={<OrdersList />} />
              <Route path="orders/completed" element={<OrdersList />} />
              <Route path="orders/cancelled" element={<OrdersList />} />
              <Route path="products/all" element={<ProductsList />} />
              <Route path="products/categories" element={<ProductCategories />} />
              <Route path="products/units" element={<ProductUnits />} />
              <Route path="products/approved" element={<ApprovedProducts />} />
              <Route path="products/pending" element={<PendingProducts />} />
              <Route path="products/reports" element={<ProductReports />} />
              <Route path="reports" element={<ReportsDashboard />} />
              <Route path="reports/dashboard" element={<ReportsDashboard />} />
              <Route path="reports/sales" element={<SalesReports />} />
              <Route path="reports/clients" element={<ClientReports />} />
              <Route path="reports/suppliers" element={<SuppliersList />} />
              <Route path="reports/carriers" element={<CarrierReports />} />
              <Route path="reports/financial" element={<FinancialReports />} />
              <Route path="reports/settings" element={<ReportsSettings />} />
              {/* Add more protected routes here */}
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}
