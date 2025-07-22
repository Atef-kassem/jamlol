import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, subMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  FileBarChart,
  TrendingUp,
  TrendingDown,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Users,
  Calendar as CalendarIcon,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Search,
  Eye,
  Printer,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for reports
const suppliersData = [
  {
    id: "1",
    name: "شركة الأولى للمواد الكيميائية",
    category: "مواد كيميائية",
    status: "نشط",
    rating: 4.5,
    totalOrders: 45,
    totalValue: 850000,
    totalPayments: 820000,
    remainingBalance: 30000,
    onTimeDelivery: 92,
    returns: 2,
    complaints: 1,
    contractsCount: 3,
    lastOrder: new Date(2024, 6, 15)
  },
  {
    id: "2",
    name: "مؤسسة النجاح لقطع الغيار",
    category: "قطع غيار",
    status: "تحت المراقبة",
    rating: 3.8,
    totalOrders: 28,
    totalValue: 420000,
    totalPayments: 400000,
    remainingBalance: 20000,
    onTimeDelivery: 78,
    returns: 5,
    complaints: 3,
    contractsCount: 1,
    lastOrder: new Date(2024, 5, 10)
  },
  {
    id: "3",
    name: "شركة التميز للزيوت",
    category: "زيوت ومواد تشحيم",
    status: "متميز",
    rating: 4.8,
    totalOrders: 52,
    totalValue: 750000,
    totalPayments: 750000,
    remainingBalance: 0,
    onTimeDelivery: 96,
    returns: 1,
    complaints: 0,
    contractsCount: 2,
    lastOrder: new Date(2024, 6, 20)
  },
  {
    id: "4",
    name: "مورد المعدات الصناعية",
    category: "معدات صناعية",
    status: "موقوف",
    rating: 2.5,
    totalOrders: 12,
    totalValue: 180000,
    totalPayments: 150000,
    remainingBalance: 30000,
    onTimeDelivery: 65,
    returns: 8,
    complaints: 6,
    contractsCount: 0,
    lastOrder: new Date(2024, 2, 5)
  }
];

const SupplierReports = () => {
  const { toast } = useToast();

  // Filter states
  const [dateFrom, setDateFrom] = useState<Date>(subMonths(new Date(), 6));
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  // Get filtered data
  const filteredSuppliers = suppliersData.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "الكل" || supplier.category === selectedCategory;
    const matchesStatus = selectedStatus === "الكل" || supplier.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate statistics
  const totalSuppliers = filteredSuppliers.length;
  const activeSuppliers = filteredSuppliers.filter(s => s.status === "نشط" || s.status === "متميز").length;
  const totalOrderValue = filteredSuppliers.reduce((sum, s) => sum + s.totalValue, 0);
  const averageRating = filteredSuppliers.reduce((sum, s) => sum + s.rating, 0) / totalSuppliers || 0;
  const averageOnTime = filteredSuppliers.reduce((sum, s) => sum + s.onTimeDelivery, 0) / totalSuppliers || 0;

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "متميز": return "bg-green-100 text-green-800";
      case "نشط": return "bg-blue-100 text-blue-800";
      case "تحت المراقبة": return "bg-yellow-100 text-yellow-800";
      case "موقوف": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get performance indicator
  const getPerformanceIndicator = (rating: number) => {
    if (rating >= 4.5) return { icon: TrendingUp, color: "text-green-600", label: "ممتاز" };
    if (rating >= 4.0) return { icon: TrendingUp, color: "text-blue-600", label: "جيد جداً" };
    if (rating >= 3.5) return { icon: RefreshCw, color: "text-yellow-600", label: "جيد" };
    if (rating >= 3.0) return { icon: TrendingDown, color: "text-orange-600", label: "مقبول" };
    return { icon: TrendingDown, color: "text-red-600", label: "ضعيف" };
  };

  // Export report
  const exportReport = (type: string) => {
    toast({
      title: "تم تصدير التقرير",
      description: `تم تصدير ${type} بنجاح`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            تقارير الموردين
          </h1>
          <p className="text-muted-foreground">تحليلات شاملة وتقارير ذكية لأداء الموردين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => exportReport("Excel")}>
            <Download className="w-4 h-4" />
            تصدير Excel
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => exportReport("PDF")}>
            <Printer className="w-4 h-4" />
            طباعة PDF
          </Button>
          <Button className="gap-2">
            <Mail className="w-4 h-4" />
            جدولة التقرير
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            فلاتر التقارير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label>من تاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateFrom, "yyyy-MM-dd")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={(date) => date && setDateFrom(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>إلى تاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateTo, "yyyy-MM-dd")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={(date) => date && setDateTo(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>التصنيف</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع التصنيفات</SelectItem>
                  <SelectItem value="مواد كيميائية">مواد كيميائية</SelectItem>
                  <SelectItem value="قطع غيار">قطع غيار</SelectItem>
                  <SelectItem value="زيوت ومواد تشحيم">زيوت ومواد تشحيم</SelectItem>
                  <SelectItem value="معدات صناعية">معدات صناعية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>الحالة</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الحالات</SelectItem>
                  <SelectItem value="متميز">متميز</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="تحت المراقبة">تحت المراقبة</SelectItem>
                  <SelectItem value="موقوف">موقوف</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>البحث</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="اسم المورد..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموردين</p>
                <p className="text-2xl font-bold">{totalSuppliers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">موردين نشطين</p>
                <p className="text-2xl font-bold">{activeSuppliers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المشتريات</p>
                <p className="text-2xl font-bold">{(totalOrderValue / 1000000).toFixed(1)}م</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">متوسط التقييم</p>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">الالتزام بالموعد</p>
                <p className="text-2xl font-bold">{averageOnTime.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-6 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="performance" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <BarChart3 className="w-4 h-4" />
            تقييم الأداء
          </TabsTrigger>
          <TabsTrigger 
            value="payments" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <DollarSign className="w-4 h-4" />
            المدفوعات
          </TabsTrigger>
          <TabsTrigger 
            value="orders" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Package className="w-4 h-4" />
            الطلبيات
          </TabsTrigger>
          <TabsTrigger 
            value="complaints" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <AlertTriangle className="w-4 h-4" />
            الشكاوى والمرتجعات
          </TabsTrigger>
          <TabsTrigger 
            value="analysis" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <PieChart className="w-4 h-4" />
            التحليل المتقدم
          </TabsTrigger>
          <TabsTrigger 
            value="risks" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <AlertTriangle className="w-4 h-4" />
            تقرير المخاطر
          </TabsTrigger>
        </TabsList>

        {/* تقييم الأداء */}
        <TabsContent value="performance">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                تقرير تقييم أداء الموردين
              </CardTitle>
              <CardDescription>مقارنة شاملة لأداء الموردين عبر معايير متعددة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSuppliers.map((supplier) => {
                  const performance = getPerformanceIndicator(supplier.rating);
                  const PerformanceIcon = performance.icon;
                  
                  return (
                    <div key={supplier.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{supplier.name}</h3>
                            <Badge className={getStatusColor(supplier.status)}>
                              {supplier.status}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <PerformanceIcon className={`w-4 h-4 ${performance.color}`} />
                              <span className={`text-sm font-medium ${performance.color}`}>
                                {performance.label}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{supplier.category}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>التقييم: {supplier.rating}/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span>الالتزام: {supplier.onTimeDelivery}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-green-500" />
                              <span>الطلبيات: {supplier.totalOrders}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span>القيمة: {(supplier.totalValue / 1000).toFixed(0)}k</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                              <span>الشكاوى: {supplier.complaints}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.round(supplier.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-lg font-bold">{supplier.rating}/5</p>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            تفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تقرير المدفوعات */}
        <TabsContent value="payments">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                تقرير المدفوعات للموردين
              </CardTitle>
              <CardDescription>تحليل الوضع المالي والمدفوعات المنجزة والمتبقية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSuppliers.map((supplier) => (
                  <div key={supplier.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">إجمالي الفواتير</p>
                            <p className="font-semibold text-blue-600">
                              {supplier.totalValue.toLocaleString()} ريال
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">إجمالي المدفوعات</p>
                            <p className="font-semibold text-green-600">
                              {supplier.totalPayments.toLocaleString()} ريال
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">الرصيد المتبقي</p>
                            <p className={`font-semibold ${supplier.remainingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {supplier.remainingBalance.toLocaleString()} ريال
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">نسبة السداد</p>
                            <p className="font-semibold">
                              {((supplier.totalPayments / supplier.totalValue) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {supplier.remainingBalance > 0 ? (
                          <Badge variant="destructive">مستحق</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">مسدد</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تقرير الطلبيات */}
        <TabsContent value="orders">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                تقرير التوريدات والطلبيات
              </CardTitle>
              <CardDescription>استعراض الكميات والمبالغ المنفذة لكل مورد</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSuppliers
                  .sort((a, b) => b.totalOrders - a.totalOrders)
                  .map((supplier, index) => (
                    <div key={supplier.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold">{supplier.name}</h3>
                            <p className="text-sm text-muted-foreground">{supplier.category}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground">عدد الطلبيات</p>
                            <p className="text-xl font-bold text-blue-600">{supplier.totalOrders}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">إجمالي القيمة</p>
                            <p className="text-xl font-bold text-green-600">
                              {(supplier.totalValue / 1000).toFixed(0)}k
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">آخر طلبية</p>
                            <p className="text-sm font-medium">
                              {format(supplier.lastOrder, "yyyy-MM-dd")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">متوسط الطلبية</p>
                            <p className="text-lg font-bold">
                              {(supplier.totalValue / supplier.totalOrders / 1000).toFixed(0)}k
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تقرير الشكاوى والمرتجعات */}
        <TabsContent value="complaints">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                تقرير الشكاوى والمرتجعات
              </CardTitle>
              <CardDescription>كشف الموردين ذوي الأداء الأقل ومعالجة المشاكل التكرارية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSuppliers
                  .sort((a, b) => (b.complaints + b.returns) - (a.complaints + a.returns))
                  .map((supplier) => {
                    const totalIssues = supplier.complaints + supplier.returns;
                    const returnRate = ((supplier.returns / supplier.totalOrders) * 100).toFixed(1);
                    const complaintRate = ((supplier.complaints / supplier.totalOrders) * 100).toFixed(1);
                    
                    return (
                      <div key={supplier.id} className={`p-4 border rounded-lg ${
                        totalIssues > 5 ? 'bg-red-50 border-red-200' : 
                        totalIssues > 2 ? 'bg-yellow-50 border-yellow-200' : 
                        'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{supplier.name}</h3>
                              {totalIssues > 5 && (
                                <Badge variant="destructive" className="gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  عالي المخاطر
                                </Badge>
                              )}
                              {totalIssues > 2 && totalIssues <= 5 && (
                                <Badge className="bg-yellow-100 text-yellow-800 gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  تحت المراقبة
                                </Badge>
                              )}
                              {totalIssues <= 2 && (
                                <Badge className="bg-green-100 text-green-800 gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  مستقر
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">عدد الشكاوى</p>
                                <p className="font-semibold text-red-600">{supplier.complaints}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">عدد المرتجعات</p>
                                <p className="font-semibold text-orange-600">{supplier.returns}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">نسبة المرتجعات</p>
                                <p className="font-semibold">{returnRate}%</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">نسبة الشكاوى</p>
                                <p className="font-semibold">{complaintRate}%</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-2xl font-bold text-red-600">{totalIssues}</p>
                            <p className="text-sm text-muted-foreground">إجمالي المشاكل</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التحليل المتقدم */}
        <TabsContent value="analysis">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    توزيع الموردين حسب الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>موردين متميزين (4.5+)</span>
                      <span className="font-bold text-green-600">
                        {filteredSuppliers.filter(s => s.rating >= 4.5).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>موردين جيدين (3.5-4.4)</span>
                      <span className="font-bold text-blue-600">
                        {filteredSuppliers.filter(s => s.rating >= 3.5 && s.rating < 4.5).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>موردين مقبولين (2.5-3.4)</span>
                      <span className="font-bold text-yellow-600">
                        {filteredSuppliers.filter(s => s.rating >= 2.5 && s.rating < 3.5).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>موردين ضعاف (أقل من 2.5)</span>
                      <span className="font-bold text-red-600">
                        {filteredSuppliers.filter(s => s.rating < 2.5).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-primary" />
                    الموردين الأعلى قيمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredSuppliers
                      .sort((a, b) => b.totalValue - a.totalValue)
                      .slice(0, 5)
                      .map((supplier, index) => (
                        <div key={supplier.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="font-medium">{supplier.name}</span>
                          </div>
                          <span className="font-bold text-green-600">
                            {(supplier.totalValue / 1000000).toFixed(1)}م ريال
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  تحليل الالتزام بالمواعيد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSuppliers
                    .sort((a, b) => b.onTimeDelivery - a.onTimeDelivery)
                    .map((supplier) => (
                      <div key={supplier.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{supplier.name}</span>
                          <span className="font-bold">{supplier.onTimeDelivery}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              supplier.onTimeDelivery >= 90 ? 'bg-green-600' :
                              supplier.onTimeDelivery >= 80 ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}
                            style={{ width: `${supplier.onTimeDelivery}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تقرير المخاطر */}
        <TabsContent value="risks">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                تقرير المخاطر والتنبيهات
              </CardTitle>
              <CardDescription>إنذار الإدارة حول موردين في قائمة سوداء أو تكرار مشاكل</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* موردين عالي المخاطر */}
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4">موردين عالي المخاطر</h3>
                  <div className="space-y-3">
                    {filteredSuppliers
                      .filter(s => s.rating < 3 || s.complaints > 3 || s.onTimeDelivery < 70)
                      .map((supplier) => (
                        <div key={supplier.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-red-800">{supplier.name}</h4>
                              <div className="flex flex-wrap gap-2">
                                {supplier.rating < 3 && (
                                  <Badge variant="destructive">تقييم منخفض ({supplier.rating})</Badge>
                                )}
                                {supplier.complaints > 3 && (
                                  <Badge variant="destructive">شكاوى عالية ({supplier.complaints})</Badge>
                                )}
                                {supplier.onTimeDelivery < 70 && (
                                  <Badge variant="destructive">تأخيرات متكررة ({supplier.onTimeDelivery}%)</Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">الإجراء المقترح</p>
                              <Badge className="bg-red-100 text-red-800">مراجعة فورية</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* موردين تحت المراقبة */}
                <div>
                  <h3 className="text-lg font-semibold text-yellow-600 mb-4">موردين تحت المراقبة</h3>
                  <div className="space-y-3">
                    {filteredSuppliers
                      .filter(s => s.status === "تحت المراقبة" || (s.rating >= 3 && s.rating < 3.5))
                      .map((supplier) => (
                        <div key={supplier.id} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-yellow-800">{supplier.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                تقييم: {supplier.rating} | الالتزام: {supplier.onTimeDelivery}%
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">الإجراء المقترح</p>
                              <Badge className="bg-yellow-100 text-yellow-800">متابعة دورية</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* موردين خاملين */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-4">موردين خاملين (لم يحدث تعامل لأكثر من 3 أشهر)</h3>
                  <div className="space-y-3">
                    {filteredSuppliers
                      .filter(s => {
                        const monthsAgo = new Date();
                        monthsAgo.setMonth(monthsAgo.getMonth() - 3);
                        return s.lastOrder < monthsAgo;
                      })
                      .map((supplier) => (
                        <div key={supplier.id} className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-gray-800">{supplier.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                آخر طلبية: {format(supplier.lastOrder, "yyyy-MM-dd")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">الإجراء المقترح</p>
                              <Badge variant="outline">مراجعة الحاجة</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierReports;