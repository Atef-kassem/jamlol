import { useState, useEffect } from "react";
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  X,
  Check,
  Shield,
  Search,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { 
  useCreateManagementMutation, 
  useUpdateManagementMutation, 
 useDeleteManagementMutation, 
 useGetManagementsWithPermissionsQuery
} from "../../redux/Slices/management";
import managementSchema from "../../validation/managementSchema";

// Spinner بسيط
const Spinner = (props) => (
  <svg {...props} viewBox="0 0 50 50" className={props.className || "animate-spin"}>
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="31.4 31.4" />
  </svg>
);

export default function ManagementSettings() {
  const { toast } = useToast();
  
  // State variables
  const [managements, setManagements] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedManagement, setSelectedManagement] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form state
  const [managementForm, setManagementForm] = useState({
    name: "",
  });
  
  // Form errors
  const [formErrors, setFormErrors] = useState({});
  
  // API hooks
  const { data: managementsData, isLoading: isLoadingManagements, isError: isErrorManagements } = useGetManagementsWithPermissionsQuery();
  const [createManagement, { isLoading: isCreatingManagement }] = useCreateManagementMutation();
  const [updateManagement, { isLoading: isUpdatingManagement }] = useUpdateManagementMutation();
  const [deleteManagement, { isLoading: isDeletingManagement }] = useDeleteManagementMutation();

  // Update local state when API data changes
  useEffect(() => {
    if (managementsData) {
      setManagements(managementsData);
    }
  }, [managementsData]);

  // Filter managements based on search term
  const filteredManagements = managements.filter(management =>
    management.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission for create/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    try {
      await managementSchema.validate(managementForm, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      validationError.inner?.forEach(err => {
        if (err.path) errors[err.path] = err.message;
      });
      setFormErrors(errors);
      toast({
        title: "خطأ في البيانات",
        description: validationError.errors?.[0] || "بيانات الإدارة غير صحيحة",
        variant: "destructive"
      });
      return;
    }

    try {
      if (selectedManagement) {
        // Update existing management
        await updateManagement({ 
          id: selectedManagement.id, 
          data: managementForm 
        }).unwrap();
        toast({ title: "تم التحديث", description: "تم تحديث الإدارة بنجاح" });
        setIsEditDialogOpen(false);
      } else {
        // Create new management
        await createManagement(managementForm).unwrap();
        toast({ title: "تم الإنشاء", description: "تم إنشاء الإدارة بنجاح" });
        setIsCreateDialogOpen(false);
      }
      
      resetForm();
    } catch (err) {
      toast({ 
        title: "خطأ في الحفظ", 
        description: err?.data?.message || "حدث خطأ أثناء حفظ الإدارة", 
        variant: "destructive" 
      });
    }
  };

  // Handle delete management
  const handleDeleteManagement = async (managementId) => {
    try {
      await deleteManagement(managementId).unwrap();
      toast({ title: "تم الحذف", description: "تم حذف الإدارة بنجاح" });
    } catch (err) {
      toast({ 
        title: "خطأ في الحذف", 
        description: err?.data?.message || "حدث خطأ أثناء حذف الإدارة", 
        variant: "destructive" 
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setManagementForm({ name: "" });
    setSelectedManagement(null);
    setFormErrors({});
  };

  // Open edit dialog
  const handleEdit = (management) => {
    setSelectedManagement(management);
    setManagementForm({ name: management.name });
    setIsEditDialogOpen(true);
  };

  // Open details dialog
  const handleViewDetails = (management) => {
    setSelectedManagement(management);
    setIsDetailsDialogOpen(true);
  };

  // Open create dialog
  const handleCreate = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  if (isLoadingManagements) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-12 h-12 text-green-600" />
      </div>
    );
  }

  if (isErrorManagements) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600">حدث خطأ أثناء تحميل الإدارات</p>
        </div>
      </div>
    );
  }

  return (
    console.log(filteredManagements),
    <div className="space-y-6">
        
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            إدارات النظام
          </h1>
          <p className="text-muted-foreground mt-2">
            إدارة أقسام النظام والصلاحيات المرتبطة بها
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة إدارة جديدة
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الإدارات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">إجمالي الإدارات</p>
          <p className="text-2xl font-bold text-blue-600">{managements.length}</p>
        </div>
      </div>

      {/* Managements Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>قائمة الإدارات</CardTitle>
        </CardHeader>
        <CardContent>
          {managements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">لا توجد إدارات</h3>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                اضغط على زر "إضافة إدارة جديدة" لبدء إنشاء إدارات النظام
              </p>
        
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right p-3 border-b font-medium">ID</th>
                    <th className="text-right p-3 border-b font-medium">اسم الإدارة</th>
                    <th className="text-right p-3 border-b font-medium">عدد الصلاحيات</th>
                    <th className="text-right p-3 border-b font-medium">تاريخ الإنشاء</th>
                    <th className="text-right p-3 border-b font-medium">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredManagements.map((management) => (
                    <tr key={management.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-gray-500 font-mono">{management.id}</td>
                      <td className="p-3 font-medium">{management.name}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          {management.Permissions?.length || 0} صلاحية
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-500">
                        {new Date(management.createdAt).toLocaleDateString('ar-EG')}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(management)}
                            className="hover:bg-blue-50 hover:text-blue-600"
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(management)}
                            title="تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive" title="حذف">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف الإدارة "{management.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteManagement(management.id)}
                                  disabled={isDeletingManagement}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {isDeletingManagement && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Management Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة إدارة جديدة</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">اسم الإدارة</Label>
              <Input
                id="name"
                value={managementForm.name}
                onChange={(e) => setManagementForm({ ...managementForm, name: e.target.value })}
                placeholder="أدخل اسم الإدارة"
                className="mt-1"
              />
              {formErrors.name && (
                <div className="text-red-600 text-xs mt-1">{formErrors.name}</div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" disabled={isCreatingManagement}>
                {isCreatingManagement && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                إضافة
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Management Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل الإدارة</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">اسم الإدارة</Label>
              <Input
                id="edit-name"
                value={managementForm.name}
                onChange={(e) => setManagementForm({ ...managementForm, name: e.target.value })}
                placeholder="أدخل اسم الإدارة"
                className="mt-1"
              />
              {formErrors.name && (
                <div className="text-red-600 text-xs mt-1">{formErrors.name}</div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" disabled={isUpdatingManagement}>
                {isUpdatingManagement && <Spinner className="w-4 h-4 mr-2 inline-block" />}
                تحديث
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Management Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-600" />
              تفاصيل الإدارة: {selectedManagement?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedManagement && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-gray-600 block mb-2">معرف الإدارة</Label>
                  <p className="text-lg text-gray-900 font-medium bg-gray-50 p-3 rounded-lg">
                    {selectedManagement.id}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 block mb-2">اسم الإدارة</Label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedManagement.name}
                  </p>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-200 pb-3">
                  الصلاحيات المرتبطة
                </h3>
                
                {selectedManagement.Permissions && selectedManagement.Permissions.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {selectedManagement.Permissions.map((permission, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">
                            {permission.name}
                          </span>
                        </div>
                        <p className="text-sm text-green-600 mt-1">
                          المعرف: {permission.slug}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-600 mb-2">لا توجد صلاحيات مرتبطة</h4>
                    <p className="text-sm text-gray-500">هذه الإدارة لا تحتوي على أي صلاحيات حالياً</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
