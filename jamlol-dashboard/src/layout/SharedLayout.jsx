import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

const SharedLayout = () => {

  return (
    <SidebarProvider>
    <div className="min-h-screen flex w-full bg-background overflow-x-hidden" dir="rtl">
      <div className="flex-1 flex flex-col min-w-0 order-1">
        <Header />
        <Toaster />
        <main className="flex-1 p-6 overflow-auto custom-scrollbar animate-fade-in overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <AppSidebar />
    </div>
    </SidebarProvider>
  );
};

export default SharedLayout;
