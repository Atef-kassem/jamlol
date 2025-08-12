import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Calendar as CalendarIcon,
  MapPin,
  Package,
  Truck,
  Clock,
  DollarSign,
  User,
  Phone,
  Mail,
  Save,
  FileText,
  Home,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { gregorianLocale } from "@/lib/dateConfig";
import { useAddress } from "@/contexts/AddressContext";

const NewOrder = () => {
  const {
    countries,
    getRegionsByCountry,
    getCitiesByRegion,
    getNeighborhoodsByCity,
  } = useAddress();
  const [pickupRegions, setPickupRegions] = useState([]);
  const [pickupCities, setPickupCities] = useState([]);
  const [pickupNeighborhoods, setPickupNeighborhoods] = useState([]);
  const [deliveryRegions, setDeliveryRegions] = useState([]);
  const [deliveryCities, setDeliveryCities] = useState([]);
  const [deliveryNeighborhoods, setDeliveryNeighborhoods] = useState([]);

  const [orderData, setOrderData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    // عنوان الاستلام
    pickupCountryId: "",
    pickupRegionId: "", // تغيير من pickupCityId إلى pickupRegionId
    pickupCityId: "", // تعديل ليتوافق مع الهيكلية
    pickupNeighborhoodId: "",
    pickupStreet: "",
    // عنوان التسليم
    deliveryCountryId: "",
    deliveryRegionId: "", // تغيير من deliveryCityId إلى deliveryRegionId
    deliveryCityId: "", // تعديل ليتوافق مع الهيكلية
    deliveryNeighborhoodId: "",
    deliveryStreet: "",
    pickupDate: undefined,
    deliveryDate: undefined,
    packageType: "",
    packageWeight: "",
    packageDimensions: "",
    packageValue: "",
    serviceType: "",
    carrierId: "",
    specialInstructions: "",
    isFragile: false,
    requiresSignature: false,
    insuranceRequired: false,
    urgentDelivery: false,
  });

  const [estimatedCost, setEstimatedCost] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update pickup regions when pickup country changes
  useEffect(() => {
    if (orderData.pickupCountryId) {
      const regions = getRegionsByCountry(orderData.pickupCountryId);
      setPickupRegions(regions);
      // Reset region, city, and neighborhood if country changed
      handleInputChange("pickupRegionId", "");
      handleInputChange("pickupCityId", "");
      handleInputChange("pickupNeighborhoodId", "");
      setPickupCities([]);
      setPickupNeighborhoods([]);
    } else {
      setPickupRegions([]);
      setPickupCities([]);
      setPickupNeighborhoods([]);
    }
  }, [orderData.pickupCountryId, getRegionsByCountry]);

  // Update pickup cities when pickup region changes
  useEffect(() => {
    if (orderData.pickupRegionId) {
      const cities = getCitiesByRegion(orderData.pickupRegionId);
      setPickupCities(cities);
      // Reset city and neighborhood if region changed
      handleInputChange("pickupCityId", "");
      handleInputChange("pickupNeighborhoodId", "");
      setPickupNeighborhoods([]);
    } else {
      setPickupCities([]);
      setPickupNeighborhoods([]);
    }
  }, [orderData.pickupRegionId, getCitiesByRegion]);

  // Update pickup neighborhoods when pickup city changes
  useEffect(() => {
    if (orderData.pickupCityId) {
      const neighborhoods = getNeighborhoodsByCity(orderData.pickupCityId);
      setPickupNeighborhoods(neighborhoods);
      // Reset neighborhood if city changed
      handleInputChange("pickupNeighborhoodId", "");
    } else {
      setPickupNeighborhoods([]);
    }
  }, [orderData.pickupCityId, getNeighborhoodsByCity]);

  // Update delivery regions when delivery country changes
  useEffect(() => {
    if (orderData.deliveryCountryId) {
      const regions = getRegionsByCountry(orderData.deliveryCountryId);
      setDeliveryRegions(regions);
      // Reset region, city, and neighborhood if country changed
      handleInputChange("deliveryRegionId", "");
      handleInputChange("deliveryCityId", "");
      handleInputChange("deliveryNeighborhoodId", "");
      setDeliveryCities([]);
      setDeliveryNeighborhoods([]);
    } else {
      setDeliveryRegions([]);
      setDeliveryCities([]);
      setDeliveryNeighborhoods([]);
    }
  }, [orderData.deliveryCountryId, getRegionsByCountry]);

  // Update delivery cities when delivery region changes
  useEffect(() => {
    if (orderData.deliveryRegionId) {
      const cities = getCitiesByRegion(orderData.deliveryRegionId);
      setDeliveryCities(cities);
      // Reset city and neighborhood if region changed
      handleInputChange("deliveryCityId", "");
      handleInputChange("deliveryNeighborhoodId", "");
      setDeliveryNeighborhoods([]);
    } else {
      setDeliveryCities([]);
      setDeliveryNeighborhoods([]);
    }
  }, [orderData.deliveryRegionId, getCitiesByRegion]);

  // Update delivery neighborhoods when delivery city changes
  useEffect(() => {
    if (orderData.deliveryCityId) {
      const neighborhoods = getNeighborhoodsByCity(orderData.deliveryCityId);
      setDeliveryNeighborhoods(neighborhoods);
      // Reset neighborhood if city changed
      handleInputChange("deliveryNeighborhoodId", "");
    } else {
      setDeliveryNeighborhoods([]);
    }
  }, [orderData.deliveryCityId, getNeighborhoodsByCity]);

  const calculateEstimatedCost = () => {
    let baseCost = 50; // تكلفة أساسية
    if (orderData.packageWeight) {
      baseCost += parseFloat(orderData.packageWeight) * 2;
    }
    if (orderData.urgentDelivery) {
      baseCost *= 1.5;
    }
    if (orderData.insuranceRequired) {
      baseCost += 25;
    }
    setEstimatedCost(baseCost);
  };

  const handleSubmitOrder = () => {
    // التحقق من البيانات المطلوبة
    const requiredFields = [
      "clientName",
      "clientPhone",
      "pickupCountryId",
      "pickupRegionId",
      "pickupCityId",
      "pickupStreet",
      "deliveryCountryId",
      "deliveryRegionId",
      "deliveryCityId",
      "deliveryStreet",
    ];
    const missingFields = requiredFields.filter((field) => !orderData[field]);

    if (missingFields.length > 0) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إنشاء الطلب",
      description: "تم إنشاء الطلب بنجاح وسيتم تخصيص ناقل قريباً",
    });

    // إعادة تعيين النموذج
    setOrderData({
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      pickupCountryId: "",
      pickupRegionId: "",
      pickupCityId: "",
      pickupNeighborhoodId: "",
      pickupStreet: "",
      deliveryCountryId: "",
      deliveryRegionId: "",
      deliveryCityId: "",
      deliveryNeighborhoodId: "",
      deliveryStreet: "",
      pickupDate: undefined,
      deliveryDate: undefined,
      packageType: "",
      packageWeight: "",
      packageDimensions: "",
      packageValue: "",
      serviceType: "",
      carrierId: "",
      specialInstructions: "",
      isFragile: false,
      requiresSignature: false,
      insuranceRequired: false,
      urgentDelivery: false,
    });
    setEstimatedCost(null);
  };

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إضافة طلب جديد</h1>
          <p className="text-muted-foreground">إنشاء طلب نقل جديد</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={calculateEstimatedCost}>
            <DollarSign className="h-4 w-4 ml-2" />
            حساب التكلفة التقديرية
          </Button>
          <Button onClick={handleSubmitOrder}>
            <Save className="h-4 w-4 ml-2" />
            حفظ الطلب
          </Button>
        </div>
      </div>

      {estimatedCost && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-primary">التكلفة التقديرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {estimatedCost.toFixed(2)} ر.س
            </div>
            <p className="text-sm text-muted-foreground">
              هذه تكلفة تقديرية قد تتغير حسب الناقل المختار
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* معلومات العميل */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              معلومات العميل
            </CardTitle>
            <CardDescription>بيانات العميل الأساسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">اسم العميل *</Label>
              <Input
                id="clientName"
                value={orderData.clientName}
                onChange={(e) =>
                  handleInputChange("clientName", e.target.value)
                }
                placeholder="أدخل اسم العميل"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">رقم الهاتف *</Label>
              <Input
                id="clientPhone"
                value={orderData.clientPhone}
                onChange={(e) =>
                  handleInputChange("clientPhone", e.target.value)
                }
                placeholder="05xxxxxxxx"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">البريد الإلكتروني</Label>
              <Input
                id="clientEmail"
                type="email"
                value={orderData.clientEmail}
                onChange={(e) =>
                  handleInputChange("clientEmail", e.target.value)
                }
                placeholder="client@example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* تفاصيل التسليم */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              تفاصيل التسليم
            </CardTitle>
            <CardDescription>عناوين الاستلام والتسليم</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* عنوان الاستلام */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                عنوان الاستلام *
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* دولة الاستلام */}
                <div className="space-y-2">
                  <Label>الدولة</Label>
                  <Select
                    value={orderData.pickupCountryId}
                    onValueChange={(value) => {
                      handleInputChange("pickupCountryId", value);
                      handleInputChange("pickupRegionId", "");
                      handleInputChange("pickupCityId", "");
                      handleInputChange("pickupNeighborhoodId", "");
                    }}
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

                {/* منطقة الاستلام */}
                <div className="space-y-2">
                  <Label>المنطقة</Label>
                  <Select
                    value={orderData.pickupRegionId}
                    onValueChange={(value) => {
                      handleInputChange("pickupRegionId", value);
                      handleInputChange("pickupCityId", "");
                      handleInputChange("pickupNeighborhoodId", "");
                    }}
                    disabled={!orderData.pickupCountryId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {pickupRegions.map((region) => (
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

                {/* مدينة الاستلام */}
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Select
                    value={orderData.pickupCityId}
                    onValueChange={(value) => {
                      handleInputChange("pickupCityId", value);
                      handleInputChange("pickupNeighborhoodId", "");
                    }}
                    disabled={!orderData.pickupRegionId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {pickupCities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* حي الاستلام */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    الحي
                  </Label>
                  <Select
                    value={orderData.pickupNeighborhoodId}
                    onValueChange={(value) =>
                      handleInputChange("pickupNeighborhoodId", value)
                    }
                    disabled={!orderData.pickupCityId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحي" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {pickupNeighborhoods.map((neighborhood) => (
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

              {/* شارع الاستلام */}
              <div className="space-y-2">
                <Label htmlFor="pickupStreet">الشارع والعنوان التفصيلي *</Label>
                <Textarea
                  id="pickupStreet"
                  value={orderData.pickupStreet}
                  onChange={(e) =>
                    handleInputChange("pickupStreet", e.target.value)
                  }
                  placeholder="أدخل اسم الشارع والعنوان التفصيلي للاستلام"
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <Separator />

            {/* عنوان التسليم */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">عنوان التسليم *</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* دولة التسليم */}
                <div className="space-y-2">
                  <Label>الدولة</Label>
                  <Select
                    value={orderData.deliveryCountryId}
                    onValueChange={(value) => {
                      handleInputChange("deliveryCountryId", value);
                      handleInputChange("deliveryRegionId", "");
                      handleInputChange("deliveryCityId", "");
                      handleInputChange("deliveryNeighborhoodId", "");
                    }}
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

                {/* منطقة التسليم */}
                <div className="space-y-2">
                  <Label>المنطقة</Label>
                  <Select
                    value={orderData.deliveryRegionId}
                    onValueChange={(value) => {
                      handleInputChange("deliveryRegionId", value);
                      handleInputChange("deliveryCityId", "");
                      handleInputChange("deliveryNeighborhoodId", "");
                    }}
                    disabled={!orderData.deliveryCountryId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {deliveryRegions.map((region) => (
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

                {/* مدينة التسليم */}
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Select
                    value={orderData.deliveryCityId}
                    onValueChange={(value) => {
                      handleInputChange("deliveryCityId", value);
                      handleInputChange("deliveryNeighborhoodId", "");
                    }}
                    disabled={!orderData.deliveryRegionId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {deliveryCities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* حي التسليم */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    الحي
                  </Label>
                  <Select
                    value={orderData.deliveryNeighborhoodId}
                    onValueChange={(value) =>
                      handleInputChange("deliveryNeighborhoodId", value)
                    }
                    disabled={!orderData.deliveryCityId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحي" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {deliveryNeighborhoods.map((neighborhood) => (
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

              {/* شارع التسليم */}
              <div className="space-y-2">
                <Label htmlFor="deliveryStreet">
                  الشارع والعنوان التفصيلي *
                </Label>
                <Textarea
                  id="deliveryStreet"
                  value={orderData.deliveryStreet}
                  onChange={(e) =>
                    handleInputChange("deliveryStreet", e.target.value)
                  }
                  placeholder="أدخل اسم الشارع والعنوان التفصيلي للتسليم"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الشحنة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              معلومات الشحنة
            </CardTitle>
            <CardDescription>تفاصيل الطرد المراد نقله</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="packageType">نوع الطرد</Label>
              <Select
                value={orderData.packageType}
                onValueChange={(value) =>
                  handleInputChange("packageType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الطرد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="documents">وثائق</SelectItem>
                  <SelectItem value="electronics">إلكترونيات</SelectItem>
                  <SelectItem value="clothing">ملابس</SelectItem>
                  <SelectItem value="food">طعام</SelectItem>
                  <SelectItem value="furniture">أثاث</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packageWeight">الوزن (كجم)</Label>
                <Input
                  id="packageWeight"
                  type="number"
                  step="0.1"
                  value={orderData.packageWeight}
                  onChange={(e) =>
                    handleInputChange("packageWeight", e.target.value)
                  }
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packageValue">القيمة (ر.س)</Label>
                <Input
                  id="packageValue"
                  type="number"
                  value={orderData.packageValue}
                  onChange={(e) =>
                    handleInputChange("packageValue", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="packageDimensions">الأبعاد (سم)</Label>
              <Input
                id="packageDimensions"
                value={orderData.packageDimensions}
                onChange={(e) =>
                  handleInputChange("packageDimensions", e.target.value)
                }
                placeholder="الطول × العرض × الارتفاع"
              />
            </div>
          </CardContent>
        </Card>

        {/* تفاصيل الخدمة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              تفاصيل الخدمة
            </CardTitle>
            <CardDescription>نوع الخدمة والناقل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>نوع الخدمة</Label>
              <RadioGroup
                value={orderData.serviceType}
                onValueChange={(value) =>
                  handleInputChange("serviceType", value)
                }
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">عادي (2-3 أيام)</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">سريع (24 ساعة)</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent">عاجل (نفس اليوم)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="carrierId">الناقل المفضل</Label>
              <Select
                value={orderData.carrierId}
                onValueChange={(value) => handleInputChange("carrierId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الناقل (اختياري)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">تخصيص تلقائي</SelectItem>
                  <SelectItem value="car001">شركة النقل السريع</SelectItem>
                  <SelectItem value="car002">ناقل المدينة</SelectItem>
                  <SelectItem value="car003">خدمات التوصيل المتقدمة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* التواريخ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              مواعيد التسليم
            </CardTitle>
            <CardDescription>تحديد مواعيد الاستلام والتسليم</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>تاريخ الاستلام</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-right font-normal w-full"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {orderData.pickupDate
                      ? format(orderData.pickupDate, "PPP")
                      : "اختر تاريخ الاستلام"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={orderData.pickupDate}
                    onSelect={(date) => handleInputChange("pickupDate", date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>تاريخ التسليم المطلوب</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-right font-normal w-full"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {orderData.deliveryDate
                      ? format(orderData.deliveryDate, "PPP")
                      : "اختر تاريخ التسليم"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={orderData.deliveryDate}
                    onSelect={(date) => handleInputChange("deliveryDate", date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* خيارات إضافية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              خيارات إضافية
            </CardTitle>
            <CardDescription>خدمات وتعليمات خاصة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="isFragile"
                  checked={orderData.isFragile}
                  onCheckedChange={(checked) =>
                    handleInputChange("isFragile", checked)
                  }
                />
                <Label htmlFor="isFragile">شحنة قابلة للكسر</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="requiresSignature"
                  checked={orderData.requiresSignature}
                  onCheckedChange={(checked) =>
                    handleInputChange("requiresSignature", checked)
                  }
                />
                <Label htmlFor="requiresSignature">يتطلب توقيع المستلم</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="insuranceRequired"
                  checked={orderData.insuranceRequired}
                  onCheckedChange={(checked) =>
                    handleInputChange("insuranceRequired", checked)
                  }
                />
                <Label htmlFor="insuranceRequired">تأمين على الشحنة</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="urgentDelivery"
                  checked={orderData.urgentDelivery}
                  onCheckedChange={(checked) =>
                    handleInputChange("urgentDelivery", checked)
                  }
                />
                <Label htmlFor="urgentDelivery">تسليم عاجل</Label>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">تعليمات خاصة</Label>
              <Textarea
                id="specialInstructions"
                value={orderData.specialInstructions}
                onChange={(e) =>
                  handleInputChange("specialInstructions", e.target.value)
                }
                placeholder="أدخل أي تعليمات خاصة للناقل..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewOrder;
