import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, MoreHorizontal, Eye, Edit, Truck, Package, Clock, CheckCircle, XCircle, MapPin } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ActiveOrders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const activeOrders = [
    {
      id: "ORD-2024-001",
      clientName: "سوبر ماركت الأندلس",
      clientType: "شركة",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-18",
      status: "قيد التحضير",
      totalAmount: "15,250",
      itemsCount: 12,
      location: "الرياض - حي النزهة",
      priority: "عالية",
      carrier: "شركة النقل السريع"
    },
    {
      id: "ORD-2024-002",
      clientName: "أحمد محمد السليم",
      clientType: "فرد",
      orderDate: "2024-01-16",
      expectedDelivery: "2024-01-19",
      status: "في الطريق",
      totalAmount: "2,800",
      itemsCount: 5,
      location: "جدة - حي الصفا",
      priority: "متوسطة",
      carrier: "نقل المدينة"
    },
    {
      id: "ORD-2024-003",
      clientName: "مطعم الكبسة الملكية",
      clientType: "مؤسسة",
      orderDate: "2024-01-17",
      expectedDelivery: "2024-01-20",
      status: "تم التسليم",
      totalAmount: "8,900",
      itemsCount: 8,
      location: "الدمام - الكورنيش",
      priority: "منخفضة",
      carrier: "شركة الشرق للنقل"
    },
    {
      id: "ORD-2024-004",
      clientName: "مجمع الأسواق التجاري",
      clientType: "شركة",
      orderDate: "2024-01-18",
      expectedDelivery: "2024-01-21",
      status: "قيد المراجعة",
      totalAmount: "22,500",
      itemsCount: 20,
      location: "المدينة المنورة - العوالي",
      priority: "عالية",
      carrier: "نقل المدينة المنورة"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "قيد التحضير": return "bg-blue-100 text-blue-800";
      case "في الطريق": return "bg-yellow-100 text-yellow-800";
      case "تم التسليم": return "bg-green-100 text-green-800";
      case "قيد المراجعة": return "bg-gray-100 text-gray-800";
      case "متأخر": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "عالية": return "bg-red-100 text-red-800";
      case "متوسطة": return "bg-yellow-100 text-yellow-800";
      case "منخفضة": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "قيد التحضير": return <Package className="w-4 h-4" />;
      case "في الطريق": return <Truck className="w-4 h-4" />;
      case "تم التسليم": return <CheckCircle className="w-4 h-4" />;
      case "قيد المراجعة": return <Clock className="w-4 h-4" />;
      case "متأخر": return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = activeOrders.filter(order => {
    const matchesSearch = order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">الطلبات النشطة</h1>
          <p className="text-muted-foreground">متابعة وإدارة جميع الطلبات النشطة للمشترين</p>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              قيد التحضير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">طلبات</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Truck className="w-4 h-4 text-yellow-600" />
              في الطريق
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <p className="text-xs text-muted-foreground">طلبات</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              تم التسليم اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">طلبات</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              طلبات متأخرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">طلبات</p>
          </CardContent>
        </Card>
      </div>

      {/* جدول الطلبات */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة الطلبات النشطة</CardTitle>
              <CardDescription>عرض وإدارة جميع الطلبات النشطة</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="البحث في الطلبات..." 
                  className="pr-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="حالة الطلب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="قيد التحضير">قيد التحضير</SelectItem>
                  <SelectItem value="في الطريق">في الطريق</SelectItem>
                  <SelectItem value="تم التسليم">تم التسليم</SelectItem>
                  <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                </SelectContent>
              </Select>
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
                <TableHead className="text-right">اسم المشتري</TableHead>
                <TableHead className="text-right">نوع العميل</TableHead>
                <TableHead className="text-right">تاريخ الطلب</TableHead>
                <TableHead className="text-right">التسليم المتوقع</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الأولوية</TableHead>
                <TableHead className="text-right">المبلغ الإجمالي</TableHead>
                <TableHead className="text-right">عدد المنتجات</TableHead>
                <TableHead className="text-right">شركة النقل</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order, index) => (
                <TableRow key={order.id} className="hover:bg-muted/50 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TableCell className="font-medium font-mono">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.clientName}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {order.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{order.clientType}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.expectedDelivery}</TableCell>
                  <TableCell>
                    <Badge className={`gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{order.totalAmount} ر.س</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{order.itemsCount} منتج</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{order.carrier}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover-scale">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" />
                          تعديل الطلب
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Truck className="w-4 h-4" />
                          تتبع الشحنة
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

export default ActiveOrders;