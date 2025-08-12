import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, Car } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const CarriersList = () => {
  const navigate = useNavigate();
  const carriers = [
    {
      id: 1,
      name: "شركة الوطنية للنقل",
      type: "شركة",
      vehicleType: "شاحنات كبيرة",
      coverage: "جميع مناطق المملكة",
      phone: "0112345678",
      status: "متاح",
      pricePerKm: "2.5",
      rating: 4.8,
      completedOrders: 1245
    },
    {
      id: 2,
      name: "محمد علي النقليات",
      type: "فرد",
      vehicleType: "نقل خفيف",
      coverage: "الرياض والمنطقة الوسطى",
      phone: "0125559876",
      status: "مشغول",
      pricePerKm: "1.8",
      rating: 4.2,
      completedOrders: 324
    },
    {
      id: 3,
      name: "مؤسسة السرعة للتوصيل",
      type: "مؤسسة",
      vehicleType: "دراجات نارية",
      coverage: "المناطق الحضرية",
      phone: "0138887654",
      status: "متاح",
      pricePerKm: "1.2",
      rating: 4.6,
      completedOrders: 856
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "متاح": return "bg-green-100 text-green-800";
      case "مشغول": return "bg-yellow-100 text-yellow-800";
      case "غير متاح": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVehicleIcon = (type) => {
    return <Car className="w-4 h-4" />;
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">قائمة الناقلين</h1>
          <p className="text-muted-foreground">إدارة وعرض جميع الناقلين المسجلين في المنصة</p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/carriers/registration")}>
          <Plus className="w-4 h-4" />
          إضافة ناقل جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الناقلين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">156</div>
            <p className="text-xs text-muted-foreground">+8 هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ناقلين متاحين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89</div>
            <p className="text-xs text-muted-foreground">57% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">طلبات مكتملة اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">234</div>
            <p className="text-xs text-muted-foreground">+45 من أمس</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4.4</div>
            <p className="text-xs text-muted-foreground">من 5 نجوم</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة الناقلين</CardTitle>
              <CardDescription>عرض وإدارة جميع الناقلين المسجلين</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن ناقل..." className="pr-10 w-64" />
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
                <TableHead className="text-right">اسم الناقل</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">نوع المركبة</TableHead>
                <TableHead className="text-right">المناطق المخدومة</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">السعر/كم</TableHead>
                
                
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carriers.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell className="font-medium">{carrier.name}</TableCell>
                  <TableCell>{carrier.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getVehicleIcon(carrier.vehicleType)}
                      {carrier.vehicleType}
                    </div>
                  </TableCell>
                  <TableCell>{carrier.coverage}</TableCell>
                  <TableCell className="font-mono">{carrier.phone}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(carrier.status)}>
                      {carrier.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{carrier.pricePerKm} ر.س</TableCell>
                  
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

export default CarriersList;