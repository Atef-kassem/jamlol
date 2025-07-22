import { useState } from "react";
import { Save, Upload, FileText, User, Eye, Lock, UserCheck, UserX, Search, Filter, Plus, Edit, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  userNumber: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  userType: "admin" | "employee" | "supplier" | "buyer" | "carrier";
  approvalCode: string;
  status: "active" | "inactive";
  identityType: "personal_id" | "commercial_registration";
  identityFile?: string;
  createdAt: string;
  lastModified: string;
}

const userTypes = [
  { id: "admin", name: "مشرف" },
  { id: "employee", name: "موظف" },
  { id: "supplier", name: "مورد" },
  { id: "buyer", name: "مشتري" },
  { id: "carrier", name: "ناقل" },
];

const identityTypes = [
  { id: "personal_id", name: "بطاقة شخصية" },
  { id: "commercial_registration", name: "سجل تجاري" },
];

export default function UsersSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("list");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      userNumber: "USR001",
      name: "أحمد محمد العتيبي",
      email: "ahmed.otaibi@dagliwa.com",
      mobile: "+966501234567",
      userType: "admin",
      approvalCode: "AP001",
      status: "active",
      identityType: "personal_id",
      identityFile: "identity_001.pdf",
      createdAt: "2024-01-15T10:00:00Z",
      lastModified: "2024-01-20T14:30:00Z"
    },
    {
      id: "2",
      userNumber: "USR002",
      name: "سعد عبدالله الشهري",
      email: "saad.shehri@dagliwa.com",
      mobile: "+966501234569",
      userType: "employee",
      approvalCode: "AP002",
      status: "active",
      identityType: "personal_id",
      identityFile: "identity_002.pdf",
      createdAt: "2024-02-10T09:15:00Z",
      lastModified: "2024-02-15T16:45:00Z"
    },
    {
      id: "3",
      userNumber: "USR003",
      name: "فاطمة أحمد الحربي",
      email: "fatima.harbi@dagliwa.com",
      mobile: "+966501234571",
      userType: "supplier",
      approvalCode: "AP003",
      status: "inactive",
      identityType: "commercial_registration",
      identityFile: "commercial_003.pdf",
      createdAt: "2024-03-05T11:30:00Z",
      lastModified: "2024-03-10T13:20:00Z"
    }
  ]);

  const [formData, setFormData] = useState<Partial<User>>({
    userNumber: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    userType: "employee",
    approvalCode: "",
    status: "active",
    identityType: "personal_id",
    identityFile: "",
    createdAt: "",
    lastModified: ""
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        setUsers(prev => prev.map(user => 
          user.id === editingUser.id 
            ? { ...user, ...formData, lastModified: new Date().toISOString() }
            : user
        ));
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات المستخدم بنجاح",
        });
      } else {
        const newUser: User = {
          id: Date.now().toString(),
          userNumber: formData.userNumber || `USR${Date.now()}`,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          ...formData as User
        };
        setUsers(prev => [...prev, newUser]);
        toast({
          title: "تم الإضافة بنجاح",
          description: "تم إضافة المستخدم الجديد بنجاح",
        });
      }
      
      setEditingUser(null);
      resetForm();
      setActiveTab("list");
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
      userNumber: "",
      name: "",
      email: "",
      mobile: "",
      password: "",
      userType: "employee",
      approvalCode: "",
      status: "active",
      identityType: "personal_id",
      identityFile: "",
      createdAt: "",
      lastModified: ""
    });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({...user, lastModified: new Date().toISOString()});
    setActiveTab("form");
  };

  const handleDelete = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "تم الحذف",
      description: "تم حذف المستخدم بنجاح",
    });
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active", lastModified: new Date().toISOString() }
        : user
    ));
  };

  const getUserTypeName = (userType: string) => {
    return userTypes.find(t => t.id === userType)?.name || userType;
  };

  const getIdentityTypeName = (identityType: string) => {
    return identityTypes.find(t => t.id === identityType)?.name || identityType;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success/10 text-success border-success/20">نشط</Badge>
    ) : (
      <Badge className="bg-destructive/10 text-destructive border-destructive/20">غير نشط</Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.userType === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">إدارة المستخدمون</h1>
          <p className="text-muted-foreground">إدارة حسابات المستخدمين في النظام</p>
        </div>
        <Button 
          onClick={() => {
            setEditingUser(null);
            resetForm();
            setActiveTab("form");
          }}
          className="gap-2 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          إضافة مستخدم جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="list" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Users className="w-4 h-4" />
            قائمة المستخدمين
          </TabsTrigger>
          <TabsTrigger 
            value="form" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <User className="w-4 h-4" />
            {editingUser ? "تعديل المستخدم" : "إضافة مستخدم"}
          </TabsTrigger>
        </TabsList>

        {/* قائمة المستخدمين */}
        <TabsContent value="list" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold text-primary">{users.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">المستخدمين النشطين</p>
                    <p className="text-2xl font-bold text-success">
                      {users.filter(u => u.status === "active").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UserCheck className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">المشرفين</p>
                    <p className="text-2xl font-bold text-secondary-blue">
                      {users.filter(u => u.userType === "admin").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UserCheck className="w-6 h-6 text-secondary-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-warning/5 border-l-4 border-l-warning">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">الموردين</p>
                    <p className="text-2xl font-bold text-warning">
                      {users.filter(u => u.userType === "supplier").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-6 h-6 text-warning" />
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
                      placeholder="البحث في المستخدمين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="نوع المستخدم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      {userTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم المستخدم</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الجوال</TableHead>
                    <TableHead>نوع المستخدم</TableHead>
                    <TableHead>كود الموافقة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تاريخ الإنشاء</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/50 transition-colors duration-200">
                      <TableCell className="font-medium">{user.userNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary-blue text-white flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5" />
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.mobile}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {getUserTypeName(user.userType)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.approvalCode}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(user)}
                            className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleStatus(user.id)}
                            className="hover:bg-warning/10 hover:text-warning transition-colors duration-200"
                          >
                            <Lock className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(user.id)}
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

        {/* نموذج إضافة/تعديل المستخدم */}
        <TabsContent value="form" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="w-4 h-4 text-primary" />
                </div>
                {editingUser ? `تعديل بيانات: ${editingUser.name}` : "إضافة مستخدم جديد"}
              </CardTitle>
              <CardDescription>بيانات المستخدم الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="userNumber" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    رقم المستخدم *
                  </Label>
                  <Input
                    id="userNumber"
                    value={formData.userNumber}
                    onChange={(e) => handleInputChange("userNumber", e.target.value)}
                    placeholder="USR001"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-3 h-3 text-primary" />
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="أحمد محمد العتيبي"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="ahmed@example.com"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    رقم الجوال *
                  </Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    placeholder="+966501234567"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-primary" />
                    كلمة المرور *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="userType" className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-primary" />
                    نوع المستخدم *
                  </Label>
                  <Select 
                    value={formData.userType} 
                    onValueChange={(value) => handleInputChange("userType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المستخدم" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="approvalCode" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    كود الموافقة *
                  </Label>
                  <Input
                    id="approvalCode"
                    value={formData.approvalCode}
                    onChange={(e) => handleInputChange("approvalCode", e.target.value)}
                    placeholder="AP001"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="flex items-center gap-2">
                    <UserCheck className="w-3 h-3 text-primary" />
                    حالة التفعيل
                  </Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch
                      checked={formData.status === "active"}
                      onCheckedChange={(checked) => 
                        handleInputChange("status", checked ? "active" : "inactive")
                      }
                    />
                    <Label>{formData.status === "active" ? "مفعل" : "غير مفعل"}</Label>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="identityType" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    نوع الهوية *
                  </Label>
                  <Select 
                    value={formData.identityType} 
                    onValueChange={(value) => handleInputChange("identityType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الهوية" />
                    </SelectTrigger>
                    <SelectContent>
                      {identityTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="identityFile" className="flex items-center gap-2">
                    <Upload className="w-3 h-3 text-primary" />
                    ملف الهوية
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="identityFile"
                      value={formData.identityFile}
                      onChange={(e) => handleInputChange("identityFile", e.target.value)}
                      placeholder="رابط أو مسار الملف"
                      className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSave} 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingUser ? "تحديث البيانات" : "حفظ المستخدم"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetForm();
                    setEditingUser(null);
                    setActiveTab("list");
                  }}
                  className="hover:bg-muted/50 transition-colors duration-200"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}