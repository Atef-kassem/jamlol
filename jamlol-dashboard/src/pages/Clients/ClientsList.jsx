import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ClientsList = () => {
  const navigate = useNavigate();
  const clients = [
    {
      id: 1,
      name: "سوبر ماركت الأندلس",
      type: "شركة",
      location: "الرياض - حي النزهة",
      phone: "0112345678",
      status: "نشط",
      orders: 156,
      totalSpent: "125,400",
      lastOrder: "2024-01-15"
    },
    {
      id: 2,
      name: "أحمد محمد السليم",
      type: "فرد",
      location: "جدة - حي الصفا",
      phone: "0125559876",
      status: "نشط",
      orders: 23,
      totalSpent: "18,900",
      lastOrder: "2024-01-10"
    },
    {
      id: 3,
      name: "مطعم الكبسة الملكية",
      type: "مؤسسة",
      location: "الدمام - الكورنيش",
      phone: "0138887654",
      status: "قيد المراجعة",
      orders: 45,
      totalSpent: "67,800",
      lastOrder: "2024-01-08"
    },
  ];

  const getStatusColor = (status) => {
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
          <h1 className="text-3xl font-bold text-primary">قائمة المشترين</h1>
          <p className="text-muted-foreground">إدارة وعرض جميع المشترين المسجلين في المنصة</p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/clients/add')}>
          <Plus className="w-4 h-4" />
          إضافة مشتري جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشترين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">+89 هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مشترين نشطين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">986</div>
            <p className="text-xs text-muted-foreground">79% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">طلبات هذا الشهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2,156</div>
            <p className="text-xs text-muted-foreground">+324 من الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2.8M</div>
            <p className="text-xs text-muted-foreground">ريال سعودي</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة المشترين</CardTitle>
              <CardDescription>عرض وإدارة جميع المشترين المسجلين</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن مشتري..." className="pr-10 w-64" />
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
                <TableHead className="text-right">اسم المشتري</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">الموقع</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">عدد الطلبات</TableHead>
                <TableHead className="text-right">إجمالي المشتريات</TableHead>
                <TableHead className="text-right">آخر طلب</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.type}</TableCell>
                  <TableCell>{client.location}</TableCell>
                  <TableCell className="font-mono">{client.phone}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.orders}</TableCell>
                  <TableCell className="font-mono">{client.totalSpent} ر.س</TableCell>
                  <TableCell>{client.lastOrder}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuItem className="gap-2" onClick={() => navigate(`/clients/details/${client.id}`)}>
                           <Eye className="w-4 h-4" />
                           عرض التفاصيل
                         </DropdownMenuItem>
                         <DropdownMenuItem className="gap-2" onClick={() => navigate(`/clients/edit/${client.id}`)}>
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

export default ClientsList;