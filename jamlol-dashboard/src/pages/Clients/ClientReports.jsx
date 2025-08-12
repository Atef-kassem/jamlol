import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Calendar, Download, Filter, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClientReports = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [reportType, setReportType] = useState("overview");

  // بيانات تجريبية للتقارير
  const overviewData = {
    totalClients: 1247,
    activeClients: 986,
    newClientsThisMonth: 89,
    clientGrowthRate: 12.5,
    totalOrders: 2156,
    ordersGrowthRate: 8.3,
    totalRevenue: 2800000,
    revenueGrowthRate: 15.7,
    avgOrderValue: 1298
  };

  const topClients = [
    {
      name: "سوبر ماركت الأندلس",
      type: "شركة",
      orders: 156,
      revenue: "125,400",
      growth: "+23%",
      location: "الرياض"
    },
    {
      name: "مجمع الأسواق التجاري",
      type: "شركة", 
      orders: 134,
      revenue: "98,700",
      growth: "+18%",
      location: "جدة"
    },
    {
      name: "مطعم الكبسة الملكية",
      type: "مؤسسة",
      orders: 89,
      revenue: "76,200",
      growth: "+12%",
      location: "الدمام"
    },
    {
      name: "أحمد محمد السليم",
      type: "فرد",
      orders: 67,
      revenue: "45,800",
      growth: "+8%",
      location: "المدينة المنورة"
    }
  ];

  const clientsByType = [
    { type: "شركات", count: 456, percentage: 36.6, revenue: "1,680,000" },
    { type: "أفراد", count: 523, percentage: 41.9, revenue: "785,000" },
    { type: "مؤسسات", count: 268, percentage: 21.5, revenue: "335,000" }
  ];

  const monthlyData = [
    { month: "يناير", clients: 89, orders: 156, revenue: "245,000" },
    { month: "فبراير", clients: 112, orders: 198, revenue: "312,000" },
    { month: "مارس", clients: 134, orders: 234, revenue: "378,000" },
    { month: "أبريل", clients: 98, orders: 187, revenue: "289,000" },
    { month: "مايو", clients: 156, orders: 267, revenue: "425,000" },
    { month: "يونيو", clients: 178, orders: 289, revenue: "467,000" }
  ];

  const exportReport = () => {
    const reportData = {
      timeRange,
      reportType,
      generatedAt: new Date().toISOString(),
      data: overviewData
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير_المشترين_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">تقارير المشترين</h1>
          <p className="text-muted-foreground">تقارير وإحصائيات شاملة عن المشترين والعملاء</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="quarter">هذا الربع</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport} className="gap-2">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="segmentation">التصنيف</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* إحصائيات عامة */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  إجمالي المشترين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{overviewData.totalClients.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  +{overviewData.clientGrowthRate}% من الشهر الماضي
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-green-600" />
                  إجمالي الطلبات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{overviewData.totalOrders.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  +{overviewData.ordersGrowthRate}% من الشهر الماضي
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  إجمالي الإيرادات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{(overviewData.totalRevenue / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  +{overviewData.revenueGrowthRate}% من الشهر الماضي
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">متوسط قيمة الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{overviewData.avgOrderValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">ريال سعودي</p>
              </CardContent>
            </Card>
          </div>

          {/* أفضل المشترين */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                أفضل المشترين
              </CardTitle>
              <CardDescription>المشترين الأكثر نشاطاً وإيراداً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.type} • {client.location}</div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-medium">{client.revenue} ر.س</div>
                      <div className="text-sm text-muted-foreground">{client.orders} طلب</div>
                      <Badge className="bg-green-100 text-green-800">{client.growth}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-6">
          {/* تصنيف المشترين */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>تصنيف المشترين حسب النوع</CardTitle>
              <CardDescription>توزيع المشترين والإيرادات حسب نوع العميل</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientsByType.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{segment.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {segment.count} عميل ({segment.percentage}%)
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all duration-500" 
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>الإيرادات: {segment.revenue} ر.س</span>
                      <span>{segment.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* الاتجاهات الشهرية */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                الاتجاهات الشهرية
              </CardTitle>
              <CardDescription>نمو المشترين والطلبات والإيرادات خلال الأشهر الماضية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monthlyData.map((month, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">الشهر</div>
                      <div className="font-medium">{month.month}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">مشترين جدد</div>
                      <div className="font-medium text-blue-600">{month.clients}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">الطلبات</div>
                      <div className="font-medium text-green-600">{month.orders}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">الإيرادات</div>
                      <div className="font-medium text-purple-600">{month.revenue} ر.س</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* مؤشرات الأداء */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">معدل الاحتفاظ بالعملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">87.5%</div>
                <p className="text-xs text-muted-foreground">+2.3% من الشهر الماضي</p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">معدل تكرار الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">2.4</div>
                <p className="text-xs text-muted-foreground">طلب شهرياً للعميل</p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">رضا العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">4.6/5</div>
                <p className="text-xs text-muted-foreground">متوسط التقييم</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientReports;