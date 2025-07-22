import { useState } from "react";
import { Building2, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const branches = [
  { id: "all", name: "جميع الفروع", cars: 87, revenue: "15,420", status: "active" },
  { id: "alolaya", name: "فرع العليا", cars: 45, revenue: "8,200", status: "active" },
  { id: "alshifa", name: "فرع الشفا", cars: 28, revenue: "4,800", status: "active" },
  { id: "alqaseem", name: "فرع القصيم", cars: 14, revenue: "2,420", status: "maintenance" },
];

export function BranchSelector() {
  const [selectedBranch, setSelectedBranch] = useState("all");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">اختيار الفرع</h3>
        </div>
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="اختر الفرع" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {branches.map((branch) => (
          <Card 
            key={branch.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedBranch === branch.id ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onClick={() => setSelectedBranch(branch.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm">{branch.name}</h4>
                <Badge 
                  variant={branch.status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {branch.status === "active" ? "نشط" : "صيانة"}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">السيارات</span>
                  <span className="font-medium">{branch.cars}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الإيرادات</span>
                  <span className="font-medium">{branch.revenue} ريال</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}