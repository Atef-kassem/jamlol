import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Calendar, Download, Filter } from "lucide-react";

const SalesReports = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [reportType, setReportType] = useState("overview");

  const salesMetrics = [
    {
      title: "إجمالي المبيعات",
      value: "2,847,650 ر.س",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "مقارنة بالفترة السابقة"
    },
    {
      title: "عدد الطلبات",
      value: "1,234",
      change: "+8.2%", 
      trend: "up",
      icon: ShoppingCart,
      description: "طلبات جديدة مكتملة"
    },
    {
      title: "متوسط قيمة الطلب",
      value: "2,308 ر.س",
      change: "+3.7%",
      trend: "up", 
      icon: TrendingUp,
      description: "متوسط قيمة كل طلب"
    },
    {
      title: "العملاء النشطون",
      value: "892",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      description: "عملاء قاموا بطلبات"
    }
  ];

  const topProducts = [
    { name: "هاتف ذكي X1", sales: "850,000 ر.س", units: "340", growth: "+15%" },
    { name: "جهاز كمبيوتر محمول Pro", sales: "720,000 ر.س", units: "240", growth: "+8%" },
    { name: "سماعات لاسلكية", sales: "450,000 ر.س", units: "900", growth: "+22%" },
    { name: "ساعة ذكية Sport", sales: "380,000 ر.س", units: "570", growth: "+5%" },
    { name: "كاميرا رقمية HD", sales: "320,000 ر.س", units: "160", growth: "-3%" }
  ];

  const salesTrends = [
    { period: "يناير", sales: 2100000, orders: 1050 },
    { period: "فبراير", sales: 2350000, orders: 1180 },
    { period: "مارس", sales: 2680000, orders: 1340 },
    { period: "أبريل", sales: 2420000, orders: 1210 },
    { period: "مايو", sales: 2780000, orders: 1390 },
    { period: "يونيو", sales: 2950000, orders: 1475 }
  ];

  const reports = [
    {
      id: 1,
      name: "تقرير المبيعات الشهري",
      type: "شهري",
      status: "مكتمل",
      generated: "2024-12-28",
      period: "ديسمبر 2024"
    },
    {
      id: 2,
      name: "تحليل أداء المنتجات",
      type: "تحليلي",
      status: "مكتمل", 
      generated: "2024-12-27",
      period: "Q4 2024"
    },
    {
      id: 3,
      name: "تقرير المبيعات الأسبوعي",
      type: "أسبوعي",
      status: "قيد الإنتاج",
      generated: "2024-12-29",
      period: "الأسبوع 52"
    }
  ];

  const exportReport = () => {
    console.log("تصدير التقرير...");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">تقارير المبيعات</h1>
          <p className="text-muted-foreground mt-2">
            تحليل شامل لأداء المبيعات والاتجاهات التجارية
          </p>
        </div>
        <div className="flex items-center gap-3">
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
          <Button onClick={exportReport}>
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* مؤشرات الأداء الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.description}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <metric.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="products">أداء المنتجات</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أفضل المنتجات مبيعاً</CardTitle>
                <CardDescription>المنتجات الأكثر نجاحاً في المبيعات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.units} وحدة • {product.sales}
                        </p>
                      </div>
                      <Badge variant={product.growth.startsWith('+') ? 'default' : 'destructive'}>
                        {product.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الاتجاه الشهري للمبيعات</CardTitle>
                <CardDescription>تطور المبيعات خلال الأشهر الماضية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{trend.period}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">{(trend.sales / 1000000).toFixed(1)}M ر.س</span>
                        <span className="text-sm text-muted-foreground">{trend.orders} طلب</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل أداء المنتجات</CardTitle>
              <CardDescription>تفاصيل شاملة عن أداء كل منتج</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">تحليل تفصيلي للمنتجات</h3>
                <p className="text-muted-foreground">
                  عرض مفصل لأداء كل منتج مع الرسوم البيانية والمقارنات
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اتجاهات المبيعات</CardTitle>
              <CardDescription>تحليل الاتجاهات والتنبؤات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">تحليل الاتجاهات</h3>
                <p className="text-muted-foreground">
                  رسوم بيانية تفاعلية تُظهر اتجاهات المبيعات والتنبؤات المستقبلية
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تقارير المبيعات المتاحة</CardTitle>
              <CardDescription>جميع تقارير المبيعات المُنتجة والمتاحة للتحميل</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge variant={report.status === 'مكتمل' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {report.generated} • {report.period}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesReports;