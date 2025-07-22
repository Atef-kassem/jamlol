import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, MapPin, Calendar, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types
interface SupplierCategory {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

interface SupplyRegion {
  id: string;
  name: string;
  branches: string[];
  active: boolean;
}

interface PaymentTerm {
  id: string;
  name: string;
  days: number;
  description: string;
}

const SupplierSettings = () => {
  const { toast } = useToast();

  // State for Settings
  const [categories, setCategories] = useState<SupplierCategory[]>([
    { id: "1", name: "مورد مواد كيميائية", description: "موردي مواد التنظيف والمعقمات", active: true },
    { id: "2", name: "مورد قطع غيار", description: "موردي قطع غيار السيارات", active: true },
    { id: "3", name: "مورد زيوت", description: "موردي الزيوت ومواد التشحيم", active: true },
  ]);

  const [regions, setRegions] = useState<SupplyRegion[]>([
    { id: "1", name: "الرياض", branches: ["الفرع الرئيسي", "فرع العليا"], active: true },
    { id: "2", name: "جدة", branches: ["فرع جدة"], active: true },
    { id: "3", name: "الدمام", branches: ["فرع الدمام"], active: true },
  ]);

  const [paymentTerms, setPaymentTerms] = useState<PaymentTerm[]>([
    { id: "1", name: "30 يوم", days: 30, description: "الدفع خلال 30 يوم من تاريخ الفاتورة" },
    { id: "2", name: "عند التسليم", days: 0, description: "الدفع فور استلام البضاعة" },
    { id: "3", name: "دفعات", days: 60, description: "دفع على دفعات حسب الاتفاق" },
  ]);

  // Form states
  const [newCategory, setNewCategory] = useState({ name: "", description: "", active: true });

  // Functions
  const addCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "خطأ في التسجيل",
        description: "يرجى إدخال اسم التصنيف",
        variant: "destructive",
      });
      return;
    }

    const category: SupplierCategory = {
      id: Date.now().toString(),
      ...newCategory
    };

    setCategories(prev => [...prev, category]);
    setNewCategory({ name: "", description: "", active: true });
    
    toast({
      title: "تم الإضافة بنجاح",
      description: "تم إضافة التصنيف الجديد",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            إعدادات الموردين
          </h1>
          <p className="text-muted-foreground">تكوين تصنيفات الموردين ومناطق التوريد وشروط الدفع</p>
        </div>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="categories" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Package className="w-4 h-4" />
            التصنيفات
          </TabsTrigger>
          <TabsTrigger 
            value="regions" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <MapPin className="w-4 h-4" />
            المناطق
          </TabsTrigger>
          <TabsTrigger 
            value="payment" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            شروط الدفع
          </TabsTrigger>
          <TabsTrigger 
            value="statistics" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <PieChart className="w-4 h-4" />
            الإحصائيات
          </TabsTrigger>
        </TabsList>

        {/* تصنيفات الموردين */}
        <TabsContent value="categories">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                تصنيفات الموردين
              </CardTitle>
              <CardDescription>تعريف أنواع الموردين وتصنيفاتهم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="categoryName">اسم التصنيف</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="مثل: مورد مواد كيميائية"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryDesc">وصف التصنيف</Label>
                  <Textarea
                    id="categoryDesc"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="وصف تفصيلي للتصنيف"
                    rows={2}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newCategory.active}
                    onCheckedChange={(checked) => setNewCategory(prev => ({ ...prev, active: checked }))}
                  />
                  <Label>فعال</Label>
                </div>
                <Button onClick={addCategory} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة التصنيف
                </Button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <Badge variant={category.active ? "default" : "secondary"}>
                      {category.active ? "فعال" : "غير فعال"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* مناطق التوريد */}
        <TabsContent value="regions">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                مناطق التوريد
              </CardTitle>
              <CardDescription>ربط الموردين بالمناطق والفروع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {regions.map((region) => (
                  <div key={region.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{region.name}</h4>
                      <Badge variant={region.active ? "default" : "secondary"}>
                        {region.active ? "فعال" : "غير فعال"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      الفروع: {region.branches.join("، ")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* شروط الدفع */}
        <TabsContent value="payment">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                شروط الدفع
              </CardTitle>
              <CardDescription>تحديد سياسات الدفع للموردين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {paymentTerms.map((term) => (
                  <div key={term.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{term.name}</h4>
                      <Badge variant="outline">{term.days} يوم</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{term.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إحصائيات سريعة */}
        <TabsContent value="statistics">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                إحصائيات سريعة
              </CardTitle>
              <CardDescription>ملخص بيانات إعدادات الموردين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">عدد التصنيفات</span>
                  <Badge variant="outline">{categories.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">عدد المناطق</span>
                  <Badge variant="outline">{regions.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">شروط الدفع</span>
                  <Badge variant="outline">{paymentTerms.length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierSettings;