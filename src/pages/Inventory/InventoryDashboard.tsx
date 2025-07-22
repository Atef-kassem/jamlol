import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus, Eye, BarChart3 } from "lucide-react";

const InventoryDashboard = () => {
  const inventoryStats = [
    {
      title: "عدد المستودعات",
      value: "5",
      description: "4 نشطة، 1 مغلق",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "إجمالي الأصناف",
      value: "347",
      description: "منتجات نشطة",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "الأصناف الحرجة",
      value: "12",
      description: "وصلت للحد الأدنى",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "الحركات اليوم",
      value: "28",
      description: "إضافة وصرف",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const criticalItems = [
    { name: "زيت محرك شل 5W-30", currentStock: 5, minStock: 10, unit: "لتر" },
    { name: "صابون مركز", currentStock: 2, minStock: 8, unit: "عبوة" },
    { name: "فوطة ميكروفايبر", currentStock: 15, minStock: 20, unit: "قطعة" },
    { name: "ملمع زجاج", currentStock: 3, minStock: 12, unit: "عبوة" }
  ];

  const recentTransactions = [
    { type: "استلام", item: "زيت توتال", quantity: 50, user: "أحمد العتيبي", time: "منذ ساعتين" },
    { type: "صرف", item: "صابون غسيل", quantity: 10, user: "محمد الشهري", time: "منذ 3 ساعات" },
    { type: "تحويل", item: "فوطة قطنية", quantity: 25, user: "سارة الحربي", time: "منذ 4 ساعات" },
  ];

  return (
    <div className="space-y-6">
      {/* العنوان والإجراءات السريعة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">لوحة تحكم المخزون</h1>
          <p className="text-muted-foreground mt-2">نظرة شاملة على حالة المخازن والأصناف</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            التقارير
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة حركة
          </Button>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-soft transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الأصناف الحرجة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              الأصناف الحرجة
            </CardTitle>
            <CardDescription>أصناف وصلت للحد الأدنى أو أقل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-red-50 border border-red-200">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      الحد الأدنى: {item.minStock} {item.unit}
                    </p>
                  </div>
                  <div className="text-left">
                    <Badge variant="destructive" className="mb-1">
                      {item.currentStock} {item.unit}
                    </Badge>
                    <p className="text-xs text-red-600">
                      نقص {item.minStock - item.currentStock} {item.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 gap-2">
              <Eye className="w-4 h-4" />
              عرض جميع الأصناف الحرجة
            </Button>
          </CardContent>
        </Card>

        {/* آخر الحركات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              آخر الحركات المخزنية
            </CardTitle>
            <CardDescription>الحركات الأخيرة في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={transaction.type === "استلام" ? "default" : transaction.type === "صرف" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {transaction.type}
                      </Badge>
                      <span className="font-medium text-sm">{transaction.item}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      بواسطة: {transaction.user}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">{transaction.quantity}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 gap-2">
              <Eye className="w-4 h-4" />
              عرض جميع الحركات
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* روابط سريعة */}
      <Card>
        <CardHeader>
          <CardTitle>الإجراءات السريعة</CardTitle>
          <CardDescription>إجراءات مخزنية سريعة ومتكررة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Package className="w-6 h-6" />
              إضافة صنف جديد
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              تسجيل حركة
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              جرد مخزني
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Eye className="w-6 h-6" />
              تقرير مخزون
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryDashboard;