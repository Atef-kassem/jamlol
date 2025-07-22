import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, CreditCard, Star, FileText, FileBarChart } from "lucide-react";
import SupplierSettings from "./SupplierSettings";
import SupplierManagement from "./SupplierManagement";
import SupplierPayments from "./SupplierPayments";
import SupplierEvaluation from "./SupplierEvaluation";
import SupplierContracts from "./SupplierContracts";
import SupplierReports from "./SupplierReports";

const Suppliers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // تحديد التاب الافتراضي بناءً على المسار
  const getDefaultTab = () => {
    const path = location.pathname;
    if (path.includes('/contracts')) return 'contracts';
    if (path.includes('/evaluation')) return 'evaluation';
    if (path.includes('/payments')) return 'payments';
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/management')) return 'suppliers';
    return searchParams.get("tab") || "settings";
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["settings", "suppliers", "payments", "evaluation", "contracts", "reports"].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab(getDefaultTab());
    }
  }, [searchParams, location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            إدارة الموردين
          </h1>
          <p className="text-muted-foreground">إدارة شاملة للموردين والشركاء التجاريين</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-6 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="settings" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Settings className="w-4 h-4" />
            إعدادات الموردين
          </TabsTrigger>
          <TabsTrigger 
            value="suppliers" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Users className="w-4 h-4" />
            إدارة الموردين
          </TabsTrigger>
          <TabsTrigger 
            value="contracts" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            عقود الموردين
          </TabsTrigger>
          <TabsTrigger 
            value="payments" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <CreditCard className="w-4 h-4" />
            مدفوعات الموردين
          </TabsTrigger>
          <TabsTrigger 
            value="evaluation" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Star className="w-4 h-4" />
            تقييم الموردين
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <FileBarChart className="w-4 h-4" />
            تقارير الموردين
          </TabsTrigger>
        </TabsList>

        {/* إعدادات الموردين */}
        <TabsContent value="settings">
          <SupplierSettings />
        </TabsContent>

        {/* إدارة الموردين */}
        <TabsContent value="suppliers">
          <SupplierManagement />
        </TabsContent>

        {/* عقود الموردين */}
        <TabsContent value="contracts">
          <SupplierContracts />
        </TabsContent>

        {/* مدفوعات الموردين */}
        <TabsContent value="payments">
          <SupplierPayments />
        </TabsContent>

        {/* تقييم الموردين */}
        <TabsContent value="evaluation">
          <SupplierEvaluation />
        </TabsContent>

        {/* تقارير الموردين */}
        <TabsContent value="reports">
          <SupplierReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Suppliers;