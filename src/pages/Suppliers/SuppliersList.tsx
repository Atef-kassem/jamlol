import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const SuppliersList = () => {
  const navigate = useNavigate();
  const suppliers = [
    {
      id: 1,
      name: "شركة الرياض للمواد الغذائية",
      type: "شركة",
      location: "الرياض",
      phone: "0112345678",
      status: "نشط",
      rating: 4.5,
      products: 125,
      orders: 89
    },
    {
      id: 2,
      name: "محمد أحمد التجاري",
      type: "فرد",
      location: "جدة",
      phone: "0125559876",
      status: "قيد المراجعة",
      rating: 4.2,
      products: 45,
      orders: 23
    },
    {
      id: 3,
      name: "مؤسسة النخيل للتمور",
      type: "مؤسسة",
      location: "المدينة المنورة",
      phone: "0148887654",
      status: "نشط",
      rating: 4.8,
      products: 78,
      orders: 156
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط": return "bg-green-100 text-green-800";
      case "قيد المراجعة": return "bg-yellow-100 text-yellow-800";
      case "متوقف": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">قائمة الموردين</h1>
          <p className="text-muted-foreground">إدارة وعرض جميع الموردين المسجلين في المنصة</p>
        </div>
        <Button 
          className="gap-2"
          onClick={() => navigate('/suppliers/add')}
        >
          <Plus className="w-4 h-4" />
          إضافة مورد جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الموردين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">248</div>
            <p className="text-xs text-muted-foreground">+12 هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">موردين نشطين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">186</div>
            <p className="text-xs text-muted-foreground">75% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">قيد المراجعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">34</div>
            <p className="text-xs text-muted-foreground">+8 جديد</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4.3</div>
            <p className="text-xs text-muted-foreground">من 5 نجوم</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة الموردين</CardTitle>
              <CardDescription>عرض وإدارة جميع الموردين المسجلين</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن مورد..." className="pr-10 w-64" />
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
                <TableHead className="text-right">اسم المورد</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">الموقع</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">التقييم</TableHead>
                <TableHead className="text-right">المنتجات</TableHead>
                <TableHead className="text-right">الطلبات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.type}</TableCell>
                  <TableCell>{supplier.location}</TableCell>
                  <TableCell className="font-mono">{supplier.phone}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(supplier.status)}>
                      {supplier.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>{supplier.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.products}</TableCell>
                  <TableCell>{supplier.orders}</TableCell>
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
                          حذف
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

export default SuppliersList;