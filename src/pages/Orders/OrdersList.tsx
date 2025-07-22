import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, Package } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const OrdersList = () => {
  const orders = [
    {
      id: "ORD-001",
      client: "سوبر ماركت الأندلس",
      supplier: "شركة الرياض للمواد الغذائية", 
      carrier: "شركة الوطنية للنقل",
      products: 12,
      total: "4,250",
      status: "مكتمل",
      date: "2024-01-15",
      deliveryDate: "2024-01-16"
    },
    {
      id: "ORD-002", 
      client: "أحمد محمد السليم",
      supplier: "مؤسسة النخيل للتمور",
      carrier: "محمد علي النقليات",
      products: 3,
      total: "890",
      status: "قيد التوصيل",
      date: "2024-01-14",
      deliveryDate: "2024-01-15"
    },
    {
      id: "ORD-003",
      client: "مطعم الكبسة الملكية",
      supplier: "شركة الرياض للمواد الغذائية",
      carrier: "-",
      products: 8,
      total: "2,650",
      status: "بانتظار ناقل",
      date: "2024-01-14",
      deliveryDate: "-"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل": return "bg-green-100 text-green-800";
      case "قيد التوصيل": return "bg-blue-100 text-blue-800";
      case "بانتظار ناقل": return "bg-yellow-100 text-yellow-800";
      case "مُلغى": return "bg-red-100 text-red-800";
      case "قيد المراجعة": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">قائمة الطلبات</h1>
          <p className="text-muted-foreground">إدارة ومتابعة جميع الطلبات في المنصة</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة طلب جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3,456</div>
            <p className="text-xs text-muted-foreground">+234 هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">طلبات مكتملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2,897</div>
            <p className="text-xs text-muted-foreground">84% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">قيد التوصيل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">324</div>
            <p className="text-xs text-muted-foreground">9% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">بانتظار ناقل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">156</div>
            <p className="text-xs text-muted-foreground">5% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8.9M</div>
            <p className="text-xs text-muted-foreground">ريال سعودي</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة الطلبات</CardTitle>
              <CardDescription>عرض ومتابعة جميع الطلبات</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن طلب..." className="pr-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم الطلب</TableHead>
                <TableHead className="text-right">المشتري</TableHead>
                <TableHead className="text-right">المورد</TableHead>
                <TableHead className="text-right">الناقل</TableHead>
                <TableHead className="text-right">عدد المنتجات</TableHead>
                <TableHead className="text-right">المبلغ الإجمالي</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">تاريخ الطلب</TableHead>
                <TableHead className="text-right">تاريخ التوصيل</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-medium">{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.carrier}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {order.products}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{order.total} ر.س</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          إلغاء الطلب
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default OrdersList;