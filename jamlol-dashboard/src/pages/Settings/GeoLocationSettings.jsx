import React, { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Save,
  MapPin,
  Plus,
  Trash2,
  Globe,
  Building2,
  Edit,
  Search,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Import API hooks
import {
  useGetAllCountriesQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} from "@/redux/Slices/country";
import {
  useGetAllCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} from "@/redux/Slices/city";
import {
  useGetAllRegionsQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} from "@/redux/Slices/region";

// Import validation schemas
import countrySchema from "@/validation/countrySchema";
import citySchema from "@/validation/citySchema";
import regionSchema from "@/validation/regionSchema";

export default function GeoLocationSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("countries");
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null); // نوع العنصر في الـ dialog
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCity, setSearchCity] = useState("");

  // API queries
  const { data: countries = [], isLoading: isLoadingCountries } = useGetAllCountriesQuery();
  const { data: cities = [], isLoading: isLoadingCities } = useGetAllCitiesQuery();
  const { data: regions = [], isLoading: isLoadingRegions } = useGetAllRegionsQuery();

  // API mutations
  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useUpdateCountryMutation();
  const [deleteCountry] = useDeleteCountryMutation();
  const [createCity] = useCreateCityMutation();
  const [updateCity] = useUpdateCityMutation();
  const [deleteCity] = useDeleteCityMutation();
  const [createRegion] = useCreateRegionMutation();
  const [updateRegion] = useUpdateRegionMutation();
  const [deleteRegion] = useDeleteRegionMutation();

  // Form configurations
  const getFormConfig = (type) => {
    switch (type) {
      case "country":
        return {
          schema: countrySchema,
          defaultValues: { name: "" },
          fields: ["name"],
        };
      case "city":
        return {
          schema: citySchema,
          defaultValues: { name: "", country_id: "" },
          fields: ["name", "country_id"],
        };
      case "region":
        return {
          schema: regionSchema,
          defaultValues: { name: "", city_id: "" },
          fields: ["name", "city_id"],
        };
      default:
        return { schema: null, defaultValues: {}, fields: [] };
    }
  };

  const formConfig = getFormConfig(dialogType); // Use dialogType instead of activeTab
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formConfig.schema || {}),
    defaultValues: formConfig.defaultValues || {},
  });

  // Reset form when dialogType changes (only when opening new dialog)
  useEffect(() => {
    if (dialogType && !editingItem) {
      reset(formConfig.defaultValues || {});
    }
  }, [dialogType, editingItem, reset]);

  // Filtered data for search
  const filteredCountries = useMemo(() => {
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchCountry.toLowerCase())
    );
  }, [countries, searchCountry]);

  const filteredCities = useMemo(() => {
    return cities.filter(city =>
      city.name.toLowerCase().includes(searchCity.toLowerCase())
    );
  }, [cities, searchCity]);

    // Handle form submission
  const onSubmit = async (data) => {
    try {
      const type = dialogType; // Use dialogType instead of activeTab
      console.log("Submitting form for type:", type, "with data:", data);
      
      if (editingItem) {
        // Update existing item - only send the fields that are allowed
        console.log("Updating existing item:", editingItem);
        const cleanData = {};
        
        // Only include fields that are allowed by the schema
        switch (type) {
          case "country":
            cleanData.name = data.name;
            break;
          case "city":
            cleanData.name = data.name;
            cleanData.country_id = data.country_id;
            break;
          case "region":
            cleanData.name = data.name;
            cleanData.city_id = data.city_id;
            break;
        }
        
        console.log("Clean data for update:", cleanData);
        console.log("Sending update request for:", type, "with ID:", editingItem.id);
        
        switch (type) {
          case "country":
            const updateRes = await updateCountry({ id: editingItem.id, data: cleanData }).unwrap();
            console.log("Country update response:", updateRes);
            break;
          case "city":
            const cityUpdateRes = await updateCity({ id: editingItem.id, data: cleanData }).unwrap();
            console.log("City update response:", cityUpdateRes);
            break;
          case "region":
            const regionUpdateRes = await updateRegion({ id: editingItem.id, data: cleanData }).unwrap();
            console.log("Region update response:", regionUpdateRes);
            break;
        }
        toast({
          title: "تم التحديث بنجاح",
          description: `تم تحديث ${getItemTypeName(type)} بنجاح`,
        });
      } else {
        // Create new item
        console.log("Creating new item of type:", type);
        switch (type) {
          case "country":
            const res = await createCountry(data).unwrap();
            console.log("Country creation response:", res);
            break;
          case "city":
            const cityRes = await createCity(data).unwrap();
            console.log("City creation response:", cityRes);
            break;
          case "region":
            const regionRes = await createRegion(data).unwrap();
            console.log("Region creation response:", regionRes);
            break;
        }
        toast({
          title: "تم الإنشاء بنجاح",
          description: `تم إنشاء ${getItemTypeName(type)} بنجاح`,
        });
      }
      
      console.log("Form submission successful, resetting form...");
      reset();
      setEditingItem(null);
      setDialogType(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error in form submission:", error);
      console.error("Error details:", {
        message: error?.data?.message,
        status: error?.status,
        data: error?.data
      });
      toast({
        title: "خطأ في العملية",
        description: error?.data?.message || "حدث خطأ أثناء العملية",
        variant: "destructive",
      });
    }
  };

  // Handle delete
  const handleDelete = async (id, type) => {
    try {
      switch (type) {
        case "country":
          await deleteCountry(id).unwrap();
          break;
        case "city":
          await deleteCity(id).unwrap();
          break;
        case "region":
          await deleteRegion(id).unwrap();
          break;
      }
      
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف ${getItemTypeName(type)} بنجاح`,
      });
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: error?.data?.message || "حدث خطأ أثناء الحذف",
        variant: "destructive",
      });
    }
  };

  // Helper function to get item type name in Arabic
  const getItemTypeName = (type) => {
    switch (type) {
      case "country": return "البلد";
      case "city": return "المدينة";
      case "region": return "المنطقة";
      default: return "";
    }
  };

  // Open dialog for editing or creating
  const openDialog = (item = null, type) => {
    setEditingItem(item);
    setDialogType(type);
    
    // Wait for next tick to ensure form is ready
    setTimeout(() => {
      if (item) {
        // Populate form with existing data - only include schema fields
        console.log("Populating form with:", item);
        const formConfig = getFormConfig(type);
        
        // Only set values for fields that are in the schema
        formConfig.fields.forEach(field => {
          if (item[field] !== undefined) {
            setValue(field, item[field]);
          }
        });
      } else {
        reset();
      }
    }, 0);
    
    setIsDialogOpen(true);
  };

  // Countries Tab Content
  const CountriesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5" />
            إدارة البلدان
          </h3>
          <p className="text-sm text-muted-foreground">إضافة وتعديل وحذف البلدان</p>
        </div>
        <Dialog open={isDialogOpen && dialogType === "country"} onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false);
            setEditingItem(null);
            setDialogType(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog(null, "country")} className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة بلد جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "تعديل البلد" : "إضافة بلد جديد"}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "قم بتعديل بيانات البلد" : "قم بإدخال بيانات البلد الجديد"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">اسم البلد</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="مثال: المملكة العربية السعودية"
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "جاري الحفظ..." : editingItem ? "تحديث" : "إضافة"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>قائمة البلدان</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في البلدان..."
                  value={searchCountry}
                  onChange={(e) => setSearchCountry(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Badge variant="secondary">{filteredCountries.length} بلد</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCountries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Globe className="w-12 h-12 text-muted-foreground" />
              <h4 className="text-lg font-medium">لا توجد بلدان</h4>
              <p className="text-sm text-muted-foreground text-center">
                {searchCountry ? "لم يتم العثور على بلدان مطابقة للبحث" : "لم يتم إضافة أي بلدان بعد"}
              </p>
              {!searchCountry && (
                <Button onClick={() => openDialog(null, "country")} className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة بلد جديد
                </Button>
              )}
            </div>
          ) : (
            <Table>
                           <TableHeader>
               <TableRow>
                 <TableHead className="text-right">اسم البلد</TableHead>
                 <TableHead className="text-right">عدد المدن</TableHead>
                 <TableHead className="text-right">العمليات</TableHead>
               </TableRow>
             </TableHeader>
              <TableBody>
                {filteredCountries.map((country) => (
                                     <TableRow key={country.id}>
                     <TableCell className="font-medium text-right">{country.name}</TableCell>
                     <TableCell className="text-right">
                       <Badge variant="outline">
                         {cities.filter(city => city.country_id === country.id).length} مدينة
                       </Badge>
                     </TableCell>
                     <TableCell className="text-right">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDialog(country, "country")}
                          className="gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          تعديل
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-1">
                              <Trash2 className="w-3 h-3" />
                              حذف
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد أنك تريد حذف البلد "{country.name}"؟ 
                                سيتم حذف جميع المدن والمناطق التابعة لهذا البلد أيضاً.
                                لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDelete(country.id, "country")}
                              >
                                حذف
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Cities Tab Content
  const CitiesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            إدارة المدن
          </h3>
          <p className="text-sm text-muted-foreground">إضافة وتعديل وحذف المدن</p>
        </div>
        <Dialog open={isDialogOpen && dialogType === "city"} onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false);
            setEditingItem(null);
            setDialogType(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog(null, "city")} className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة مدينة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "تعديل المدينة" : "إضافة مدينة جديدة"}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "قم بتعديل بيانات المدينة" : "قم بإدخال بيانات المدينة الجديدة"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="country_id">البلد</Label>
                <Select
                  value={watch("country_id")?.toString() || ""}
                  onValueChange={(value) => setValue("country_id", parseInt(value))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="اختر البلد..." />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <Input
                        placeholder="البحث في البلدان..."
                        value={searchCountry}
                        onChange={(e) => setSearchCountry(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    {filteredCountries.map((country) => (
                      <SelectItem key={country.id} value={country.id.toString()}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country_id && (
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.country_id.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="name">اسم المدينة</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="مثال: الرياض"
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "جاري الحفظ..." : editingItem ? "تحديث" : "إضافة"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>قائمة المدن</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في المدن..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Badge variant="secondary">{filteredCities.length} مدينة</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Building2 className="w-12 h-12 text-muted-foreground" />
              <h4 className="text-lg font-medium">لا توجد مدن</h4>
              <p className="text-sm text-muted-foreground text-center">
                {searchCity ? "لم يتم العثور على مدن مطابقة للبحث" : "لم يتم إضافة أي مدن بعد"}
              </p>
              {!searchCity && (
                <Button onClick={() => openDialog(null, "city")} className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة مدينة جديدة
                </Button>
              )}
            </div>
          ) : (
            <Table>
                           <TableHeader>
               <TableRow>
                 <TableHead className="text-right">اسم المدينة</TableHead>
                 <TableHead className="text-right">البلد</TableHead>
                 <TableHead className="text-right">عدد المناطق</TableHead>
                 <TableHead className="text-right">العمليات</TableHead>
               </TableRow>
             </TableHeader>
              <TableBody>
                {filteredCities.map((city) => {
                  const country = countries.find(c => c.id === city.country_id);
                  return (
                                         <TableRow key={city.id}>
                       <TableCell className="font-medium text-right">{city.name}</TableCell>
                       <TableCell className="text-right">
                         <Badge variant="outline">{country?.name}</Badge>
                       </TableCell>
                       <TableCell className="text-right">
                         <Badge variant="outline">
                           {regions.filter(region => region.city_id === city.id).length} منطقة
                         </Badge>
                       </TableCell>
                       <TableCell className="text-right">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDialog(city, "city")}
                            className="gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            تعديل
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="gap-1">
                                <Trash2 className="w-3 h-3" />
                                حذف
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد أنك تريد حذف المدينة "{city.name}"؟ 
                                  سيتم حذف جميع المناطق التابعة لهذه المدينة أيضاً.
                                  لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDelete(city.id, "city")}
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Regions Tab Content
  const RegionsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            إدارة المناطق
          </h3>
          <p className="text-sm text-muted-foreground">إضافة وتعديل وحذف المناطق</p>
        </div>
        <Dialog open={isDialogOpen && dialogType === "region"} onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false);
            setEditingItem(null);
            setDialogType(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog(null, "region")} className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة منطقة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "تعديل المنطقة" : "إضافة منطقة جديدة"}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "قم بتعديل بيانات المنطقة" : "قم بإدخال بيانات المنطقة الجديدة"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="city_id">المدينة</Label>
                <Select
                  value={watch("city_id")?.toString() || ""}
                  onValueChange={(value) => setValue("city_id", parseInt(value))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="اختر المدينة..." />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <Input
                        placeholder="البحث في المدن..."
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    {filteredCities.map((city) => {
                      const country = countries.find(c => c.id === city.country_id);
                      return (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name} - {country?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.city_id && (
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.city_id.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="name">اسم المنطقة</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="مثال: حي الملز"
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "جاري الحفظ..." : editingItem ? "تحديث" : "إضافة"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المناطق</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{regions.length} منطقة</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {regions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <MapPin className="w-12 h-12 text-muted-foreground" />
              <h4 className="text-lg font-medium">لا توجد مناطق</h4>
              <p className="text-sm text-muted-foreground text-center">
                لم يتم إضافة أي مناطق بعد
              </p>
              <Button onClick={() => openDialog(null, "region")} className="gap-2">
                <Plus className="w-4 h-4" />
                إضافة منطقة جديدة
              </Button>
            </div>
          ) : (
            <Table>
                           <TableHeader>
               <TableRow>
                 <TableHead className="text-right">اسم المنطقة</TableHead>
                 <TableHead className="text-right">المدينة</TableHead>
                 <TableHead className="text-right">البلد</TableHead>
                 <TableHead className="text-right">العمليات</TableHead>
               </TableRow>
             </TableHeader>
              <TableBody>
                {regions.map((region) => {
                  const city = cities.find(c => c.id === region.city_id);
                  const country = countries.find(c => c.id === city?.country_id);
                  return (
                                         <TableRow key={region.id}>
                       <TableCell className="font-medium text-right">{region.name}</TableCell>
                       <TableCell className="text-right">
                         <Badge variant="outline">{city?.name}</Badge>
                       </TableCell>
                       <TableCell className="text-right">
                         <Badge variant="outline">{country?.name}</Badge>
                       </TableCell>
                       <TableCell className="text-right">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDialog(region, "region")}
                            className="gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            تعديل
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="gap-1">
                                <Trash2 className="w-3 h-3" />
                                حذف
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد أنك تريد حذف المنطقة "{region.name}"؟ 
                                  لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDelete(region.id, "region")}
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إعدادات المواقع الجغرافية</h1>
          <p className="text-muted-foreground">
            إدارة البلدان والمدن والمناطق في النظام
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="countries" className="gap-2">
            <Globe className="w-4 h-4" />
            البلدان
          </TabsTrigger>
          <TabsTrigger value="cities" className="gap-2">
            <Building2 className="w-4 h-4" />
            المدن
          </TabsTrigger>
          <TabsTrigger value="regions" className="gap-2">
            <MapPin className="w-4 h-4" />
            المناطق
          </TabsTrigger>
        </TabsList>

        <TabsContent value="countries">
          <CountriesTab />
        </TabsContent>

        <TabsContent value="cities">
          <CitiesTab />
        </TabsContent>

        <TabsContent value="regions">
          <RegionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}