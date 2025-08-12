import { useState, useRef } from "react";
import {
  Settings,
  Save,
  Upload,
  RefreshCw,
  Mail,
  MessageSquare,
  Receipt,
  DollarSign,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Truck,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAddress } from "@/contexts/AddressContext";

// Language options
const languageOptions = [
  { value: "ar", label: "العربية", flag: "🇸🇦" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "es", label: "Español", flag: "🇪🇸" },
];

// Currency options
const currencyOptions = [
  { value: "SAR", label: "ريال سعودي (SAR)", symbol: "ر.س" },
  { value: "USD", label: "دولار أمريكي (USD)", symbol: "$" },
  { value: "EUR", label: "يورو (EUR)", symbol: "€" },
  { value: "AED", label: "درهم إماراتي (AED)", symbol: "د.إ" },
  { value: "EGP", label: "جنيه مصري (EGP)", symbol: "ج.م" },
];

// Date format options
const dateFormats = [
  { value: "DD/MM/YYYY", label: "يوم/شهر/سنة (25/12/2024)" },
  { value: "MM/DD/YYYY", label: "شهر/يوم/سنة (12/25/2024)" },
  { value: "YYYY-MM-DD", label: "سنة-شهر-يوم (2024-12-25)" },
  { value: "DD-MM-YYYY", label: "يوم-شهر-سنة (25-12-2024)" },
];

// Time format options
const timeFormats = [
  { value: "24h", label: "24 ساعة (14:30)" },
  { value: "12h", label: "12 ساعة (2:30 PM)" },
];

export default function SystemSettings() {
  const { toast } = useToast();
  const {
    countries,
    regions,
    cities,
    neighborhoods,
    addCountry,
    deleteCountry,
    addRegion,
    deleteRegion,
    addCity,
    deleteCity,
    addNeighborhood,
    deleteNeighborhood,
  } = useAddress();

  const [isLoading, setIsLoading] = useState(false);
  const logoInputRef = useRef(null);
  const [systemLogo, setSystemLogo] = useState(null);

  const [newCountry, setNewCountry] = useState({ name: "", nameEn: "" });
  const [newRegion, setNewRegion] = useState({
    name: "",
    nameEn: "",
    countryId: "",
  });
  const [newCity, setNewCity] = useState({
    name: "",
    nameEn: "",
    regionId: "",
  });
  const [newNeighborhood, setNewNeighborhood] = useState({
    name: "",
    nameEn: "",
    cityId: "",
  });

  // Transportation Methods State
  const [transportMethods, setTransportMethods] = useState([
    {
      id: 1,
      name: "شاحنة صغيرة",
      nameEn: "Small Truck",
      capacity: "1-5 طن",
      description: "للطلبات الصغيرة والمتوسطة",
    },
    {
      id: 2,
      name: "شاحنة متوسطة",
      nameEn: "Medium Truck",
      capacity: "5-15 طن",
      description: "للطلبات المتوسطة",
    },
    {
      id: 3,
      name: "شاحنة كبيرة",
      nameEn: "Large Truck",
      capacity: "15-25 طن",
      description: "للطلبات الكبيرة",
    },
    {
      id: 4,
      name: "مقطورة",
      nameEn: "Trailer",
      capacity: "25+ طن",
      description: "للطلبات الضخمة",
    },
    {
      id: 5,
      name: "دراجة نارية",
      nameEn: "Motorcycle",
      capacity: "أقل من 50 كجم",
      description: "للتوصيل السريع",
    },
  ]);
  const [newTransportMethod, setNewTransportMethod] = useState({
    name: "",
    nameEn: "",
    capacity: "",
    description: "",
  });

  const [systemSettings, setSystemSettings] = useState({
    // General Settings
    defaultLanguage: "ar",
    defaultCurrency: "SAR",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    timezone: "Asia/Riyadh",

    // VAT Settings
    vatEnabled: true,
    vatRate: 15,
    vatNumber: "",

    // Print & Invoice Settings
    invoiceTemplate: "standard",
    invoicePrefix: "INV-",
    receiptTemplate: "compact",
    autoPrint: false,

    // Email Settings (SMTP)
    smtpEnabled: false,
    smtpHost: "",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    smtpSecure: true,
    fromEmail: "",
    fromName: "",

    // SMS Settings
    smsEnabled: false,
    smsProvider: "twilio",
    smsApiKey: "",
    smsApiSecret: "",
    smsFromNumber: "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ إعدادات النظام بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ إعدادات النظام",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSystemLogo(e.target?.result);
        };
        reader.readAsDataURL(file);

        toast({
          title: "تم رفع الشعار",
          description: "تم رفع شعار النظام بنجاح",
        });
      } else {
        toast({
          title: "خطأ في الملف",
          description: "يرجى رفع ملف صورة صالح",
          variant: "destructive",
        });
      }
    }
  };

  const testEmailConnection = async () => {
    if (!systemSettings.smtpHost || !systemSettings.smtpUsername) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال إعدادات SMTP أولاً",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "جاري الاختبار...",
      description: "جاري اختبار اتصال البريد الإلكتروني",
    });

    // Simulate test
    setTimeout(() => {
      toast({
        title: "نجح الاختبار",
        description: "تم اختبار إعدادات البريد الإلكتروني بنجاح",
      });
    }, 2000);
  };

  const testSmsConnection = async () => {
    if (!systemSettings.smsApiKey) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال إعدادات SMS API أولاً",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "جاري الاختبار...",
      description: "جاري اختبار اتصال الرسائل النصية",
    });

    // Simulate test
    setTimeout(() => {
      toast({
        title: "نجح الاختبار",
        description: "تم اختبار إعدادات الرسائل النصية بنجاح",
      });
    }, 2000);
  };

  // Address Management Functions
  const handleAddCountry = () => {
    if (!newCountry.name.trim() || !newCountry.nameEn.trim()) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال اسم البلد باللغتين العربية والإنجليزية",
        variant: "destructive",
      });
      return;
    }

    addCountry(newCountry);
    setNewCountry({ name: "", nameEn: "" });

    toast({
      title: "تم الإضافة",
      description: "تم إضافة البلد بنجاح",
    });
  };

  const handleDeleteCountry = (id) => {
    deleteCountry(id);
    toast({
      title: "تم الحذف",
      description: "تم حذف البلد والمناطق والمدن والأحياء التابعة له",
    });
  };

  const handleAddRegion = () => {
    if (
      !newRegion.name.trim() ||
      !newRegion.nameEn.trim() ||
      !newRegion.countryId
    ) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    addRegion({ ...newRegion, countryId: parseInt(newRegion.countryId) });
    setNewRegion({ name: "", nameEn: "", countryId: "" });

    toast({
      title: "تم الإضافة",
      description: "تم إضافة المنطقة بنجاح",
    });
  };

  const handleDeleteRegion = (id) => {
    deleteRegion(id);
    toast({
      title: "تم الحذف",
      description: "تم حذف المنطقة والمدن والأحياء التابعة لها",
    });
  };

  const handleAddCity = () => {
    if (!newCity.name.trim() || !newCity.nameEn.trim() || !newCity.regionId) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    addCity({ ...newCity, regionId: parseInt(newCity.regionId) });
    setNewCity({ name: "", nameEn: "", regionId: "" });

    toast({
      title: "تم الإضافة",
      description: "تم إضافة المدينة بنجاح",
    });
  };

  const handleDeleteCity = (id) => {
    deleteCity(id);
    toast({
      title: "تم الحذف",
      description: "تم حذف المدينة والأحياء التابعة لها",
    });
  };

  const handleAddNeighborhood = () => {
    if (
      !newNeighborhood.name.trim() ||
      !newNeighborhood.nameEn.trim() ||
      !newNeighborhood.cityId
    ) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    addNeighborhood({
      ...newNeighborhood,
      cityId: parseInt(newNeighborhood.cityId),
    });
    setNewNeighborhood({ name: "", nameEn: "", cityId: "" });

    toast({
      title: "تم الإضافة",
      description: "تم إضافة الحي بنجاح",
    });
  };

  const handleDeleteNeighborhood = (id) => {
    deleteNeighborhood(id);
    toast({
      title: "تم الحذف",
      description: "تم حذف الحي بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إعدادات النظام</h1>
          <p className="text-muted-foreground">
            إعداد البلدان والمدن والمناطق والأحياء ووسائل النقل في النظام
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="gap-2">
          <Save className="w-4 h-4" />
          {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>

      <div className="w-full">
        <div className="space-y-6">
          {/* Address Management Section */}
          <Card className="shadow-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                إدارة العناوين
              </CardTitle>
              <CardDescription>
                إعداد البلدان والمدن والمناطق والأحياء التي ستظهر في النظام
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Countries Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">البلدان</h3>
                </div>

                {/* Add New Country */}
                <div className="p-4 border rounded-lg bg-muted/20">
                  <h4 className="font-medium mb-3">إضافة بلد جديد</h4>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                      <Label>اسم البلد (عربي)</Label>
                      <Input
                        value={newCountry.name}
                        onChange={(e) =>
                          setNewCountry((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="المملكة العربية السعودية"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>اسم البلد (إنجليزي)</Label>
                      <Input
                        value={newCountry.nameEn}
                        onChange={(e) =>
                          setNewCountry((prev) => ({
                            ...prev,
                            nameEn: e.target.value,
                          }))
                        }
                        placeholder="Saudi Arabia"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={handleAddCountry}
                        className="w-full gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        إضافة البلد
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Countries List */}
                <div className="space-y-2">
                  {countries.map((country) => (
                    <div
                      key={country.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{country.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({country.nameEn})
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCountry(country.id)}
                        className="gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">المناطق</h3>
                </div>

                {/* Add New Region */}
                <div className="p-4 border rounded-lg bg-muted/20">
                  <h4 className="font-medium mb-3">إضافة منطقة جديدة</h4>
                  <div className="grid gap-3 md:grid-cols-4">
                    <div>
                      <Label>البلد</Label>
                      <Select
                        value={newRegion.countryId}
                        onValueChange={(value) =>
                          setNewRegion((prev) => ({
                            ...prev,
                            countryId: value,
                          }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="اختر البلد" />
                        </SelectTrigger>
                        <SelectContent>
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
                    <div>
                      <Label>اسم المنطقة (عربي)</Label>
                      <Input
                        value={newRegion.name}
                        onChange={(e) =>
                          setNewRegion((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="المنطقة الشرقية"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>اسم المنطقة (إنجليزي)</Label>
                      <Input
                        value={newRegion.nameEn}
                        onChange={(e) =>
                          setNewRegion((prev) => ({
                            ...prev,
                            nameEn: e.target.value,
                          }))
                        }
                        placeholder="Eastern Region"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={handleAddRegion}
                        className="w-full gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        إضافة المنطقة
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Regions List */}
                <div className="space-y-2">
                  {regions.map((region) => {
                    const country = countries.find(
                      (c) => c.id === region.countryId
                    );
                    return (
                      <div
                        key={region.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <span className="font-medium">{region.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({region.nameEn})
                          </span>
                          <span className="text-xs text-primary ml-3">
                            - {country?.name}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteRegion(region.id)}
                          className="gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cities Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">المدن</h3>
                </div>

                {/* Add New City */}
                <div className="p-4 border rounded-lg bg-muted/20">
                  <h4 className="font-medium mb-3">إضافة مدينة جديدة</h4>
                  <div className="grid gap-3 md:grid-cols-4">
                    <div>
                      <Label>المنطقة</Label>
                      <Select
                        value={newCity.regionId}
                        onValueChange={(value) =>
                          setNewCity((prev) => ({ ...prev, regionId: value }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="اختر المنطقة" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
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
                    <div>
                      <Label>اسم المدينة (عربي)</Label>
                      <Input
                        value={newCity.name}
                        onChange={(e) =>
                          setNewCity((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="الرياض"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>اسم المدينة (إنجليزي)</Label>
                      <Input
                        value={newCity.nameEn}
                        onChange={(e) =>
                          setNewCity((prev) => ({
                            ...prev,
                            nameEn: e.target.value,
                          }))
                        }
                        placeholder="Riyadh"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleAddCity} className="w-full gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة المدينة
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Cities List */}
                <div className="space-y-2">
                  {cities.map((city) => {
                    const region = regions.find((r) => r.id === city.regionId);
                    const country = countries.find(
                      (c) => c.id === region?.countryId
                    );
                    return (
                      <div
                        key={city.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <span className="font-medium">{city.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({city.nameEn})
                          </span>
                          <span className="text-xs text-primary ml-3">
                            - {region?.name}, {country?.name}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCity(city.id)}
                          className="gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Neighborhoods Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">الأحياء</h3>
                </div>

                {/* Add New Neighborhood */}
                <div className="p-4 border rounded-lg bg-muted/20">
                  <h4 className="font-medium mb-3">إضافة حي جديد</h4>
                  <div className="grid gap-3 md:grid-cols-4">
                    <div>
                      <Label>المدينة</Label>
                      <Select
                        value={newNeighborhood.cityId}
                        onValueChange={(value) =>
                          setNewNeighborhood((prev) => ({
                            ...prev,
                            cityId: value,
                          }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem
                              key={city.id}
                              value={city.id.toString()}
                            >
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>اسم الحي (عربي)</Label>
                      <Input
                        value={newNeighborhood.name}
                        onChange={(e) =>
                          setNewNeighborhood((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="حي الدبلوماسيين"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>اسم الحي (إنجليزي)</Label>
                      <Input
                        value={newNeighborhood.nameEn}
                        onChange={(e) =>
                          setNewNeighborhood((prev) => ({
                            ...prev,
                            nameEn: e.target.value,
                          }))
                        }
                        placeholder="Diplomatic Quarter"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={handleAddNeighborhood}
                        className="w-full gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        إضافة الحي
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Neighborhoods List */}
                <div className="space-y-2">
                  {neighborhoods.map((neighborhood) => {
                    const city = cities.find(
                      (c) => c.id === neighborhood.cityId
                    );
                    const region = regions.find((r) => r.id === city?.regionId);
                    const country = countries.find(
                      (c) => c.id === region?.countryId
                    );
                    return (
                      <div
                        key={neighborhood.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <span className="font-medium">
                            {neighborhood.name}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({neighborhood.nameEn})
                          </span>
                          <span className="text-xs text-primary ml-3">
                            - {city?.name}, {region?.name}, {country?.name}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDeleteNeighborhood(neighborhood.id)
                          }
                          className="gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
