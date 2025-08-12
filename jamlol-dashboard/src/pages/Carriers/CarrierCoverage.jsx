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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  MapPin,
  Globe,
  Truck,
  Users,
  Edit,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAddress } from "@/contexts/AddressContext";

const mockCoverageData = [
  {
    id: "COV001",
    carrierId: "CAR001",
    carrierName: "شركة النقل السريع",
    region: "المنطقة الوسطى",
    cities: ["الرياض", "الخرج", "المزاحمية", "الدوادمي"],
    vehicleTypes: ["سيارة", "شاحنة صغيرة", "شاحنة كبيرة"],
    capacity: 150,
    serviceLevel: "ممتاز",
    responseTime: "30 دقيقة",
    status: "نشط",
    lastUpdated: "2024-01-15",
    notes: "تغطية شاملة للمنطقة الوسطى",
  },
  {
    id: "COV002",
    carrierId: "CAR002",
    carrierName: "ناقل المدينة",
    region: "المنطقة الغربية",
    cities: ["جدة", "مكة", "الطائف", "المدينة المنورة"],
    vehicleTypes: ["سيارة", "دراجة نارية"],
    capacity: 80,
    serviceLevel: "متقدم",
    responseTime: "45 دقيقة",
    status: "نشط",
    lastUpdated: "2024-01-10",
    notes: "تركيز على المدن الرئيسية",
  },
  {
    id: "COV003",
    carrierId: "CAR003",
    carrierName: "خدمات التوصيل المتقدمة",
    region: "المنطقة الشرقية",
    cities: ["الدمام", "الخبر", "الظهران", "القطيف"],
    vehicleTypes: ["سيارة", "شاحنة صغيرة"],
    capacity: 60,
    serviceLevel: "متوسط",
    responseTime: "60 دقيقة",
    status: "مؤقت",
    lastUpdated: "2024-01-08",
    notes: "تحت التطوير",
  },
];

const CarrierCoverage = () => {
  const [coverageData, setCoverageData] = useState(mockCoverageData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [selectedCoverage, setSelectedCoverage] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const { toast } = useToast();
  const {
    countries,
    getRegionsByCountry,
    getCitiesByRegion,
    getNeighborhoodsByCity,
  } = useAddress();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  // Update regions when country changes
  useEffect(() => {
    if (selectedCountry) {
      const regions = getRegionsByCountry(selectedCountry);
      setRegions(regions);
      setSelectedRegion("");
      setSelectedCity("");
      setSelectedNeighborhood("");
      setCities([]);
      setNeighborhoods([]);
    } else {
      setRegions([]);
      setCities([]);
      setNeighborhoods([]);
    }
  }, [selectedCountry, getRegionsByCountry]);

  // Update cities when region changes
  useEffect(() => {
    if (selectedRegion) {
      const cities = getCitiesByRegion(selectedRegion);
      setCities(cities);
      setSelectedCity("");
      setSelectedNeighborhood("");
      setNeighborhoods([]);
    } else {
      setCities([]);
      setNeighborhoods([]);
    }
  }, [selectedRegion, getCitiesByRegion]);

  // Update neighborhoods when city changes
  useEffect(() => {
    if (selectedCity) {
      const neighborhoods = getNeighborhoodsByCity(selectedCity);
      setNeighborhoods(neighborhoods);
      setSelectedNeighborhood("");
    } else {
      setNeighborhoods([]);
    }
  }, [selectedCity, getNeighborhoodsByCity]);

  const filteredCoverage = coverageData.filter((coverage) => {
    const matchesSearch =
      coverage.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coverage.carrierId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coverage.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coverage.cities.some((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || coverage.status === statusFilter;
    const matchesRegion =
      regionFilter === "all" || coverage.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "نشط":
        return "bg-success text-success-foreground";
      case "غير نشط":
        return "bg-destructive text-destructive-foreground";
      case "مؤقت":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getServiceLevelColor = (level) => {
    switch (level) {
      case "ممتاز":
        return "bg-green-100 text-green-800";
      case "متقدم":
        return "bg-blue-100 text-blue-800";
      case "متوسط":
        return "bg-yellow-100 text-yellow-800";
      case "أساسي":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleAddCoverage = () => {
    toast({
      title: "تم إضافة المنطقة",
      description: "تم إضافة المنطقة المخدومة الجديدة بنجاح",
    });
    setIsAddDialogOpen(false);
    setSelectedCountry("");
    setSelectedRegion("");
    setSelectedCity("");
    setSelectedNeighborhood("");
  };

  const totalCoverage = coverageData.length;
  const activeCoverage = coverageData.filter((c) => c.status === "نشط").length;
  const totalCapacity = coverageData.reduce((sum, c) => sum + c.capacity, 0);
  const uniqueRegions = new Set(coverageData.map((c) => c.region)).size;

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            المناطق المخدومة
          </h1>
          <p className="text-muted-foreground">
            إدارة ومراقبة المناطق الجغرافية المخدومة بواسطة الناقلين
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة منطقة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة منطقة مخدومة جديدة</DialogTitle>
              <DialogDescription>
                أضف منطقة جغرافية جديدة لناقل معين
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carrier">الناقل</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الناقل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car001">شركة النقل السريع</SelectItem>
                      <SelectItem value="car002">ناقل المدينة</SelectItem>
                      <SelectItem value="car003">
                        خدمات التوصيل المتقدمة
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">الدولة</Label>
                  <Select
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدولة" />
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">المنطقة</Label>
                  <Select
                    value={selectedRegion}
                    onValueChange={setSelectedRegion}
                    disabled={!selectedCountry}
                  >
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <Label htmlFor="city">المدينة</Label>
                  <Select
                    value={selectedCity}
                    onValueChange={setSelectedCity}
                    disabled={!selectedRegion}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">الحي</Label>
                <Select
                  value={selectedNeighborhood}
                  onValueChange={setSelectedNeighborhood}
                  disabled={!selectedCity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحي" />
                  </SelectTrigger>
                  <SelectContent>
                    {neighborhoods.map((neighborhood) => (
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
              <div className="space-y-2">
                <Label htmlFor="additionalAreas">مناطق إضافية مخدومة</Label>
                <Textarea
                  id="additionalAreas"
                  placeholder="أدخل مناطق أو أحياء إضافية مفصولة بفاصلة (اختياري)"
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">السعة (طلب/يوم)</Label>
                  <Input id="capacity" type="number" placeholder="150" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responseTime">وقت الاستجابة</Label>
                  <Input id="responseTime" placeholder="30 دقيقة" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceLevel">مستوى الخدمة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مستوى الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">أساسي</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="advanced">متقدم</SelectItem>
                    <SelectItem value="excellent">ممتاز</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  placeholder="أدخل ملاحظات إضافية..."
                  className="min-h-[60px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCoverage}>
                حفظ المنطقة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات التغطية */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي المناطق
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCoverage}</div>
            <p className="text-xs text-muted-foreground">منطقة مخدومة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المناطق النشطة
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCoverage}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">
                +{Math.round((activeCoverage / totalCoverage) * 100)}%
              </span>{" "}
              من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              السعة الإجمالية
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity}</div>
            <p className="text-xs text-muted-foreground">طلب/يوم</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المناطق الجغرافية
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueRegions}</div>
            <p className="text-xs text-muted-foreground">منطقة إدارية</p>
          </CardContent>
        </Card>
      </div>

      {/* فلاتر البحث */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والفلترة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في الناقلين أو المناطق أو المدن..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="حالة الخدمة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="نشط">نشط</SelectItem>
                <SelectItem value="غير نشط">غير نشط</SelectItem>
                <SelectItem value="مؤقت">مؤقت</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="المنطقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المناطق</SelectItem>
                <SelectItem value="المنطقة الوسطى">المنطقة الوسطى</SelectItem>
                <SelectItem value="المنطقة الغربية">المنطقة الغربية</SelectItem>
                <SelectItem value="المنطقة الشرقية">المنطقة الشرقية</SelectItem>
                <SelectItem value="المنطقة الشمالية">
                  المنطقة الشمالية
                </SelectItem>
                <SelectItem value="المنطقة الجنوبية">
                  المنطقة الجنوبية
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* جدول المناطق المخدومة */}
      <Card>
        <CardHeader>
          <CardTitle>المناطق المخدومة</CardTitle>
          <CardDescription>
            عرض شامل للمناطق الجغرافية المخدومة من قبل الناقلين
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الناقل</TableHead>
                <TableHead>اسم الناقل</TableHead>
                <TableHead>المنطقة</TableHead>
                <TableHead>المدن المخدومة</TableHead>
                <TableHead>أنواع المركبات</TableHead>
                <TableHead>السعة</TableHead>
                <TableHead>مستوى الخدمة</TableHead>
                <TableHead>وقت الاستجابة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoverage.map((coverage) => (
                <TableRow key={coverage.id}>
                  <TableCell className="font-medium">
                    {coverage.carrierId}
                  </TableCell>
                  <TableCell>{coverage.carrierName}</TableCell>
                  <TableCell>{coverage.region}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {coverage.cities.slice(0, 2).map((city, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {city}
                        </Badge>
                      ))}
                      {coverage.cities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{coverage.cities.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {coverage.vehicleTypes.slice(0, 2).map((type, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {type}
                        </Badge>
                      ))}
                      {coverage.vehicleTypes.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{coverage.vehicleTypes.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{coverage.capacity} طلب/يوم</TableCell>
                  <TableCell>
                    <Badge
                      className={getServiceLevelColor(coverage.serviceLevel)}
                    >
                      {coverage.serviceLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{coverage.responseTime}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(coverage.status)}>
                      {coverage.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCoverage(coverage)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarrierCoverage;
