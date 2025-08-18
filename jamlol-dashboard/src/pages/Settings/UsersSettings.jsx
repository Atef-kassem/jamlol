import { useState, useRef, useEffect } from "react";
import { Save, Upload, FileText, User, Eye, Lock, UserCheck, UserX, Search, Filter, Plus, Edit, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { useToast } from "@/hooks/use-toast";
import { useGetAllUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetUserByIdQuery } from "../../redux/Slices/user";
import { useGetAllRolesQuery } from "../../redux/Slices/role";
import registerSchema from "../../validation/registerationSchema";
const userTypes = [
  { id: "admin", name: "مسؤول" },
  { id: "supplier", name: "مورد" },
  { id: "client", name: "مشتري" },
  { id: "carrier", name: "ناقل" },
];

const statuses = [
  { id: "active", name: "نشط" },
  { id: "inActive", name: "غير نشط" },
];


export default function UsersSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("list");
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const { data: rolesData, isLoading: rolesLoading, isError: rolesError } = useGetAllRolesQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  // const [getUserById, { isLoading: isLoadingUser }] = useGetUserByIdQuery();
  const [users, setUsers] = useState([]);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    photo: null,
    address: "",
    password: "",
    person_type: "client",
    role_id: null,
    approval_code: "",
    status: "inActive",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setErrors(prev => ({ ...prev, photo: undefined }));
    }
  };

  const validateForm = async () => {
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationError) {
      const errorMessages = {};
      validationError.inner.forEach(error => {
        errorMessages[error.path] = error.message;
      });
      setErrors(errorMessages);
      return false;
    }
  };

  const handleSave = async () => {
    // Validate form data
    const isValid = await validateForm();
    if (!isValid) {
      toast({
        title: "خطأ في التحقق",
        description: "يرجى تصحيح الأخطاء في النموذج",
        variant: "destructive",
      });
      return;
    }

    // Prepare FormData for API request
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "photo" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      if (editingUser) {
        // Update user
        await updateUser({id: editingUser.id, data: formDataToSend}).unwrap();
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات المستخدم بنجاح",
        });
      } else {
        // Create new user
        await createUser(formDataToSend).unwrap();
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
        description: error?.data?.message || "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      phone: "",
      email: "",
      photo: null,
      address: "",
      password: "",
      person_type: "",
      role_id: null ,
      approval_code: "",
      status: "inActive",
    });
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      username: user.username || "",
      phone: user.phone || "",
      email: user.email || "",
      photo: user.photo || null,
      address: user.address || "",
      password: "", // Do not prefill password for security
      person_type: user.person_type || "",
      role_id: user.role_id || null,
      approval_code: user.approval_code || "",
      status: user.status || "inActive",
    });
    setErrors({});
    setActiveTab("form");
  };

  const handleDelete =async (userId) => {
   try {
    await deleteUser(userId).unwrap();
    toast({
      title: "تم الحذف",
      description: "تم حذف المستخدم بنجاح",
    });
   } catch (error) {
    toast({
      title: "خطأ في الحذف",
      description: error?.data?.message || "حدث خطأ أثناء حذف المستخدم",
      variant: "destructive",
    });
   }
  };

  const handleToggleStatus = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inActive" : "active", lastModified: new Date().toISOString() }
        : user
    ));
  };

  const getUserTypeName = (person_type) => {
    return userTypes.find(t => t.id === person_type)?.name || person_type;
  };

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <Badge className="bg-success/10 text-success border-success/20">نشط</Badge>
    ) : (
      <Badge className="bg-destructive/10 text-destructive border-destructive/20">غير نشط</Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  // فلترة المستخدمين حسب البحث ونوع المستخدم
  const filteredUsers = users.filter(user => {
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !search ||
      (user.name && user.name.toLowerCase().includes(search)) ||
      (user.username && user.username.toLowerCase().includes(search)) ||
      (user.email && user.email.toLowerCase().includes(search)) ||
      (user.phone && user.phone.toLowerCase().includes(search));
    const matchesRole = roleFilter === "all" || user.person_type === roleFilter;
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
            className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Users className="w-4 h-4" />
            قائمة المستخدمين
          </TabsTrigger>
          <TabsTrigger 
            value="form" 
            className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <User className="w-4 h-4" />
            {editingUser ? "تعديل المستخدم" : "إضافة مستخدم"}
          </TabsTrigger>
        </TabsList>

        {/* قائمة المستخدمين */}
        <TabsContent value="list" className="space-y-6">
          {/* Loading and error states */}
          {(isLoading || rolesLoading) && (
            <div className="flex justify-center items-center py-12">
              <span className="text-lg text-muted-foreground animate-pulse">جاري التحميل...</span>
            </div>
          )}
          {(isError || rolesError) && (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="text-lg text-destructive">حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقًا.</span>
            </div>
          )}
          {/* Stats Cards and Table only if not loading/error */}
          {!(isLoading || rolesLoading || isError || rolesError) && <>
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
                      {users.filter(u => u.person_type === "admin").length}
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
                      {users.filter(u => u.person_type === "supplier").length}
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
              {filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">لا يوجد مستخدمين</h3>
                  <p className="text-sm text-muted-foreground mt-2">اضغط على زر "إضافة مستخدم جديد" لبدء إضافة المستخدمين</p>
                  <Button 
                    onClick={() => {
                      setEditingUser(null);
                      resetForm();
                      setActiveTab("form");
                    }}
                    className="mt-4 bg-gradient-to-r from-primary to-secondary-blue text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة مستخدم جديد
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم المستخدم</TableHead>
                      <TableHead>الاسم</TableHead>
                      <TableHead>اسم المستخدم</TableHead>
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
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                        
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {getUserTypeName(user.person_type)}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.approval_code}</TableCell>
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
              )}
            </CardContent>
          </Card>
        </>}
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
              <div className="grid gap-4 md:grid-cols-1">
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
                    className={`focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.name ? "border-destructive" : ""}`}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="w-3 h-3 text-primary" />
                    اسم المستخدم *
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="ahmed123"
                    className={`focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.username ? "border-destructive" : ""}`}
                  />
                  {errors.username && <p className="text-sm text-destructive mt-1">{errors.username}</p>}
                </div>
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
                    className={`focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    رقم الجوال
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+966501234567"
                    className={`focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.phone ? "border-destructive" : ""}`}
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    العنوان
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="الرياض، المملكة العربية السعودية"
                    className={`focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.address ? "border-destructive" : ""}`}
                  />
                  {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
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
                    className={`focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.password ? "border-destructive" : ""}`}
                  />
                  {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
                </div>
                <div>
                  <Label htmlFor="person_type" className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-primary" />
                    نوع المستخدم *
                  </Label>
                  <Select 
                    value={formData.person_type} 
                    onValueChange={(value) => handleInputChange("person_type", value)}
                  >
                    <SelectTrigger className={errors.person_type ? "border-destructive" : ""}>
                      <SelectValue placeholder="اختر نوع المستخدم" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.person_type && <p className="text-sm text-destructive mt-1">{errors.person_type}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="status" className="flex items-center gap-2">
                    <UserCheck className="w-3 h-3 text-primary" />
                    الحالة
                  </Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger className={errors.status ? "border-destructive" : ""}>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-destructive mt-1">{errors.status}</p>}
                </div>
                <div>
                  <Label htmlFor="role_id" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    معرف الدور 
                  </Label>
                  <Select 
                    value={formData.role_id} 
                    onValueChange={(value) => handleInputChange("role_id", value)}
                  >
                    <SelectTrigger className={errors.role_id ? "border-destructive" : ""}>
                      <SelectValue placeholder="اختر الدور" />
                    </SelectTrigger>
                    <SelectContent>
                      {rolesData?.map(role => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.role_id && <p className="text-sm text-destructive mt-1">{errors.role_id}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-1">
                <div>
                  <Label htmlFor="photo" className="flex items-center gap-2">
                    <Upload className="w-3 h-3 text-primary" />
                    صورة المستخدم
                  </Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className={`focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.photo ? "border-destructive" : ""}`}
                  />
                  {formData.photo && formData.photo instanceof File && (
                    <p className="text-sm text-muted-foreground mt-2">
                      الملف المختار: {formData.photo.name}
                    </p>
                  )}
                  {formData.photo && typeof formData.photo === "string" && (
                    <img
                      src={`http://localhost:5000/${formData.photo.replace(/\\/g, '/')}`}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover mt-2"
                    />
                  )}
                  {errors.photo && <p className="text-sm text-destructive mt-1">{errors.photo}</p>}
                </div>
              </div>

            {  editingUser && <div className="grid gap-4 md:grid-cols-1">
                <div>
                  <Label htmlFor="approval_code" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    كود الموافقة
                  </Label>
                  <Input
                    id="approval_code"
                    value={formData.approval_code}
                    onChange={(e) => handleInputChange("approval_code", e.target.value)}
                    placeholder="كود الموافقة (اختياري)"
                    className={`focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${errors.approval_code ? "border-destructive" : ""}`}
                  />
                  {errors.approval_code && <p className="text-sm text-destructive mt-1">{errors.approval_code}</p>}
                </div>
              </div>}

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSave} 
                  disabled={isCreating || isUpdating}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white disabled:opacity-50"
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