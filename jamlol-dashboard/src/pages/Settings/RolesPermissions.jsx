import { useState, useEffect } from "react";
import { 
  Shield, 
  Users, 
  Settings, 
  Save, 
  Download, 
  Search,
  Check,
  X,
  Info,
  Eye,
  Edit,
  Trash2,
  Plus,
  FileText,
  DollarSign,
  Car,
  Package,
  BarChart,
  Calendar,
  CreditCard,
  MessageSquare,
  UserCheck,
  Wrench,
  Coffee,
  Truck,
  Star,
  AlertTriangle,
  History,
  Filter,
  Copy,
  RefreshCw,
  Lock,
  Unlock,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// نوع البيانات للأدوار
// Role structure: { id, name, description, color, isActive, userCount, createdAt, permissions }

// نوع البيانات للمستخدمين
// User structure: { id, name, email, status, roles, lastLogin, branch }

// نوع البيانات لسجل التدقيق
// AuditLog structure: { id, action, user, target, details, timestamp, type }

// تعريف الأدوار الافتراضية
const defaultRoles = [
  {
    id: "super_admin",
    name: "مدير النظام الرئيسي",
    description: "صلاحية كاملة على جميع وحدات النظام",
    color: "bg-gradient-to-r from-red-500 to-rose-500",
    isActive: true,
    userCount: 1,
    createdAt: "2024-01-01",
    permissions: {}
  },
  {
    id: "admin",
    name: "مدير النظام",
    description: "إدارة النظام والمستخدمين",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    isActive: true,
    userCount: 2,
    createdAt: "2024-01-01",
    permissions: {}
  },
  {
    id: "branch_manager",
    name: "مدير فرع",
    description: "إدارة الفرع والعمليات اليومية",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    isActive: true,
    userCount: 3,
    createdAt: "2024-01-01",
    permissions: {}
  },
  {
    id: "supervisor",
    name: "مشرف",
    description: "الإشراف على العمليات والموظفين",
    color: "bg-gradient-to-r from-orange-500 to-amber-500",
    isActive: true,
    userCount: 5,
    createdAt: "2024-01-01",
    permissions: {}
  },
  {
    id: "cashier",
    name: "موظف كاشير",
    description: "إدارة المبيعات والدفع",
    color: "bg-gradient-to-r from-purple-500 to-violet-500",
    isActive: true,
    userCount: 8,
    createdAt: "2024-01-01",
    permissions: {}
  },
  {
    id: "operator",
    name: "موظف تشغيل",
    description: "تنفيذ العمليات اليومية",
    color: "bg-gradient-to-r from-teal-500 to-cyan-500",
    isActive: true,
    userCount: 12,
    createdAt: "2024-01-01",
    permissions: {}
  },
  {
    id: "accountant",
    name: "محاسب",
    description: "إدارة الحسابات والتقارير المالية",
    color: "bg-gradient-to-r from-yellow-500 to-orange-400",
    isActive: true,
    userCount: 2,
    createdAt: "2024-01-01",
    permissions: {}
  },
  {
    id: "viewer",
    name: "مستعرض",
    description: "عرض البيانات والتقارير فقط",
    color: "bg-gradient-to-r from-gray-500 to-slate-500",
    isActive: true,
    userCount: 4,
    createdAt: "2024-01-01",
    permissions: {}
  }
];

// تعريف المستخدمين العينة
const sampleUsers = [
  {
    id: "user1",
    name: "أحمد محمد",
    email: "ahmed@company.com",
    status: "active",
    roles: ["super_admin"],
    lastLogin: "2024-12-25 14:30",
    branch: "الفرع الرئيسي"
  },
  {
    id: "user2",
    name: "فاطمة علي",
    email: "fatima@company.com",
    status: "active",
    roles: ["branch_manager"],
    lastLogin: "2024-12-25 13:45",
    branch: "فرع الملك فهد"
  },
  {
    id: "user3",
    name: "محمد الأحمد",
    email: "mohamed@company.com",
    status: "active",
    roles: ["cashier", "operator"],
    lastLogin: "2024-12-25 12:15",
    branch: "فرع الرياض"
  },
  {
    id: "user4",
    name: "سارة خالد",
    email: "sara@company.com",
    status: "inactive",
    roles: ["accountant"],
    lastLogin: "2024-12-24 16:20",
    branch: "الفرع الرئيسي"
  }
];

// تعريف سجل التدقيق العينة
const sampleAuditLogs = [
  {
    id: "1",
    action: "إنشاء دور جديد",
    user: "أحمد محمد",
    target: "مشرف المبيعات",
    details: "تم إنشاء دور جديد بصلاحيات المبيعات",
    timestamp: "2024-12-25 14:30:15",
    type: "role"
  },
  {
    id: "2",
    action: "تعديل صلاحيات",
    user: "فاطمة علي",
    target: "موظف كاشير",
    details: "تم إضافة صلاحية تعديل الفواتير",
    timestamp: "2024-12-25 13:15:42",
    type: "permission"
  },
  {
    id: "3",
    action: "حذف مستخدم",
    user: "أحمد محمد",
    target: "خالد سعد",
    details: "تم حذف المستخدم من النظام",
    timestamp: "2024-12-25 12:45:30",
    type: "user"
  }
];

// تعريف الإدارات والشاشات
const systemModules = [
  {
    id: "dashboard",
    name: "لوحة التحكم الرئيسية",
    icon: BarChart,
    screens: [
      "عرض لوحة التحكم",
      "إحصائيات المبيعات",
      "تقارير الأداء",
      "مراقبة النظام"
    ]
  },
  {
    id: "customers",
    name: "إدارة العملاء",
    icon: Users,
    screens: [
      "قائمة العملاء",
      "إضافة عميل جديد",
      "تعديل بيانات العميل",
      "حذف عميل",
      "تاريخ العميل",
      "نقاط الولاء"
    ]
  },
  {
    id: "services",
    name: "إدارة الخدمات",
    icon: Car,
    screens: [
      "قائمة الخدمات",
      "إضافة خدمة جديدة",
      "تعديل الخدمة",
      "حذف الخدمة",
      "أسعار الخدمات",
      "مدة الخدمة"
    ]
  },
  {
    id: "orders",
    name: "إدارة الطلبات",
    icon: FileText,
    screens: [
      "قائمة الطلبات",
      "إنشاء طلب جديد",
      "تعديل الطلب",
      "إلغاء الطلب",
      "حالة الطلب",
      "تتبع الطلب"
    ]
  },
  {
    id: "inventory",
    name: "إدارة المخزون",
    icon: Package,
    screens: [
      "قائمة المنتجات",
      "إضافة منتج",
      "تعديل المنتج",
      "حذف المنتج",
      "جرد المخزون",
      "تقارير المخزون",
      "طلبات التوريد"
    ]
  },
  {
    id: "finance",
    name: "الإدارة المالية",
    icon: DollarSign,
    screens: [
      "الفواتير",
      "المدفوعات",
      "التقارير المالية",
      "الحسابات",
      "الضرائب",
      "التسويات المالية"
    ]
  },
  {
    id: "reports",
    name: "التقارير والتحليلات",
    icon: BarChart,
    screens: [
      "تقارير المبيعات",
      "تقارير العملاء",
      "تقارير المخزون",
      "تقارير الموظفين",
      "التحليلات التنبؤية",
      "تصدير التقارير"
    ]
  },
  {
    id: "settings",
    name: "إعدادات النظام",
    icon: Settings,
    screens: [
      "الإعدادات العامة",
      "إدارة المستخدمين",
      "إدارة الأدوار",
      "إعدادات الأمان",
      "النسخ الاحتياطي",
      "سجل النشاطات"
    ]
  }
];

// تعريف الصلاحيات
const permissionTypes = [
  { id: "view", name: "عرض", icon: Eye, color: "text-blue-600", description: "عرض البيانات والشاشات" },
  { id: "create", name: "إنشاء", icon: Plus, color: "text-green-600", description: "إنشاء وإضافة بيانات جديدة" },
  { id: "edit", name: "تعديل", icon: Edit, color: "text-yellow-600", description: "تعديل البيانات الموجودة" },
  { id: "delete", name: "حذف", icon: Trash2, color: "text-red-600", description: "حذف البيانات" },
  { id: "approve", name: "اعتماد", icon: Check, color: "text-emerald-600", description: "اعتماد العمليات والطلبات" },
  { id: "reject", name: "رفض", icon: X, color: "text-rose-600", description: "رفض العمليات والطلبات" },
  { id: "export", name: "تصدير", icon: Download, color: "text-indigo-600", description: "تصدير البيانات والتقارير" },
  { id: "print", name: "طباعة", icon: FileText, color: "text-purple-600", description: "طباعة المستندات" },
  { id: "audit", name: "تدقيق", icon: Activity, color: "text-teal-600", description: "مراجعة سجل النشاطات" },
  { id: "configure", name: "تكوين", icon: Settings, color: "text-gray-600", description: "تكوين الإعدادات المتقدمة" }
];

export default function RolesPermissions() {
  const [activeTab, setActiveTab] = useState("roles");
  const [roles, setRoles] = useState(defaultRoles);
  const [users, setUsers] = useState(sampleUsers);
  const [auditLogs, setAuditLogs] = useState(sampleAuditLogs);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [permissionsMatrix, setPermissionsMatrix] = useState({});
  const { toast } = useToast();

  // إدارة الأدوار
  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    isActive: true
  });

  // إدارة المستخدمين
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    status: "active",
    roles: [],
    branch: ""
  });

  // تحديث مصفوفة الصلاحيات
  const updatePermission = (roleId, moduleId, screen, permissionId, value) => {
    setPermissionsMatrix(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [moduleId]: {
          ...prev[roleId]?.[moduleId],
          [`${screen}_${permissionId}`]: value
        }
      }
    }));
  };

  // الحصول على حالة الصلاحية
  const hasPermission = (roleId, moduleId, screen, permissionId) => {
    return permissionsMatrix[roleId]?.[moduleId]?.[`${screen}_${permissionId}`] || false;
  };

  // تحديد/إلغاء تحديد جميع الصلاحيات لشاشة معينة
  const toggleAllScreenPermissions = (roleId, moduleId, screen, value) => {
    const updates = {};
    permissionTypes.forEach(permission => {
      updates[`${screen}_${permission.id}`] = value;
    });
    
    setPermissionsMatrix(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [moduleId]: {
          ...prev[roleId]?.[moduleId],
          ...updates
        }
      }
    }));
  };

  // حفظ دور جديد أو تعديل دور موجود
  const handleSaveRole = () => {
    if (!roleForm.name.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال اسم الدور",
        variant: "destructive"
      });
      return;
    }

    if (editingRole) {
      setRoles(prev => prev.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...roleForm }
          : role
      ));
      
      // إضافة سجل تدقيق
      addAuditLog("تعديل دور", editingRole.name, `تم تعديل الدور: ${roleForm.name}`, "role");
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث الدور بنجاح"
      });
    } else {
      const newRole = {
        id: `role_${Date.now()}`,
        ...roleForm,
        userCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        permissions: {}
      };
      
      setRoles(prev => [...prev, newRole]);
      
      // إضافة سجل تدقيق
      addAuditLog("إنشاء دور", newRole.name, `تم إنشاء دور جديد: ${newRole.name}`, "role");
      
      toast({
        title: "تم الإنشاء",
        description: "تم إنشاء الدور بنجاح"
      });
    }

    resetRoleForm();
    setIsRoleDialogOpen(false);
  };

  // حذف دور
  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    if (role.userCount > 0) {
      toast({
        title: "لا يمكن الحذف",
        description: "لا يمكن حذف دور مرتبط بمستخدمين. يرجى نقل المستخدمين أولاً.",
        variant: "destructive"
      });
      return;
    }

    setRoles(prev => prev.filter(r => r.id !== roleId));
    
    // إضافة سجل تدقيق
    addAuditLog("حذف دور", role.name, `تم حذف الدور: ${role.name}`, "role");
    
    toast({
      title: "تم الحذف",
      description: "تم حذف الدور بنجاح"
    });
  };

  // إعادة تعيين نموذج الدور
  const resetRoleForm = () => {
    setRoleForm({
      name: "",
      description: "",
      color: "bg-gradient-to-r from-blue-500 to-indigo-500",
      isActive: true
    });
    setEditingRole(null);
  };

  // حفظ مستخدم جديد أو تعديل مستخدم موجود
  const handleSaveUser = () => {
    if (!userForm.name.trim() || !userForm.email.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال جميع البيانات المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userForm }
          : user
      ));
      
      // تحديث عدد المستخدمين في الأدوار
      updateRoleUserCounts();
      
      // إضافة سجل تدقيق
      addAuditLog("تعديل مستخدم", editingUser.name, `تم تعديل بيانات المستخدم: ${userForm.name}`, "user");
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث بيانات المستخدم بنجاح"
      });
    } else {
      const newUser = {
        id: `user_${Date.now()}`,
        ...userForm,
        lastLogin: "لم يسجل دخول بعد"
      };
      
      setUsers(prev => [...prev, newUser]);
      
      // تحديث عدد المستخدمين في الأدوار
      updateRoleUserCounts();
      
      // إضافة سجل تدقيق
      addAuditLog("إنشاء مستخدم", newUser.name, `تم إنشاء مستخدم جديد: ${newUser.name}`, "user");
      
      toast({
        title: "تم الإنشاء",
        description: "تم إنشاء المستخدم بنجاح"
      });
    }

    resetUserForm();
    setIsUserDialogOpen(false);
  };

  // حذف مستخدم
  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    setUsers(prev => prev.filter(u => u.id !== userId));
    
    // تحديث عدد المستخدمين في الأدوار
    updateRoleUserCounts();
    
    // إضافة سجل تدقيق
    addAuditLog("حذف مستخدم", user.name, `تم حذف المستخدم: ${user.name}`, "user");
    
    toast({
      title: "تم الحذف",
      description: "تم حذف المستخدم بنجاح"
    });
  };

  // إعادة تعيين نموذج المستخدم
  const resetUserForm = () => {
    setUserForm({
      name: "",
      email: "",
      status: "active",
      roles: [],
      branch: ""
    });
    setEditingUser(null);
  };

  // تحديث عدد المستخدمين في كل دور
  const updateRoleUserCounts = () => {
    setRoles(prev => prev.map(role => ({
      ...role,
      userCount: users.filter(user => user.roles.includes(role.id)).length
    })));
  };

  // إضافة سجل تدقيق
  const addAuditLog = (action, target, details, type) => {
    const newLog = {
      id: `audit_${Date.now()}`,
      action,
      user: "المستخدم الحالي", // في التطبيق الحقيقي سيكون من الـ session
      target,
      details,
      timestamp: new Date().toLocaleString('ar-EG'),
      type
    };
    
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // تصدير البيانات
  const handleExport = (type) => {
    let data = [];
    let filename = "";
    
    switch (type) {
      case 'roles':
        data = roles;
        filename = "الأدوار";
        break;
      case 'users':
        data = users;
        filename = "المستخدمين";
        break;
      case 'permissions':
        data = Object.entries(permissionsMatrix).map(([roleId, modules]) => ({
          roleId,
          roleName: roles.find(r => r.id === roleId)?.name,
          permissions: modules
        }));
        filename = "الصلاحيات";
        break;
      case 'audit':
        data = auditLogs;
        filename = "سجل_التدقيق";
        break;
    }
    
    // في التطبيق الحقيقي، سيتم تصدير البيانات فعلياً
    toast({
      title: "تم التصدير",
      description: `تم تصدير ${filename} بتنسيق Excel`
    });
  };

  // فلترة البيانات
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && role.isActive) ||
                         (filterStatus === "inactive" && !role.isActive);
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // تأثير جانبي لتحديث عدد المستخدمين
  useEffect(() => {
    updateRoleUserCounts();
  }, [users]);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              إدارة الأدوار والصلاحيات (RBAC)
            </h1>
            <p className="text-muted-foreground mt-2">
              نظام إدارة شامل للأدوار والصلاحيات مع التحكم الكامل في الوصول والأمان
            </p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              إدارة الأدوار
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              إدارة الصلاحيات
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              ربط المستخدمين
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              سجل التدقيق
            </TabsTrigger>
          </TabsList>

          {/* Tab: إدارة الأدوار */}
          <TabsContent value="roles" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    إدارة الأدوار
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleExport('roles')}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      تصدير الأدوار
                    </Button>
                    <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2" onClick={resetRoleForm}>
                          <Plus className="w-4 h-4" />
                          إضافة دور جديد
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            {editingRole ? "تعديل الدور" : "إضافة دور جديد"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingRole ? "تعديل بيانات الدور المحدد" : "إنشاء دور جديد بصلاحيات مخصصة"}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="roleName">اسم الدور</Label>
                            <Input
                              id="roleName"
                              value={roleForm.name}
                              onChange={(e) => setRoleForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="مثال: مشرف المبيعات"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="roleDescription">الوصف</Label>
                            <Textarea
                              id="roleDescription"
                              value={roleForm.description}
                              onChange={(e) => setRoleForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="وصف مختصر لمهام هذا الدور"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="roleColor">لون الدور</Label>
                            <Select 
                              value={roleForm.color} 
                              onValueChange={(value) => setRoleForm(prev => ({ ...prev, color: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bg-gradient-to-r from-blue-500 to-indigo-500">أزرق</SelectItem>
                                <SelectItem value="bg-gradient-to-r from-green-500 to-emerald-500">أخضر</SelectItem>
                                <SelectItem value="bg-gradient-to-r from-red-500 to-rose-500">أحمر</SelectItem>
                                <SelectItem value="bg-gradient-to-r from-purple-500 to-violet-500">بنفسجي</SelectItem>
                                <SelectItem value="bg-gradient-to-r from-orange-500 to-amber-500">برتقالي</SelectItem>
                                <SelectItem value="bg-gradient-to-r from-teal-500 to-cyan-500">تركوازي</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="roleActive"
                              checked={roleForm.isActive}
                              onCheckedChange={(checked) => setRoleForm(prev => ({ ...prev, isActive: checked }))}
                            />
                            <Label htmlFor="roleActive">دور نشط</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                            إلغاء
                          </Button>
                          <Button onClick={handleSaveRole}>
                            {editingRole ? "تحديث" : "إنشاء"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* فلاتر البحث */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="البحث في الأدوار..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأدوار</SelectItem>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* قائمة الأدوار */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRoles.map((role) => (
                    <Card key={role.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${role.color} text-white`}>
                              <Shield className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{role.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {role.userCount} مستخدم
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingRole(role);
                                setRoleForm({
                                  name: role.name,
                                  description: role.description,
                                  color: role.color,
                                  isActive: role.isActive
                                });
                                setIsRoleDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={role.userCount > 0}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل أنت متأكد من حذف الدور "{role.name}"؟ هذا الإجراء لا يمكن التراجع عنه.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteRole(role.id)}>
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {role.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant={role.isActive ? "default" : "secondary"}>
                            {role.isActive ? "نشط" : "غير نشط"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {role.createdAt}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredRoles.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد أدوار تطابق البحث</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: إدارة الصلاحيات */}
          <TabsContent value="permissions" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    إدارة الصلاحيات
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleExport('permissions')}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      تصدير الصلاحيات
                    </Button>
                    <Button 
                      onClick={() => {
                        // حفظ الصلاحيات
                        addAuditLog("حفظ الصلاحيات", "جميع الأدوار", "تم حفظ تحديثات الصلاحيات", "permission");
                        toast({
                          title: "تم الحفظ",
                          description: "تم حفظ إعدادات الصلاحيات بنجاح"
                        });
                      }}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      حفظ التغييرات
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* اختيار الدور */}
                <div className="mb-6">
                  <Label>اختيار الدور لتحرير صلاحياته</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="اختر الدور..." />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded ${role.color}`} />
                            {role.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRole && (
                  <div className="space-y-6">
                    {/* تابس الإدارات */}
                    <Tabs defaultValue={systemModules[0]?.id} className="w-full">
                      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1">
                        {systemModules.map((module) => {
                          const IconComponent = module.icon;
                          return (
                            <TabsTrigger 
                              key={module.id} 
                              value={module.id}
                              className="flex flex-col gap-1 p-3 h-auto"
                            >
                              <IconComponent className="w-4 h-4" />
                              <span className="text-xs text-center">{module.name}</span>
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>

                      {/* محتوى كل إدارة */}
                      {systemModules.map((module) => (
                        <TabsContent key={module.id} value={module.id} className="mt-6">
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <module.icon className="w-5 h-5 text-primary" />
                                صلاحيات {module.name}
                              </CardTitle>
                              <div className="text-sm text-muted-foreground">
                                حدد الصلاحيات المطلوبة لكل شاشة في هذه الإدارة
                              </div>
                            </CardHeader>
                            <CardContent>
                              {/* جدول الصلاحيات */}
                              <div className="border rounded-lg overflow-hidden">
                                {/* رأس الجدول */}
                                <div className="bg-muted/30 p-4">
                                  <div className="grid gap-2 items-center" style={{
                                    gridTemplateColumns: `250px 80px repeat(${permissionTypes.length}, 1fr)`
                                  }}>
                                    <div className="font-semibold text-right">اسم الشاشة</div>
                                    <div className="text-center font-semibold">الكل</div>
                                    {permissionTypes.map((perm) => (
                                      <Tooltip key={perm.id}>
                                        <TooltipTrigger asChild>
                                          <div className="text-center font-semibold cursor-help">
                                            <perm.icon className={`w-5 h-5 mx-auto ${perm.color}`} />
                                            <span className="text-xs mt-1 block">{perm.name}</span>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{perm.description}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    ))}
                                  </div>
                                </div>

                                {/* صفوف الشاشات */}
                                <div className="divide-y">
                                  {module.screens.map((screen, index) => (
                                    <div key={screen} className={`p-4 hover:bg-muted/20 transition-colors ${
                                      index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                                    }`}>
                                      <div className="grid gap-2 items-center" style={{
                                        gridTemplateColumns: `250px 80px repeat(${permissionTypes.length}, 1fr)`
                                      }}>
                                        {/* اسم الشاشة */}
                                        <div className="font-medium text-right pr-2">
                                          <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary/60" />
                                            {screen}
                                          </div>
                                        </div>

                                        {/* تحديد الكل */}
                                        <div className="flex justify-center">
                                          <Checkbox
                                            checked={permissionTypes.every(perm => hasPermission(selectedRole, module.id, screen, perm.id))}
                                            onCheckedChange={(checked) => 
                                              toggleAllScreenPermissions(selectedRole, module.id, screen, checked)
                                            }
                                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                          />
                                        </div>

                                        {/* صلاحيات فردية */}
                                        {permissionTypes.map((perm) => (
                                          <div key={perm.id} className="flex justify-center">
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <div>
                                                  <Checkbox
                                                    checked={hasPermission(selectedRole, module.id, screen, perm.id)}
                                                    onCheckedChange={(checked) => 
                                                      updatePermission(selectedRole, module.id, screen, perm.id, checked)
                                                    }
                                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                  />
                                                </div>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>{perm.name} - {screen}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* إحصائيات الإدارة */}
                              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    إجمالي الشاشات: <span className="font-medium text-foreground">{module.screens.length}</span>
                                  </span>
                                  <span className="text-muted-foreground">
                                    الصلاحيات المفعلة: <span className="font-medium text-foreground">
                                      {module.screens.reduce((count, screen) => {
                                        return count + permissionTypes.filter(perm => 
                                          hasPermission(selectedRole, module.id, screen, perm.id)
                                        ).length;
                                      }, 0)} / {module.screens.length * permissionTypes.length}
                                    </span>
                                  </span>
                                  <span className="text-muted-foreground">
                                    نسبة التفعيل: <span className="font-medium text-foreground">
                                      {Math.round((module.screens.reduce((count, screen) => {
                                        return count + permissionTypes.filter(perm => 
                                          hasPermission(selectedRole, module.id, screen, perm.id)
                                        ).length;
                                      }, 0) / (module.screens.length * permissionTypes.length)) * 100)}%
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}

                {!selectedRole && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Lock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">اختر دوراً لتحرير صلاحياته</h3>
                    <p>حدد الدور من القائمة أعلاه لعرض وتعديل صلاحياته حسب الإدارات</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: ربط المستخدمين */}
          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    إدارة المستخدمين وربط الأدوار
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleExport('users')}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      تصدير المستخدمين
                    </Button>
                    <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2" onClick={resetUserForm}>
                          <Plus className="w-4 h-4" />
                          إضافة مستخدم جديد
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            {editingUser ? "تعديل المستخدم" : "إضافة مستخدم جديد"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingUser ? "تعديل بيانات المستخدم وأدواره" : "إنشاء مستخدم جديد وتحديد أدواره"}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="userName">الاسم الكامل</Label>
                            <Input
                              id="userName"
                              value={userForm.name}
                              onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="أحمد محمد السعيد"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="userEmail">البريد الإلكتروني</Label>
                            <Input
                              id="userEmail"
                              type="email"
                              value={userForm.email}
                              onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="ahmed@company.com"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="userBranch">الفرع</Label>
                            <Input
                              id="userBranch"
                              value={userForm.branch}
                              onChange={(e) => setUserForm(prev => ({ ...prev, branch: e.target.value }))}
                              placeholder="الفرع الرئيسي"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="userStatus">حالة المستخدم</Label>
                            <Select 
                              value={userForm.status} 
                              onValueChange={(value) => setUserForm(prev => ({ ...prev, status: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">نشط</SelectItem>
                                <SelectItem value="inactive">غير نشط</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>الأدوار المخصصة</Label>
                            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                              {roles.filter(role => role.isActive).map((role) => (
                                <div key={role.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`user_role_${role.id}`}
                                    checked={userForm.roles.includes(role.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setUserForm(prev => ({ 
                                          ...prev, 
                                          roles: [...prev.roles, role.id] 
                                        }));
                                      } else {
                                        setUserForm(prev => ({ 
                                          ...prev, 
                                          roles: prev.roles.filter(r => r !== role.id) 
                                        }));
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`user_role_${role.id}`} className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded ${role.color}`} />
                                    {role.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                            إلغاء
                          </Button>
                          <Button onClick={handleSaveUser}>
                            {editingUser ? "تحديث" : "إنشاء"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* فلاتر البحث */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="البحث في المستخدمين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المستخدمين</SelectItem>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* جدول المستخدمين */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/30 p-4">
                    <div className="grid grid-cols-12 gap-4 font-semibold">
                      <div className="col-span-3">المستخدم</div>
                      <div className="col-span-2">الحالة</div>
                      <div className="col-span-4">الأدوار</div>
                      <div className="col-span-2">آخر دخول</div>
                      <div className="col-span-1">إجراءات</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {filteredUsers.map((user, index) => (
                      <div key={user.id} className={`p-4 hover:bg-muted/20 transition-colors ${
                        index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      }`}>
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{user.name}</h4>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <p className="text-xs text-muted-foreground">{user.branch}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <Badge variant={user.status === 'active' ? "default" : "secondary"}>
                              {user.status === 'active' ? "نشط" : "غير نشط"}
                            </Badge>
                          </div>
                          <div className="col-span-4">
                            <div className="flex flex-wrap gap-1">
                              {user.roles.map(roleId => {
                                const role = roles.find(r => r.id === roleId);
                                return role ? (
                                  <Badge key={roleId} variant="outline" className="text-xs">
                                    {role.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-sm text-muted-foreground">
                              {user.lastLogin}
                            </span>
                          </div>
                          <div className="col-span-1">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingUser(user);
                                  setUserForm({
                                    name: user.name,
                                    email: user.email,
                                    status: user.status,
                                    roles: user.roles,
                                    branch: user.branch || ""
                                  });
                                  setIsUserDialogOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      هل أنت متأكد من حذف المستخدم "{user.name}"؟ هذا الإجراء لا يمكن التراجع عنه.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                                      حذف
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد مستخدمين يطابقون البحث</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: سجل التدقيق */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    سجل التدقيق والمراجعة
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleExport('audit')}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      تصدير السجل
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setAuditLogs([]);
                        toast({
                          title: "تم مسح السجل",
                          description: "تم مسح جميع سجلات التدقيق"
                        });
                      }}
                      className="gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      مسح السجل
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* فلاتر سجل التدقيق */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="البحث في السجل..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="نوع العملية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع العمليات</SelectItem>
                      <SelectItem value="role">الأدوار</SelectItem>
                      <SelectItem value="permission">الصلاحيات</SelectItem>
                      <SelectItem value="user">المستخدمين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* قائمة سجل التدقيق */}
                <div className="space-y-3">
                  {auditLogs
                    .filter(log => {
                      const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                           log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                           log.target.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesType = filterStatus === "all" || log.type === filterStatus;
                      return matchesSearch && matchesType;
                    })
                    .map((log) => (
                      <Card key={log.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              log.type === 'role' ? 'bg-blue-100 text-blue-600' :
                              log.type === 'permission' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              {log.type === 'role' ? <Shield className="w-4 h-4" /> :
                               log.type === 'permission' ? <Lock className="w-4 h-4" /> :
                               <Users className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{log.action}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {log.type === 'role' ? 'دور' :
                                   log.type === 'permission' ? 'صلاحية' : 'مستخدم'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                <span className="font-medium">{log.user}</span> قام بـ {log.action} على{" "}
                                <span className="font-medium">{log.target}</span>
                              </p>
                              <p className="text-sm text-muted-foreground">{log.details}</p>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground text-left">
                            {log.timestamp}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>

                {auditLogs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد عمليات في سجل التدقيق</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الأدوار</p>
                  <p className="text-2xl font-bold">{roles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">وحدات النظام</p>
                  <p className="text-2xl font-bold">{systemModules.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">عمليات اليوم</p>
                  <p className="text-2xl font-bold">{auditLogs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}