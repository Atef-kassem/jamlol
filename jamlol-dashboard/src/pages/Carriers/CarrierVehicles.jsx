import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, Car, Truck, Bike, Settings, X, Save, Calendar } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useGetAllCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation } from "../../redux/Slices/car";
import { useGetAllModelsQuery, useCreateModelMutation, useUpdateModelMutation, useDeleteModelMutation } from "../../redux/Slices/model";
import { useGetAllDriversQuery } from "../../redux/Slices/driver";
import { useGetAllNaqelsQuery } from "../../redux/Slices/naqel";
import { carSchema } from "../../validation/carSchema";
import { modelSchema } from "../../validation/modelSchema";

const CarrierVehicles = () => {
  const { toast } = useToast();
  
  // API Queries
  const { data: cars, isLoading: carsLoading, error: carsError } = useGetAllCarsQuery();
  const { data: models, isLoading: modelsLoading, error: modelsError } = useGetAllModelsQuery();
  const { data: drivers, isLoading: driversLoading } = useGetAllDriversQuery();
  const { data: carriers, isLoading: carriersLoading } = useGetAllNaqelsQuery();
  
  // API Mutations
  const [createCar, { isLoading: isCreatingCar }] = useCreateCarMutation();
  const [updateCar, { isLoading: isUpdatingCar }] = useUpdateCarMutation();
  const [deleteCar, { isLoading: isDeletingCar }] = useDeleteCarMutation();
  const [createModel, { isLoading: isCreatingModel }] = useCreateModelMutation();
  const [updateModel, { isLoading: isUpdatingModel }] = useUpdateModelMutation();
  const [deleteModel, { isLoading: isDeletingModel }] = useDeleteModelMutation();

  // State for models
  const [modelDialogOpen, setModelDialogOpen] = useState(false);
  const [isModelEditMode, setIsModelEditMode] = useState(false);
  const [editingModel, setEditingModel] = useState(null);
  const [modelFormData, setModelFormData] = useState({ title: "" });
  const [modelFormErrors, setModelFormErrors] = useState({});
  const [modelToDelete, setModelToDelete] = useState(null);
  const [deleteModelDialogOpen, setDeleteModelDialogOpen] = useState(false);

  // State for cars
  const [carDialogOpen, setCarDialogOpen] = useState(false);
  const [isCarEditMode, setIsCarEditMode] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [carFormData, setCarFormData] = useState({
    plate_num: null,
    license_number: null,
    license_end_date: "",
    insurance_end_date: "",
    year: null,
    driver_id: null,
    model_id: null,
    naqel_id: null,
    allowed_cars_num: null,
    allowed_drivers_num: null
  });
  const [carFormErrors, setCarFormErrors] = useState({});
  const [carToDelete, setCarToDelete] = useState(null);
  const [deleteCarDialogOpen, setDeleteCarDialogOpen] = useState(false);
  const [carDetailsDialogOpen, setCarDetailsDialogOpen] = useState(false);
  const [selectedCarForDetails, setSelectedCarForDetails] = useState(null);

  // Search states
  const [modelSearchTerm, setModelSearchTerm] = useState("");
  const [carSearchTerm, setCarSearchTerm] = useState("");

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Helper function to format date for input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Model handlers
  const handleAddModel = () => {
    setIsModelEditMode(false);
    setEditingModel(null);
    setModelFormData({ title: "" });
    setModelFormErrors({});
    setModelDialogOpen(true);
  };

  const handleEditModel = (model) => {
    setIsModelEditMode(true);
    setEditingModel(model);
    setModelFormData({ title: model.title });
    setModelFormErrors({});
    setModelDialogOpen(true);
  };

  const handleDeleteModel = (model) => {
    setModelToDelete(model);
    setDeleteModelDialogOpen(true);
  };

  const confirmDeleteModel = async () => {
    try {
      await deleteModel(modelToDelete.id).unwrap();
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف الموديل ${modelToDelete.title} بنجاح`,
        variant: "default",
      });
      setDeleteModelDialogOpen(false);
      setModelToDelete(null);
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف الموديل",
        variant: "destructive",
      });
    }
  };

  const validateModelForm = () => {
    try {
      modelSchema.validateSync(modelFormData, { abortEarly: false });
      setModelFormErrors({});
      return true;
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setModelFormErrors(errors);
      return false;
    }
  };

  const handleModelSubmit = async () => {
    if (!validateModelForm()) return;

    try {
      if (isModelEditMode && editingModel) {
        await updateModel({ id: editingModel.id, data: modelFormData }).unwrap();
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الموديل بنجاح",
          variant: "default",
        });
      } else {
       const res = await createModel(modelFormData).unwrap();
       console.log(res);
        toast({
          title: "تم الإضافة بنجاح",
          description: "تم إضافة الموديل الجديد بنجاح",
          variant: "default",
        });
      }
      setModelDialogOpen(false);
      setModelFormData({ title: "" });
      setModelFormErrors({});
    } catch (error) {
      // Handle specific validation errors
      if (error?.data?.error?.name === "SequelizeUniqueConstraintError" ) {
         if(error?.data?.error?.errors[0]?.path === "title"){
        setModelFormErrors({ title: 'اسم الموديل مستخدم مسبقاً' });
        toast({
          title: "خطأ في الإضافة",
          description: "اسم الموديل مستخدم مسبقاً، يرجى اختيار اسم آخر",
          variant: "destructive",
        });
      }
      } else {
        console.log(error);
        toast({
          title: isModelEditMode ? "خطأ في التحديث" : "خطأ في الإضافة",
          description: error?.data?.message || "حدث خطأ أثناء العملية",
          variant: "destructive",
        });
      }
    }
  };

  // Car handlers
  const handleAddCar = () => {
    setIsCarEditMode(false);
    setEditingCar(null);
    setCarFormData({
      plate_num: null,
      license_number: null,
      license_end_date: "",
      insurance_end_date: "",
      year: null,
      driver_id: null,
      model_id: null,
      naqel_id: null,
      allowed_cars_num: null,
      allowed_drivers_num: null
    });
    setCarFormErrors({});
    setCarDialogOpen(true);
  };

  const handleEditCar = (car) => {
    setIsCarEditMode(true);
    setEditingCar(car);
    setCarFormData({
      plate_num: car.plate_num?.toString() || null,
      license_number: car.license_number?.toString() || null,
      license_end_date: formatDateForInput(car.license_end_date),
      insurance_end_date: formatDateForInput(car.insurance_end_date),
      year: car.year?.toString() || null,
      driver_id: car.driver_id?.toString() || null,
      model_id: car.model_id?.toString() || null,
      naqel_id: car.naqel_id?.toString() || null,
      allowed_cars_num: car.allowed_cars_num?.toString() || null,
      allowed_drivers_num: car.allowed_drivers_num?.toString() || null
    });
    setCarFormErrors({});
    setCarDialogOpen(true);
  };

  const handleDeleteCar = (car) => {
    setCarToDelete(car);
    setDeleteCarDialogOpen(true);
  };

  const handleViewCarDetails = (car) => {
    setSelectedCarForDetails(car);
    setCarDetailsDialogOpen(true);
  };

  const confirmDeleteCar = async () => {
    try {
      await deleteCar(carToDelete.id).unwrap();
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف السيارة برقم اللوحة ${carToDelete.plate_num} بنجاح`,
        variant: "default",
      });
      setDeleteCarDialogOpen(false);
      setCarToDelete(null);
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف السيارة",
        variant: "destructive",
      });
    }
  };

  const validateCarForm = () => {
    try {
      // Only parse numbers if they have valid values
      const validationData = {
        ...carFormData,
        plate_num: carFormData.plate_num ? parseInt(carFormData.plate_num) : undefined,
        license_number: carFormData.license_number ? parseInt(carFormData.license_number) : undefined,
        year: carFormData.year ? parseInt(carFormData.year) : undefined,
        driver_id: carFormData.driver_id ? parseInt(carFormData.driver_id) : undefined,
        model_id: carFormData.model_id ? parseInt(carFormData.model_id) : undefined,
        naqel_id: carFormData.naqel_id ? parseInt(carFormData.naqel_id) : undefined,
        allowed_cars_num: carFormData.allowed_cars_num ? parseInt(carFormData.allowed_cars_num) : undefined,
        allowed_drivers_num: carFormData.allowed_drivers_num ? parseInt(carFormData.allowed_drivers_num) : undefined
      };
      
      carSchema.validateSync(validationData, { abortEarly: false });
      setCarFormErrors({});
      return true;
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setCarFormErrors(errors);
      return false;
    }
  };

  const handleCarSubmit = async () => {
    if (!validateCarForm()) return;

    try {
      const submitData = {
        ...carFormData,
        plate_num: carFormData.plate_num ? parseInt(carFormData.plate_num) : undefined,
        license_number: carFormData.license_number ? parseInt(carFormData.license_number) : undefined,
        year: carFormData.year ? parseInt(carFormData.year) : undefined,
        driver_id: carFormData.driver_id ? parseInt(carFormData.driver_id) : undefined,
        model_id: carFormData.model_id ? parseInt(carFormData.model_id) : undefined,
        naqel_id: carFormData.naqel_id ? parseInt(carFormData.naqel_id) : undefined,
        allowed_cars_num: carFormData.allowed_cars_num ? parseInt(carFormData.allowed_cars_num) : undefined,
        allowed_drivers_num: carFormData.allowed_drivers_num ? parseInt(carFormData.allowed_drivers_num) : undefined
      };

      if (isCarEditMode && editingCar) {
        await updateCar({ id: editingCar.id, data: submitData }).unwrap();
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات السيارة بنجاح",
          variant: "default",
        });
      } else {
        await createCar(submitData).unwrap();
        toast({
          title: "تم الإضافة بنجاح",
          description: "تم إضافة السيارة الجديدة بنجاح",
          variant: "default",
        });
      }
      setCarDialogOpen(false);
      setCarFormData({
        plate_num: null,
        license_number: null,
        license_end_date: "",
        insurance_end_date: "",
        year: null,
        driver_id: null,
        model_id: null,
          naqel_id: null,
        allowed_cars_num: null,
        allowed_drivers_num: null
      });
      setCarFormErrors({});
    } catch (error) {
      // Handle specific validation errors
      if (error?.data?.error?.name === "SequelizeUniqueConstraintError") {
        const field = error?.data?.error?.errors[0]?.path;
        let errorMessage = '';
        let fieldError = {};

        if (field === 'plate_num') {
          errorMessage = 'رقم اللوحة مستخدم مسبقاً';
          fieldError = { plate_num: 'رقم اللوحة مستخدم مسبقاً' };
        } else if (field === 'license_number') {
          errorMessage = 'رقم الرخصة مستخدم مسبقاً';
          fieldError = { license_number: 'رقم الرخصة مستخدم مسبقاً' };
        }

        if (Object.keys(fieldError).length > 0) {
          setCarFormErrors(fieldError);
        }

        toast({
          title: "خطأ في الإضافة",
          description: errorMessage || "البيانات المدخلة مستخدمة مسبقاً",
          variant: "destructive",
        });
      } else {
        console.log(error);
        toast({
          title: isCarEditMode ? "خطأ في التحديث" : "خطأ في الإضافة",
          description: error?.data?.message || "حدث خطأ أثناء العملية",
          variant: "destructive",
        });
      }
    }
  };

  // Filter data
  const filteredModels = models?.filter(model =>
    model.title?.toLowerCase().includes(modelSearchTerm.toLowerCase())
  ) || [];

  const filteredCars = cars?.filter(car =>
    car.plate_num?.toString().includes(carSearchTerm) ||
    car.license_number?.toString().includes(carSearchTerm) ||
    car.Model?.title?.toLowerCase().includes(carSearchTerm.toLowerCase())
  ) || [];

  if (carsLoading || modelsLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6" dir="rtl">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (carsError || modelsError) {
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
          <h1 className="text-3xl font-bold text-primary">إدارة وسائل النقل</h1>
          <p className="text-muted-foreground">إدارة أنواع السيارات والسيارات في المنصة</p>
        </div>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="models">أنواع السيارات (الموديلات)</TabsTrigger>
          <TabsTrigger value="cars">السيارات</TabsTrigger>
        </TabsList>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">أنواع السيارات</h2>
              <p className="text-muted-foreground">إدارة موديلات السيارات المتاحة</p>
            </div>
            <Button className="gap-2" onClick={handleAddModel}>
              <Plus className="w-4 h-4" />
              إضافة موديل جديد
            </Button>
          </div>

          {/* Models Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الموديلات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{models?.length || 0}</div>
                <p className="text-xs text-muted-foreground">موديل مختلف</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">موديلات مستخدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {models?.filter(model => 
                    cars?.some(car => car.model_id === model.id)
                  ).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">في السيارات</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">موديلات غير مستخدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">
                  {models?.filter(model => 
                    !cars?.some(car => car.model_id === model.id)
                  ).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">متاحة للإضافة</p>
              </CardContent>
            </Card>
          </div>

          {/* Models Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قائمة الموديلات</CardTitle>
                  <CardDescription>عرض وإدارة جميع موديلات السيارات</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="البحث عن موديل..." 
                      className="pr-10 w-64"
                      value={modelSearchTerm}
                      onChange={(e) => setModelSearchTerm(e.target.value)}
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
                    <TableHead className="text-right">الموديل</TableHead>
                    <TableHead className="text-right">عدد السيارات</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.map((model) => {
                    const carCount = cars?.filter(car => car.model_id === model.id).length || 0;
                    return (
                      <TableRow key={model.id}>
                        <TableCell className="font-medium">{model.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{carCount}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(model.createdAt)}</TableCell>
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
                                onClick={() => handleEditModel(model)}
                              >
                                <Edit className="w-4 h-4" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="gap-2 text-red-600"
                                onClick={() => handleDeleteModel(model)}
                                disabled={carCount > 0}
                              >
                                <Trash2 className="w-4 h-4" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              {filteredModels.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  لا توجد نتائج للبحث
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cars Tab */}
        <TabsContent value="cars" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">السيارات</h2>
              <p className="text-muted-foreground">إدارة جميع السيارات المسجلة</p>
            </div>
            <Button className="gap-2" onClick={handleAddCar}>
              <Plus className="w-4 h-4" />
              إضافة سيارة جديدة
            </Button>
          </div>

          {/* Cars Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">إجمالي السيارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{cars?.length || 0}</div>
                <p className="text-xs text-muted-foreground">سيارة مسجلة</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">رخص صالحة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {cars?.filter(car => new Date(car.license_end_date) > new Date()).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">رخص سارية</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">تأمين صالح</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {cars?.filter(car => new Date(car.insurance_end_date) > new Date()).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">تأمين ساري</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">رخص منتهية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {cars?.filter(car => new Date(car.license_end_date) <= new Date()).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">تحتاج تجديد</p>
              </CardContent>
            </Card>
          </div>

          {/* Cars Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قائمة السيارات</CardTitle>
                  <CardDescription>عرض وإدارة جميع السيارات المسجلة</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="البحث عن سيارة..." 
                      className="pr-10 w-64"
                      value={carSearchTerm}
                      onChange={(e) => setCarSearchTerm(e.target.value)}
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
                    <TableHead className="text-right">رقم اللوحة</TableHead>
                    <TableHead className="text-right">الموديل</TableHead>
                    <TableHead className="text-right">السائق</TableHead>
                    <TableHead className="text-right">الناقل</TableHead>
                    <TableHead className="text-right">تاريخ انتهاء الرخصة</TableHead>
                    <TableHead className="text-right">تاريخ انتهاء التأمين</TableHead>
                    <TableHead className="text-right">حالة الرخصة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCars.map((car) => {
                    const isLicenseExpired = new Date(car.license_end_date) <= new Date();
                    const isInsuranceExpired = new Date(car.insurance_end_date) <= new Date();
                    return (
                      <TableRow key={car.id}>
                        <TableCell className="font-medium">{car.plate_num}</TableCell>
                        <TableCell>{car.Model?.title || "غير محدد"}</TableCell>
                        <TableCell>{car.Driver?.driver_name || "غير محدد"}</TableCell>
                        <TableCell>{car.Naqel?.name || "غير محدد"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {formatDate(car.license_end_date)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {formatDate(car.insurance_end_date)}
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
                                onClick={() => handleViewCarDetails(car)}
                              >
                                <Eye className="w-4 h-4" />
                                عرض التفاصيل
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="gap-2"
                                onClick={() => handleEditCar(car)}
                              >
                                <Edit className="w-4 h-4" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="gap-2 text-red-600"
                                onClick={() => handleDeleteCar(car)}
                              >
                                <Trash2 className="w-4 h-4" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              {filteredCars.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  لا توجد نتائج للبحث
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Model Form Dialog */}
      <Dialog open={modelDialogOpen} onOpenChange={setModelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isModelEditMode ? "تعديل الموديل" : "إضافة موديل جديد"}
            </DialogTitle>
            <DialogDescription>
              {isModelEditMode ? "تحديث بيانات الموديل" : "إدخال بيانات الموديل الجديد"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">اسم الموديل *</Label>
              <Input
                id="title"
                placeholder="مثال: Toyota Camry 2022"
                value={modelFormData.title}
                onChange={(e) => {
                  setModelFormData(prev => ({ ...prev, title: e.target.value }));
                  if (modelFormErrors.title) {
                    setModelFormErrors(prev => ({ ...prev, title: undefined }));
                  }
                }}
              />
              {modelFormErrors.title && (
                <div className="text-sm text-red-600">{modelFormErrors.title}</div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModelDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleModelSubmit} disabled={isCreatingModel || isUpdatingModel}>
              {isCreatingModel || isUpdatingModel ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Car Form Dialog */}
      <Dialog open={carDialogOpen} onOpenChange={setCarDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCarEditMode ? "تعديل السيارة" : "إضافة سيارة جديدة"}
            </DialogTitle>
            <DialogDescription>
              {isCarEditMode ? "تحديث بيانات السيارة" : "إدخال بيانات السيارة الجديدة"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="plate_num">رقم اللوحة *</Label>
                <Input
                  id="plate_num"
                  type="number"
                  placeholder="12345"
                  value={carFormData.plate_num}
                  onChange={(e) => {
                    setCarFormData(prev => ({ ...prev, plate_num: e.target.value }));
                    if (carFormErrors.plate_num) {
                      setCarFormErrors(prev => ({ ...prev, plate_num: undefined }));
                    }
                  }}
                />
                {carFormErrors.plate_num && (
                  <div className="text-sm text-red-600">{carFormErrors.plate_num}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="license_number">رقم الرخصة *</Label>
                <Input
                  id="license_number"
                  type="number"
                  placeholder="987654321"
                  value={carFormData.license_number}
                  onChange={(e) => {
                    setCarFormData(prev => ({ ...prev, license_number: e.target.value }));
                    if (carFormErrors.license_number) {
                      setCarFormErrors(prev => ({ ...prev, license_number: undefined }));
                    }
                  }}
                />
                {carFormErrors.license_number && (
                  <div className="text-sm text-red-600">{carFormErrors.license_number}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="license_end_date">تاريخ انتهاء الرخصة *</Label>
                <Input
                  id="license_end_date"
                  type="date"
                  value={carFormData.license_end_date}
                  onChange={(e) => {
                    setCarFormData(prev => ({ ...prev, license_end_date: e.target.value }));
                    if (carFormErrors.license_end_date) {
                      setCarFormErrors(prev => ({ ...prev, license_end_date: undefined }));
                    }
                  }}
                />
                {carFormErrors.license_end_date && (
                  <div className="text-sm text-red-600">{carFormErrors.license_end_date}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="insurance_end_date">تاريخ انتهاء التأمين *</Label>
                <Input
                  id="insurance_end_date"
                  type="date"
                  value={carFormData.insurance_end_date}
                  onChange={(e) => {
                    setCarFormData(prev => ({ ...prev, insurance_end_date: e.target.value }));
                    if (carFormErrors.insurance_end_date) {
                      setCarFormErrors(prev => ({ ...prev, insurance_end_date: undefined }));
                    }
                  }}
                />
                {carFormErrors.insurance_end_date && (
                  <div className="text-sm text-red-600">{carFormErrors.insurance_end_date}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="year">سنة الصنع *</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2025"
                  value={carFormData.year}
                  onChange={(e) => {
                    setCarFormData(prev => ({ ...prev, year: e.target.value }));
                    if (carFormErrors.year) {
                      setCarFormErrors(prev => ({ ...prev, year: undefined }));
                    }
                  }}
                />
                {carFormErrors.year && (
                  <div className="text-sm text-red-600">{carFormErrors.year}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="driver_id">السائق *</Label>
                <Select
                  value={carFormData.driver_id}
                  onValueChange={(value) => {
                    setCarFormData(prev => ({ ...prev, driver_id: value }));
                    if (carFormErrors.driver_id) {
                      setCarFormErrors(prev => ({ ...prev, driver_id: undefined }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر السائق" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers?.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id.toString()}>
                        {driver.driver_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {carFormErrors.driver_id && (
                  <div className="text-sm text-red-600">{carFormErrors.driver_id}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="model_id">الموديل *</Label>
                <Select
                  value={carFormData.model_id}
                  onValueChange={(value) => {
                    setCarFormData(prev => ({ ...prev, model_id: value }));
                    if (carFormErrors.model_id) {
                      setCarFormErrors(prev => ({ ...prev, model_id: undefined }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموديل" />
                  </SelectTrigger>
                  <SelectContent>
                    {models?.map((model) => (
                      <SelectItem key={model.id} value={model.id.toString()}>
                        {model.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {carFormErrors.model_id && (
                  <div className="text-sm text-red-600">{carFormErrors.model_id}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="naqel_id">الناقل *</Label>
                <Select
                  value={carFormData.naqel_id}
                  onValueChange={(value) => {
                    setCarFormData(prev => ({ ...prev, naqel_id: value }));
                    if (carFormErrors.naqel_id) {
                      setCarFormErrors(prev => ({ ...prev, naqel_id: undefined }));
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
                {carFormErrors.naqel_id && (
                  <div className="text-sm text-red-600">{carFormErrors.naqel_id}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="allowed_cars_num">عدد السيارات المسموحة *</Label>
                <Input
                  id="allowed_cars_num"
                  type="number"
                  placeholder="15"
                  value={carFormData.allowed_cars_num}
                  onChange={(e) => {
                    setCarFormData(prev => ({ ...prev, allowed_cars_num: e.target.value }));
                    if (carFormErrors.allowed_cars_num) {
                      setCarFormErrors(prev => ({ ...prev, allowed_cars_num: undefined }));
                    }
                  }}
                />
                {carFormErrors.allowed_cars_num && (
                  <div className="text-sm text-red-600">{carFormErrors.allowed_cars_num}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="allowed_drivers_num">عدد السائقين المسموحين *</Label>
                <Input
                  id="allowed_drivers_num"
                  type="number"
                  placeholder="13"
                  value={carFormData.allowed_drivers_num}
                  onChange={(e) => {
                    setCarFormData(prev => ({ ...prev, allowed_drivers_num: e.target.value }));
                    if (carFormErrors.allowed_drivers_num) {
                      setCarFormErrors(prev => ({ ...prev, allowed_drivers_num: undefined }));
                    }
                  }}
                />
                {carFormErrors.allowed_drivers_num && (
                  <div className="text-sm text-red-600">{carFormErrors.allowed_drivers_num}</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCarDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCarSubmit} disabled={isCreatingCar || isUpdatingCar}>
              {isCreatingCar || isUpdatingCar ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Model Confirmation Dialog */}
      <AlertDialog open={deleteModelDialogOpen} onOpenChange={setDeleteModelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف الموديل "{modelToDelete?.title}"؟ 
              {cars?.some(car => car.model_id === modelToDelete?.id) && 
                " تحذير: هذا الموديل مستخدم في سيارات ولا يمكن حذفه."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteModel}
              disabled={cars?.some(car => car.model_id === modelToDelete?.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeletingModel ? "جاري الحذف..." : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Car Details Dialog */}
      <Dialog open={carDetailsDialogOpen} onOpenChange={setCarDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل السيارة</DialogTitle>
            <DialogDescription>
              عرض جميع معلومات السيارة المسجلة
            </DialogDescription>
          </DialogHeader>
          {selectedCarForDetails && (
            <div className="grid gap-6 py-4">
              {/* Basic Information */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">المعلومات الأساسية</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">رقم اللوحة</Label>
                    <div className="text-lg font-semibold">{selectedCarForDetails.plate_num}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">رقم الرخصة</Label>
                    <div className="text-lg font-semibold">{selectedCarForDetails.license_number}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">سنة الصنع</Label>
                    <div className="text-lg font-semibold">{selectedCarForDetails.year}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">الموديل</Label>
                    <div className="text-lg font-semibold">{selectedCarForDetails.Model?.title || "غير محدد"}</div>
                  </div>
                </div>
              </div>

              {/* Driver and Carrier Information */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">معلومات السائق والناقل</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">السائق</Label>
                    <div className="text-lg font-semibold">{selectedCarForDetails.Driver?.driver_name || "غير محدد"}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">الناقل</Label>
                    <div className="text-lg font-semibold">{selectedCarForDetails.Naqel?.name || "غير محدد"}</div>
                  </div>
                </div>
              </div>

              {/* License and Insurance Information */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">معلومات الرخصة والتأمين</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">تاريخ انتهاء الرخصة</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className={`text-lg font-semibold ${
                        new Date(selectedCarForDetails.license_end_date) <= new Date() 
                          ? 'text-red-600' 
                          : 'text-green-600'
                      }`}>
                        {formatDate(selectedCarForDetails.license_end_date)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(selectedCarForDetails.license_end_date) <= new Date() 
                        ? 'رخصة منتهية الصلاحية' 
                        : 'رخصة سارية المفعول'}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">تاريخ انتهاء التأمين</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className={`text-lg font-semibold ${
                        new Date(selectedCarForDetails.insurance_end_date) <= new Date() 
                          ? 'text-red-600' 
                          : 'text-green-600'
                      }`}>
                        {formatDate(selectedCarForDetails.insurance_end_date)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(selectedCarForDetails.insurance_end_date) <= new Date() 
                        ? 'تأمين منتهي الصلاحية' 
                        : 'تأمين ساري المفعول'}
                      </div>
                  </div>
                </div>
              </div>

              {/* Permissions Information */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">معلومات الصلاحيات</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">عدد السيارات المسموحة</Label>
                    <div className="text-lg font-semibold">{selectedCarForDetails.allowed_cars_num}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">عدد السائقين المسموحين</Label>
                    <div className="text-lg font-semibold">{selectedCarForDetails.allowed_drivers_num}</div>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">معلومات النظام</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">تاريخ الإنشاء</Label>
                    <div className="text-lg font-semibold">{formatDate(selectedCarForDetails.createdAt)}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium text-gray-600">آخر تحديث</Label>
                    <div className="text-lg font-semibold">{formatDate(selectedCarForDetails.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCarDetailsDialogOpen(false)}>
              إغلاق
            </Button>
           
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Car Confirmation Dialog */}
      <AlertDialog open={deleteCarDialogOpen} onOpenChange={setDeleteCarDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف السيارة برقم اللوحة "{carToDelete?.plate_num}"؟ 
              هذا الإجراء لا يمكن التراجع عنه.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCar}
              disabled={isDeletingCar}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeletingCar ? "جاري الحذف..." : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CarrierVehicles;