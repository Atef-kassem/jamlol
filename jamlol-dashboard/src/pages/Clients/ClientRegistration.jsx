import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import {
  User,
  Users,
  MapPin,
  Phone,
  Calendar,
  Save,
  X,
  Home,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAddress } from "@/contexts/AddressContext";

const ClientRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const {
    countries,
    getRegionsByCountry,
    getCitiesByRegion,
    getNeighborhoodsByCity,
  } = useAddress();

  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  // Mock data for users with "buyer" type
  const [users, setUsers] = useState([
    { id: "1", name: "أحمد محمد", type: "buyer" },
    { id: "2", name: "فاطمة أحمد", type: "buyer" },
    { id: "3", name: "محمد عبدالله", type: "buyer" },
    { id: "4", name: "سارة علي", type: "buyer" },
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    linkedUserId: "",
    entityType: "",
    countryId: "",
    regionId: "",
    cityId: "",
    neighborhoodId: "",
    street: "",
    mobile: "",
  });

  // تحميل بيانات المشتري في حالة التعديل
  useEffect(() => {
    if (isEditMode && id) {
      // Mock data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
      const clientData = {
        linkedUserId: "1",
        entityType: "company",
        countryId: "1",
        regionId: "1",
        cityId: "1",
        neighborhoodId: "1",
        street: "شارع الملك فهد",
        mobile: "+966501234567",
      };
      setFormData(clientData);
    }
  }, [isEditMode, id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.type === "buyer" &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleUserSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSubmit = () => {
    if (
      !formData.linkedUserId ||
      !formData.entityType ||
      !formData.mobile ||
      !formData.countryId ||
      !formData.cityId
    ) {
      toast({
        title: "خطأ في البيانات",
        description:
          "يرجى ملء جميع الحقول المطلوبة (المستخدم المرتبط، نوع الكيان، رقم الجوال، الدولة والمدينة مطلوبة)",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isEditMode ? "تم تحديث المشتري بنجاح" : "تم تسجيل المشتري بنجاح",
      description: isEditMode
        ? "تم تحديث بيانات المشتري في النظام"
        : "تم إضافة المشتري الجديد إلى النظام",
    });

    setTimeout(() => {
      navigate("/clients/list");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/clients/list");
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <User className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">
            {isEditMode ? "تعديل المشتري" : "تسجيل مشتري جديد"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? "تعديل بيانات المشتري الحالي"
              : "إضافة مشتري جديد إلى قاعدة البيانات"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* معلومات المشتري الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              معلومات المشتري الأساسية
            </CardTitle>
            <CardDescription>البيانات الأساسية للمشتري</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="linkedUserId">المستخدم المرتبط *</Label>
              <Select
                value={formData.linkedUserId}
                onValueChange={(value) =>
                  handleInputChange("linkedUserId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستخدم المرتبط" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <div className="p-2">
                    <Input
                      placeholder="ابحث عن المستخدم..."
                      value={searchTerm}
                      onChange={(e) => handleUserSearch(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  {filteredUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                  {filteredUsers.length === 0 && (
                    <div className="p-2 text-center text-muted-foreground">
                      لم يتم العثور على مستخدمين
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="entityType">نوع الكيان *</Label>
              <Select
                value={formData.entityType}
                onValueChange={(value) =>
                  handleInputChange("entityType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الكيان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">فرد</SelectItem>
                  <SelectItem value="company">شركة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* العنوان */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-base font-semibold">
                <MapPin className="h-4 w-4" />
                المناطق والاحياء
              </Label>

              <div className="grid gap-3">
                {/* الدولة */}
                <div className="grid gap-2">
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
                <div className="grid gap-2">
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
                <div className="grid gap-2">
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
                <div className="grid gap-2">
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

                {/* الشارع */}
                <div className="grid gap-2">
                  <Label htmlFor="street">الشارع</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) =>
                      handleInputChange("street", e.target.value)
                    }
                    placeholder="اسم الشارع"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الاتصال والتواريخ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              معلومات الاتصال والتواريخ
            </CardTitle>
            <CardDescription>بيانات التواصل والتواريخ المهمة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="mobile" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                رقم الجوال *
              </Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="+966 xx xxx xxxx"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أزرار الحفظ */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="outline">مطلوب</Badge>
          <span className="text-sm text-muted-foreground">
            الحقول المميزة بـ * مطلوبة
          </span>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            إلغاء
          </Button>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isEditMode ? "تحديث المشتري" : "حفظ المشتري"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientRegistration;
