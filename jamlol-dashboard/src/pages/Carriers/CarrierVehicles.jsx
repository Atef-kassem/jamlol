import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, Car, Truck, Bike, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useTransport } from "@/contexts/TransportContext";

const CarrierVehicles = () => {
  const { toast } = useToast();
  const { getActiveTransportMethods, getTransportMethodById } = useTransport();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const vehicles = [
    {
      id: 1,
      type: "شاحنة كبيرة",
      capacity: "15 طن",
      icon: Truck,
      pricePerKm: "3.5",
      description: "شاحنات للحمولات الثقيلة",
      activeCount: 45,
      availableCount: 32,
      maintenanceCount: 8,
      busyCount: 5
    },
    {
      id: 2,
      type: "شاحنة متوسطة",
      capacity: "8 طن",
      icon: Truck,
      pricePerKm: "2.8",
      description: "شاحنات للحمولات المتوسطة",
      activeCount: 28,
      availableCount: 22,
      maintenanceCount: 4,
      busyCount: 2
    },
    {
      id: 3,
      type: "شاحنة صغيرة",
      capacity: "3 طن",
      icon: Car,
      pricePerKm: "2.0",
      description: "شاحنات للحمولات الخفيفة",
      activeCount: 67,
      availableCount: 45,
      maintenanceCount: 12,
      busyCount: 10
    },
    {
      id: 4,
      type: "دراجة نارية",
      capacity: "50 كيلو",
      icon: Bike,
      pricePerKm: "1.2",
      description: "للتوصيل السريع داخل المدن",
      activeCount: 89,
      availableCount: 76,
      maintenanceCount: 8,
      busyCount: 5
    },
    {
      id: 5,
      type: "شاحنة مبردة",
      capacity: "12 طن",
      icon: Truck,
      pricePerKm: "4.2",
      description: "نقل البضائع المبردة والمجمدة",
      activeCount: 15,
      availableCount: 12,
      maintenanceCount: 2,
      busyCount: 1
    }
  ];

  const [newVehicle, setNewVehicle] = useState({
    type: "",
    capacity: "",
    pricePerKm: "",
    description: ""
  });

  // Get active transport methods for the select options
  const activeTransportMethods = getActiveTransportMethods();

  const handleVehicleTypeChange = (value) => {
    setNewVehicle(prev => ({ 
      ...prev, 
      type: value
    }));
    
    // Auto-fill capacity when vehicle type is selected
    const selectedMethod = getTransportMethodById(value);
    if (selectedMethod) {
      setNewVehicle(prev => ({ 
        ...prev, 
        capacity: selectedMethod.capacity
      }));
    }
  };

  const getStatusColor = (status, count) => {
    if (count === 0) return "bg-gray-100 text-gray-800";
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "maintenance": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getVehicleIcon = (IconComponent) => {
    return <IconComponent className="w-5 h-5" />;
  };

  const handleAddVehicle = () => {
    if (!newVehicle.type || !newVehicle.capacity || !newVehicle.pricePerKm) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إضافة نوع المركبة بنجاح",
      description: `تم إضافة ${newVehicle.type} إلى قائمة وسائل النقل`
    });

    setNewVehicle({
      type: "",
      capacity: "",
      pricePerKm: "",
      description: ""
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">إدارة وسائل النقل</h1>
          <p className="text-muted-foreground">إدارة أنواع المركبات وأسعارها في المنصة</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة نوع مركبة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة نوع مركبة جديد</DialogTitle>
              <DialogDescription>
                أضف نوع جديد من المركبات إلى المنصة
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="vehicleType">نوع المركبة *</Label>
                <Select value={newVehicle.type} onValueChange={handleVehicleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المركبة" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeTransportMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id.toString()}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">السعة *</Label>
                <Input
                  id="capacity"
                  value={newVehicle.capacity}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, capacity: e.target.value }))}
                  placeholder="تُملأ تلقائياً عند اختيار النوع"
                  readOnly={!!newVehicle.type}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pricePerKm">السعر لكل كيلومتر (ر.س) *</Label>
                <Input
                  id="pricePerKm"
                  type="number"
                  step="0.1"
                  value={newVehicle.pricePerKm}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, pricePerKm: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">الوصف</Label>
                <Input
                  id="description"
                  value={newVehicle.description}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="وصف نوع المركبة"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddVehicle}>
                إضافة
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">أنواع المركبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{vehicles.length}</div>
            <p className="text-xs text-muted-foreground">نوع مختلف</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المركبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {vehicles.reduce((sum, v) => sum + v.activeCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">مركبة مسجلة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مركبات متاحة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {vehicles.reduce((sum, v) => sum + v.availableCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">جاهزة للعمل</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">قيد الصيانة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {vehicles.reduce((sum, v) => sum + v.maintenanceCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">تحتاج صيانة</p>
          </CardContent>
        </Card>
      </div>

      {/* جدول أنواع المركبات */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>أنواع وسائل النقل</CardTitle>
              <CardDescription>عرض وإدارة جميع أنواع المركبات المتاحة</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن نوع مركبة..." className="pr-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">نوع المركبة</TableHead>
                <TableHead className="text-right">السعة</TableHead>
                <TableHead className="text-right">السعر/كم</TableHead>
                <TableHead className="text-right">الوصف</TableHead>
                <TableHead className="text-right">إجمالي المركبات</TableHead>
                <TableHead className="text-right">متاحة</TableHead>
                <TableHead className="text-right">مشغولة</TableHead>
                <TableHead className="text-right">صيانة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getVehicleIcon(vehicle.icon)}
                      {vehicle.type}
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.capacity}</TableCell>
                  <TableCell className="font-mono">{vehicle.pricePerKm} ر.س</TableCell>
                  <TableCell className="max-w-xs truncate">{vehicle.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{vehicle.activeCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor("available", vehicle.availableCount)}>
                      {vehicle.availableCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor("busy", vehicle.busyCount)}>
                      {vehicle.busyCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor("maintenance", vehicle.maintenanceCount)}>
                      {vehicle.maintenanceCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Settings className="w-4 h-4" />
                          إدارة المركبات
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          حذف النوع
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarrierVehicles;