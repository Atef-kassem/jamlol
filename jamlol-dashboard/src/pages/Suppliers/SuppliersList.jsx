import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Building,
  User,
  X,
  Save,
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
import {
  useGetAllSuppliersQuery,
  useDeleteSupplierMutation,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from "../../redux/Slices/supplier";
import { useToast } from "../../hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supplierSchema } from "../../validation/supplierSchema";
import { useGetAllRegionsQuery } from "../../redux/Slices/region";

const SuppliersList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: suppliers, isLoading, error } = useGetAllSuppliersQuery();

  // Debug logging (يمكن حذفه لاحقاً)
  console.log("Suppliers data:", suppliers);
  console.log("Is loading:", isLoading);
  console.log("Error:", error);
  const [deleteSupplier, { isLoading: isDeleting }] =
    useDeleteSupplierMutation();
  const [createSupplier, { isLoading: isCreating }] =
    useCreateSupplierMutation();
  const [updateSupplier, { isLoading: isUpdating }] =
    useUpdateSupplierMutation();
  const {
    data: regions,
    isLoading: isRegionsLoading,
    error: regionsError,
  } = useGetAllRegionsQuery();

  // State for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // State for view details dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // State for add/edit dialog
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    supplier_type: "",
    identification_number: "",
    identification_type: "",
    jwal: "",
    address: "",
    region_id: "",
    active: "inactive",
  });

  // Form errors state
  const [formErrors, setFormErrors] = useState({});

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "نشط";
      case "inactive":
        return "غير نشط";
      default:
        return "غير محدد";
    }
  };

  const getTypeIcon = (type) => {
    return type === "company" ? (
      <Building className="w-4 h-4" />
    ) : (
      <User className="w-4 h-4" />
    );
  };

  const getTypeText = (type) => {
    return type === "company" ? "شركة" : "فرد";
  };

  // Helper function to get Arabic field names for error messages
  const getFieldArabicName = (fieldName) => {
    const fieldNames = {
      name: "اسم المورد",
      jwal: "رقم الجوال",
      identification_number: "رقم الهوية",
      supplier_type: "نوع المورد",
      identification_type: "نوع الهوية",
      address: "العنوان",
      region_id: "المنطقة",
      active: "الحالة",
    };
    return fieldNames[fieldName] || fieldName;
  };

  const handleDelete = (supplier) => {
    setSupplierToDelete(supplier);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSupplier(supplierToDelete.id).unwrap();
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف المورد ${supplierToDelete.name} بنجاح`,
        variant: "default",
      });
      setDeleteDialogOpen(false);
      setSupplierToDelete(null);
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف المورد",
        variant: "destructive",
      });
    }
  };

  const handleView = (supplier) => {
    setSelectedSupplier(supplier);
    setViewDialogOpen(true);
  };

  const handleEdit = (supplier) => {
    setIsEditMode(true);
    setEditingSupplier(supplier);

    // Set form values
    setFormData({
      name: supplier.name,
      supplier_type: supplier.supplier_type,
      identification_number: supplier.identification_number,
      identification_type: supplier.identification_type,
      jwal: supplier.jwal,
      address: supplier.address,
      region_id: supplier.region_id,
      active: supplier.active,
    });
    setFormErrors({}); // Clear any previous errors
    setFormDialogOpen(true);
  };

  // Handle supplier type change in edit mode
  const handleSupplierTypeChange = (value) => {
    const newIdentificationType = value === "company" ? "sgl" : "card";
    setFormData((prev) => ({
      ...prev,
      supplier_type: value,
      identification_type: newIdentificationType,
    }));

    // Clear errors
    if (formErrors.supplier_type) {
      setFormErrors((prev) => ({ ...prev, supplier_type: undefined }));
    }
    if (formErrors.identification_type) {
      setFormErrors((prev) => ({ ...prev, identification_type: undefined }));
    }
  };

  const validateForm = () => {
    try {
      // For edit mode, we need to validate without identification_number
      if (isEditMode) {
        const { identification_number, ...editFormData } = formData;
        const editSchema = supplierSchema.omit(["identification_number"]);
        editSchema.validateSync(editFormData, { abortEarly: false });
      } else {
        // Use full schema for create mode
        supplierSchema.validateSync(formData, { abortEarly: false });
      }
      setFormErrors({});
      return true;
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
      return false;
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setEditingSupplier(null);
    setFormData({
      name: "",
      supplier_type: "",
      identification_number: "",
      identification_type: "",
      jwal: "",
      address: "",
      region_id: "",
      active: "inactive",
    });
    setFormErrors({}); // Clear any previous errors
    setFormDialogOpen(true);
  };

  const handleCloseForm = () => {
    setFormDialogOpen(false);
    setFormErrors({}); // Clear all errors when closing form
    setFormData({
      name: "",
      supplier_type: "",
      identification_number: "",
      identification_type: "",
      jwal: "",
      address: "",
      region_id: "",
      active: "inactive",
    });
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (isEditMode && editingSupplier) {
        // Remove identification_number from update data
        const { identification_number, ...updateData } = formData;
        await updateSupplier({
          id: editingSupplier.id,
          data: updateData,
        }).unwrap();
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات المورد بنجاح",
          variant: "default",
        });
      } else {
        const res = await createSupplier(formData).unwrap();
        console.log(res);
        toast({
          title: "تم التسجيل بنجاح",
          description: "تم تسجيل المورد الجديد بنجاح",
          variant: "default",
        });
      }
      setFormDialogOpen(false);
      setFormData({
        name: "",
        supplier_type: "",
        identification_number: "",
        identification_type: "",
        jwal: "",
        address: "",
        region_id: "",
        active: "inactive",
      });
      setFormErrors({}); // Clear all errors on success
    } catch (error) {
      console.log("Error details:", error);

      // Handle Sequelize unique constraint errors
      if (error?.data?.error?.name === "SequelizeUniqueConstraintError") {
        if (error.data.error.errors && error.data.error.errors.length > 0) {
          const uniqueError = error.data.error.errors[0];

          // Set field-specific errors with better messages
          if (uniqueError.path === "jwal") {
            setFormErrors((prev) => ({
              ...prev,
              jwal: "رقم الجوال مستخدم بالفعل من قبل مورد آخر، يرجى استخدام رقم آخر",
            }));
          } else if (uniqueError.path === "name") {
            setFormErrors((prev) => ({
              ...prev,
              name: "اسم المورد مستخدم بالفعل من قبل مورد آخر، يرجى استخدام اسم آخر",
            }));
          } else if (uniqueError.path === "identification_number") {
            setFormErrors((prev) => ({
              ...prev,
              identification_number:
                "رقم الهوية مستخدم بالفعل من قبل مورد آخر، يرجى استخدام رقم آخر",
            }));
          }

          toast({
            title: "خطأ في البيانات",
            description: `الحقل "${getFieldArabicName(
              uniqueError.path
            )}" مستخدم بالفعل، يرجى تصحيح البيانات`,
            variant: "destructive",
          });

          setIsSubmitting(false);
          return;
        }
      }

      // Handle other types of errors
      if (error?.data?.message) {
        toast({
          title: isEditMode ? "خطأ في التحديث" : "خطأ في التسجيل",
          description: error.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: isEditMode ? "خطأ في التحديث" : "خطأ في التسجيل",
          description: `حدث خطأ أثناء ${isEditMode ? "تحديث" : "تسجيل"} المورد`,
          variant: "destructive",
        });
      }
    }
    setIsSubmitting(false);
  };

  // Filter suppliers based on search term
  const filteredSuppliers =
    suppliers?.filter(
      (supplier) =>
        supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.identification_number?.includes(searchTerm) ||
        supplier.jwal?.includes(searchTerm)
    ) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6" dir="rtl">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <div className="text-lg">جاري تحميل الموردين...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 space-y-6" dir="rtl">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">
              حدث خطأ في تحميل البيانات
            </div>
            <div className="text-sm text-gray-500">
              {error?.data?.message || error?.message || "خطأ غير معروف"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">إدارة الموردين</h1>
          <p className="text-muted-foreground">
            إدارة وعرض جميع الموردين المسجلين في المنصة
          </p>
        </div>
        <Button className="gap-2" onClick={handleAdd}>
          <Plus className="w-4 h-4" />
          إضافة مورد جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي الموردين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {suppliers?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              جميع الموردين المسجلين
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">موردين نشطين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {suppliers?.filter((s) => s.active === "active").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">موردين نشطين</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">شركات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {suppliers?.filter((s) => s.supplier_type === "company").length ||
                0}
            </div>
            <p className="text-xs text-muted-foreground">شركات موردة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">أفراد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {suppliers?.filter((s) => s.supplier_type === "person").length ||
                0}
            </div>
            <p className="text-xs text-muted-foreground">أفراد موردين</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة الموردين</CardTitle>
              <CardDescription>
                عرض وإدارة جميع الموردين المسجلين
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث عن مورد..."
                  className="pr-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                <TableHead className="text-right">اسم المورد</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">رقم الهوية</TableHead>
                <TableHead className="text-right">رقم الجوال</TableHead>
                <TableHead className="text-right">العنوان</TableHead>
                <TableHead className="text-right">المنطقة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(supplier.supplier_type)}
                      {getTypeText(supplier.supplier_type)}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">
                    {supplier.identification_number}
                  </TableCell>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {supplier.jwal}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="truncate max-w-32">
                        {supplier.address}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{supplier.Region?.name || "غير محدد"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(supplier.active)}>
                      {getStatusText(supplier.active)}
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
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => handleView(supplier)}
                          disabled={isLoading}
                        >
                          <Eye className="w-4 h-4" />
                          {isLoading ? "جاري التحميل..." : "عرض التفاصيل"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => handleEdit(supplier)}
                          disabled={isUpdating}
                        >
                          <Edit className="w-4 h-4" />
                          {isUpdating ? "جاري التحميل..." : "تعديل"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-red-600"
                          onClick={() => handleDelete(supplier)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                          {isDeleting ? "جاري الحذف..." : "حذف"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              لا توجد نتائج للبحث
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف المورد "{supplierToDelete?.name}"؟ هذا الإجراء
              لا يمكن التراجع عنه.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "جاري الحذف..." : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل المورد</DialogTitle>
            <DialogDescription>
              عرض جميع المعلومات التفصيلية للمورد
            </DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    الاسم:
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedSupplier.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    النوع:
                  </label>
                  <p className="text-sm text-gray-900">
                    {getTypeText(selectedSupplier.supplier_type)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    رقم الهوية:
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedSupplier.identification_number}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    نوع الهوية:
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedSupplier.identification_type === "card"
                      ? "بطاقة"
                      : "سجل"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    رقم الجوال:
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedSupplier.jwal}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    الحالة:
                  </label>
                  <Badge className={getStatusColor(selectedSupplier.active)}>
                    {getStatusText(selectedSupplier.active)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  العنوان:
                </label>
                <p className="text-sm text-gray-900">
                  {selectedSupplier.address}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  المنطقة:
                </label>
                <p className="text-sm text-gray-900">
                  {selectedSupplier.Region?.name || "غير محدد"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Form Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "تعديل المورد" : "إضافة مورد جديد"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "تحديث بيانات المورد"
                : "إدخال بيانات المورد الجديد"}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                onSubmit();
              }
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* اسم المورد */}
              <div className="space-y-2">
                <Label htmlFor="name">اسم المورد *</Label>
                <Input
                  id="name"
                  placeholder="أدخل اسم المورد"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (formErrors.name) {
                      setFormErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                />
                {formErrors.name && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.name}
                  </div>
                )}
              </div>

              {!isEditMode && (
                <>
                  {/* نوع المورد */}
                  <div className="space-y-2">
                    <Label>نوع المورد *</Label>
                    <Select
                      value={formData.supplier_type}
                      onValueChange={handleSupplierTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المورد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="person">فرد</SelectItem>
                        <SelectItem value="company">شركة</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.supplier_type && (
                      <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {formErrors.supplier_type}
                      </div>
                    )}
                    {/* عرض نوع الهوية المحدد تلقائياً */}
                    {formData.supplier_type && (
                      <div className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                        <strong>نوع الهوية:</strong>{" "}
                        {formData.identification_type === "sgl"
                          ? "سجل تجاري"
                          : "بطاقة هوية"}
                      </div>
                    )}
                  </div>

                  {/* رقم الهوية */}
                  <div className="space-y-2">
                    <Label htmlFor="identification_number">
                      {formData.supplier_type
                        ? `رقم ${
                            formData.identification_type === "sgl"
                              ? "السجل التجاري"
                              : "بطاقة الهوية"
                          } *`
                        : "رقم الهوية *"}
                    </Label>
                    <Input
                      id="identification_number"
                      placeholder={
                        formData.supplier_type
                          ? `أدخل رقم ${
                              formData.identification_type === "sgl"
                                ? "السجل التجاري"
                                : "بطاقة الهوية"
                            }`
                          : "أدخل رقم الهوية"
                      }
                      value={formData.identification_number}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          identification_number: e.target.value,
                        }));
                        if (formErrors.identification_number) {
                          setFormErrors((prev) => ({
                            ...prev,
                            identification_number: undefined,
                          }));
                        }
                      }}
                    />
                    {formErrors.identification_number && (
                      <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {formErrors.identification_number}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* رقم الجوال */}
              <div className="space-y-2">
                <Label htmlFor="jwal">رقم الجوال *</Label>
                <Input
                  id="jwal"
                  placeholder="أدخل رقم الجوال"
                  value={formData.jwal}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, jwal: e.target.value }));
                    if (formErrors.jwal) {
                      setFormErrors((prev) => ({ ...prev, jwal: undefined }));
                    }
                  }}
                />
                {formErrors.jwal && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.jwal}
                  </div>
                )}
              </div>

              {/* المنطقة */}
              <div className="space-y-2">
                <Label>المنطقة *</Label>
                <Select
                  value={
                    formData.region_id ? formData.region_id.toString() : ""
                  }
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      region_id: value ? parseInt(value) : "",
                    }));
                    if (formErrors.region_id) {
                      setFormErrors((prev) => ({
                        ...prev,
                        region_id: undefined,
                      }));
                    }
                  }}
                  disabled={isRegionsLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions?.map((region) => (
                      <SelectItem key={region.id} value={region.id.toString()}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.region_id && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.region_id}
                  </div>
                )}
              </div>

              {/* الحالة */}
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select
                  value={formData.active}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, active: value }));
                    if (formErrors.active) {
                      setFormErrors((prev) => ({ ...prev, active: undefined }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.active && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.active}
                  </div>
                )}
              </div>
            </div>

            {/* العنوان */}
            <div className="space-y-2">
              <Label htmlFor="address">العنوان *</Label>
              <Textarea
                id="address"
                placeholder="أدخل العنوان الكامل"
                value={formData.address}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, address: e.target.value }));
                  if (formErrors.address) {
                    setFormErrors((prev) => ({ ...prev, address: undefined }));
                  }
                }}
                rows={3}
              />
              {formErrors.address && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {formErrors.address}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={handleCloseForm}>
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isCreating || isUpdating}
              >
                <Save className="w-4 h-4 ml-2" />
                {isSubmitting || isCreating || isUpdating
                  ? isEditMode
                    ? "جاري الحفظ..."
                    : "جاري التسجيل..."
                  : isEditMode
                  ? "حفظ التغييرات"
                  : "تسجيل المورد"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuppliersList;
