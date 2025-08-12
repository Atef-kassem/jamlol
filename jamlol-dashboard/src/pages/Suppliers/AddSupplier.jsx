import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Save, X, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddress } from "@/contexts/AddressContext";

const addSupplierSchema = z.object({
  relatedUserId: z.string().min(1, "المستخدم المرتبط مطلوب"),
  companyName: z.string().optional(),
  mobileNumber: z.string().min(10, "رقم الجوال يجب أن يكون 10 أرقام على الأقل"),
  identityType: z.string().min(1, "نوع الهوية مطلوب"),
  identityFile: z.any().optional(),
  countryId: z.string().min(1, "الدولة مطلوبة"),
  regionId: z.string().min(1, "المنطقة مطلوبة"),
  cityId: z.string().min(1, "المدينة مطلوبة"),
  neighborhoodId: z.string().optional(),
  street: z.string().min(1, "الشارع مطلوب"),
  phoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
});

// AddSupplierForm type removed - using form validation instead

const AddSupplier = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    countries,
    getRegionsByCountry,
    getCitiesByRegion,
    getNeighborhoodsByCity,
  } = useAddress();

  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  // Mock data for suppliers users - in real app this would come from API
  const [supplierUsers] = useState([
    { id: "1", name: "أحمد محمد علي", userType: "مورد", code: "SUP001" },
    { id: "2", name: "فاطمة أحمد", userType: "مورد", code: "SUP002" },
    { id: "3", name: "محمد عبدالله", userType: "مورد", code: "SUP003" },
    { id: "4", name: "سارة محمود", userType: "مورد", code: "SUP004" },
    { id: "5", name: "علي حسن", userType: "مورد", code: "SUP005" },
  ]);

  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(addSupplierSchema),
    defaultValues: {
      countryId: "",
      regionId: "",
      cityId: "",
      neighborhoodId: "",
      street: "",
    },
  });

  const countryId = watch("countryId");
  const regionId = watch("regionId");
  const cityId = watch("cityId");

  // Update regions when country changes
  useEffect(() => {
    if (countryId) {
      const regions = getRegionsByCountry(countryId);
      setAvailableRegions(regions);
      // Reset region, city and neighborhood if country changed
      setValue("regionId", "");
      setValue("cityId", "");
      setValue("neighborhoodId", "");
      setAvailableCities([]);
      setAvailableNeighborhoods([]);
    } else {
      setAvailableRegions([]);
      setAvailableCities([]);
      setAvailableNeighborhoods([]);
    }
  }, [countryId, getRegionsByCountry, setValue]);

  // Update cities when region changes
  useEffect(() => {
    if (regionId) {
      const cities = getCitiesByRegion(regionId);
      setAvailableCities(cities);
      // Reset city and neighborhood if region changed
      setValue("cityId", "");
      setValue("neighborhoodId", "");
      setAvailableNeighborhoods([]);
    } else {
      setAvailableCities([]);
      setAvailableNeighborhoods([]);
    }
  }, [regionId, getCitiesByRegion, setValue]);

  // Update neighborhoods when city changes
  useEffect(() => {
    if (cityId) {
      const neighborhoods = getNeighborhoodsByCity(cityId);
      setAvailableNeighborhoods(neighborhoods);
      // Reset neighborhood if city changed
      setValue("neighborhoodId", "");
    } else {
      setAvailableNeighborhoods([]);
    }
  }, [cityId, getNeighborhoodsByCity, setValue]);

  // Filter users based on search term
  const filteredSupplierUsers = supplierUsers.filter(
    (user) =>
      user.name.includes(userSearchTerm) || user.code.includes(userSearchTerm)
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setValue("relatedUserId", user.id);
    setUserSearchTerm(user.name);
  };

  const onSubmit = async (data) => {
    try {
      // إضافة تواريخ الإنشاء والتعديل
      const supplierData = {
        ...data,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        selectedUserInfo: selectedUser, // Include selected user info
      };

      console.log("Supplier data:", supplierData);

      // هنا يمكن إضافة API call لحفظ البيانات
      await new Promise((resolve) => setTimeout(resolve, 1000)); // محاكاة API call

      toast({
        title: "تم إضافة المورد بنجاح",
        description: `تم إنشاء المورد للمستخدم ${selectedUser?.name}`,
      });

      reset();
      setSelectedUser(null);
      setUserSearchTerm("");
      navigate("/suppliers");
    } catch (error) {
      toast({
        title: "خطأ في إضافة المورد",
        description: "حدث خطأ أثناء حفظ بيانات المورد",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    navigate("/suppliers");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-foreground">
            إضافة مورد جديد
          </h1>
          <ArrowRight className="h-6 w-6 text-primary" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 ml-2" />
            إلغاء
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-right">بيانات المورد</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* المستخدم المرتبط */}
              <div className="space-y-2">
                <Label className="text-right block">المستخدم المرتبط *</Label>
                <div className="relative">
                  <Input
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    placeholder="ابحث بالاسم أو رقم المورد..."
                    className="text-right"
                  />
                  {userSearchTerm && filteredSupplierUsers.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-auto">
                      {filteredSupplierUsers.map((user) => (
                        <div
                          key={user.id}
                          className="p-2 hover:bg-muted cursor-pointer text-right"
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.relatedUserId && (
                  <p className="text-sm text-destructive text-right">
                    {errors.relatedUserId.message}
                  </p>
                )}
              </div>

              {/* اسم المؤسسة */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-right block">
                  اسم المؤسسة (اختياري)
                </Label>
                <Input
                  id="companyName"
                  {...register("companyName")}
                  placeholder="أدخل اسم المؤسسة"
                  className="text-right"
                />
              </div>

              {/* رقم الجوال */}
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-right block">
                  رقم الجوال *
                </Label>
                <Input
                  id="mobileNumber"
                  {...register("mobileNumber")}
                  placeholder="05xxxxxxxx"
                  className="text-right"
                  dir="ltr"
                />
                {errors.mobileNumber && (
                  <p className="text-sm text-destructive text-right">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-right block">
                  رقم الهاتف *
                </Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="01xxxxxxx"
                  className="text-right"
                  dir="ltr"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive text-right">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* نوع الهوية */}
              <div className="space-y-2">
                <Label className="text-right block">نوع الهوية *</Label>
                <Select
                  value={watch("identityType") || ""}
                  onValueChange={(value) => setValue("identityType", value)}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر نوع الهوية" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="national_id">هوية وطنية</SelectItem>
                    <SelectItem value="passport">جواز سفر</SelectItem>
                    <SelectItem value="residence_id">إقامة</SelectItem>
                    <SelectItem value="commercial_register">
                      سجل تجاري
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.identityType && (
                  <p className="text-sm text-destructive text-right">
                    {errors.identityType.message}
                  </p>
                )}
              </div>

              {/* ملف الهوية */}
              <div className="space-y-2">
                <Label htmlFor="identityFile" className="text-right block">
                  ملف الهوية (اختياري)
                </Label>
                <Input
                  id="identityFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    setValue("identityFile", e.target.files?.[0])
                  }
                  className="text-right cursor-pointer"
                />
                <p className="text-xs text-muted-foreground text-right">
                  يمكنك رفع ملف PDF أو صورة (JPG, PNG)
                </p>
              </div>
            </div>

            {/* العنوان */}
            <div className="space-y-4">
              <h3 className="font-semibold text-right text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                المناطق والاحياء
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* الدولة */}
                <div className="space-y-2">
                  <Label className="text-right block">الدولة *</Label>
                  <Select
                    value={countryId}
                    onValueChange={(value) => setValue("countryId", value)}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {countries.map((country) => (
                        <SelectItem
                          key={country.id}
                          value={country.id.toString()}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.countryId && (
                    <p className="text-sm text-destructive text-right">
                      {errors.countryId.message}
                    </p>
                  )}
                </div>

                {/* المنطقة */}
                <div className="space-y-2">
                  <Label className="text-right block">المنطقة *</Label>
                  <Select
                    value={regionId}
                    onValueChange={(value) => setValue("regionId", value)}
                    disabled={!countryId}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {availableRegions.map((region) => (
                        <SelectItem
                          key={region.id}
                          value={region.id.toString()}
                        >
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.regionId && (
                    <p className="text-sm text-destructive text-right">
                      {errors.regionId.message}
                    </p>
                  )}
                </div>

                {/* المدينة */}
                <div className="space-y-2">
                  <Label className="text-right block">المدينة *</Label>
                  <Select
                    value={cityId}
                    onValueChange={(value) => setValue("cityId", value)}
                    disabled={!regionId}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {availableCities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cityId && (
                    <p className="text-sm text-destructive text-right">
                      {errors.cityId.message}
                    </p>
                  )}
                </div>

                {/* الحي */}
                <div className="space-y-2">
                  <Label className="text-right block">الحي</Label>
                  <Select
                    value={watch("neighborhoodId") || ""}
                    onValueChange={(value) => setValue("neighborhoodId", value)}
                    disabled={!cityId}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الحي" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {availableNeighborhoods.map((neighborhood) => (
                        <SelectItem
                          key={neighborhood.id}
                          value={neighborhood.id.toString()}
                        >
                          {neighborhood.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.neighborhoodId && (
                    <p className="text-sm text-destructive text-right">
                      {errors.neighborhoodId.message}
                    </p>
                  )}
                </div>
              </div>

              {/* الشارع */}
              <div className="space-y-2">
                <Label htmlFor="street" className="text-right block">
                  الشارع *
                </Label>
                <Input
                  id="street"
                  {...register("street")}
                  placeholder="أدخل اسم الشارع"
                  className="text-right"
                />
                {errors.street && (
                  <p className="text-sm text-destructive text-right">
                    {errors.street.message}
                  </p>
                )}
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-right mb-2">معلومات إضافية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="text-right">
                  <span className="font-medium">تاريخ الإنشاء:</span>{" "}
                  {new Date().toLocaleDateString("ar-EG")}
                </div>
                <div className="text-right">
                  <span className="font-medium">تاريخ آخر تعديل:</span>{" "}
                  {new Date().toLocaleDateString("ar-EG")}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    جاري الحفظ...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ المورد
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSupplier;
