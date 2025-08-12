import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle, Users } from "lucide-react";

export function BranchStatsCards({ branches }) {
  const activeBranches = branches.filter(branch => branch.status === "نشط").length;
  const totalCapacity = branches.reduce((sum, branch) => sum + (branch.capacity || 0), 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الفروع</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{branches.length}</div>
          <p className="text-xs text-muted-foreground">
            فرع مسجل في النظام
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الفروع النشطة</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{activeBranches}</div>
          <p className="text-xs text-muted-foreground">
            من إجمالي {branches.length} فرع
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي السعة</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            شخص عبر جميع الفروع
          </p>
        </CardContent>
      </Card>
    </div>
  );
}