import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt, PieChart, Download, Calculator } from "lucide-react";

const FinancialReports = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [reportType, setReportType] = useState("overview");

  const financialMetrics = [
    {
      title: "إجمالي الإيرادات",
      value: "4,847,230 ر.س",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      description: "مقارنة بالفترة السابقة"
    },
    {
      title: "صافي الربح",
      value: "1,234,560 ر.س",
      change: "+8.7%",
      trend: "up",
      icon: TrendingUp,
      description: "بعد خصم المصروفات"
    },
    {
      title: "إجمالي المصروفات",
      value: "3,612,670 ر.س",
      change: "+12.1%",
      trend: "up",
      icon: Receipt,
      description: "التكاليف التشغيلية والإدارية"
    },
    {
      title: "الديون المستحقة",
      value: "567,890 ر.س",
      change: "-5.2%",
      trend: "down",
      icon: CreditCard,
      description: "مبالغ مستحقة من العملاء"
    }
  ];

  const revenueByCategory = [
    { category: "مبيعات المنتجات", amount: "2,850,000 ر.س", percentage: "58.8%", change: "+12%" },
    { category: "خدمات النقل", amount: "1,245,000 ر.س", percentage: "25.7%", change: "+18%" },
    { category: "رسوم الصيانة", amount: "452,000 ر.س", percentage: "9.3%", change: "+5%" },
    { category: "عمولات", amount: "300,230 ر.س", percentage: "6.2%", change: "+22%" }
  ];

  const expensesByCategory = [
    { category: "تكلفة البضائع", amount: "1,850,000 ر.س", percentage: "51.2%", change: "+10%" },
    { category: "رواتب الموظفين", amount: "780,000 ر.س", percentage: "21.6%", change: "+8%" },
    { category: "التشغيل والصيانة", amount: "456,000 ر.س", percentage: "12.6%", change: "+15%" },
    { category: "التسويق والإعلان", amount: "234,000 ر.س", percentage: "6.5%", change: "+25%" },
    { category: "مصروفات إدارية", amount: "292,670 ر.س", percentage: "8.1%", change: "+5%" }
  ];

  const cashFlow = [
    { month: "يناير", inflow: 2100000, outflow: 1850000, net: 250000 },
    { month: "فبراير", inflow: 2350000, outflow: 2100000, net: 250000 },
    { month: "مارس", inflow: 2680000, outflow: 2200000, net: 480000 },
    { month: "أبريل", inflow: 2420000, outflow: 2050000, net: 370000 },
    { month: "مايو", inflow: 2780000, outflow: 2300000, net: 480000 },
    { month: "يونيو", inflow: 2950000, outflow: 2400000, net: 550000 }
  ];

  const outstandingPayments = [
    { client: "شركة الإنشاءات الحديثة", amount: "125,000 ر.س", dueDate: "2024-12-30", days: 2 },
    { client: "مؤسسة التجارة العامة", amount: "89,500 ر.س", dueDate: "2025-01-05", days: 8 },
    { client: "شركة النقل السريع", amount: "156,000 ر.س", dueDate: "2025-01-10", days: 13 },
    { client: "مجموعة الصناعات", amount: "67,890 ر.س", dueDate: "2025-01-15", days: 18 },
    { client: "شركة الخدمات اللوجستية", amount: "129,500 ر.س", dueDate: "2025-01-20", days: 23 }
  ];

  const profitLossStatement = [
    { item: "إجمالي الإيرادات", amount: 4847230, type: "revenue" },
    { item: "تكلفة البضائع المباعة", amount: -1850000, type: "expense" },
    { item: "إجمالي الربح", amount: 2997230, type: "gross" },
    { item: "مصروفات التشغيل", amount: -1762670, type: "expense" },
    { item: "صافي الربح", amount: 1234560, type: "net" }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDaysColor = (days) => {
    if (days <= 7) return "text-green-600";
    if (days <= 30) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">التقارير المالية</h1>
          <p className="text-muted-foreground mt-2">
            تحليل شامل للوضع المالي والأداء الاقتصادي
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="quarter">هذا الربع</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
              <SelectItem value="custom">فترة مخصصة</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* المؤشرات المالية الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => (
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
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <metric.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
          <TabsTrigger value="expenses">المصروفات</TabsTrigger>
          <TabsTrigger value="cashflow">التدفق النقدي</TabsTrigger>
          <TabsTrigger value="receivables">الديون</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>قائمة الدخل المبسطة</CardTitle>
                <CardDescription>ملخص الأرباح والخسائر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profitLossStatement.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{item.item}</span>
                      <span className={`font-bold ${
                        item.type === 'revenue' || item.type === 'gross' || item.type === 'net' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {item.amount > 0 ? '+' : ''}{formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التدفق النقدي الشهري</CardTitle>
                <CardDescription>حركة النقد الداخل والخارج</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cashFlow.map((flow, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{flow.month}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-600">+{(flow.inflow / 1000000).toFixed(1)}M</span>
                        <span className="text-red-600">-{(flow.outflow / 1000000).toFixed(1)}M</span>
                        <span className={`font-medium ${flow.net > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {flow.net > 0 ? '+' : ''}{(flow.net / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الإيرادات حسب الفئة</CardTitle>
              <CardDescription>توزيع الإيرادات على مصادر الدخل المختلفة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{category.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.percentage} من إجمالي الإيرادات
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{category.amount}</p>
                      <Badge variant="outline" className="text-green-600">
                        {category.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل المصروفات حسب الفئة</CardTitle>
              <CardDescription>توزيع المصروفات على بنود التكلفة المختلفة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expensesByCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{category.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.percentage} من إجمالي المصروفات
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">{category.amount}</p>
                      <Badge variant="outline" className="text-red-600">
                        {category.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل التدفق النقدي</CardTitle>
              <CardDescription>تحليل مفصل لحركة النقد خلال الفترة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">تحليل التدفق النقدي</h3>
                <p className="text-muted-foreground">
                  رسم بياني تفاعلي يُظهر تفاصيل التدفقات النقدية الداخلة والخارجة
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receivables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المدفوعات المستحقة</CardTitle>
              <CardDescription>الديون المستحقة من العملاء ومواعيد استحقاقها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outstandingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{payment.client}</h4>
                      <p className="text-sm text-muted-foreground">
                        تاريخ الاستحقاق: {payment.dueDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{payment.amount}</p>
                      <p className={`text-sm ${getDaysColor(payment.days)}`}>
                        {payment.days} يوم متبقي
                      </p>
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

export default FinancialReports;