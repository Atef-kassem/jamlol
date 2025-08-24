import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, Car, Phone, MapPin, Building, User, X, Save } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllNaqelsQuery, useDeleteNaqelMutation, useCreateNaqelMutation, useUpdateNaqelMutation } from "../../redux/Slices/naqel";
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
import { naqelSchema } from "../../validation/naqelSchema";
import { useGetAllRegionsQuery } from "../../redux/Slices/region";

const CarriersList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: carriers, isLoading, error } = useGetAllNaqelsQuery();
  const [deleteNaqel, { isLoading: isDeleting }] = useDeleteNaqelMutation();
  const [createNaqel, { isLoading: isCreating }] = useCreateNaqelMutation();
  const [updateNaqel, { isLoading: isUpdating }] = useUpdateNaqelMutation();
  const { data: regions, isLoading: isRegionsLoading, error: regionsError } = useGetAllRegionsQuery();
  
  // State for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carrierToDelete, setCarrierToDelete] = useState(null);
  
  // State for view details dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  
  // State for add/edit dialog
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCarrier, setEditingCarrier] = useState(null);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for regions selection
  const [selectedRegions, setSelectedRegions] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    naqlen_type: "",
    identification_number: "",
    jwal: "",
    address: "",
    active: "inactive",
    regions: [],
  });
  
  // Form errors state
  const [formErrors, setFormErrors] = useState({});
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return "نشط";
      case "inactive": return "غير نشط";
      default: return "غير محدد";
    }
  };

  const getTypeIcon = (type) => {
    return type === "company" ? <Building className="w-4 h-4" /> : <User className="w-4 h-4" />;
  };

  const getTypeText = (type) => {
    return type === "company" ? "شركة" : "فرد";
  };

  // Helper function to get Arabic field names for error messages
  const getFieldArabicName = (fieldName) => {
    const fieldNames = {
      name: "اسم الناقل",
      jwal: "رقم الهاتف",
      identification_number: "رقم الهوية",
      naqlen_type: "نوع الناقل",
      address: "العنوان",
      active: "الحالة",
      regions: "المناطق"
    };
    return fieldNames[fieldName] || fieldName;
  };

  const handleDelete = (carrier) => {
    setCarrierToDelete(carrier);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteNaqel(carrierToDelete.id).unwrap();
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف الناقل ${carrierToDelete.name} بنجاح`,
        variant: "default",
      });
      setDeleteDialogOpen(false);
      setCarrierToDelete(null);
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف الناقل",
        variant: "destructive",
      });
    }
  };

  const handleView = (carrier) => {
    setSelectedCarrier(carrier);
    setViewDialogOpen(true);
  };

  const handleEdit = (carrier) => {
    setIsEditMode(true);
    setEditingCarrier(carrier);
    const carrierRegions = carrier.Regions?.map(region => region.id) || [];
    setSelectedRegions(carrierRegions);
    
    // Set form values
    setFormData({
      name: carrier.name,
      naqlen_type: carrier.naqlen_type,
      identification_number: carrier.identification_number,
      jwal: carrier.jwal,
      address: carrier.address,
      active: carrier.active,
      regions: carrierRegions,
    });
    setFormErrors({}); // Clear any previous errors
    setFormDialogOpen(true);
  };

  const validateForm = () => {
    try {
      // For edit mode, we need to validate without naqlen_type and identification_number
      if (isEditMode) {
        const { naqlen_type, identification_number, ...editFormData } = formData;
        const editSchema = naqelSchema.omit(['naqlen_type', 'identification_number']);
        editSchema.validateSync(editFormData, { abortEarly: false });
      } else {
        // Use full schema for create mode
        naqelSchema.validateSync(formData, { abortEarly: false });
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
    setEditingCarrier(null);
    setSelectedRegions([]);
    setFormData({
      name: "",
      naqlen_type: "",
      identification_number: "",
      jwal: "",
      address: "",
      active: "inactive",
      regions: [],
    });
    setFormErrors({}); // Clear any previous errors
    setFormDialogOpen(true);
  };

  const handleCloseForm = () => {
    setFormDialogOpen(false);
    setFormErrors({}); // Clear all errors when closing form
    setFormData({
      name: "",
      naqlen_type: "",
      identification_number: "",
      jwal: "",
      address: "",
      active: "inactive",
      regions: [],
    });
    setSelectedRegions([]);
  };

  const handleRegionToggle = (regionId) => {
    const newRegions = selectedRegions.includes(regionId)
      ? selectedRegions.filter(id => id !== regionId)
      : [...selectedRegions, regionId];
    
    setSelectedRegions(newRegions);
    setFormData(prev => ({ ...prev, regions: newRegions }));
    
    // Clear regions error when user makes a selection
    if (formErrors.regions) {
      setFormErrors(prev => ({ ...prev, regions: undefined }));
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (isEditMode && editingCarrier) {
        // Remove naqlen_type and identification_number from update data
        const { naqlen_type, identification_number, ...updateData } = formData;
        await updateNaqel({ id: editingCarrier.id, data: updateData }).unwrap();
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات الناقل بنجاح",
          variant: "default",
        });
      } else {
        const res = await createNaqel(formData).unwrap();
        console.log(res);
        toast({
          title: "تم التسجيل بنجاح",
          description: "تم تسجيل الناقل الجديد بنجاح",
          variant: "default",
        });
      }
              setFormDialogOpen(false);
        setFormData({
          name: "",
          naqlen_type: "",
          identification_number: "",
          jwal: "",
          address: "",
          active: "inactive",
          regions: [],
        });
        setFormErrors({}); // Clear all errors on success
        setSelectedRegions([]);
    } catch (error) {
      console.log("Error details:", error);
      console.log("Error structure:", {
        hasData: !!error?.data,
        dataKeys: error?.data ? Object.keys(error.data) : [],
        errorName: error?.data?.error?.name || error?.data?.name,
        hasErrors: !!(error?.data?.error?.errors || error?.data?.errors),
        errorCount: (error?.data?.error?.errors || error?.data?.errors)?.length || 0
      });
      
      // Handle Sequelize unique constraint errors - New format
      if (error?.data?.error?.name === 'SequelizeUniqueConstraintError') {
        if (error.data.error.errors && error.data.error.errors.length > 0) {
          const uniqueError = error.data.error.errors[0];
          console.log("Unique constraint error on field:", uniqueError.path);
          
          // Set field-specific errors with better messages
          if (uniqueError.path === 'jwal') {
            setFormErrors(prev => ({ ...prev, jwal: "رقم الهاتف مستخدم بالفعل من قبل ناقل آخر، يرجى استخدام رقم آخر" }));
          } else if (uniqueError.path === 'name') {
            setFormErrors(prev => ({ ...prev, name: "اسم الناقل مستخدم بالفعل من قبل ناقل آخر، يرجى استخدام اسم آخر" }));
          } else if (uniqueError.path === 'identification_number') {
            setFormErrors(prev => ({ ...prev, identification_number: "رقم الهوية مستخدم بالفعل من قبل ناقل آخر، يرجى استخدام رقم آخر" }));
          }
          
          // Show toast to inform user about the specific error
          toast({
            title: "خطأ في البيانات",
            description: `الحقل "${getFieldArabicName(uniqueError.path)}" مستخدم بالفعل، يرجى تصحيح البيانات`,
            variant: "destructive",
          });
          
          setIsSubmitting(false);
          return; // Don't show generic error toast
        }
      }
      
      // Handle Sequelize unique constraint errors - Alternative format (direct error.data)
      if (error?.data?.name === 'SequelizeUniqueConstraintError') {
        if (error.data.errors && error.data.errors.length > 0) {
          const uniqueError = error.data.errors[0];
          console.log("Unique constraint error on field (alt format):", uniqueError.path);
          
          // Set field-specific errors with better messages
          if (uniqueError.path === 'jwal') {
            setFormErrors(prev => ({ ...prev, jwal: "رقم الهاتف مستخدم بالفعل من قبل ناقل آخر، يرجى استخدام رقم آخر" }));
          } else if (uniqueError.path === 'name') {
            setFormErrors(prev => ({ ...prev, name: "اسم الناقل مستخدم بالفعل من قبل ناقل آخر، يرجى استخدام اسم آخر" }));
          } else if (uniqueError.path === 'identification_number') {
            setFormErrors(prev => ({ ...prev, identification_number: "رقم الهوية مستخدم بالفعل من قبل ناقل آخر، يرجى استخدام رقم آخر" }));
          } else {
            // Handle any other unique constraint errors
            console.log("Unknown unique constraint field:", uniqueError.path);
            setFormErrors(prev => ({ ...prev, [uniqueError.path]: `الحقل "${getFieldArabicName(uniqueError.path)}" مستخدم بالفعل من قبل ناقل آخر` }));
          }
          
          // Show toast to inform user about the specific error
          toast({
            title: "خطأ في البيانات",
            description: `الحقل "${getFieldArabicName(uniqueError.path)}" مستخدم بالفعل، يرجى تصحيح البيانات`,
            variant: "destructive",
          });
          
          setIsSubmitting(false);
          return; // Don't show generic error toast
        }
      }
      
      // Handle other types of errors
      if (error?.data?.message) {
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
          description: `حدث خطأ أثناء ${isEditMode ? 'تحديث' : 'تسجيل'} الناقل`,
          variant: "destructive",
        });
      }
    }
    setIsSubmitting(false);
  };

  // Filter carriers based on search term
  const filteredCarriers = carriers?.filter(carrier =>
    carrier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carrier.identification_number?.includes(searchTerm) ||
    carrier.jwal?.includes(searchTerm)
  ) || [];

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
          <h1 className="text-3xl font-bold text-primary">إدارة الناقلين</h1>
          <p className="text-muted-foreground">إدارة وعرض جميع الناقلين المسجلين في المنصة</p>
        </div>
        <Button className="gap-2" onClick={handleAdd}>
          <Plus className="w-4 h-4" />
          إضافة ناقل جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الناقلين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{carriers?.length || 0}</div>
            <p className="text-xs text-muted-foreground">جميع الناقلين المسجلين</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ناقلين نشطين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {carriers?.filter(c => c.active === "active").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">ناقلين نشطين</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">شركات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {carriers?.filter(c => c.naqlen_type === "company").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">شركات ناقلة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">أفراد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {carriers?.filter(c => c.naqlen_type === "person").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">أفراد ناقلين</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة الناقلين</CardTitle>
              <CardDescription>عرض وإدارة جميع الناقلين المسجلين</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="البحث عن ناقل..." 
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
                <TableHead className="text-right">اسم الناقل</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">رقم الهوية</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-right">العنوان</TableHead>
                <TableHead className="text-right">المناطق</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCarriers.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell className="font-medium">{carrier.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(carrier.naqlen_type)}
                      {getTypeText(carrier.naqlen_type)}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{carrier.identification_number}</TableCell>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {carrier.jwal}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="truncate max-w-32">{carrier.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{carrier.Regions?.length || 0} منطقة</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(carrier.active)}>
                      {getStatusText(carrier.active)}
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
                          onClick={() => handleView(carrier)}
                          disabled={isLoading}
                        >
                          <Eye className="w-4 h-4" />
                          {isLoading ? "جاري التحميل..." : "عرض التفاصيل"}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => handleEdit(carrier)}
                          disabled={isUpdating}
                        >
                          <Edit className="w-4 h-4" />
                          {isUpdating ? "جاري التحميل..." : "تعديل"}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2 text-red-600"
                          onClick={() => handleDelete(carrier)}
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
          
          {filteredCarriers.length === 0 && (
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
              هل أنت متأكد من حذف الناقل "{carrierToDelete?.name}"؟ 
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
            <DialogTitle>تفاصيل الناقل</DialogTitle>
            <DialogDescription>
              عرض جميع المعلومات التفصيلية للناقل
            </DialogDescription>
          </DialogHeader>
          {selectedCarrier && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">الاسم:</label>
                  <p className="text-sm text-gray-900">{selectedCarrier.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">النوع:</label>
                  <p className="text-sm text-gray-900">{getTypeText(selectedCarrier.naqlen_type)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">رقم الهوية:</label>
                  <p className="text-sm text-gray-900">{selectedCarrier.identification_number}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">رقم الهاتف:</label>
                  <p className="text-sm text-gray-900">{selectedCarrier.jwal}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">الحالة:</label>
                  <Badge className={getStatusColor(selectedCarrier.active)}>
                    {getStatusText(selectedCarrier.active)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">العنوان:</label>
                <p className="text-sm text-gray-900">{selectedCarrier.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">المناطق المخدومة:</label>
                <p className="text-sm text-gray-900">
                  {selectedCarrier.Regions?.map((region) => region.name).join(", ")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Form Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "تعديل الناقل" : "إضافة ناقل جديد"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? "تحديث بيانات الناقل" : "إدخال بيانات الناقل الجديد"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              onSubmit();
            }
          }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>المعلومات الأساسية</CardTitle>
                  <CardDescription>البيانات الشخصية للناقل</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">اسم الناقل *</Label>
                    <Input
                      id="name"
                      placeholder="أدخل اسم الناقل"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (formErrors.name) {
                          setFormErrors(prev => ({ ...prev, name: undefined }));
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
                      <div className="space-y-2">
                        <Label htmlFor="naqlen_type">نوع الناقل *</Label>
                        <Select
                          value={formData.naqlen_type}
                          onValueChange={(value) => {
                            setFormData(prev => ({ ...prev, naqlen_type: value }));
                            if (formErrors.naqlen_type) {
                              setFormErrors(prev => ({ ...prev, naqlen_type: undefined }));
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع الناقل" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="person">فرد</SelectItem>
                            <SelectItem value="company">شركة</SelectItem>
                          </SelectContent>
                        </Select>
                        {formErrors.naqlen_type && (
                          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            {formErrors.naqlen_type}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="identification_number">رقم الهوية *</Label>
                        <Input
                          id="identification_number"
                          placeholder="أدخل رقم الهوية"
                          value={formData.identification_number}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, identification_number: e.target.value }));
                            if (formErrors.identification_number) {
                              setFormErrors(prev => ({ ...prev, identification_number: undefined }));
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
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>معلومات الاتصال</CardTitle>
                  <CardDescription>بيانات التواصل مع الناقل</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="jwal">رقم الهاتف *</Label>
                    <Input
                      id="jwal"
                      placeholder="أدخل رقم الهاتف"
                      value={formData.jwal}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, jwal: e.target.value }));
                        if (formErrors.jwal) {
                          setFormErrors(prev => ({ ...prev, jwal: undefined }));
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

                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان *</Label>
                    <Textarea
                      id="address"
                      placeholder="أدخل العنوان الكامل"
                      value={formData.address}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, address: e.target.value }));
                        if (formErrors.address) {
                          setFormErrors(prev => ({ ...prev, address: undefined }));
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

                  <div className="space-y-2">
                    <Label htmlFor="active">الحالة</Label>
                    <Select
                      value={formData.active}
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, active: value }));
                        if (formErrors.active) {
                          setFormErrors(prev => ({ ...prev, active: undefined }));
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
                </CardContent>
              </Card>

              {/* Regions Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>المناطق المخدومة</CardTitle>
                  <CardDescription>اختر المناطق التي يخدمها الناقل</CardDescription>
                </CardHeader>
                <CardContent>
                  {isRegionsLoading ? (
                    <div className="flex justify-center items-center py-4">
                      <div className="text-sm text-gray-500">جاري تحميل المناطق...</div>
                    </div>
                  ) : regionsError ? (
                    <div className="text-sm text-red-500">خطأ في تحميل المناطق</div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {regions?.map((region) => (
                        <div key={region.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`region-${region.id}`}
                            checked={formData.regions.includes(region.id)}
                            onChange={() => handleRegionToggle(region.id)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={`region-${region.id}`} className="text-sm">
                            {region.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                  {formErrors.regions && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200 mt-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {formErrors.regions}
                    </div>
                  )}
                </CardContent>
              </Card>
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
                  : (isEditMode ? "حفظ التغييرات" : "تسجيل الناقل")
                }
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarriersList;