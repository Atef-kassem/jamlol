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
import { useAssignPermissionsToRoleMutation, useCreateRoleMutation, useDeleteRoleMutation, useGetAllRolesQuery, useUpdateRoleMutation } from "../../redux/Slices/role";
import { useCreatePermissionMutation, useDeletePermissionMutation, useGetAllPermissionsQuery, useUpdatePermissionMutation } from "../../redux/Slices/permission";
import roleSchema from "../../validation/roleSchema";
import permissionSchema from "../../validation/permissionSchema";
import { useGetAllUsersQuery, useAssignRoleToUserMutation } from "../../redux/Slices/user";


// Spinner بسيط (يمكنك استبداله بأي مكون لديك)
const Spinner = (props) => (
  <svg {...props} viewBox="0 0 50 50" className={props.className || "animate-spin"}>
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="31.4 31.4" />
  </svg>
);

export default function RolesPermissions() {
  const [activeTab, setActiveTab] = useState("roles");
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [permissionsMatrix, setPermissionsMatrix] = useState({});
  const { toast } = useToast();
  const [createRole, { isLoading: isCreatingRole }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeletingRole }] = useDeleteRoleMutation();
  const [assignPermissionsToRole, { isLoading: isAssigningPermissions }] = useAssignPermissionsToRoleMutation();
  const { data: rolesData, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetAllRolesQuery();
  const [createPermission, { isLoading: isCreatingPermission }] = useCreatePermissionMutation();
  const [updatePermission, { isLoading: isUpdatingPermission }] = useUpdatePermissionMutation();
  const [deletePermission, { isLoading: isDeletingPermission }] = useDeletePermissionMutation();
  const { data: permissionsData, isLoading: isLoadingPermissions, isError: isErrorPermissions } = useGetAllPermissionsQuery();
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetAllUsersQuery("admin");

  // إدارة الأدوار
  const [roleForm, setRoleForm] = useState({
    name: "",
  });

  // إدارة المستخدمين
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    status: "active",
    roles: [],
    branch: ""
  });

  const [roleFormErrors, setRoleFormErrors] = useState({});
  const [permissionFormErrors, setPermissionFormErrors] = useState({});


  useEffect(() => {
    if (rolesData) {
      setRoles(rolesData);
    }
  }, [rolesData]);

  useEffect(() => {
    if (permissionsData) {
      setPermissions(permissionsData);
    }
  }, [permissionsData]);
  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  // حفظ دور جديد أو تعديل دور موجود
  const handleSaveRole = async () => {
    setRoleFormErrors({});
    // تحقق من uniqueness
    const isDuplicate = roles.some(r => r.name.trim().toLowerCase() === roleForm.name.trim().toLowerCase() && r.id !== roleForm.id);
    if (isDuplicate) {
      setRoleFormErrors({ name: "اسم الدور مستخدم بالفعل" });
      return;
    }
    try {
      await roleSchema.validate(roleForm, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      validationError.inner?.forEach(err => {
        if (err.path) errors[err.path] = err.message;
      });
      setRoleFormErrors(errors);
      toast({
        title: "خطأ في البيانات",
        description: validationError.errors?.[0] || "بيانات الدور غير صحيحة",
        variant: "destructive"
      });
      return;
    }
    try {
      const body = {
        name: roleForm.name
      };
      if (editingRole) {
        await updateRole({ id: editingRole.id, data: body }).unwrap();
        toast({ title: "تم التحديث", description: "تم تحديث الدور بنجاح" });
      } else {
        await createRole(body).unwrap();
        toast({ title: "تم الإنشاء", description: "تم إنشاء الدور بنجاح" });
      }
      resetRoleForm();
      setIsRoleDialogOpen(false);
    } catch (err) {
      toast({ title: "خطأ في الحفظ", description: err?.data?.message || "حدث خطأ أثناء حفظ الدور", variant: "destructive" });
    }
  };

  // حذف دور
  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(roleId).unwrap();
      toast({ title: "تم الحذف", description: "تم حذف الدور بنجاح" });
    } catch (err) {
      toast({ title: "خطأ في الحذف", description: err?.data?.message || "حدث خطأ أثناء حذف الدور", variant: "destructive" });
    }
  };

  // إعادة تعيين نموذج الدور
  const resetRoleForm = () => {
    setRoleForm({
      name: "",
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
      userCount: users?.filter(user => user.role_id===role.id).length
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

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // تأثير جانبي لتحديث عدد المستخدمين
  useEffect(() => {
    updateRoleUserCounts();
  }, [users]);

  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [permissionForm, setPermissionForm] = useState({ name: "", slug: "", groupBy: "" });
  const [permissions, setPermissions] = useState([]);
  // عند إنشاء أو تعديل صلاحية (Permission):
  const handleSavePermission = async () => {
    setPermissionFormErrors({});
    // تحقق من uniqueness
    const isDuplicate = permissions.some(p => p.name.trim().toLowerCase() === permissionForm.name.trim().toLowerCase() && p.id !== permissionForm.id);
    if (isDuplicate) {
      setPermissionFormErrors({ name: "اسم الصلاحية مستخدم بالفعل" });
      return;
    }
    try {
      await permissionSchema.validate(permissionForm, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      validationError.inner?.forEach(err => {
        if (err.path) errors[err.path] = err.message;
      });
      setPermissionFormErrors(errors);
      toast({
        title: "خطأ في البيانات",
        description: validationError.errors?.[0] || "بيانات الصلاحية غير صحيحة",
        variant: "destructive"
      });
      return;
    }
    try {
      const body = {
        name: permissionForm.name,
        slug: permissionForm.slug,
        groupBy: Number(permissionForm.groupBy)
      };
      if (permissionForm.id) {
        await updatePermission({ id: permissionForm.id, data: body }).unwrap();
        toast({ title: "تم التحديث", description: "تم تحديث الصلاحية بنجاح" });
      } else {
        await createPermission(body).unwrap();
        toast({ title: "تمت الإضافة", description: "تمت إضافة الصلاحية بنجاح" });
      }
      setPermissionForm({ name: "", slug: "", groupBy: "" });
      setIsPermissionDialogOpen(false);
    } catch (err) {
      toast({ title: "خطأ في الحفظ", description: err?.data?.message || "حدث خطأ أثناء حفظ الصلاحية", variant: "destructive" });
    }
  };

  const handleDeletePermission = async (permissionId) => {
    try {
      console.log(permissionId)
      await deletePermission(permissionId).unwrap();
      toast({ title: "تم الحذف", description: "تم حذف الصلاحية بنجاح" });
      setPermissions(prev => prev.filter(perm => perm.id !== permissionId));
    } catch (err) {
      toast({ title: "خطأ في الحذف", description: err?.data?.message || "حدث خطأ أثناء حذف الصلاحية", variant: "destructive" });
    }
  };

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handlePermissionCheckboxChange = (permissionId, checked) => {
    setSelectedPermissions(prev => {
      if (checked) {
        return [...prev, permissionId];
      } else {
        return prev.filter(id => id !== permissionId);
      }
    });
  };
  // تحديث selectedPermissions تلقائياً عند تغيير الدور المختار وبعد تحميل roles و permissions
useEffect(() => {
  if (!selectedRole || !roles.length || !permissions.length) {
    setSelectedPermissions([]);
    return;
  }
  const role = roles.find(r => r.id === selectedRole);
  if (role && Array.isArray(role.Permissions) && role.Permissions.length) {
    let permNames = [];
    if (typeof role.Permissions[0] === 'object' && role.Permissions[0]?.name) {
      permNames = role.Permissions.map(p => p.name);
    } else if (typeof role.Permissions[0] === 'string' || typeof role.Permissions[0] === 'number') {
      permNames = role.Permissions;
    }
    const permIds = permissions
      .filter(perm => permNames.includes(perm.name) || permNames.includes(perm.id))
      .map(perm => perm.id);
    setSelectedPermissions(permIds);
  } else {
    setSelectedPermissions([]);
  }
}, [selectedRole, roles, permissions]);

  // عند حفظ الصلاحيات، أرسل فقط selectedPermissions
  // Spinner loading state for assign permissions
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);

  // عند حفظ الصلاحيات، أظهر سبنر وأرسل selectedPermissions فقط
  const handleAssignPermissionsToRole = async (e) => {
    e.preventDefault();
    setIsSavingPermissions(true);
    const Permissions = permissions
      .filter(perm => selectedPermissions.includes(perm.id))
      .map(perm => ({ [perm.name]: true }));
    try {
      await assignPermissionsToRole({ id: selectedRole, permissions: { Permissions } }).unwrap();
      toast({ title: "تم الحفظ", description: "تم حفظ صلاحيات الدور بنجاح" });
    } catch (err) {
      toast({ title: "خطأ في الحفظ", description: err?.data?.message || "حدث خطأ أثناء حفظ الصلاحيات", variant: "destructive" });
    } finally {
      setIsSavingPermissions(false);
    }
  };

  return (
    console.log(users),
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
            <TabsTrigger value="roles" className={activeTab === "roles" ? "bg-green-600 text-white" : ""}>إدارة الأدوار</TabsTrigger>
            <TabsTrigger value="permissions" className={activeTab === "permissions" ? "bg-green-600 text-white" : ""}>إدارة الصلاحيات</TabsTrigger>
            <TabsTrigger value="assign-role-perm" className={activeTab === "assign-role-perm" ? "bg-green-600 text-white" : ""}>ربط الأدوار بالصلاحيات</TabsTrigger>
            <TabsTrigger value="assign-user-role" className={activeTab === "assign-user-role" ? "bg-green-600 text-white" : ""}>ربط المستخدمين بالأدوار</TabsTrigger>
          </TabsList>

          {/* Tab: إدارة الأدوار */}
          <TabsContent value="roles" className="space-y-6">
            {/* Card الأدوار */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between flex-row-reverse">
                <Button onClick={() => setIsRoleDialogOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> إضافة دور جديد
                </Button>
                <CardTitle>كل الأدوار</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-right p-2 border-b">اسم الدور</th>
                        <th className="text-right p-2 border-b">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map((role) => (
                        <tr key={role.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">{role.name}</td>
                          <td className="p-2 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => { setRoleForm(role); setIsRoleDialogOpen(true);setEditingRole(role) }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل أنت متأكد أنك تريد حذف هذا الدور؟ لا يمكن التراجع عن هذا الإجراء.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteRole(role.id)} disabled={isDeletingRole}>
                                    {isDeletingRole && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                                    نعم، احذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            {/* Dialog لإضافة/تعديل الدور */}
            <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{roleForm.name? "تعديل الدور" : "إضافة دور جديد"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="roleName">اسم الدور</Label>
                    <Input id="roleName" value={roleForm.name} onChange={e => setRoleForm(prev => ({ ...prev, name: e.target.value }))} className="mt-1" />
                    {roleFormErrors.name && <div className="text-red-600 text-xs mt-1">{roleFormErrors.name}</div>}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>إلغاء</Button>
                  <Button onClick={handleSaveRole} disabled={isCreatingRole || isUpdatingRole}>
                    {(isCreatingRole || isUpdatingRole) && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                    حفظ
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Tab: إدارة الصلاحيات */}
          <TabsContent value="permissions" className="space-y-6">
            {/* Card الصلاحيات */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between flex-row-reverse">
                <Button onClick={() => setIsPermissionDialogOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> إضافة صلاحية جديدة
                </Button>
                <CardTitle>كل الصلاحيات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-right p-2 border-b">اسم الصلاحية</th>
                        <th className="text-right p-2 border-b">الوصف</th>
                        <th className="text-right p-2 border-b">التصنيف</th>
                        <th className="text-right p-2 border-b">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions.map((perm) => (
                        <tr key={perm.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">{perm.name}</td>
                          <td className="p-2">{perm.slug}</td>
                          <td className="p-2">{perm.groupBy}</td>
                          <td className="p-2 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => { setPermissionForm(perm); setIsPermissionDialogOpen(true); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل أنت متأكد أنك تريد حذف هذه الصلاحية؟ لا يمكن التراجع عن هذا الإجراء.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeletePermission(perm.id)} disabled={isDeletingPermission}>
                                    {isDeletingPermission && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                                    نعم، احذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            {/* Dialog لإضافة/تعديل الصلاحية */}
            <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{permissionForm.id ? "تعديل الصلاحية" : "إضافة صلاحية جديدة"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="permName">اسم الصلاحية</Label>
                    <Input id="permName" value={permissionForm.name} onChange={e => setPermissionForm(prev => ({ ...prev, name: e.target.value }))} className="mt-1" />
                    {permissionFormErrors.name && <div className="text-red-600 text-xs mt-1">{permissionFormErrors.name}</div>}
                  </div>
                  <div>
                    <Label htmlFor="permSlug">الوصف</Label>
                    <Input id="permSlug" value={permissionForm.slug} onChange={e => setPermissionForm(prev => ({ ...prev, slug: e.target.value }))} className="mt-1" />
                    {permissionFormErrors.slug && <div className="text-red-600 text-xs mt-1">{permissionFormErrors.slug}</div>}
                  </div>
                  <div>
                    <Label htmlFor="permGroup">تصنيف حسب</Label>
                    <Input id="permGroup" value={permissionForm.groupBy} onChange={e => setPermissionForm(prev => ({ ...prev, groupBy: e.target.value }))} className="mt-1" />
                    {permissionFormErrors.groupBy && <div className="text-red-600 text-xs mt-1">{permissionFormErrors.groupBy}</div>}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>إلغاء</Button>
                  <Button onClick={handleSavePermission} disabled={isCreatingPermission || isUpdatingPermission}>
                    {(isCreatingPermission || isUpdatingPermission) && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                    حفظ
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Tab: ربط الأدوار بالصلاحيات */}
          <TabsContent value="assign-role-perm">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>ربط الدور بالصلاحيات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label>اختيار الدور</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="اختر الدور..." />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedRole && (() => {
                  const currentRole = roles.find(r => r.id === selectedRole);
                  const currentRolePermissions = currentRole?.Permissions?.map(p => p.name) || [];
                  return (
                    <form onSubmit={handleAssignPermissionsToRole} className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {permissions.map((perm) => (
                          <div key={perm.id} className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedPermissions.includes(perm.id)}
                              onCheckedChange={checked => handlePermissionCheckboxChange(perm.id, checked)}
                            />
                            <span className={selectedPermissions.includes(perm.id) ? 'text-green-600 font-bold' : ''}>{perm.name}</span>
                          </div>
                        ))}
                      </div>
                      <DialogFooter className="mt-4">
                        <Button type="submit" disabled={isSavingPermissions}>
                          {isSavingPermissions && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                          حفظ الصلاحيات للدور
                        </Button>
                      </DialogFooter>
                    </form>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: ربط المستخدمين بالأدوار */}
          <TabsContent value="assign-user-role">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>ربط المستخدمين بالأدوار</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label>اختيار المستخدم</Label>
                  <Select value={editingUser?.id} onValueChange={id => setEditingUser(users.find(u => u.id === id))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="اختر المستخدم..." />
                    </SelectTrigger>
                    <SelectContent>
                      {users?.map((user) => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {editingUser && (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                      {roles.map((role) => (
                        <div key={role.id} className="flex items-center gap-2">
                          <Checkbox
                            className="custom-checkbox-primary"
                            checked={editingUser.role_id === role.id}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setEditingUser(prev => ({ ...prev, role_id: role.id }));
                                setUsers(prev => prev.map(user =>
                                  user.id === editingUser.id
                                    ? { ...user, role_id: role.id }
                                    : user
                                ));
                              } else {
                                setEditingUser(prev => ({ ...prev, role_id: null }));
                                setUsers(prev => prev.map(user =>
                                  user.id === editingUser.id
                                    ? { ...user, role_id: null }
                                    : user
                                ));
                              }
                              updateRoleUserCounts();
                              addAuditLog("تعديل دور مستخدم", editingUser.name, `تم تعديل دور المستخدم: ${role.name}`, "user");
                            }}
                          />
                          <span>{role.name}</span>
                        </div>
                      ))}
                    </div>
                    <AssignUserRoleButton editingUser={editingUser} roles={roles} />
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
                  <p className="text-2xl font-bold">{users?. length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
        
          
       
        </div>
      </div>
      {(isLoadingRoles || isLoadingPermissions || isLoadingUsers) && (
  <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
    <Spinner className="w-12 h-12 text-green-600" />
  </div>
)}
    </TooltipProvider>
  );
}

function AssignUserRoleButton({ editingUser, roles }) {
  const [assignRoleToUser, { isLoading }] = useAssignRoleToUserMutation();
  const { toast } = useToast();
  const selectedRoleId = editingUser.role_id;

  const handleAssign = async () => {
    if (!selectedRoleId) return;
    try {
     const res= await assignRoleToUser({ id: editingUser.id, roleId: selectedRoleId }).unwrap();
     console.log(res)
      toast({ title: "تم الربط", description: "تم ربط المستخدم بالدور بنجاح" });
    } catch (err) {
      toast({ title: "خطأ في الربط", description: err?.data?.message || "حدث خطأ أثناء ربط المستخدم بالدور", variant: "destructive" });
    }
  };

  // Disable if no role selected or already assigned
  const isDisabled = !selectedRoleId;

  return (
    <Button onClick={handleAssign} disabled={isDisabled || isLoading} className="mt-2">
      {isLoading && <Spinner className="w-4 h-4 mr-2 inline-block" />}
      ربط المستخدم بالدور
    </Button>
  );
}