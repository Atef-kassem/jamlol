import React from "react";
import DateTimeFilter from "@/components/Dashboard/DateTimeFilter";
import StatsCards from "@/components/Dashboard/StatsCards";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DateTimeFilter />
      <StatsCards />
      <DashboardTabs />
    </div>
  );
}