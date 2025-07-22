import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";

// Layout and Pages
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import SupportChatbot from "@/components/SupportChatbot";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TransportDashboard from "./pages/TransportDashboard";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import CompanySettings from "./pages/Settings/CompanySettings";
import BranchSettings from "./pages/Settings/BranchSettings";
import UsersSettings from "./pages/Settings/UsersSettings";
import ThemeSettings from "./pages/Settings/ThemeSettings";
import SystemSettings from "./pages/Settings/SystemSettings";

import AdvancedSettings from "./pages/Settings/AdvancedSettings";
import RolesPermissions from "./pages/Settings/RolesPermissions";
import InventoryDashboard from "./pages/Inventory/InventoryDashboard";
import Warehouses from "./pages/Inventory/Warehouses";
import Items from "./pages/Inventory/Items";
import Suppliers from "./pages/Inventory/Suppliers";
import AddSupplier from "./pages/Suppliers/AddSupplier";
import SupplierApproval from "./pages/Suppliers/SupplierApproval";
import SupplierProducts from "./pages/Suppliers/SupplierProducts";
import PurchaseOrders from "./pages/Inventory/PurchaseOrders";
import GoodsReceipt from "./pages/Inventory/GoodsReceipt";
import InvoiceProcessing from "./pages/Inventory/InvoiceProcessing";
import PurchaseReturns from "./pages/Inventory/PurchaseReturns";
import DebitNote from "./pages/Inventory/DebitNote";
import InventoryTransactions from "./pages/Inventory/InventoryTransactions";

import OpeningStock from "./pages/Inventory/OpeningStock";
import ProcurementSettings from "./pages/Procurement/ProcurementSettings";
import PurchaseRequisition from "./pages/Procurement/PurchaseRequisition";
import RequestForQuotation from "./pages/Procurement/RequestForQuotation";
import ApprovalWorkflow from "./pages/Procurement/ApprovalWorkflow";
import InventoryMovementLog from "./pages/Inventory/InventoryMovementLog";
import StockTaking from "./pages/Inventory/StockTaking";
import InventoryPolicies from "./pages/Inventory/InventoryPolicies";
import InventoryAnalytics from "./pages/Inventory/InventoryAnalytics";
import NotFound from "./pages/NotFound";

// New Transport Platform Pages
import SuppliersList from "./pages/Suppliers/SuppliersList";
import ClientsList from "./pages/Clients/ClientsList";
import ClientRegistration from "./pages/Clients/ClientRegistration";
import ActiveOrders from "./pages/Clients/ActiveOrders";
import PurchaseHistory from "./pages/Clients/PurchaseHistory";
import ClientEvaluation from "./pages/Clients/ClientEvaluation";
import ClientReports from "./pages/Clients/ClientReports";
import CarriersList from "./pages/Carriers/CarriersList";
import CarrierRegistration from "./pages/Carriers/CarrierRegistration";
import CarrierVehicles from "./pages/Carriers/CarrierVehicles";
import CarrierPricing from "./pages/Carriers/CarrierPricing";
import CarrierEvaluation from "./pages/Carriers/CarrierEvaluation";
import CarrierCoverage from "./pages/Carriers/CarrierCoverage";
import CarrierReports from "./pages/Carriers/CarrierReports";
import NewOrder from "./pages/Orders/NewOrder";
import OrdersList from "./pages/Orders/OrdersList";
import PendingOrders from "./pages/Orders/PendingOrders";
import ProcessingOrders from "./pages/Orders/ProcessingOrders";
import OrderTracking from "./pages/Orders/OrderTracking";
import ProductsList from "./pages/Products/ProductsList";
import ProductCategories from "./pages/Products/ProductCategories";
import ProductUnits from "./pages/Products/ProductUnits";
import ApprovedProducts from "./pages/Products/ApprovedProducts";
import PendingProducts from "./pages/Products/PendingProducts";
import ProductReports from "./pages/Products/ProductReports";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full bg-background" dir="rtl">
      <div className="flex-1 flex flex-col min-w-0 order-1">
        <Header />
        <main className="flex-1 p-6 overflow-auto custom-scrollbar animate-fade-in">
          {children}
        </main>
      </div>
      <AppSidebar />
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SupportChatbot />
          <Routes>
            {/* جملول - صفحة الدخول الرئيسية */}
            <Route path="/" element={<Login />} />
            <Route path="/جملول" element={<Login />} />
            
            {/* صفحات المستخدم */}
            <Route path="/profile" element={
              <Layout>
                <UserProfile />
              </Layout>
            } />
            <Route path="/user-settings" element={
              <Layout>
                <UserSettings />
              </Layout>
            } />
            
            {/* الصفحات الداخلية بعد تسجيل الدخول */}
            <Route path="/dashboard" element={
              <Layout>
                <TransportDashboard />
              </Layout>
            } />
            <Route path="/settings/company" element={
              <Layout>
                <CompanySettings />
              </Layout>
            } />
            <Route path="/settings/branches" element={
              <Layout>
                <BranchSettings />
              </Layout>
            } />
            <Route path="/settings/users" element={
              <Layout>
                <UsersSettings />
              </Layout>
            } />
            <Route path="/settings/roles" element={
              <Layout>
                <RolesPermissions />
              </Layout>
            } />
            <Route path="/settings/themes" element={
              <Layout>
                <ThemeSettings />
              </Layout>
            } />
            <Route path="/settings/system" element={
              <Layout>
                <SystemSettings />
              </Layout>
            } />
            <Route path="/settings/advanced" element={
              <Layout>
                <AdvancedSettings />
              </Layout>
            } />
            <Route path="/settings/security" element={
              <Layout>
                <AdvancedSettings />
              </Layout>
            } />
            <Route path="/inventory" element={
              <Layout>
                <InventoryDashboard />
              </Layout>
            } />
            <Route path="/inventory/dashboard" element={
              <Layout>
                <InventoryDashboard />
              </Layout>
            } />
            <Route path="/warehouses" element={
              <Layout>
                <Warehouses />
              </Layout>
            } />
            <Route path="/items" element={
              <Layout>
                <Items />
              </Layout>
            } />
            <Route path="/suppliers" element={
              <Layout>
                <Suppliers />
              </Layout>
            } />
            <Route path="/suppliers/add" element={
              <Layout>
                <AddSupplier />
              </Layout>
            } />
            <Route path="/suppliers/approval" element={
              <Layout>
                <SupplierApproval />
              </Layout>
            } />
            <Route path="/suppliers/products" element={
              <Layout>
                <SupplierProducts />
              </Layout>
            } />
            <Route path="/suppliers/settings" element={
              <Layout>
                <Suppliers />
              </Layout>
            } />
            <Route path="/suppliers/management" element={
              <Layout>
                <Suppliers />
              </Layout>
            } />
            <Route path="/suppliers/contracts" element={
              <Layout>
                <Suppliers />
              </Layout>
            } />
            <Route path="/suppliers/payments" element={
              <Layout>
                <Suppliers />
              </Layout>
            } />
            <Route path="/suppliers/evaluation" element={
              <Layout>
                <Suppliers />
              </Layout>
            } />
            <Route path="/suppliers/reports" element={
              <Layout>
                <Suppliers />
              </Layout>
            } />
            <Route path="/purchase-orders" element={
              <Layout>
                <PurchaseOrders />
              </Layout>
            } />
            <Route path="/goods-receipt" element={
              <Layout>
                <GoodsReceipt />
              </Layout>
            } />
            <Route path="/invoice-processing" element={
              <Layout>
                <InvoiceProcessing />
              </Layout>
            } />
            <Route path="/purchase-returns" element={
              <Layout>
                <PurchaseReturns />
              </Layout>
            } />
            <Route path="/debit-note" element={
              <Layout>
                <DebitNote />
              </Layout>
            } />
            <Route path="/inventory-transactions" element={
              <Layout>
                <InventoryTransactions />
              </Layout>
            } />
            <Route path="/inventory/opening-stock" element={
              <Layout>
                <OpeningStock />
              </Layout>
            } />
            <Route path="/procurement/settings" element={
              <Layout>
                <ProcurementSettings />
              </Layout>
            } />
            <Route path="/procurement/requisition" element={
              <Layout>
                <PurchaseRequisition />
              </Layout>
            } />
            <Route path="/procurement/rfq" element={
              <Layout>
                <RequestForQuotation />
              </Layout>
            } />
            <Route path="/procurement/approval" element={
              <Layout>
                <ApprovalWorkflow />
              </Layout>
            } />
            <Route path="/inventory/movement-log" element={
              <Layout>
                <InventoryMovementLog />
              </Layout>
            } />
            <Route path="/inventory/stocktaking" element={
              <Layout>
                <StockTaking />
              </Layout>
            } />
            <Route path="/inventory/policies" element={
              <Layout>
                <InventoryPolicies />
              </Layout>
            } />
            <Route path="/inventory/analytics" element={
              <Layout>
                <InventoryAnalytics />
              </Layout>
            } />
            
            {/* Transport Platform Routes */}
            <Route path="/suppliers/list" element={
              <Layout>
                <SuppliersList />
              </Layout>
            } />
            <Route path="/clients/list" element={
              <Layout>
                <ClientsList />
              </Layout>
            } />
            <Route path="/clients/add" element={
              <Layout>
                <ClientRegistration />
              </Layout>
            } />
            <Route path="/clients/registration" element={
              <Layout>
                <ClientRegistration />
              </Layout>
            } />
            <Route path="/clients/orders" element={
              <Layout>
                <ActiveOrders />
              </Layout>
            } />
            <Route path="/clients/purchase-history" element={
              <Layout>
                <PurchaseHistory />
              </Layout>
            } />
            <Route path="/clients/reports" element={
              <Layout>
                <ClientReports />
              </Layout>
            } />
            <Route path="/clients/evaluation" element={
              <Layout>
                <ClientEvaluation />
              </Layout>
            } />
            <Route path="/carriers/list" element={
              <Layout>
                <CarriersList />
              </Layout>
            } />
            <Route path="/carriers/registration" element={
              <Layout>
                <CarrierRegistration />
              </Layout>
            } />
            <Route path="/carriers/vehicles" element={
              <Layout>
                <CarrierVehicles />
              </Layout>
            } />
            <Route path="/carriers/pricing" element={
              <Layout>
                <CarrierPricing />
              </Layout>
            } />
            <Route path="/carriers/evaluation" element={
              <Layout>
                <CarrierEvaluation />
              </Layout>
            } />
            <Route path="/carriers/coverage" element={
              <Layout>
                <CarrierCoverage />
              </Layout>
            } />
            <Route path="/carriers/reports" element={
              <Layout>
                <CarrierReports />
              </Layout>
            } />
            <Route path="/orders/new" element={
              <Layout>
                <NewOrder />
              </Layout>
            } />
            <Route path="/orders/pending" element={
              <Layout>
                <PendingOrders />
              </Layout>
            } />
            <Route path="/orders/processing" element={
              <Layout>
                <ProcessingOrders />
              </Layout>
            } />
            <Route path="/orders/completed" element={
              <Layout>
                <OrdersList />
              </Layout>
            } />
            <Route path="/orders/cancelled" element={
              <Layout>
                <OrdersList />
              </Layout>
            } />
            <Route path="/orders/tracking" element={
              <Layout>
                <OrderTracking />
              </Layout>
            } />
            <Route path="/products/all" element={
              <Layout>
                <ProductsList />
              </Layout>
            } />
            <Route path="/products/categories" element={
              <Layout>
                <ProductCategories />
              </Layout>
            } />
            <Route path="/products/units" element={
              <Layout>
                <ProductUnits />
              </Layout>
            } />
            <Route path="/products/approved" element={
              <Layout>
                <ApprovedProducts />
              </Layout>
            } />
            <Route path="/products/pending" element={
              <Layout>
                <PendingProducts />
              </Layout>
            } />
            <Route path="/products/reports" element={
              <Layout>
                <ProductReports />
              </Layout>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
