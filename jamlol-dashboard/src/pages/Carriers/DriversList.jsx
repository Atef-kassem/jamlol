import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, User, Phone, Calendar, X, Save } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllDriversQuery, useDeleteDriverMutation, useCreateDriverMutation, useUpdateDriverMutation } from "../../redux/Slices/driver";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { driverSchema } from "../../validation/driverSchema";
import { useGetAllNaqelsQuery } from "../../redux/Slices/naqel";

const DriversList = () => {
  const { toast } = useToast();
  const { data: drivers, isLoading, error } = useGetAllDriversQuery();
  const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation();
  const [createDriver, { isLoading: isCreating }] = useCreateDriverMutation();
  const [updateDriver, { isLoading: isUpdating }] = useUpdateDriverMutation();
  const { data: carriers, isLoading: isCarriersLoading, error: carriersError } = useGetAllNaqelsQuery();
  
  // State for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);
  
  // State for view details dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  // State for add/edit dialog
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    driver_name: "",
    naqel_id: "",
    license_num: "",
    license_end_date: "",
  });
  
  // Form errors state
  const [formErrors, setFormErrors] = useState({});
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get Arabic field names for error messages
  const getFieldArabicName = (fieldName) => {
    const fieldNames = {
      driver_name: "اسم السائق",
      naqel_id: "الناقل",
      license_num: "رقم الرخصة",
      license_end_date: "تاريخ انتهاء الرخصة"
    };
    return fieldNames[fieldName] || fieldName;
  };

  const handleDelete = (driver) => {
    setDriverToDelete(driver);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDriver(driverToDelete.id).unwrap();
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف السائق ${driverToDelete.driver_name} بنجاح`,
        variant: "default",
      });
      setDeleteDialogOpen(false);
      setDriverToDelete(null);
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف السائق",
        variant: "destructive",
      });
    }
  };

  const handleView = (driver) => {
    setSelectedDriver(driver);
    setViewDialogOpen(true);
  };

  const handleEdit = (driver) => {
    setIsEditMode(true);
    setEditingDriver(driver);
    
    // Format the date for the date input (YYYY-MM-DD format)
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    // Set form values
    setFormData({
      driver_name: driver.driver_name,
      naqel_id: driver.naqel_id?.toString() || "",
      license_num: driver.license_num?.toString() || "",
      license_end_date: formatDateForInput(driver.license_end_date),
    });
    setFormErrors({}); // Clear any previous errors
    setFormDialogOpen(true);
  };

  const validateForm = () => {
    try {
      // Convert data for validation
      const validationData = {
        ...formData,
        naqel_id: parseInt(formData.naqel_id),
        license_num: parseInt(formData.license_num)
      };
      
      driverSchema.validateSync(validationData, { abortEarly: false });
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
    setEditingDriver(null);
    setFormData({
      driver_name: "",
      naqel_id: "",
      license_num: "",
      license_end_date: "",
    });
    setFormErrors({}); // Clear any previous errors
    setFormDialogOpen(true);
  };

  const handleCloseForm = () => {
    setFormDialogOpen(false);
    setFormErrors({}); // Clear all errors when closing form
    setFormData({
      driver_name: "",
      naqel_id: "",
      license_num: "",
      license_end_date: "",
    });
  };

    const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Convert naqel_id to number and license_num to number
      const submitData = {
        ...formData,
        naqel_id: parseInt(formData.naqel_id),
        license_num: parseInt(formData.license_num)
      };

      // Validate the converted data
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      if (isEditMode && editingDriver) {
        await updateDriver({ id: editingDriver.id, data: submitData }).unwrap();
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات السائق بنجاح",
          variant: "default",
        });
      } else {
        await createDriver(submitData).unwrap();
        toast({
          title: "تم التسجيل بنجاح",
          description: "تم تسجيل السائق الجديد بنجاح",
          variant: "default",
        });
      }
      setFormDialogOpen(false);
      setFormData({
        driver_name: "",
        naqel_id: "",
        license_num: "",
        license_end_date: "",
      });
      setFormErrors({}); // Clear all errors on success
    } catch (error) {
      console.log("Error details:", error);
      
      // Handle unique constraint errors for license number
      if (error?.data?.name === "SequelizeUniqueConstraintError" || 
          error?.data?.error?.errors?.length > 0) {
        
        // Check if it's a license number duplicate
        if (error?.data?.error?.errors[0]?.path === "license_num") {
          toast({
            title: "خطأ في رقم الرخصة",
            description: "رقم الرخصة هذا مستخدم بالفعل من قبل سائق آخر. يرجى استخدام رقم رخصة مختلف.",
            variant: "destructive",
          });
          
          // Set error for license_num field
          setFormErrors(prev => ({
            ...prev,
            license_num: "رقم الرخصة هذا مستخدم بالفعل"
          }));
        } else {
          toast({
            title: isEditMode ? "خطأ في التحديث" : "خطأ في التسجيل",
            description: "البيانات المدخلة مكررة. يرجى التحقق من المعلومات.",
            variant: "destructive",
          });
        }
      }
      // Handle validation errors
      else if (error?.data?.message) {
        toast({
          title: isEditMode ? "خطأ في التحديث" : "خطأ في التسجيل",
          description: error.data.message,
          variant: "destructive",
        });
      } else if (error?.data?.error?.message) {
        // Handle nested error messages
        toast({
          title: isEditMode ? "خطأ في التحديث" : "خطأ في التسجيل",
          description: error.data.error.message,
          variant: "destructive",
        });
      } else {
        // Fallback error message
        toast({
          title: isEditMode ? "خطأ في التحديث" : "خطأ في التسجيل",
          description: `حدث خطأ أثناء ${isEditMode ? 'تحديث' : 'تسجيل'} السائق`,
          variant: "destructive",
        });
      }
    }
    setIsSubmitting(false);
  };

  // Filter drivers based on search term
  const filteredDrivers = drivers?.filter(driver =>
    driver.driver_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.license_num?.toString().includes(searchTerm) ||
    driver.Naqel?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Helper function to get carrier name
  const getCarrierName = (naqelId) => {
    if (!carriers) return "غير محدد";
    const carrier = carriers.find(c => c.id === naqelId);
    return carrier ? carrier.name : "غير محدد";
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6" dir="rtl">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 space-y-6" dir="rtl">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">حدث خطأ في تحميل البيانات</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">إدارة السائقين</h1>
          <p className="text-muted-foreground">إدارة وعرض جميع السائقين المسجلين في المنصة</p>
        </div>
        <Button className="gap-2" onClick={handleAdd}>
          <Plus className="w-4 h-4" />
          إضافة سائق جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي السائقين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{drivers?.length || 0}</div>
            <p className="text-xs text-muted-foreground">جميع السائقين المسجلين</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">سائقين نشطين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {drivers?.filter(d => new Date(d.license_end_date) > new Date()).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">رخص صالحة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">رخص منتهية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {drivers?.filter(d => new Date(d.license_end_date) <= new Date()).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">رخص منتهية الصلاحية</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة السائقين</CardTitle>
              <CardDescription>عرض وإدارة جميع السائقين المسجلين</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="البحث عن سائق..." 
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
                <TableHead className="text-right">اسم السائق</TableHead>
                <TableHead className="text-right">الناقل</TableHead>
                <TableHead className="text-right">رقم الرخصة</TableHead>
                <TableHead className="text-right">تاريخ انتهاء الرخصة</TableHead>
                <TableHead className="text-right">حالة الرخصة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => {
                const isLicenseExpired = new Date(driver.license_end_date) <= new Date();
                return (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium">{driver.driver_name}</TableCell>
                    <TableCell>{getCarrierName(driver.naqel_id)}</TableCell>
                    <TableCell className="font-mono">{driver.license_num}</TableCell>
                    <TableCell className="font-mono">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {formatDate(driver.license_end_date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={isLicenseExpired ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                        {isLicenseExpired ? "منتهية" : "صالحة"}
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
                            onClick={() => handleView(driver)}
                            disabled={isLoading}
                          >
                            <Eye className="w-4 h-4" />
                            {isLoading ? "جاري التحميل..." : "عرض التفاصيل"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => handleEdit(driver)}
                            disabled={isUpdating}
                          >
                            <Edit className="w-4 h-4" />
                            {isUpdating ? "جاري التحميل..." : "تعديل"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2 text-red-600"
                            onClick={() => handleDelete(driver)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="w-4 h-4" />
                            {isDeleting ? "جاري الحذف..." : "حذف"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredDrivers.length === 0 && (
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
              هل أنت متأكد من حذف السائق "{driverToDelete?.driver_name}"؟ 
              هذا الإجراء لا يمكن التراجع عنه.
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
            <DialogTitle>تفاصيل السائق</DialogTitle>
            <DialogDescription>
              عرض جميع المعلومات التفصيلية للسائق
            </DialogDescription>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">اسم السائق:</label>
                  <p className="text-sm text-gray-900">{selectedDriver.driver_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">الناقل:</label>
                  <p className="text-sm text-gray-900">{getCarrierName(selectedDriver.naqel_id)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">رقم الرخصة:</label>
                  <p className="text-sm text-gray-900">{selectedDriver.license_num}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">تاريخ انتهاء الرخصة:</label>
                  <p className="text-sm text-gray-900">{formatDate(selectedDriver.license_end_date)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">حالة الرخصة:</label>
                <Badge className={new Date(selectedDriver.license_end_date) <= new Date() ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                  {new Date(selectedDriver.license_end_date) <= new Date() ? "منتهية" : "صالحة"}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Form Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "تعديل السائق" : "إضافة سائق جديد"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? "تحديث بيانات السائق" : "إدخال بيانات السائق الجديد"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              onSubmit();
            }
          }} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="driver_name">اسم السائق *</Label>
                <Input
                  id="driver_name"
                  placeholder="أدخل اسم السائق"
                  value={formData.driver_name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, driver_name: e.target.value }));
                    if (formErrors.driver_name) {
                      setFormErrors(prev => ({ ...prev, driver_name: undefined }));
                    }
                  }}
                />
                {formErrors.driver_name && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.driver_name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="naqel_id">الناقل *</Label>
                <Select
                  value={formData.naqel_id}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, naqel_id: value }));
                    if (formErrors.naqel_id) {
                      setFormErrors(prev => ({ ...prev, naqel_id: undefined }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الناقل" />
                  </SelectTrigger>
                  <SelectContent>
                    {carriers?.map((carrier) => (
                      <SelectItem key={carrier.id} value={carrier.id.toString()}>
                        {carrier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.naqel_id && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.naqel_id}
                  </div>
                )}
              </div>

                             <div className="space-y-2">
                 <Label htmlFor="license_num">رقم الرخصة *</Label>
                 <Input
                   id="license_num"
                   type="number"
                   placeholder="أدخل رقم الرخصة"
                   value={formData.license_num}
                   onChange={(e) => {
                     setFormData(prev => ({ ...prev, license_num: e.target.value }));
                     if (formErrors.license_num) {
                       setFormErrors(prev => ({ ...prev, license_num: undefined }));
                     }
                   }}
                 />
               
                 {formErrors.license_num && (
                   <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                     <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                     {formErrors.license_num}
                   </div>
                 )}
               </div>

              <div className="space-y-2">
                <Label htmlFor="license_end_date">تاريخ انتهاء الرخصة *</Label>
                <Input
                  id="license_end_date"
                  type="date"
                  value={formData.license_end_date}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, license_end_date: e.target.value }));
                    if (formErrors.license_end_date) {
                      setFormErrors(prev => ({ ...prev, license_end_date: undefined }));
                    }
                  }}
                />
                {formErrors.license_end_date && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.license_end_date}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseForm}
              >
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
              <Button type="submit" disabled={isSubmitting || isCreating || isUpdating}>
                <Save className="w-4 h-4 ml-2" />
                {isSubmitting || isCreating || isUpdating
                  ? (isEditMode ? "جاري الحفظ..." : "جاري التسجيل...") 
                  : (isEditMode ? "حفظ التغييرات" : "تسجيل السائق")
                }
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriversList;
