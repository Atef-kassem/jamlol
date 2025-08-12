import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import {
  Truck,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  FileText,
  Star,
  Calendar as CalendarIcon,
  Hash,
  Home,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAddress } from "@/contexts/AddressContext";
import { useTransport } from "@/contexts/TransportContext";

const CarrierRegistration = () => {
  const { toast } = useToast();

  const {
    countries,
    getRegionsByCountry,
    getCitiesByRegion,
    getNeighborhoodsByCity,
  } = useAddress();
  const { getActiveTransportMethods, getTransportMethodById } = useTransport();

  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  const [formData, setFormData] = useState({
    carrierNumber: "",
    name: "",
    category: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    countryId: "",
    regionId: "",
    cityId: "",
    neighborhoodId: "",
    street: "",
    licenseNumber: "",
    vehicleType: "",
    capacity: "",
    experience: "",
    coveredAreas: [],
    availabilityStatus: true,
    pricePerKm: "",
    specializations: [],
    description: "",
    createdDate: new Date(),
    lastModifiedDate: new Date(),
  });

  const categoryOptions = ["مؤسسة", "فرد"];

  // Get active transport methods from context
  const activeTransportMethods = getActiveTransportMethods();

  const regions = [
    "الرياض",
    "مكة المكرمة",
    "المنطقة الشرقية",
    "المدينة المنورة",
    "القصيم",
    "حائل",
    "تبوك",
    "الحدود الشمالية",
    "الجوف",
    "عسير",
    "الباحة",
    "جازان",
    "نجران",
  ];

  const coveredAreasOptions = [
    "جميع مناطق المملكة",
    "المنطقة الوسطى",
    "المنطقة الشرقية",
    "المنطقة الغربية",
    "المنطقة الشمالية",
    "المنطقة الجنوبية",
    "المناطق الحضرية فقط",
    "الرياض والمنطقة الوسطى",
    "جدة ومكة المكرمة",
    "الدمام والخبر والظهران",
  ];

  const specializationOptions = [
    "نقل البضائع العامة",
    "النقل المبرد",
    "نقل المواد الخطرة",
    "نقل السيارات",
    "النقل السريع",
    "النقل الثقيل",
    "التوصيل للمنازل",
    "النقل التجاري",
    "النقل الطبي",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update regions when country changes
  useEffect(() => {
    if (formData.countryId) {
      const regions = getRegionsByCountry(formData.countryId);
      setAvailableRegions(regions);
      // Reset region, city and neighborhood if country changed
      if (
        formData.regionId &&
        !regions.find((r) => r.id === parseInt(formData.regionId))
      ) {
        handleInputChange("regionId", "");
        handleInputChange("cityId", "");
        handleInputChange("neighborhoodId", "");
        setAvailableCities([]);
        setAvailableNeighborhoods([]);
      }
    } else {
      setAvailableRegions([]);
      setAvailableCities([]);
      setAvailableNeighborhoods([]);
    }
  }, [formData.countryId]);

  // Update cities when region changes
  useEffect(() => {
    if (formData.regionId) {
      const cities = getCitiesByRegion(formData.regionId);
      setAvailableCities(cities);
      // Reset city and neighborhood if region changed
      if (
        formData.cityId &&
        !cities.find((c) => c.id === parseInt(formData.cityId))
      ) {
        handleInputChange("cityId", "");
        handleInputChange("neighborhoodId", "");
        setAvailableNeighborhoods([]);
      }
    } else {
      setAvailableCities([]);
      setAvailableNeighborhoods([]);
    }
  }, [formData.regionId]);

  // Update neighborhoods when city changes
  useEffect(() => {
    if (formData.cityId) {
      const neighborhoods = getNeighborhoodsByCity(formData.cityId);
      setAvailableNeighborhoods(neighborhoods);
      // Reset neighborhood if city changed
      if (
        formData.neighborhoodId &&
        !neighborhoods.find((n) => n.id === parseInt(formData.neighborhoodId))
      ) {
        handleInputChange("neighborhoodId", "");
      }
    } else {
      setAvailableNeighborhoods([]);
    }
  }, [formData.cityId]);

  const handleCountryChange = (value) => {
    handleInputChange("countryId", value);
    handleInputChange("regionId", "");
    handleInputChange("cityId", "");
    handleInputChange("neighborhoodId", "");
  };

  const handleRegionChange = (value) => {
    handleInputChange("regionId", value);
    handleInputChange("cityId", "");
    handleInputChange("neighborhoodId", "");
  };

  const handleCityChange = (value) => {
    handleInputChange("cityId", value);
    handleInputChange("neighborhoodId", "");
  };

  const handleVehicleTypeChange = (value) => {
    handleInputChange("vehicleType", value);

    // Auto-fill capacity when vehicle type is selected
    const selectedMethod = getTransportMethodById(value);
    if (selectedMethod) {
      handleInputChange("capacity", selectedMethod.capacity);
    }
  };

  const handleSpecializationToggle = (specialization) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter((s) => s !== specialization)
        : [...prev.specializations, specialization],
    }));
  };

  const handleCoveredAreaToggle = (area) => {
    setFormData((prev) => ({
      ...prev,
      coveredAreas: prev.coveredAreas.includes(area)
        ? prev.coveredAreas.filter((a) => a !== area)
        : [...prev.coveredAreas, area],
    }));
  };

  const generateCarrierNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `C${timestamp}${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate carrier number if not provided
    if (!formData.carrierNumber) {
      handleInputChange("carrierNumber", generateCarrierNumber());
    }

    // Update last modified date
    handleInputChange("lastModifiedDate", new Date());

    toast({
      title: "تم إرسال الطلب بنجاح",
      description: "سيتم مراجعة طلب التسجيل والرد عليك خلال 24 ساعة",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Truck className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">تسجيل ناقل جديد</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              المعلومات الأساسية
            </CardTitle>
            <CardDescription>البيانات الأساسية للناقل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carrierNumber">رقم الناقل</Label>
                <div className="flex gap-2">
                  <Input
                    id="carrierNumber"
                    value={formData.carrierNumber}
                    onChange={(e) =>
                      handleInputChange("carrierNumber", e.target.value)
                    }
                    placeholder="سيتم إنشاؤه تلقائياً"
                    disabled
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      handleInputChange(
                        "carrierNumber",
                        generateCarrierNumber()
                      )
                    }
                  >
                    إنشاء
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">الاسم *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="اسم الناقل"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">الفئة *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر فئة الناقل" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleType">نوع وسيلة النقل *</Label>

                <Select
                  value={formData.vehicleType}
                  onValueChange={handleVehicleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المركبة" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeTransportMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id.toString()}>
                        {method.name} - ({method.capacity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricePerKm">السعر لكل كيلومتر (ر.س) *</Label>
                <Input
                  id="pricePerKm"
                  type="number"
                  step="0.1"
                  value={formData.pricePerKm}
                  onChange={(e) =>
                    handleInputChange("pricePerKm", e.target.value)
                  }
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availabilityStatus">حالة التوفر</Label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="availabilityStatus"
                    checked={formData.availabilityStatus}
                    onCheckedChange={(checked) =>
                      handleInputChange("availabilityStatus", checked)
                    }
                  />
                  <Label htmlFor="availabilityStatus" className="text-sm">
                    {formData.availabilityStatus ? "متاح" : "غير متاح"}
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الشركة/الشخص */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {formData.category === "مؤسسة"
                ? "معلومات المؤسسة"
                : "معلومات الشخص"}
            </CardTitle>
            <CardDescription>المعلومات التفصيلية والاتصال</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.category === "مؤسسة" && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyName">اسم الشركة/المؤسسة *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    placeholder="أدخل اسم الشركة"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="contactPerson">الشخص المسؤول *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    handleInputChange("contactPerson", e.target.value)
                  }
                  placeholder="اسم الشخص المسؤول"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@company.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+966501234567"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">رقم الرخصة التجارية *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    handleInputChange("licenseNumber", e.target.value)
                  }
                  placeholder="رقم الرخصة التجارية"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">سنوات الخبرة</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="عدد سنوات الخبرة"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">السعة (بالطن)</Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) =>
                    handleInputChange("capacity", e.target.value)
                  }
                  placeholder="تُملأ تلقائياً عند اختيار النوع"
                  readOnly={!!formData.vehicleType}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الموقع والمناطق المغطاة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              المناطق والاحياء
            </CardTitle>
            <CardDescription>المناطق والاحياء المخدومة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium text-base">العنوان</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* الدولة */}
                <div className="space-y-2">
                  <Label htmlFor="country">الدولة *</Label>
                  <Select
                    value={formData.countryId}
                    onValueChange={handleCountryChange}
                  >
                    <SelectTrigger>
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
                </div>

                {/* المنطقة */}
                <div className="space-y-2">
                  <Label htmlFor="region">المنطقة *</Label>
                  <Select
                    value={formData.regionId}
                    onValueChange={handleRegionChange}
                    disabled={!formData.countryId}
                  >
                    <SelectTrigger>
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
                </div>

                {/* المدينة */}
                <div className="space-y-2">
                  <Label htmlFor="city">المدينة *</Label>
                  <Select
                    value={formData.cityId}
                    onValueChange={handleCityChange}
                    disabled={!formData.regionId}
                  >
                    <SelectTrigger>
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
                </div>

                {/* الحي */}
                <div className="space-y-2">
                  <Label
                    htmlFor="neighborhood"
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    الحي
                  </Label>
                  <Select
                    value={formData.neighborhoodId}
                    onValueChange={(value) =>
                      handleInputChange("neighborhoodId", value)
                    }
                    disabled={!formData.cityId}
                  >
                    <SelectTrigger>
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
                </div>
              </div>

              {/* الشارع */}
              <div className="space-y-2">
                <Label htmlFor="street">الشارع *</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  placeholder="اسم الشارع والعنوان التفصيلي"
                  required
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>المناطق المغطاة</Label>
              <div className="flex flex-wrap gap-2">
                {coveredAreasOptions.map((area) => (
                  <Badge
                    key={area}
                    variant={
                      formData.coveredAreas.includes(area)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => handleCoveredAreaToggle(area)}
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الأسطول والخدمات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              التخصصات والخدمات
            </CardTitle>
            <CardDescription>الخدمات المقدمة والتخصصات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>التخصصات والخدمات</Label>
              <div className="flex flex-wrap gap-2">
                {specializationOptions.map((specialization) => (
                  <Badge
                    key={specialization}
                    variant={
                      formData.specializations.includes(specialization)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => handleSpecializationToggle(specialization)}
                  >
                    {specialization}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف إضافي</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="معلومات إضافية عن الشركة والخدمات المقدمة"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* تواريخ النظام */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              معلومات النظام
            </CardTitle>
            <CardDescription>تواريخ التسجيل والتحديث</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>تاريخ التسجيل</Label>
                <Input
                  value={format(formData.createdDate, "dd/MM/yyyy")}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>آخر تحديث</Label>
                <Input
                  value={format(formData.lastModifiedDate, "dd/MM/yyyy")}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* أزرار الإجراءات */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            إلغاء
          </Button>
          <Button type="submit" className="min-w-[120px]">
            تسجيل الناقل
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CarrierRegistration;
