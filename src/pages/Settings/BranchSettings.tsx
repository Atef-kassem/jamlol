import { useState } from "react";
import { Save, Upload, Building, Phone, Mail, MapPin, FileText, Settings, Image, Folder, Shield, Users, Activity, Plus, Edit, Trash2, Store } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Branch {
  id: string;
  name: string;
  code: string;
  nameEn: string;
  description: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  country: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  status: "active" | "inactive";
  manager: string;
  supervisor: string;
  capacity: number;
  openingHours: string;
}

export default function BranchSettings() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      name: "الفرع الرئيسي - دجليوة",
      code: "MAIN-DGL",
      nameEn: "Dagliwa Main Branch",
      description: "الفرع الرئيسي لمغاسل دجليوة للسيارات في منطقة الرياض",
      phone: "+966112345678",
      mobile: "+966501234567",
      email: "main@dagliwa.com",
      website: "www.dagliwa.com",
      country: "المملكة العربية السعودية",
      city: "الرياض",
      district: "حي الملقا",
      street: "شارع الملك فهد",
      postalCode: "12345",
      status: "active",
      manager: "أحمد محمد العتيبي",
      supervisor: "سعد أحمد الشهري",
      capacity: 20,
      openingHours: "6:00 ص - 12:00 م"
    },
    {
      id: "2",
      name: "فرع العليا - دجليوة",
      code: "OLY-DGL",
      nameEn: "Dagliwa Olaya Branch",
      description: "فرع دجليوة لغسيل السيارات في حي العليا",
      phone: "+966112345679",
      mobile: "+966501234568",
      email: "olaya@dagliwa.com",
      website: "www.dagliwa.com",
      country: "المملكة العربية السعودية",
      city: "الرياض",
      district: "حي العليا",
      street: "شارع الأمير سلطان",
      postalCode: "12346",
      status: "active",
      manager: "محمد سعد الأحمد",
      supervisor: "فهد عبدالله القحطاني",
      capacity: 15,
      openingHours: "6:00 ص - 12:00 م"
    }
  ]);

  const [formData, setFormData] = useState<Partial<Branch>>({
    name: "",
    code: "",
    nameEn: "",
    description: "",
    phone: "",
    mobile: "",
    email: "",
    website: "",
    country: "المملكة العربية السعودية",
    city: "",
    district: "",
    street: "",
    postalCode: "",
    status: "active",
    manager: "",
    supervisor: "",
    capacity: 10,
    openingHours: "6:00 ص - 12:00 م"
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (editingBranch) {
        setBranches(prev => prev.map(branch => 
          branch.id === editingBranch.id 
            ? { ...branch, ...formData }
            : branch
        ));
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات الفرع بنجاح",
        });
      } else {
        const newBranch: Branch = {
          id: Date.now().toString(),
          ...formData as Branch
        };
        setBranches(prev => [...prev, newBranch]);
        toast({
          title: "تم الإضافة بنجاح",
          description: "تم إضافة الفرع الجديد بنجاح",
        });
      }
      
      setIsDialogOpen(false);
      setEditingBranch(null);
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
      phone: "",
      mobile: "",
      email: "",
      website: "",
      country: "المملكة العربية السعودية",
      city: "",
      district: "",
      street: "",
      postalCode: "",
      status: "active",
      manager: "",
      supervisor: "",
      capacity: 10,
      openingHours: "6:00 ص - 12:00 م"
    });
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData(branch);
    setActiveTab("details");
  };

  const handleDelete = (branchId: string) => {
    setBranches(prev => prev.filter(branch => branch.id !== branchId));
    toast({
      title: "تم الحذف",
      description: "تم حذف الفرع بنجاح",
    });
  };

  const handleToggleStatus = (branchId: string) => {
    setBranches(prev => prev.map(branch => 
      branch.id === branchId 
        ? { ...branch, status: branch.status === "active" ? "inactive" : "active" }
        : branch
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">إدارة الفروع</h1>
          <p className="text-muted-foreground">إدارة فروع الشركة ومواقعها والمسؤولين عنها</p>
        </div>
        <Button 
          onClick={() => {
            setEditingBranch(null);
            resetForm();
            setActiveTab("details");
          }}
          className="gap-2 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          إضافة فرع جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="list" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Store className="w-4 h-4" />
            قائمة الفروع
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

        {/* قائمة الفروع */}
        <TabsContent value="list" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي الفروع</p>
                    <p className="text-2xl font-bold text-primary">{branches.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">الفروع النشطة</p>
                    <p className="text-2xl font-bold text-success">
                      {branches.filter(b => b.status === "active").length}
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
                    <p className="text-sm font-medium text-muted-foreground">السعة الإجمالية</p>
                    <p className="text-2xl font-bold text-secondary-blue">
                      {branches.reduce((total, b) => total + b.capacity, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-secondary-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Branches Table */}
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Store className="w-4 h-4 text-primary" />
                </div>
                قائمة الفروع
              </CardTitle>
              <CardDescription>جميع فروع الشركة ومعلوماتها</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الفرع</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>المدينة</TableHead>
                    <TableHead>المدير</TableHead>
                    <TableHead>السعة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id} className="hover:bg-muted/50 transition-colors duration-200">
                      <TableCell className="font-medium">{branch.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{branch.code}</Badge>
                      </TableCell>
                      <TableCell>{branch.city}</TableCell>
                      <TableCell>{branch.manager}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{branch.capacity} سيارة</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={branch.status === "active"}
                            onCheckedChange={() => handleToggleStatus(branch.id)}
                          />
                          <Badge variant={branch.status === "active" ? "default" : "secondary"}>
                            {branch.status === "active" ? "نشط" : "غير نشط"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(branch)}
                            className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(branch.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                {editingBranch ? `تعديل بيانات: ${editingBranch.name}` : "إضافة فرع جديد"}
              </CardTitle>
              <CardDescription>المعلومات الأساسية والهوية البصرية للفرع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-primary" />
                    اسم الفرع (عربي) *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="أدخل اسم الفرع بالعربية"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="nameEn" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-secondary-blue" />
                    اسم الفرع (إنجليزي)
                  </Label>
                  <Input
                    id="nameEn"
                    value={formData.nameEn}
                    onChange={(e) => handleInputChange("nameEn", e.target.value)}
                    placeholder="أدخل اسم الفرع بالإنجليزية"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="code" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    رمز الفرع *
                  </Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                    placeholder="MAIN-DGL"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity" className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-secondary-blue" />
                    السعة (عدد السيارات)
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", parseInt(e.target.value))}
                    placeholder="20"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-primary" />
                  وصف مختصر عن الفرع
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="وصف مختصر عن الفرع وموقعه"
                  rows={3}
                  className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div>
                <Label htmlFor="openingHours" className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-success" />
                  ساعات العمل
                </Label>
                <Input
                  id="openingHours"
                  value={formData.openingHours}
                  onChange={(e) => handleInputChange("openingHours", e.target.value)}
                  placeholder="6:00 ص - 12:00 م"
                  className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => 
                    handleInputChange("status", checked ? "active" : "inactive")
                  }
                />
                <Label>الفرع نشط</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSave} 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingBranch ? "تحديث البيانات" : "حفظ الفرع"}
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
              <CardDescription>طرق التواصل مع الفرع</CardDescription>
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
                  placeholder="main@dagliwa.com"
                  className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div>
                <Label htmlFor="website" className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-secondary-blue" />
                  الموقع الإلكتروني
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="www.dagliwa.com"
                  className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
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
                عنوان الفرع
              </CardTitle>
              <CardDescription>موقع الفرع التفصيلي</CardDescription>
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
                    الحي
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
                إدارة الفرع والمسؤولين
              </CardTitle>
              <CardDescription>تحديد المسؤولين عن إدارة الفرع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="manager" className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-primary" />
                    مدير الفرع *
                  </Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => handleInputChange("manager", e.target.value)}
                    placeholder="أحمد محمد العتيبي"
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
                    placeholder="سعد أحمد الشهري"
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
          {/* مرفقات الهوية */}
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                مرفقات الفرع
              </CardTitle>
              <CardDescription>الوثائق والصور الخاصة بالفرع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* صور الفرع */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Image className="w-4 h-4 text-primary" />
                    صور الفرع
                  </Label>
                  <div className="border-2 border-dashed border-primary/25 rounded-lg p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                    <Image className="w-8 h-8 mx-auto text-primary/60 mb-2 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">رفع صور الفرع</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG، PNG حتى 10MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-primary group-hover:text-primary transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      اختيار صور
                    </Button>
                  </div>
                </div>

                {/* ترخيص الفرع */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-secondary-blue" />
                    ترخيص الفرع
                  </Label>
                  <div className="border-2 border-dashed border-secondary-blue/25 rounded-lg p-4 text-center hover:border-secondary-blue/50 hover:bg-secondary-blue/5 transition-all duration-300 cursor-pointer group">
                    <FileText className="w-8 h-8 mx-auto text-secondary-blue/60 mb-2 group-hover:text-secondary-blue group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-secondary-blue transition-colors duration-200">رفع ترخيص الفرع</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، JPG حتى 5MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-secondary-blue group-hover:text-secondary-blue transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع ترخيص
                    </Button>
                  </div>
                </div>

                {/* مرفقات أخرى */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Folder className="w-4 h-4 text-success" />
                    مرفقات أخرى
                  </Label>
                  <div className="border-2 border-dashed border-success/25 rounded-lg p-4 text-center hover:border-success/50 hover:bg-success/5 transition-all duration-300 cursor-pointer group">
                    <Folder className="w-8 h-8 mx-auto text-success/60 mb-2 group-hover:text-success group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-success transition-colors duration-200">ملفات متنوعة</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، DOC، XLS حتى 15MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-success group-hover:text-success transition-all duration-200">
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