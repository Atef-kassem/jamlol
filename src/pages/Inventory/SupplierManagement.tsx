import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Building,
  Edit,
  Eye,
  MoreVertical,
  Filter,
  Star,
  Globe
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

// Types
interface Supplier {
  id: string;
  name: string;
  activity: string;
  commercialRecord: string;
  taxNumber?: string;
  country: string;
  city: string;
  mobile: string;
  email: string;
  address: string;
  category: string;
  mainBranch: string;
  paymentTerms: string;
  paymentMethod: string;
  status: "نشط" | "معلق" | "موقوف";
  attachments: string[];
  contactPerson: string;
  totalOrders: number;
  totalValue: number;
  rating: number;
  createdAt: string;
}

const SupplierManagement = () => {
  const { toast } = useToast();

  // State for Suppliers
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "SUP-001",
      name: "مؤسسة العناية بالزيوت",
      activity: "زيوت ومواد تشحيم",
      commercialRecord: "1010123456",
      taxNumber: "310123456789003",
      country: "السعودية",
      city: "الرياض",
      mobile: "0501234567",
      email: "info@oilcare.com",
      address: "العليا، شارع الملك فهد",
      category: "مورد زيوت",
      mainBranch: "الفرع الرئيسي",
      paymentTerms: "30 يوم",
      paymentMethod: "تحويل بنكي",
      status: "نشط",
      attachments: [],
      contactPerson: "أحمد العتيبي",
      totalOrders: 15,
      totalValue: 125000,
      rating: 4.5,
      createdAt: "2024-01-15"
    },
    {
      id: "SUP-002",
      name: "متجر قطع الغيار الأوروبية",
      activity: "قطع غيار مستوردة",
      commercialRecord: "4030654321",
      country: "السعودية",
      city: "جدة",
      mobile: "0509876543",
      email: "sales@europarts.com",
      address: "حي الصفا، طريق الملك عبدالعزيز",
      category: "مورد قطع غيار",
      mainBranch: "فرع جدة",
      paymentTerms: "15 يوم",
      paymentMethod: "شيك",
      status: "نشط",
      attachments: [],
      contactPerson: "محمد الشهري",
      totalOrders: 28,
      totalValue: 280000,
      rating: 4.8,
      createdAt: "2024-02-20"
    }
  ]);

  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Functions
  const addSupplier = () => {
    if (!newSupplier.name || !newSupplier.commercialRecord || !newSupplier.mobile || !newSupplier.email) {
      toast({
        title: "خطأ في التسجيل",
        description: "يرجى تعبئة جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const supplier: Supplier = {
      id: `SUP-${Date.now()}`,
      totalOrders: 0,
      totalValue: 0,
      rating: 0,
      createdAt: new Date().toISOString().split('T')[0],
      attachments: [],
      ...newSupplier as Supplier
    };

    setSuppliers(prev => [...prev, supplier]);
    setNewSupplier({});
    setShowAddForm(false);
    
    toast({
      title: "تم الإضافة بنجاح",
      description: "تم إضافة المورد الجديد",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-success/10 text-success border-success/20";
      case "معلق":
        return "bg-warning/10 text-warning border-warning/20";
      case "موقوف":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || supplier.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            إدارة الموردين
          </h1>
          <p className="text-muted-foreground">تسجيل وإدارة بيانات الموردين والشركاء التجاريين</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة مورد جديد
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموردين</p>
                <p className="text-2xl font-bold">{suppliers.length}</p>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الموردين النشطين</p>
                <p className="text-2xl font-bold text-success">{suppliers.filter(s => s.status === "نشط").length}</p>
              </div>
              <Globe className="h-4 w-4 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي القيمة</p>
                <p className="text-2xl font-bold">{suppliers.reduce((acc, s) => acc + s.totalValue, 0).toLocaleString()} ر.س</p>
              </div>
              <Building className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط التقييم</p>
                <p className="text-2xl font-bold">{(suppliers.reduce((acc, s) => acc + s.rating, 0) / suppliers.length).toFixed(1)}</p>
              </div>
              <Star className="h-4 w-4 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* نموذج إضافة مورد جديد */}
      {showAddForm && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>إضافة مورد جديد</CardTitle>
            <CardDescription>تسجيل بيانات مورد جديد في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="supplierName">اسم المورد *</Label>
                <Input
                  id="supplierName"
                  value={newSupplier.name || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="اسم المؤسسة أو الشركة"
                />
              </div>
              
              <div>
                <Label htmlFor="activity">النشاط التجاري</Label>
                <Input
                  id="activity"
                  value={newSupplier.activity || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, activity: e.target.value }))}
                  placeholder="نوع النشاط التجاري"
                />
              </div>

              <div>
                <Label htmlFor="commercialRecord">السجل التجاري *</Label>
                <Input
                  id="commercialRecord"
                  value={newSupplier.commercialRecord || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, commercialRecord: e.target.value }))}
                  placeholder="رقم السجل التجاري"
                />
              </div>

              <div>
                <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                <Input
                  id="taxNumber"
                  value={newSupplier.taxNumber || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, taxNumber: e.target.value }))}
                  placeholder="الرقم الضريبي"
                />
              </div>

              <div>
                <Label htmlFor="mobile">رقم الجوال *</Label>
                <Input
                  id="mobile"
                  value={newSupplier.mobile || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, mobile: e.target.value }))}
                  placeholder="05xxxxxxxx"
                />
              </div>

              <div>
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newSupplier.email || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="country">الدولة</Label>
                <Input
                  id="country"
                  value={newSupplier.country || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="السعودية"
                />
              </div>

              <div>
                <Label htmlFor="city">المدينة</Label>
                <Input
                  id="city"
                  value={newSupplier.city || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="الرياض"
                />
              </div>

              <div>
                <Label htmlFor="contactPerson">الشخص المسؤول</Label>
                <Input
                  id="contactPerson"
                  value={newSupplier.contactPerson || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder="اسم الشخص المسؤول"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <Label htmlFor="address">العنوان</Label>
                <Textarea
                  id="address"
                  value={newSupplier.address || ""}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="العنوان التفصيلي"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={addSupplier}>حفظ المورد</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>إلغاء</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* الفلاتر والبحث */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث عن مورد..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="معلق">معلق</SelectItem>
                  <SelectItem value="موقوف">موقوف</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول الموردين */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            قائمة الموردين ({filteredSuppliers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المورد</TableHead>
                <TableHead>النشاط</TableHead>
                <TableHead>الاتصال</TableHead>
                <TableHead>المنطقة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">{supplier.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.activity}</div>
                      <div className="text-sm text-muted-foreground">{supplier.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {supplier.mobile}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {supplier.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-sm">{supplier.city}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(supplier.status)}>
                      {supplier.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span>{supplier.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          تعديل البيانات
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

export default SupplierManagement;