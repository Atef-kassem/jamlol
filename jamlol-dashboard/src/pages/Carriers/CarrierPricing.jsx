import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const CarrierPricing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterVehicleType, setFilterVehicleType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    carrierId: "",
    carrierName: "",
    vehicleType: "",
    zone: "",
    basePrice: "",
    pricePerKm: "",
    minimumCharge: "",
    maximumCharge: "",
    discountRate: "",
    effectiveDate: "",
    expiryDate: ""
  });
  const { toast } = useToast();

  // بيانات وهمية للأسعار
  const [pricingRules] = useState([
    {
      id: "1",
      carrierId: "CAR001",
      carrierName: "شركة النقل السريع",
      vehicleType: "شاحنة صغيرة",
      zone: "الرياض",
      basePrice: 50,
      pricePerKm: 2.5,
      minimumCharge: 75,
      maximumCharge: 500,
      discountRate: 10,
      effectiveDate: "2024-01-01",
      expiryDate: "2024-12-31",
      status: "active"
    },
    {
      id: "2",
      carrierId: "CAR002",
      carrierName: "ناقل المدن",
      vehicleType: "سيارة",
      zone: "جدة",
      basePrice: 30,
      pricePerKm: 1.8,
      minimumCharge: 45,
      maximumCharge: 300,
      effectiveDate: "2024-02-01",
      status: "active"
    },
    {
      id: "3",
      carrierId: "CAR003",
      carrierName: "النقل الذكي",
      vehicleType: "دراجة نارية",
      zone: "الدمام",
      basePrice: 20,
      pricePerKm: 1.2,
      minimumCharge: 25,
      maximumCharge: 150,
      discountRate: 5,
      effectiveDate: "2024-03-01",
      status: "pending"
    }
  ]);

  // إحصائيات الأسعار
  const stats = {
    totalRules: pricingRules.length,
    activeRules: pricingRules.filter(rule => rule.status === "active").length,
    averageBasePrice: Math.round(pricingRules.reduce((sum, rule) => sum + rule.basePrice, 0) / pricingRules.length),
    averagePricePerKm: Math.round((pricingRules.reduce((sum, rule) => sum + rule.pricePerKm, 0) / pricingRules.length) * 100) / 100
  };

  const filteredRules = pricingRules.filter(rule => {
    const matchesSearch = rule.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.carrierId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || filterStatus === "all" || rule.status === filterStatus;
    const matchesVehicleType = !filterVehicleType || filterVehicleType === "all" || rule.vehicleType === filterVehicleType;
    
    return matchesSearch && matchesStatus && matchesVehicleType;
  });

  const handleAddRule = () => {
    toast({
      title: "تم إضافة قاعدة التسعير",
      description: "تم حفظ قاعدة التسعير الجديدة بنجاح",
    });
    setIsDialogOpen(false);
    setNewRule({
      carrierId: "",
      carrierName: "",
      vehicleType: "",
      zone: "",
      basePrice: "",
      pricePerKm: "",
      minimumCharge: "",
      maximumCharge: "",
      discountRate: "",
      effectiveDate: "",
      expiryDate: ""
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">نشط</Badge>;
      case "inactive":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">غير نشط</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* عنوان الصفحة */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة أسعار الناقلين</h1>
          <p className="text-muted-foreground mt-2">
            إدارة وتتبع أسعار النقل لجميع الناقلين
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              إضافة قاعدة تسعير جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة قاعدة تسعير جديدة</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل قاعدة التسعير الجديدة للناقل
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carrierId">رقم الناقل</Label>
                  <Input
                    id="carrierId"
                    value={newRule.carrierId}
                    onChange={(e) => setNewRule({...newRule, carrierId: e.target.value})}
                    placeholder="CAR001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrierName">اسم الناقل</Label>
                  <Input
                    id="carrierName"
                    value={newRule.carrierName}
                    onChange={(e) => setNewRule({...newRule, carrierName: e.target.value})}
                    placeholder="اسم الناقل"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">نوع المركبة</Label>
                  <Select value={newRule.vehicleType} onValueChange={(value) => setNewRule({...newRule, vehicleType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المركبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="سيارة">سيارة</SelectItem>
                      <SelectItem value="شاحنة صغيرة">شاحنة صغيرة</SelectItem>
                      <SelectItem value="شاحنة كبيرة">شاحنة كبيرة</SelectItem>
                      <SelectItem value="دراجة نارية">دراجة نارية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zone">المنطقة</Label>
                  <Select value={newRule.zone} onValueChange={(value) => setNewRule({...newRule, zone: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الرياض">الرياض</SelectItem>
                      <SelectItem value="جدة">جدة</SelectItem>
                      <SelectItem value="الدمام">الدمام</SelectItem>
                      <SelectItem value="مكة">مكة</SelectItem>
                      <SelectItem value="المدينة">المدينة</SelectItem>
                      <SelectItem value="الطائف">الطائف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">السعر الأساسي (ر.س)</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={newRule.basePrice}
                    onChange={(e) => setNewRule({...newRule, basePrice: e.target.value})}
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricePerKm">السعر/كم (ر.س)</Label>
                  <Input
                    id="pricePerKm"
                    type="number"
                    step="0.1"
                    value={newRule.pricePerKm}
                    onChange={(e) => setNewRule({...newRule, pricePerKm: e.target.value})}
                    placeholder="2.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumCharge">الحد الأدنى (ر.س)</Label>
                  <Input
                    id="minimumCharge"
                    type="number"
                    value={newRule.minimumCharge}
                    onChange={(e) => setNewRule({...newRule, minimumCharge: e.target.value})}
                    placeholder="75"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maximumCharge">الحد الأقصى (ر.س) - اختياري</Label>
                  <Input
                    id="maximumCharge"
                    type="number"
                    value={newRule.maximumCharge}
                    onChange={(e) => setNewRule({...newRule, maximumCharge: e.target.value})}
                    placeholder="500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountRate">نسبة الخصم (%) - اختياري</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    value={newRule.discountRate}
                    onChange={(e) => setNewRule({...newRule, discountRate: e.target.value})}
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">تاريخ بداية السريان</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    value={newRule.effectiveDate}
                    onChange={(e) => setNewRule({...newRule, effectiveDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">تاريخ انتهاء السريان - اختياري</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newRule.expiryDate}
                    onChange={(e) => setNewRule({...newRule, expiryDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddRule}>
                حفظ قاعدة التسعير
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي القواعد</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRules}</div>
            <p className="text-xs text-muted-foreground">
              قاعدة تسعير مُسجلة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">القواعد النشطة</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRules}</div>
            <p className="text-xs text-muted-foreground">
              قاعدة نشطة حاليًا
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط السعر الأساسي</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageBasePrice} ر.س</div>
            <p className="text-xs text-muted-foreground">
              لجميع أنواع المركبات
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط السعر/كم</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averagePricePerKm} ر.س</div>
            <p className="text-xs text-muted-foreground">
              لكل كيلومتر
            </p>
          </CardContent>
        </Card>
      </div>

      {/* شريط البحث والفلاتر */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">البحث والفلترة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث في أسماء الناقلين أو أرقامهم أو المناطق..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="فلترة بالحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterVehicleType} onValueChange={setFilterVehicleType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="نوع المركبة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المركبات</SelectItem>
                <SelectItem value="سيارة">سيارة</SelectItem>
                <SelectItem value="شاحنة صغيرة">شاحنة صغيرة</SelectItem>
                <SelectItem value="شاحنة كبيرة">شاحنة كبيرة</SelectItem>
                <SelectItem value="دراجة نارية">دراجة نارية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* جدول قواعد التسعير */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">قواعد التسعير</CardTitle>
          <CardDescription>
            عرض وإدارة جميع قواعد التسعير للناقلين
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم الناقل</TableHead>
                  <TableHead className="text-right">اسم الناقل</TableHead>
                  <TableHead className="text-right">نوع المركبة</TableHead>
                  <TableHead className="text-right">المنطقة</TableHead>
                  <TableHead className="text-right">السعر الأساسي</TableHead>
                  <TableHead className="text-right">السعر/كم</TableHead>
                  <TableHead className="text-right">الحد الأدنى</TableHead>
                  <TableHead className="text-right">الحد الأقصى</TableHead>
                  <TableHead className="text-right">الخصم</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.carrierId}</TableCell>
                    <TableCell>{rule.carrierName}</TableCell>
                    <TableCell>{rule.vehicleType}</TableCell>
                    <TableCell>{rule.zone}</TableCell>
                    <TableCell>{rule.basePrice} ر.س</TableCell>
                    <TableCell>{rule.pricePerKm} ر.س</TableCell>
                    <TableCell>{rule.minimumCharge} ر.س</TableCell>
                    <TableCell>{rule.maximumCharge || "-"} ر.س</TableCell>
                    <TableCell>{rule.discountRate ? `${rule.discountRate}%` : "-"}</TableCell>
                    <TableCell>{getStatusBadge(rule.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                          <DropdownMenuItem>تعديل</DropdownMenuItem>
                          <DropdownMenuItem>تعطيل</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">حذف</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarrierPricing;