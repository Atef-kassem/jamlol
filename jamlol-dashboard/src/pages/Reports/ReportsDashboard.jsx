import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Eye, FileText, TrendingUp, Package, Users, Building2, Truck, DollarSign, BarChart3, Clock, Settings2 } from "lucide-react";

const ReportsDashboard = () => {
  const [timeRange, setTimeRange] = useState("month");

  const dashboardStats = [
    {
      title: "إجمالي التقارير",
      value: "142",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      title: "التقارير المكتملة",
      value: "128",
      change: "+8%",
      trend: "up", 
      icon: BarChart3,
      color: "text-green-500"
    },
    {
      title: "قيد المعالجة",
      value: "14",
      change: "-3%",
      trend: "down",
      icon: Clock,
      color: "text-orange-500"
    },
    {
      title: "المجدولة",
      value: "23",
      change: "+5%",
      trend: "up",
      icon: Calendar,
      color: "text-purple-500"
    }
  ];

  const reportCategories = [
    {
      title: "تقارير المبيعات",
      description: "تحليل الأداء التجاري والمبيعات",
      count: "24",
      icon: TrendingUp,
      color: "bg-green-500",
      route: "/reports/sales"
    },
    {
      title: "تقارير المخزون", 
      description: "حالة المخزون وحركات البضائع",
      count: "31",
      icon: Package,
      color: "bg-blue-500",
      route: "/reports/inventory"
    },
    {
      title: "تقارير العملاء",
      description: "أداء وسلوك قاعدة العملاء",
      count: "18",
      icon: Users,
      color: "bg-purple-500", 
      route: "/reports/clients"
    },
    {
      title: "تقارير الموردين",
      description: "تقييم وأداء شبكة الموردين",
      count: "22",
      icon: Building2,
      color: "bg-orange-500",
      route: "/reports/suppliers"
    },
    {
      title: "تقارير الناقلين",
      description: "كفاءة وجودة خدمات النقل",
      count: "15",
      icon: Truck,
      color: "bg-red-500",
      route: "/reports/carriers"
    },
    {
      title: "التقارير المالية",
      description: "التحليلات والبيانات المالية",
      count: "32",
      icon: DollarSign,
      color: "bg-emerald-500",
      route: "/reports/financial"
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: "تقرير مبيعات شهري - ديسمبر 2024",
      type: "مبيعات",
      status: "مكتمل",
      date: "2024-12-28",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "تحليل مخزون المستودع الرئيسي",
      type: "مخزون", 
      status: "مكتمل",
      date: "2024-12-27",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "تقييم أداء العملاء الجدد",
      type: "عملاء",
      status: "قيد المعالجة",
      date: "2024-12-27",
      size: "0.9 MB"
    },
    {
      id: 4,
      title: "تقرير المدفوعات المعلقة",
      type: "مالي",
      status: "مكتمل", 
      date: "2024-12-26",
      size: "3.1 MB"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "قيد المعالجة":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "مجدول":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "مبيعات":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "مخزون":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "عملاء":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "مالي":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة التقارير</h1>
          <p className="text-muted-foreground mt-2">
            مركز شامل لإدارة ومراقبة جميع تقاريرك
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings2 className="h-4 w-4 ml-2" />
            إعدادات التقارير
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 ml-2" />
            تقرير جديد
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} من الشهر الماضي
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">فئات التقارير</TabsTrigger>
          <TabsTrigger value="recent">التقارير الحديثة</TabsTrigger>
          <TabsTrigger value="scheduled">المجدولة</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary">{category.count} تقرير</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    عرض التقارير
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التقارير الحديثة</CardTitle>
              <CardDescription>
                آخر التقارير المُنتجة والمعالجة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={getTypeColor(report.type)}
                          >
                            {report.type}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={getStatusColor(report.status)}
                          >
                            {report.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {report.date} • {report.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التقارير المجدولة</CardTitle>
              <CardDescription>
                التقارير المُقررة للتشغيل الآلي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد تقارير مجدولة</h3>
                <p className="text-muted-foreground mb-4">
                  يمكنك إعداد تقارير آلية للتشغيل في أوقات محددة
                </p>
                <Button>
                  <Calendar className="h-4 w-4 ml-2" />
                  إضافة تقرير مجدول
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsDashboard;