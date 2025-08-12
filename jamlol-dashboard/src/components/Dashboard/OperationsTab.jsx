import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertTriangle, Target } from "lucide-react";

const OperationsTab = () => {
  // بيانات الجدول التفصيلي
  const detailedStats = [
    {
      branch: 'فرع الرياض',
      cars: 76000,
      completed: 150000,
      active: 25000,
      revenue: 154
    },
    {
      branch: 'فرع جدة', 
      cars: 45000,
      completed: 126000,
      active: 18000,
      revenue: 98
    },
    {
      branch: 'فرع الدمام',
      cars: 30000,
      completed: 96000,
      active: 15000,
      revenue: 72
    }
  ];

  const operationalMetrics = [
    {
      metric: "كفاءة التشغيل",
      value: 87,
      target: 90,
      status: "جيد",
      icon: Target
    },
    {
      metric: "معدل إنجاز الطلبات",
      value: 94,
      target: 95,
      status: "ممتاز",
      icon: CheckCircle
    },
    {
      metric: "وقت الاستجابة المتوسط",
      value: 73,
      target: 80,
      status: "يحتاج تحسين",
      icon: Clock
    },
    {
      metric: "رضا العملاء",
      value: 91,
      target: 85,
      status: "ممتاز",
      icon: AlertTriangle
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "ممتاز": return "bg-green-100 text-green-800";
      case "جيد": return "bg-blue-100 text-blue-800";
      case "يحتاج تحسين": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (value, target) => {
    const percentage = (value / target) * 100;
    if (percentage >= 95) return "bg-green-500";
    if (percentage >= 80) return "bg-blue-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* مؤشرات الأداء التشغيلي */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {operationalMetrics.map((metric, index) => (
          <Card key={index} className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{metric.metric}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{metric.value}%</span>
                    <span>الهدف: {metric.target}%</span>
                  </div>
                </div>
                <Progress 
                  value={(metric.value / metric.target) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* جدول العمليات التفصيلي */}
      <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Target className="w-4 h-4 text-primary" />
            </div>
            تفاصيل العمليات حسب الفرع
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            إحصائيات مفصلة لجميع الفروع التشغيلية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الفرع</TableHead>
                  <TableHead className="text-right">إجمالي السيارات</TableHead>
                  <TableHead className="text-right">الطلبات المكتملة</TableHead>
                  <TableHead className="text-right">الطلبات النشطة</TableHead>
                  <TableHead className="text-right">الإيرادات (ألف ر.س)</TableHead>
                  <TableHead className="text-right">معدل الإنجاز</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailedStats.map((stat) => (
                  <TableRow key={stat.branch} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{stat.branch}</TableCell>
                    <TableCell className="font-mono">{stat.cars.toLocaleString()}</TableCell>
                    <TableCell className="font-mono text-green-600">{stat.completed.toLocaleString()}</TableCell>
                    <TableCell className="font-mono text-blue-600">{stat.active.toLocaleString()}</TableCell>
                    <TableCell className="font-mono font-bold text-primary">{stat.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(stat.completed / (stat.completed + stat.active)) * 100} 
                          className="h-2 flex-1"
                        />
                        <span className="text-xs font-medium min-w-[40px]">
                          {Math.round((stat.completed / (stat.completed + stat.active)) * 100)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsTab;