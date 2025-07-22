import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Save, Upload, Building, Phone, Mail, MapPin, FileText, Settings, Image, Folder, Shield, Users, Activity, Plus, Edit, Trash2, Package, Search, Filter, Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Warehouse {
  id: string;
  name: string;
  code: string;
  nameEn: string;
  description: string;
  type: "رئيسي" | "فرعي" | "متخصص";
  phone: string;
  mobile: string;
  email: string;
  country: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  status: "active" | "inactive";
  manager: string;
  supervisor: string;
  capacity: number;
  currentStock: number;
  branch: string;
  itemsCount: number;
}

export default function Warehouses() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("list");
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // التعامل مع معاملات الرابط لفتح التبويب المطلوب
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['list', 'details', 'contact', 'address', 'management', 'attachments'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: "1",
      name: "المستودع الرئيسي - دجليوة",
      code: "MAIN-WH-DGL",
      nameEn: "Dagliwa Main Warehouse",
      description: "المستودع الرئيسي لتخزين جميع مواد التنظيف والمعدات",
      type: "رئيسي",
      phone: "+966112345678",
      mobile: "+966501234567",
      email: "warehouse@dagliwa.com",
      country: "المملكة العربية السعودية",
      city: "الرياض",
      district: "حي الملقا",
      street: "شارع الملك فهد",
      postalCode: "12345",
      status: "active",
      manager: "عبدالله سعد المطيري",
      supervisor: "محمد أحمد الشهري",
      capacity: 1000,
      currentStock: 750,
      branch: "الفرع الرئيسي",
      itemsCount: 125
    },
    {
      id: "2",
      name: "مستودع الزيوت والمواد الكيميائية",
      code: "CHEM-WH-DGL",
      nameEn: "Dagliwa Chemical Warehouse",
      description: "مستودع متخصص في تخزين الزيوت والمواد الكيميائية",
      type: "متخصص",
      phone: "+966112345679",
      mobile: "+966501234568",
      email: "chemical@dagliwa.com",
      country: "المملكة العربية السعودية",
      city: "الرياض",
      district: "المنطقة الصناعية",
      street: "شارع الصناعة",
      postalCode: "12346",
      status: "active",
      manager: "فهد محمد القحطاني",
      supervisor: "سعد عبدالرحمن العتيبي",
      capacity: 500,
      currentStock: 300,
      branch: "الفرع الرئيسي",
      itemsCount: 45
    },
    {
      id: "3",
      name: "مستودع فرع العليا",
      code: "OLY-WH-DGL",
      nameEn: "Dagliwa Olaya Branch Warehouse",
      description: "مستودع فرعي لخدمة فرع العليا",
      type: "فرعي",
      phone: "+966112345680",
      mobile: "+966501234569",
      email: "olaya-wh@dagliwa.com",
      country: "المملكة العربية السعودية",
      city: "الرياض",
      district: "حي العليا",
      street: "شارع الأمير سلطان",
      postalCode: "12347",
      status: "active",
      manager: "سارة أحمد الحربي",
      supervisor: "نورا محمد العبدالله",
      capacity: 300,
      currentStock: 180,
      branch: "فرع العليا",
      itemsCount: 78
    }
  ]);

  const [formData, setFormData] = useState<Partial<Warehouse>>({
    name: "",
    code: "",
    nameEn: "",
    description: "",
    type: "فرعي",
    phone: "",
    mobile: "",
    email: "",
    country: "المملكة العربية السعودية",
    city: "",
    district: "",
    street: "",
    postalCode: "",
    status: "active",
    manager: "",
    supervisor: "",
    capacity: 100,
    currentStock: 0,
    branch: "",
    itemsCount: 0
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (editingWarehouse) {
        setWarehouses(prev => prev.map(warehouse => 
          warehouse.id === editingWarehouse.id 
            ? { ...warehouse, ...formData }
            : warehouse
        ));
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات المستودع بنجاح",
        });
      } else {
        const newWarehouse: Warehouse = {
          id: Date.now().toString(),
          ...formData as Warehouse
        };
        setWarehouses(prev => [...prev, newWarehouse]);
        toast({
          title: "تم الإضافة بنجاح",
          description: "تم إضافة المستودع الجديد بنجاح",
        });
      }
      
      setEditingWarehouse(null);
      resetForm();
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      nameEn: "",
      description: "",
      type: "فرعي",
      phone: "",
      mobile: "",
      email: "",
      country: "المملكة العربية السعودية",
      city: "",
      district: "",
      street: "",
      postalCode: "",
      status: "active",
      manager: "",
      supervisor: "",
      capacity: 100,
      currentStock: 0,
      branch: "",
      itemsCount: 0
    });
  };

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setFormData(warehouse);
    setActiveTab("details");
  };

  const handleDelete = (warehouseId: string) => {
    setWarehouses(prev => prev.filter(warehouse => warehouse.id !== warehouseId));
    toast({
      title: "تم الحذف",
      description: "تم حذف المستودع بنجاح",
    });
  };

  const handleToggleStatus = (warehouseId: string) => {
    setWarehouses(prev => prev.map(warehouse => 
      warehouse.id === warehouseId 
        ? { ...warehouse, status: warehouse.status === "active" ? "inactive" : "active" }
        : warehouse
    ));
  };

  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "نشط" && warehouse.status === "active") ||
                         (statusFilter === "مغلق" && warehouse.status === "inactive");
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-success/10 text-success border-success/20" 
      : "bg-destructive/10 text-destructive border-destructive/20";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "رئيسي":
        return "bg-primary/10 text-primary border-primary/20";
      case "فرعي":
        return "bg-secondary-blue/10 text-secondary-blue border-secondary-blue/20";
      case "متخصص":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">إدارة المستودعات</h1>
          <p className="text-muted-foreground">إدارة وتنظيم المستودعات والمخازن والمسؤولين عنها</p>
        </div>
        <Button 
          onClick={() => {
            setEditingWarehouse(null);
            resetForm();
            setActiveTab("details");
          }}
          className="gap-2 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          إضافة مستودع جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="list" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Package className="w-4 h-4" />
            قائمة المستودعات
          </TabsTrigger>
          <TabsTrigger 
            value="details" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Building className="w-4 h-4" />
            البيانات الأساسية
          </TabsTrigger>
          <TabsTrigger 
            value="contact" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            معلومات الاتصال
          </TabsTrigger>
          <TabsTrigger 
            value="address" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <MapPin className="w-4 h-4" />
            العنوان
          </TabsTrigger>
          <TabsTrigger 
            value="management" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Users className="w-4 h-4" />
            المسؤولين
          </TabsTrigger>
          <TabsTrigger 
            value="attachments" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Folder className="w-4 h-4" />
            المرفقات
          </TabsTrigger>
        </TabsList>

        {/* قائمة المستودعات */}
        <TabsContent value="list" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي المستودعات</p>
                    <p className="text-2xl font-bold text-primary">{warehouses.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">المستودعات النشطة</p>
                    <p className="text-2xl font-bold text-success">
                      {warehouses.filter(w => w.status === "active").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي الأصناف</p>
                    <p className="text-2xl font-bold text-secondary-blue">
                      {warehouses.reduce((total, w) => total + w.itemsCount, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-6 h-6 text-secondary-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-warning/5 border-l-4 border-l-warning">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">المسؤولين</p>
                    <p className="text-2xl font-bold text-warning">
                      {new Set(warehouses.filter(w => w.manager !== "-").map(w => w.manager)).size}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* البحث والفلترة */}
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="البحث في المستودعات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="نشط">نشط</SelectItem>
                      <SelectItem value="مغلق">مغلق</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWarehouses.map((warehouse) => (
                  <Card key={warehouse.id} className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80 border">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                          <CardDescription className="mt-1">{warehouse.city} - {warehouse.district}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(warehouse)}>
                              <Edit className="w-4 h-4 ml-2" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 ml-2" />
                              عرض التفاصيل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="w-4 h-4 ml-2" />
                              الأصناف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getTypeColor(warehouse.type)}>
                          {warehouse.type}
                        </Badge>
                        <Badge className={getStatusColor(warehouse.status)}>
                          {warehouse.status === "active" ? "نشط" : "مغلق"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">الفرع:</span>
                        <span className="text-sm font-medium">{warehouse.branch}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">عدد الأصناف:</span>
                        <span className="text-sm font-bold text-primary">{warehouse.itemsCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">السعة:</span>
                        <span className="text-sm font-medium">{warehouse.capacity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">المسؤول:</span>
                        <span className="text-sm font-medium">{warehouse.manager}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                          onClick={() => handleEdit(warehouse)}
                        >
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 hover:bg-secondary-blue/10 hover:text-secondary-blue transition-colors duration-200"
                        >
                          <Package className="w-4 h-4 ml-2" />
                          الأصناف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredWarehouses.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">لا توجد مستودعات</h3>
                  <p className="text-sm text-muted-foreground mt-2">لم يتم العثور على مستودعات تطابق البحث</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* البيانات الأساسية */}
        <TabsContent value="details" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-4 h-4 text-primary" />
                </div>
                {editingWarehouse ? `تعديل بيانات: ${editingWarehouse.name}` : "إضافة مستودع جديد"}
              </CardTitle>
              <CardDescription>المعلومات الأساسية للمستودع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-primary" />
                    اسم المستودع (عربي) *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="أدخل اسم المستودع بالعربية"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="nameEn" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-secondary-blue" />
                    اسم المستودع (إنجليزي)
                  </Label>
                  <Input
                    id="nameEn"
                    value={formData.nameEn}
                    onChange={(e) => handleInputChange("nameEn", e.target.value)}
                    placeholder="أدخل اسم المستودع بالإنجليزية"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="code" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    رمز المستودع *
                  </Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                    placeholder="MAIN-WH-DGL"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="flex items-center gap-2">
                    <Package className="w-3 h-3 text-secondary-blue" />
                    نوع المستودع
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200">
                      <SelectValue placeholder="اختر نوع المستودع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="رئيسي">رئيسي</SelectItem>
                      <SelectItem value="فرعي">فرعي</SelectItem>
                      <SelectItem value="متخصص">متخصص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="capacity" className="flex items-center gap-2">
                    <Package className="w-3 h-3 text-success" />
                    السعة التخزينية
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", parseInt(e.target.value))}
                    placeholder="1000"
                    className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="branch" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-warning" />
                    الفرع التابع له
                  </Label>
                  <Input
                    id="branch"
                    value={formData.branch}
                    onChange={(e) => handleInputChange("branch", e.target.value)}
                    placeholder="الفرع الرئيسي"
                    className="focus:ring-2 focus:ring-warning/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="currentStock" className="flex items-center gap-2">
                    <Package className="w-3 h-3 text-primary" />
                    المخزون الحالي
                  </Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => handleInputChange("currentStock", parseInt(e.target.value))}
                    placeholder="750"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-primary" />
                  وصف مختصر عن المستودع
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="وصف مختصر عن المستودع ونوع المواد المخزنة"
                  rows={3}
                  className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => 
                    handleInputChange("status", checked ? "active" : "inactive")
                  }
                />
                <Label>المستودع نشط</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSave} 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingWarehouse ? "تحديث البيانات" : "حفظ المستودع"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("list")}
                  className="hover:bg-muted/50 transition-colors duration-200"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* معلومات الاتصال */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-4 h-4 text-secondary-blue" />
                </div>
                معلومات الاتصال
              </CardTitle>
              <CardDescription>طرق التواصل مع المستودع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-primary" />
                    الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+966112345678"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile" className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-secondary-blue" />
                    الجوال
                  </Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    placeholder="+966501234567"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-primary" />
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="warehouse@dagliwa.com"
                  className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSave} 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ معلومات الاتصال
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* العنوان */}
        <TabsContent value="address" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-4 h-4 text-success" />
                </div>
                عنوان المستودع
              </CardTitle>
              <CardDescription>موقع المستودع التفصيلي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label htmlFor="country" className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-success" />
                    الدولة *
                  </Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    placeholder="المملكة العربية السعودية"
                    className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-primary" />
                    المدينة *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="الرياض"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="district" className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-secondary-blue" />
                    الحي/المنطقة
                  </Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    placeholder="حي الملقا"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-warning" />
                    الرمز البريدي
                  </Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="12345"
                    className="focus:ring-2 focus:ring-warning/20 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="street" className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-success" />
                  الشارع *
                </Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  placeholder="شارع الملك فهد"
                  className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSave} 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ العنوان
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* المسؤولين */}
        <TabsContent value="management" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-warning/5 border-l-4 border-l-warning">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-4 h-4 text-warning" />
                </div>
                إدارة المستودع والمسؤولين
              </CardTitle>
              <CardDescription>تحديد المسؤولين عن إدارة المستودع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="manager" className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-primary" />
                    مدير المستودع *
                  </Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => handleInputChange("manager", e.target.value)}
                    placeholder="عبدالله سعد المطيري"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="supervisor" className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-secondary-blue" />
                    المشرف المساعد
                  </Label>
                  <Input
                    id="supervisor"
                    value={formData.supervisor}
                    onChange={(e) => handleInputChange("supervisor", e.target.value)}
                    placeholder="محمد أحمد الشهري"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSave} 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ بيانات المسؤولين
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* المرفقات */}
        <TabsContent value="attachments" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                مرفقات المستودع
              </CardTitle>
              <CardDescription>الوثائق والصور الخاصة بالمستودع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* صور المستودع */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Image className="w-4 h-4 text-primary" />
                    صور المستودع
                  </Label>
                  <div className="border-2 border-dashed border-primary/25 rounded-lg p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                    <Image className="w-8 h-8 mx-auto text-primary/60 mb-2 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">رفع صور المستودع</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG، PNG حتى 10MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-primary group-hover:text-primary transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      اختيار صور
                    </Button>
                  </div>
                </div>

                {/* رخصة التشغيل */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-secondary-blue" />
                    رخصة التشغيل
                  </Label>
                  <div className="border-2 border-dashed border-secondary-blue/25 rounded-lg p-4 text-center hover:border-secondary-blue/50 hover:bg-secondary-blue/5 transition-all duration-300 cursor-pointer group">
                    <FileText className="w-8 h-8 mx-auto text-secondary-blue/60 mb-2 group-hover:text-secondary-blue group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-secondary-blue transition-colors duration-200">رفع رخصة التشغيل</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، JPG حتى 5MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-secondary-blue group-hover:text-secondary-blue transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع ترخيص
                    </Button>
                  </div>
                </div>

                {/* شهادات السلامة */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-success" />
                    شهادات السلامة
                  </Label>
                  <div className="border-2 border-dashed border-success/25 rounded-lg p-4 text-center hover:border-success/50 hover:bg-success/5 transition-all duration-300 cursor-pointer group">
                    <Shield className="w-8 h-8 mx-auto text-success/60 mb-2 group-hover:text-success group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-success transition-colors duration-200">شهادات السلامة والأمان</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، JPG حتى 5MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-success group-hover:text-success transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع شهادات
                    </Button>
                  </div>
                </div>

                {/* مخططات المستودع */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-warning" />
                    مخططات المستودع
                  </Label>
                  <div className="border-2 border-dashed border-warning/25 rounded-lg p-4 text-center hover:border-warning/50 hover:bg-warning/5 transition-all duration-300 cursor-pointer group">
                    <FileText className="w-8 h-8 mx-auto text-warning/60 mb-2 group-hover:text-warning group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-warning transition-colors duration-200">مخططات وتصاميم المستودع</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، DWG، JPG حتى 10MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-warning group-hover:text-warning transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع مخططات
                    </Button>
                  </div>
                </div>

                {/* تقارير الجرد */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-destructive" />
                    تقارير الجرد
                  </Label>
                  <div className="border-2 border-dashed border-destructive/25 rounded-lg p-4 text-center hover:border-destructive/50 hover:bg-destructive/5 transition-all duration-300 cursor-pointer group">
                    <FileText className="w-8 h-8 mx-auto text-destructive/60 mb-2 group-hover:text-destructive group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-destructive transition-colors duration-200">تقارير الجرد والمخزون</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، XLS حتى 15MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-destructive group-hover:text-destructive transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع تقارير
                    </Button>
                  </div>
                </div>

                {/* مرفقات أخرى */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Folder className="w-4 h-4 text-muted-foreground" />
                    مرفقات أخرى
                  </Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/50 hover:bg-muted/5 transition-all duration-300 cursor-pointer group">
                    <Folder className="w-8 h-8 mx-auto text-muted-foreground/60 mb-2 group-hover:text-muted-foreground group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">ملفات متنوعة</p>
                    <p className="text-xs text-muted-foreground mt-1">جميع أنواع الملفات حتى 20MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-muted-foreground group-hover:text-muted-foreground transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع ملفات
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}