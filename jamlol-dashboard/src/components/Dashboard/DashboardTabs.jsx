import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServicePathsStatus } from "@/components/ServicePathsStatus";
import { ActiveAlerts } from "@/components/ActiveAlerts";
import { Home, BarChart3, Activity, FileText, Bell } from "lucide-react";
import OverviewTab from "./OverviewTab";
import AnalyticsTab from "./AnalyticsTab";
import OperationsTab from "./OperationsTab";
import ReportsTab from "./ReportsTab";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
        <TabsTrigger 
          value="overview" 
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
        >
          <Home className="w-4 h-4" />
          نظرة عامة
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
        >
          <BarChart3 className="w-4 h-4" />
          التحليلات
        </TabsTrigger>
        <TabsTrigger 
          value="operations" 
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
        >
          <Activity className="w-4 h-4" />
          العمليات
        </TabsTrigger>
        <TabsTrigger 
          value="reports" 
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
        >
          <FileText className="w-4 h-4" />
          التقارير
        </TabsTrigger>
        <TabsTrigger 
          value="alerts" 
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
        >
          <Bell className="w-4 h-4 animate-pulse" />
          التنبيهات
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        <AnalyticsTab />
      </TabsContent>

      <TabsContent value="operations" className="space-y-6">
        <OperationsTab />
      </TabsContent>

      <TabsContent value="reports" className="space-y-6">
        <ReportsTab />
      </TabsContent>

      <TabsContent value="alerts" className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <ServicePathsStatus />
          <ActiveAlerts />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;