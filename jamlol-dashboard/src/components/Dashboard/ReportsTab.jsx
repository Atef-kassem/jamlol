import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp, DollarSign, Users } from "lucide-react";

const ReportsTab = () => {
  const reports = [
    {
      id: 1,
      title: "تقرير المبيعات الشهري",
      description: "تقرير شامل عن المبيعات والإيرادات الشهرية",
      date: "يناير 2024",
      status: "جاهز",
      type: "مالي",
      icon: DollarSign
    },
    {
      id: 2,
      title: "تقرير أداء الفروع",
      description: "مقارنة أداء جميع الفروع والمؤشرات التشغيلية",
      date: "الأسبوع الماضي",
      status: "قيد المعالجة",
      type: "تشغيلي",
      icon: TrendingUp
    },
    {
      id: 3,
      title: "تقرير رضا العملاء",
      description: "استبيان رضا العملاء وتقييمات الخدمة",
      date: "ديسمبر 2023",
      status: "جاهز",
      type: "خدمة العملاء",
      icon: Users
    },
    {
      id: 4,
      title: "تقرير الطلبات اليومي",
      description: "ملخص الطلبات والحجوزات لليوم الحالي",
      date: "اليوم",
      status: "جاهز",
      type: "عمليات",
      icon: Calendar
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "جاهز": return "bg-green-100 text-green-800";
      case "قيد المعالجة": return "bg-yellow-100 text-yellow-800";
      case "خطأ": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "مالي": return "bg-blue-100 text-blue-800";
      case "تشغيلي": return "bg-purple-100 text-purple-800";
      case "خدمة العملاء": return "bg-green-100 text-green-800";
      case "عمليات": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات التقارير */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">24</p>
                <p className="text-sm font-medium text-foreground">تقارير متاحة</p>
              </div>
              <FileText className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-green-500/5 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">18</p>
                <p className="text-sm font-medium text-foreground">تقارير جاهزة</p>
              </div>
              <Download className="w-8 h-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-yellow-500/5 border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">4</p>
                <p className="text-sm font-medium text-foreground">قيد المعالجة</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-blue-500/5 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">2</p>
                <p className="text-sm font-medium text-foreground">تقارير مجدولة</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة التقارير */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            التقارير المتاحة
          </CardTitle>
          <CardDescription>
            عرض وتحميل جميع التقارير المتاحة في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <report.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === "جاهز" && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      تحميل
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="gap-2">
                    <FileText className="w-4 h-4" />
                    عرض
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;