import { useState, useEffect } from "react";
import {
  Save,
  Upload,
  Building,
  Phone,
  Mail,
  MapPin,
  FileText,
  Folder,
  Shield,
  Home,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAddress } from "@/contexts/AddressContext";
import { useGetAllAppsQuery, useUpdateAppMutation } from "@/redux/Slices/app";
import appInfoSchema from "../../validation/appSchema";

const getLogoUrl = (logoPath) => {
  if (!logoPath) return "";
  if (logoPath.startsWith("http")) return logoPath;
  if (logoPath.startsWith("uploads")) {
    return `http://localhost:5000/${logoPath.replace(/\\|\//g, "/")}`;
  }
  return logoPath;
};

// Spinner بسيط (يمكنك استبداله بأي مكون لديك)
const Spinner = (props) => (
  <svg {...props} viewBox="0 0 50 50" className={props.className || "animate-spin"}>
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="31.4 31.4" />
  </svg>
);

export default function CompanySettings() {
  const { toast } = useToast();
  const {
    countries,
    getRegionsByCountry,
    getCitiesByRegion,
    getNeighborhoodsByCity,
  } = useAddress();
  const { data: appData, isLoading: isAppLoading } = useGetAllAppsQuery();
  const [updateApp, { isLoading: isUpdateLoading, isSuccess, error }] = useUpdateAppMutation();
  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    app_name: "",
    app_email: "",
    app_phone: "",
    app_address: "",
    app_description: "",
    app_logo: "",
    app_footer_text: "",
    app_primary_color: "",
    maintenance_mode: "",
    currency: "",
    app_website: "",
    app_facebook: "",
    app_twitter: "",
    app_instagram: "",
    app_snapchat: "",
    app_whatsapp: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appData) {
      setFormData({
        ...appData,
      });
    }
  }, [appData]);

  // useEffect(() => {
  //   if (formData.countryId) {
  //     const regions = getRegionsByCountry(formData.countryId);
  //     setAvailableRegions(regions);
  //     if (
  //       formData.regionId &&
  //       !regions.find((r) => r.id === parseInt(formData.regionId))
  //     ) {
  //       handleInputChange("regionId", "");
  //       handleInputChange("cityId", "");
  //       handleInputChange("neighborhoodId", "");
  //       setAvailableCities([]);
  //       setAvailableNeighborhoods([]);
  //     }
  //   } else {
  //     setAvailableRegions([]);
  //     setAvailableCities([]);
  //     setAvailableNeighborhoods([]);
  //   }
  // }, [formData.countryId, getRegionsByCountry]);

  // useEffect(() => {
  //   if (formData.regionId) {
  //     const cities = getCitiesByRegion(formData.regionId);
  //     setAvailableCities(cities);
  //     if (
  //       formData.cityId &&
  //       !cities.find((c) => c.id === parseInt(formData.cityId))
  //     ) {
  //       handleInputChange("cityId", "");
  //       handleInputChange("neighborhoodId", "");
  //       setAvailableNeighborhoods([]);
  //     }
  //   } else {
  //     setAvailableCities([]);
  //     setAvailableNeighborhoods([]);
  //   }
  // }, [formData.regionId, getCitiesByRegion]);

  // useEffect(() => {
  //   if (formData.cityId) {
  //     const neighborhoods = getNeighborhoodsByCity(formData.cityId);
  //     setAvailableNeighborhoods(neighborhoods);
  //     if (
  //       formData.neighborhoodId &&
  //       !neighborhoods.find((n) => n.id === parseInt(formData.neighborhoodId))
  //     ) {
  //       handleInputChange("neighborhoodId", "");
  //     }
  //   } else {
  //     setAvailableNeighborhoods([]);
  //   }
  // }, [formData.cityId, getNeighborhoodsByCity]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleInputChange("app_logo", file);
    }
  };

  // const handleCountryChange = (value) => {
  //   handleInputChange("countryId", value);
  //   handleInputChange("regionId", "");
  //   handleInputChange("cityId", "");
  //   handleInputChange("neighborhoodId", "");
  // };

  // const handleRegionChange = (value) => {
  //   handleInputChange("regionId", value);
  //   handleInputChange("cityId", "");
  //   handleInputChange("neighborhoodId", "");
  // };

  // const handleCityChange = (value) => {
  //   handleInputChange("cityId", value);
  //   handleInputChange("neighborhoodId", "");
  // };

  const handleUpdate = async () => {
    setErrors({});
    try {
      await appInfoSchema.validate(formData, { abortEarly: false });
      const formDataToSend = new FormData();
      // Remove 'id' from the data to be sent
      const { id, ...formDataWithoutId } = formData;
      for (const key in formDataWithoutId) {
        if (formDataWithoutId[key] !== undefined && formDataWithoutId[key] !== null) {
          formDataToSend.append(key, formDataWithoutId[key]);
        }
      }
      const res = await updateApp({id, formDataToSend }).unwrap();
      console.log("API Response:", res);
      setFormData(res.app);
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات الشركة بنجاح",
        variant: "default",
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        toast({
          title: "خطأ",
          description: error.data?.message || "حدث خطأ أثناء التحديث",
          variant: "destructive",
        });
      }
    }
  };

  if (isAppLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner className="w-12 h-12 text-green-600 animate-spin" />
        <span className="ml-4 text-lg">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {isUpdateLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-40">
          <Spinner className="w-16 h-16 text-green-600 animate-spin" />
          <span className="mt-4 text-xl text-white font-bold">جاري حفظ البيانات...</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            بيانات الشركة / المؤسسة
          </h1>
          <p className="text-muted-foreground">
            إدارة المعلومات الأساسية للشركة / المؤسسة
          </p>
        </div>
        <Button
          onClick={handleUpdate}
          disabled={isUpdateLoading}
          className="gap-2 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Save className="w-4 h-4" />
          {isUpdateLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger value="basic" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105">
            الأساسية
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105">
            التواصل
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105">
            السوشيال ميديا
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle>البيانات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="app_name">اسم الشركة *</Label>
                  <Input
                    id="app_name"
                    value={formData?.app_name}
                    onChange={(e) => handleInputChange("app_name", e.target.value)}
                    placeholder="اسم الشركة"
                  />
                  {errors.app_name && <p className="text-red-500 text-xs mt-1">{errors.app_name}</p>}
                </div>
                <div>
                  <Label htmlFor="app_description">وصف الشركة</Label>
                  <Textarea
                    id="app_description"
                    value={formData?.app_description}
                    onChange={(e) => handleInputChange("app_description", e.target.value)}
                    placeholder="وصف مختصر عن الشركة"
                  />
                  {errors.app_description && <p className="text-red-500 text-xs mt-1">{errors.app_description}</p>}
                </div>
                <div>
                  <Label htmlFor="app_logo">شعار الشركة</Label>
                  {formData?.app_logo && typeof formData.app_logo === "string" && (
                    <div className="mb-2">
                      <img
                        src={getLogoUrl(formData?.app_logo)}
                        alt="شعار الشركة"
                        className="w-24 h-24 object-contain rounded-lg border mx-auto"
                      />
                    </div>
                  )}
                  <Input id="app_logo" type="file" accept="image/*" onChange={handleLogoChange} />
                  {errors.app_logo && <p className="text-red-500 text-xs mt-1">{errors.app_logo}</p>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Label htmlFor="app_primary_color">اللون الأساسي</Label>
                  <input
                    id="app_primary_color"
                    type="color"
                    value={
                      (formData?.app_primary_color || "#000000")
                        .toString()
                        .trim()
                        .replace(/['"]/g, "")
                        .replace(/\s/g, "")
                    }
                    onChange={(e) => handleInputChange("app_primary_color", e.target.value)}
                    className="w-12 h-12 p-0 border rounded cursor-pointer"
                  />
                  {errors.app_primary_color && <p className="text-red-500 text-xs mt-1">{errors.app_primary_color}</p>}
                </div>
                <div>
                  <Label htmlFor="maintenance_mode">وضع الصيانة</Label>
                  <select
                    id="maintenance_mode"
                    value={formData?.maintenance_mode}
                    onChange={(e) => handleInputChange("maintenance_mode", e.target.value)}
                    className="w-full h-10 rounded-lg border px-3 bg-white text-gray-700"
                  >
                    <option value="enabled">مفعل</option>
                    <option value="disabled">غير مفعل</option>
                  </select>
                  {errors.maintenance_mode && <p className="text-red-500 text-xs mt-1">{errors.maintenance_mode}</p>}
                </div>
                <div>
                  <Label htmlFor="currency">العملة</Label>
                  <Input
                    id="currency"
                    value={formData?.currency}
                    onChange={(e) => handleInputChange("currency", e.target.value)}
                    placeholder="العملة"
                  />
                  {errors.currency && <p className="text-red-500 text-xs mt-1">{errors.currency}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle>معلومات التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="app_email">البريد الإلكتروني *</Label>
                  <Input
                    id="app_email"
                    value={formData?.app_email}
                    onChange={(e) => handleInputChange("app_email", e.target.value)}
                    placeholder="البريد الإلكتروني"
                  />
                  {errors.app_email && <p className="text-red-500 text-xs mt-1">{errors.app_email}</p>}
                </div>
                <div>
                  <Label htmlFor="app_phone">رقم الهاتف *</Label>
                  <Input
                    id="app_phone"
                    value={formData?.app_phone}
                    onChange={(e) => handleInputChange("app_phone", e.target.value)}
                    placeholder="رقم الهاتف"
                  />
                  {errors.app_phone && <p className="text-red-500 text-xs mt-1">{errors.app_phone}</p>}
                </div>
                <div>
                  <Label htmlFor="app_address">العنوان *</Label>
                  <Input
                    id="app_address"
                    value={formData?.app_address}
                    onChange={(e) => handleInputChange("app_address", e.target.value)}
                    placeholder="العنوان"
                  />
                  {errors.app_address && <p className="text-red-500 text-xs mt-1">{errors.app_address}</p>}
                </div>
                <div>
                  <Label htmlFor="app_website">الموقع الإلكتروني</Label>
                  <Input
                    id="app_website"
                    value={formData?.app_website}
                    onChange={(e) => handleInputChange("app_website", e.target.value)}
                    placeholder="رابط الموقع"
                  />
                  {errors.app_website && <p className="text-red-500 text-xs mt-1">{errors.app_website}</p>}
                </div>
                <div>
                  <Label htmlFor="app_footer_text">نص الفوتر</Label>
                  <Input
                    id="app_footer_text"
                    value={formData?.app_footer_text}
                    onChange={(e) => handleInputChange("app_footer_text", e.target.value)}
                    placeholder="نص الفوتر"
                  />
                  {errors.app_footer_text && <p className="text-red-500 text-xs mt-1">{errors.app_footer_text}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle>السوشيال ميديا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="app_facebook">فيسبوك</Label>
                  <Input
                    id="app_facebook"
                    value={formData?.app_facebook}
                    onChange={(e) => handleInputChange("app_facebook", e.target.value)}
                    placeholder="رابط فيسبوك"
                  />
                  {errors.app_facebook && <p className="text-red-500 text-xs mt-1">{errors.app_facebook}</p>}
                </div>
                <div>
                  <Label htmlFor="app_twitter">تويتر</Label>
                  <Input
                    id="app_twitter"
                    value={formData?.app_twitter}
                    onChange={(e) => handleInputChange("app_twitter", e.target.value)}
                    placeholder="رابط تويتر"
                  />
                  {errors.app_twitter && <p className="text-red-500 text-xs mt-1">{errors.app_twitter}</p>}
                </div>
                <div>
                  <Label htmlFor="app_instagram">انستجرام</Label>
                  <Input
                    id="app_instagram"
                    value={formData?.app_instagram}
                    onChange={(e) => handleInputChange("app_instagram", e.target.value)}
                    placeholder="رابط انستجرام"
                  />
                  {errors.app_instagram && <p className="text-red-500 text-xs mt-1">{errors.app_instagram}</p>}
                </div>
                <div>
                  <Label htmlFor="app_snapchat">سناب شات</Label>
                  <Input
                    id="app_snapchat"
                    value={formData?.app_snapchat}
                    onChange={(e) => handleInputChange("app_snapchat", e.target.value)}
                    placeholder="رابط سناب شات"
                  />
                  {errors.app_snapchat && <p className="text-red-500 text-xs mt-1">{errors.app_snapchat}</p>}
                </div>
                <div>
                  <Label htmlFor="app_whatsapp">واتساب</Label>
                  <Input
                    id="app_whatsapp"
                    value={formData?.app_whatsapp}
                    onChange={(e) => handleInputChange("app_whatsapp", e.target.value)}
                    placeholder="رقم واتساب أو رابط"
                  />
                  {errors.app_whatsapp && <p className="text-red-500 text-xs mt-1">{errors.app_whatsapp}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}