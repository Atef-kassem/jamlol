import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Truck, User, MapPin, Phone, Mail, CreditCard, FileText, Star, Calendar as CalendarIcon, Hash } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CarrierRegistration = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    carrierNumber: "",
    name: "",
    category: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    licenseNumber: "",
    vehicleType: "",
    capacity: "",
    experience: "",
    coveredAreas: [] as string[],
    availabilityStatus: true,
    pricePerKm: "",
    specializations: [] as string[],
    description: "",
    createdDate: new Date(),
    lastModifiedDate: new Date()
  });

  const categoryOptions = [
    "مؤسسة",
    "فرد"
  ];

  const vehicleTypes = [
    "سيارة",
    "شاحنة صغيرة",
    "شاحنة متوسطة", 
    "شاحنة كبيرة",
    "مقطورة",
    "شاحنة مبردة",
    "شاحنة صهريج",
    "ناقلة سيارات",
    "دراجة نارية"
  ];

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
    "نجران"
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
    "الدمام والخبر والظهران"
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
    "النقل الطبي"
  ];

  const handleInputChange = (field: string, value: string | boolean | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecializationToggle = (specialization: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const handleCoveredAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      coveredAreas: prev.coveredAreas.includes(area)
        ? prev.coveredAreas.filter(a => a !== area)
        : [...prev.coveredAreas, area]
    }));
  };

  const generateCarrierNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `C${timestamp}${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
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

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              المعلومات الأساسية
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              معلومات الناقل
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              الموقع والتغطية
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              الخدمات والتخصصات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  المعلومات الأساسية
                </CardTitle>
                <CardDescription>
                  البيانات الأساسية للناقل
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carrierNumber">رقم الناقل</Label>
                    <div className="flex gap-2">
                      <Input
                        id="carrierNumber"
                        value={formData.carrierNumber}
                        onChange={(e) => handleInputChange("carrierNumber", e.target.value)}
                        placeholder="سيتم إنشاؤه تلقائياً"
                        disabled
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleInputChange("carrierNumber", generateCarrierNumber())}
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
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
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
                    <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المركبة" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
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
                      onChange={(e) => handleInputChange("pricePerKm", e.target.value)}
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
                        onCheckedChange={(checked) => handleInputChange("availabilityStatus", checked)}
                      />
                      <Label htmlFor="availabilityStatus" className="text-sm">
                        {formData.availabilityStatus ? "متاح" : "غير متاح"}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {formData.category === "مؤسسة" ? "معلومات المؤسسة" : "معلومات الشخص"}
                </CardTitle>
                <CardDescription>
                  المعلومات التفصيلية والاتصال
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.category === "مؤسسة" && (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="companyName">اسم الشركة/المؤسسة *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
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
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
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
                      onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
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
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="عدد سنوات الخبرة"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">السعة (بالطن)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange("capacity", e.target.value)}
                      placeholder="السعة بالطن"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  معلومات الموقع والتغطية
                </CardTitle>
                <CardDescription>
                  العنوان والمناطق المخدومة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">العنوان الكامل *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="العنوان الكامل للشركة"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="اسم المدينة"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">المنطقة *</Label>
                    <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المنطقة" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>المناطق المغطاة</Label>
                  <div className="flex flex-wrap gap-2">
                    {coveredAreasOptions.map((area) => (
                      <Badge
                        key={area}
                        variant={formData.coveredAreas.includes(area) ? "default" : "outline"}
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
          </TabsContent>

          <TabsContent value="services" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  التخصصات والخدمات
                </CardTitle>
                <CardDescription>
                  الخدمات المقدمة والتخصصات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>التخصصات والخدمات</Label>
                  <div className="flex flex-wrap gap-2">
                    {specializationOptions.map((specialization) => (
                      <Badge
                        key={specialization}
                        variant={formData.specializations.includes(specialization) ? "default" : "outline"}
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
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="معلومات إضافية عن الشركة والخدمات المقدمة"
                    rows={3}
                  />
                </div>

                <Separator />

                {/* تواريخ النظام */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">معلومات التواريخ</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>تاريخ الإنشاء</Label>
                      <Input
                        value={format(formData.createdDate, "yyyy-MM-dd HH:mm")}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>تاريخ آخر تعديل</Label>
                      <Input
                        value={format(formData.lastModifiedDate, "yyyy-MM-dd HH:mm")}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* إرسال الطلب */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">* الحقول المطلوبة</p>
                    <p>سيتم مراجعة طلب التسجيل والرد عليك خلال 24 ساعة</p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline">
                      إلغاء
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      <FileText className="h-4 w-4 mr-2" />
                      إرسال الطلب
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default CarrierRegistration;