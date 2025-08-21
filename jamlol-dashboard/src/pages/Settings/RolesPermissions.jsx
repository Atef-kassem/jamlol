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
import { useCreateRoleMutation, useDeleteRoleMutation, useGetAllRolesQuery, useUpdateRoleMutation } from "../../redux/Slices/role";
import { useCreatePermissionMutation, useDeletePermissionMutation, useGetAllPermissionsQuery, useUpdatePermissionMutation } from "../../redux/Slices/permission";
import roleSchema from "../../validation/roleSchema";
import permissionSchema from "../../validation/permissionSchema";
import { useGetAllUsersQuery, useAssignRoleToUserMutation } from "../../redux/Slices/user";
import { useGetAllManagementsQuery, useGetManagementsWithPermissionsQuery } from "../../redux/Slices/management";


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

  const { data: rolesData, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetAllRolesQuery();
  const [createPermission, { isLoading: isCreatingPermission }] = useCreatePermissionMutation();
  const [updatePermission, { isLoading: isUpdatingPermission }] = useUpdatePermissionMutation();
  const [deletePermission, { isLoading: isDeletingPermission }] = useDeletePermissionMutation();
  const { data: permissionsData, isLoading: isLoadingPermissions, isError: isErrorPermissions } = useGetAllPermissionsQuery();
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetAllUsersQuery("admin");
  const { data: managementsData, isLoading: isLoadingManagements, isError: isErrorManagements } = useGetAllManagementsQuery();
  const { data: managementsWithPermissionsData, isLoading: isLoadingManagementsWithPermissions, isError: isErrorManagementsWithPermissions, refetch: refetchManagementsWithPermissions } = useGetManagementsWithPermissionsQuery();
  // إدارة الأدوار
  const [roleForm, setRoleForm] = useState({
    name: "",
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
  const [permissionForm, setPermissionForm] = useState({ name: "", slug: "", management_id: null });
  const [managementSearchTerm, setManagementSearchTerm] = useState("");
  const [isManagementDropdownOpen, setIsManagementDropdownOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  
  // متغيرات لعرض تفاصيل الدور
  const [selectedRoleForDetails, setSelectedRoleForDetails] = useState(null);
  const [isRoleDetailsDialogOpen, setIsRoleDetailsDialogOpen] = useState(false);

  // دالة عرض تفاصيل الدور
  const handleViewRoleDetails = (role) => {
    setSelectedRoleForDetails(role);
    setIsRoleDetailsDialogOpen(true);
  };

  // دالة إعادة تعيين نموذج الصلاحية
  const resetPermissionForm = () => {
    setPermissionForm({ name: "", slug: "", management_id: null });
    setManagementSearchTerm("");
    setIsManagementDropdownOpen(false);
    setPermissionFormErrors({});
  };

  // إغلاق قائمة الإدارات عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isManagementDropdownOpen && !event.target.closest('.management-dropdown')) {
        setIsManagementDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isManagementDropdownOpen]);
  // عند إنشاء أو تعديل صلاحية (Permission):
  const handleSavePermission = async () => {
    setPermissionFormErrors({});
    
    // تجميع جميع الأخطاء
    const errors = {};
    
    // تحقق من اسم الصلاحية
    if (!permissionForm.name.trim()) {
      errors.name = "اسم الصلاحية مطلوب";
    }
    
    // تحقق من الاسم المختصر
    if (!permissionForm.slug.trim()) {
      errors.slug = "الاسم المختصر مطلوب";
    }
    
    // تحقق من الإدارة
    if (!permissionForm.management_id || permissionForm.management_id === "" || isNaN(Number(permissionForm.management_id))) {
      errors.management_id = "الإدارة مطلوبة";
    }
    
    // إذا كان هناك أخطاء، اعرضها جميعاً
    if (Object.keys(errors).length > 0) {
      setPermissionFormErrors(errors);
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال جميع البيانات المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
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
        management_id: Number(permissionForm.management_id)
      };
      if (permissionForm.id) {
        await updatePermission({ id: permissionForm.id, data: body }).unwrap();
        toast({ title: "تم التحديث", description: "تم تحديث الصلاحية بنجاح" });
      } else {
        await createPermission(body).unwrap();
        toast({ title: "تمت الإضافة", description: "تمت إضافة الصلاحية بنجاح" });
      }
      
      // إعادة تحميل البيانات لتحديث الأقسام مع الصلاحيات
      await refetchManagementsWithPermissions();
      
      // تحديث البيانات المحلية للصلاحيات
      if (permissionForm.id) {
        // تحديث صلاحية موجودة
        setPermissions(prev => prev.map(perm => 
          perm.id === permissionForm.id 
            ? { ...perm, name: permissionForm.name, slug: permissionForm.slug, management_id: permissionForm.management_id }
            : perm
        ));
      } else {
        // إضافة صلاحية جديدة - سيتم تحديثها تلقائياً من API
        // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
      }
      
      resetPermissionForm();
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
      
      // تحديث البيانات المحلية
      setPermissions(prev => prev.filter(perm => perm.id !== permissionId));
      
      // إعادة تحميل البيانات لتحديث الأقسام مع الصلاحيات
      await refetchManagementsWithPermissions();
      
      // إعادة تعيين الصلاحيات المختارة إذا كان الدور المختار يحتوي على الصلاحية المحذوفة
      if (selectedRole) {
        setSelectedPermissions(prev => prev.filter(id => id !== permissionId));
      }
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
  // تحديث selectedPermissions تلقائياً عند تغيير الدور المختار وبعد تحميل roles و managementsWithPermissionsData
useEffect(() => {
  if (!selectedRole || !roles.length || !managementsWithPermissionsData?.length) {
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
    
    // استخراج جميع الصلاحيات من managementsWithPermissionsData
    const allPermissions = managementsWithPermissionsData.flatMap(management => 
      management.Permissions || []
    );
    
    const permIds = allPermissions
      .filter(perm => permNames.includes(perm.name) || permNames.includes(perm.id))
      .map(perm => perm.id);
    setSelectedPermissions(permIds);
  } else {
    setSelectedPermissions([]);
  }
}, [selectedRole, roles, managementsWithPermissionsData]);

  // عند حفظ الصلاحيات، أرسل فقط selectedPermissions
  // Spinner loading state for assign permissions
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);

  // عند حفظ الصلاحيات، أظهر سبنر وأرسل selectedPermissions فقط
  const handleAssignPermissionsToRole = async (e) => {
    e.preventDefault();
    setIsSavingPermissions(true);
    
    // استخراج جميع الصلاحيات من managementsWithPermissionsData
    const allPermissions = managementsWithPermissionsData?.flatMap(management => 
      management.Permissions || []
    ) || [];
    
    const permissions = allPermissions
      .filter(perm => selectedPermissions.includes(perm.id))
      .map(perm => ({ [perm.name]: true }));
    try {
      // استخدام updateRole بدلاً من assignPermissionsToRole
      await updateRole({ 
        id: selectedRole, 
        data: { 
          permissions: permissions
        } 
      }).unwrap();
      
      toast({ title: "تم الحفظ", description: "تم حفظ صلاحيات الدور بنجاح" });
    } catch (err) {
      toast({ title: "خطأ في الحفظ", description: err?.data?.message || "حدث خطأ أثناء حفظ الصلاحيات", variant: "destructive" });
    } finally {
      setIsSavingPermissions(false);
    }
  };

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
                {roles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Shield className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">لا توجد أدوار</h3>
                    <p className="text-sm text-muted-foreground mt-2">اضغط على زر "إضافة دور جديد" لبدء إنشاء الأدوار</p>
          
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-right p-2 border-b">ID</th>
                          <th className="text-right p-2 border-b">اسم الدور</th>
                          <th className="text-right p-2 border-b">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((role) => (
                          <tr key={role.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 text-gray-500 font-mono">{role.id}</td>
                            <td className="p-2">{role.name}</td>
                            <td className="p-2 flex gap-2">
                             <Button 
                               size="sm" 
                               variant="outline" 
                               onClick={() => handleViewRoleDetails(role)}
                               className="hover:bg-blue-50 hover:text-blue-600"
                               title="عرض التفاصيل"
                             >
                               <Eye className="w-4 h-4" />
                             </Button>
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
                )}
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
                {permissions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Lock className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">لا توجد صلاحيات</h3>
                    <p className="text-sm text-muted-foreground mt-2">اضغط على زر "إضافة صلاحية جديدة" لبدء إنشاء الصلاحيات</p>
                  
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-right p-2 border-b">اسم الصلاحية</th>
                          <th className="text-right p-2 border-b">اسم مختصر</th>
                          <th className="text-right p-2 border-b">الادارة</th>
                          <th className="text-right p-2 border-b">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {permissions.map((perm) => (
                          <tr key={perm.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{perm.name}</td>
                            <td className="p-2">{perm.slug}</td>
                            <td className="p-2">{perm.Management.name}</td>
                            <td className="p-2 flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => { 
                                const managementId = perm.management_id || perm.Management?.id;
                                const managementName = managementsData?.find(m => m.id == managementId)?.name || "";
                                setPermissionForm({
                                  id: perm.id,
                                  name: perm.name,
                                  slug: perm.slug,
                                  management_id: Number(managementId)
                                }); 
                                setManagementSearchTerm(managementName);
                                setIsPermissionDialogOpen(true); 
                              }}>
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
                )}
              </CardContent>
            </Card>
            {/* Dialog لإضافة/تعديل الصلاحية */}
            <Dialog open={isPermissionDialogOpen} onOpenChange={(open) => {
              setIsPermissionDialogOpen(open);
              if (!open) {
                // إعادة تعيين النموذج عند الإغلاق
                resetPermissionForm();
              }
            }}>
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
                    <Label htmlFor="permSlug">اسم مختصر</Label>
                    <Input id="permSlug" value={permissionForm.slug} onChange={e => setPermissionForm(prev => ({ ...prev, slug: e.target.value }))} className="mt-1" />
                    {permissionFormErrors.slug && <div className="text-red-600 text-xs mt-1">{permissionFormErrors.slug}</div>}
                  </div>
                  <div>
                    <Label htmlFor="permManagement">الادارة</Label>
                    <div className="relative management-dropdown">
                      <Input
                        placeholder="ابحث واختر الإدارة..."
                        value={managementSearchTerm}
                        onChange={(e) => setManagementSearchTerm(e.target.value)}
                        onFocus={() => setIsManagementDropdownOpen(true)}
                        className="mt-1"
                      />
                      {isManagementDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {isLoadingManagements ? (
                            <div className="flex items-center justify-center p-4">
                              <Spinner className="w-4 h-4 mr-2" />
                              جاري التحميل...
                            </div>
                          ) : managementsData?.length > 0 ? (
                            managementsData
                              .filter(management => 
                                management.name.toLowerCase().includes(managementSearchTerm.toLowerCase())
                              )
                              .map((management) => (
                                <div
                                  key={management.id}
                                  className={`p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0 ${
                                    permissionForm.management_id == management.id ? 'bg-blue-50 text-blue-600' : ''
                                  }`}
                                                                     onClick={() => {
                                     setPermissionForm(prev => ({ ...prev, management_id: Number(management.id) }));
                                     setManagementSearchTerm(management.name);
                                     setIsManagementDropdownOpen(false);
                                   }}
                                >
                                  {management.name}
                                </div>
                              ))
                          ) : (
                            <div className="p-4 text-center text-muted-foreground">
                              لا توجد إدارات متاحة
                            </div>
                          )}
                        </div>
                      )}
                      {permissionForm.management_id && managementsData && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                          <span className="font-medium">الإدارة المختارة:</span> {managementsData.find(m => m.id == permissionForm.management_id)?.name}
                        </div>
                      )}
                    </div>
                    {permissionFormErrors.management_id && <div className="text-red-600 text-xs mt-1">{permissionFormErrors.management_id}</div>}
                  </div>
                </div>
                                 <DialogFooter>
                   <Button variant="outline" onClick={() => {
                     resetPermissionForm();
                     setIsPermissionDialogOpen(false);
                   }}>إلغاء</Button>
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
                {/* فحص وجود أدوار */}
                {roles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Shield className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">لا توجد أدوار</h3>
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      يجب إنشاء أدوار أولاً قبل ربطها بالصلاحيات
                    </p>
                 
                  </div>
                ) :permissions.length === 0 ?  (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Lock className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">لا توجد صلاحيات</h3>
                    <p className="text-sm text-muted-foreground mt-2">اضغط على زر "إضافة صلاحية جديدة" لبدء إنشاء الصلاحيات</p>
                  
                  </div>
                ) : (
                  <>
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
                          {isLoadingManagementsWithPermissions ? (
                            <div className="flex items-center justify-center p-8">
                              <Spinner className="w-6 h-6 mr-2" />
                              جاري تحميل الصلاحيات...
                            </div>
                          ) : managementsWithPermissionsData && managementsWithPermissionsData.length > 0 ? (
                            <div>
                              {/* عناوين الأعمدة */}
                              <div className="flex items-center gap-6 mb-4 p-3 bg-gray-50 rounded-lg">
                                <div className="text-right min-w-[150px]">
                                  <h3 className="font-semibold text-gray-700">الإدارة</h3>
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-700">الصلاحيات</h3>
                                </div>
                              </div>
                              
                              {/* عرض الإدارات مع صلاحياتها */}
                              <div className="space-y-4">
                                {managementsWithPermissionsData
                                  .filter(management => management.Permissions && management.Permissions.length > 0)
                                  .map((management) => (
                                    <div key={management.id} className="flex items-start gap-6 hover:bg-gray-50 p-3 rounded-lg">
                                      <div className="flex items-center gap-2 text-right min-w-[150px]">
                                        <Package className="w-4 h-4 text-primary" />
                                        <span className="font-medium text-primary">{management.name}</span>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex flex-wrap gap-4">
                                          {management.Permissions.map((perm) => (
                                            <div key={perm.id} className="flex items-center gap-2">
                                              <Checkbox
                                                checked={selectedPermissions.includes(perm.id)}
                                                onCheckedChange={checked => handlePermissionCheckboxChange(perm.id, checked)}
                                              />
                                              <span className={`text-sm font-medium ${selectedPermissions.includes(perm.id) ? 'text-green-600' : 'text-gray-700'}`}>
                                                {perm.name}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-12">
                              <Lock className="w-16 h-16 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium text-muted-foreground">لا توجد صلاحيات</h3>
                              <p className="text-sm text-muted-foreground mt-2 text-center">
                                يجب إنشاء صلاحيات أولاً قبل ربطها بالأدوار
                              </p>
                              <Button 
                                onClick={() => setActiveTab("permissions")}
                                className="mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                              >
                                <Lock className="w-4 h-4 mr-2" />
                                إنشاء صلاحية جديدة
                              </Button>
                            </div>
                          )}
                          <DialogFooter className="mt-6">
                            <Button type="submit" disabled={isSavingPermissions || !managementsWithPermissionsData?.length}>
                              {isSavingPermissions && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                              حفظ الصلاحيات للدور
                            </Button>
                          </DialogFooter>
                        </form>
                      );
                    })()}
                  </>
                )}
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
                {/* فحص وجود أدوار */}
                {roles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Shield className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">لا توجد أدوار</h3>
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      يجب إنشاء أدوار أولاً قبل ربط المستخدمين بها
                    </p>
                   
                  </div>
                ) : (
                  <>
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
                  </>
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

      {/* Dialog لعرض تفاصيل الدور */}
      {selectedRoleForDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                <Shield className="w-8 h-8" />
                تفاصيل الدور: {selectedRoleForDetails.name}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedRoleForDetails(null);
                  setIsRoleDetailsDialogOpen(false);
                }}
                className="hover:bg-muted/50 w-10 h-10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-8">
              {/* معلومات أساسية للدور */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-primary/20 pb-3">معلومات الدور الأساسية</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium text-gray-600 block mb-2">معرف الدور</Label>
                    <p className="text-lg text-gray-900 font-medium bg-gray-50 p-3 rounded-lg">{selectedRoleForDetails.id}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600 block mb-2">اسم الدور</Label>
                    <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedRoleForDetails.name}</p>
                  </div>
                </div>
              </div>
              
              {/* الصلاحيات المرتبطة بالدور */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-primary/20 pb-3">الصلاحيات المرتبطة</h3>
                
                {selectedRoleForDetails.Permissions && selectedRoleForDetails.Permissions.length > 0 ? (
                  <div className="space-y-3">
                    {selectedRoleForDetails.Permissions.map((permission, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">
                            {typeof permission === 'object' ? permission.name : permission}
                          </span>
                        </div>
                        {typeof permission === 'object' && permission.Management && (
                          <p className="text-sm text-green-600 mt-1">
                            الإدارة: {permission.Management.name}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-600 mb-2">لا توجد صلاحيات مرتبطة</h4>
                    <p className="text-sm text-gray-500">هذا الدور لا يحتوي على أي صلاحيات حالياً</p>
                  </div>
                )}
              </div>
            </div>
            

            
            <div className="flex justify-center mt-8 pt-8 border-t border-gray-200">
              <Button
                onClick={() => {
                  setSelectedRoleForDetails(null);
                  setIsRoleDetailsDialogOpen(false);
                }}
                className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg"
              >
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}

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