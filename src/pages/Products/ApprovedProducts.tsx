import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, CheckCircle, Star } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ApprovedProducts = () => {
  const products = [
    {
      id: "PRD-001",
      name: "أرز أبيض مصري فاخر",
      category: "الحبوب والبقوليات",
      supplier: "شركة الرياض للمواد الغذائية",
      price: "45.50",
      unit: "كيس 50 كيلو",
      approvalDate: "2024-01-15",
      rating: 4.8,
      orders: 234,
      revenue: "10,670"
    },
    {
      id: "PRD-002", 
      name: "تمر مجهول فاخر",
      category: "التمور والمكسرات",
      supplier: "مؤسسة النخيل للتمور",
      price: "89.00",
      unit: "كيلو",
      approvalDate: "2024-01-12",
      rating: 4.9,
      orders: 156,
      revenue: "13,884"
    },
    {
      id: "PRD-003",
      name: "زيت الزيتون البكر الممتاز",
      category: "الزيوت والدهون", 
      supplier: "شركة الأندلس للزيوت",
      price: "125.75",
      unit: "لتر",
      approvalDate: "2024-01-10",
      rating: 4.6,
      orders: 89,
      revenue: "11,192"
    },
    {
      id: "PRD-004",
      name: "حليب طازج كامل الدسم",
      category: "منتجات الألبان",
      supplier: "مزارع الصافي",
      price: "12.50",
      unit: "لتر",
      approvalDate: "2024-01-08",
      rating: 4.7,
      orders: 345,
      revenue: "4,312"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">المنتجات المُعتمدة</h1>
          <p className="text-muted-foreground">المنتجات التي تم اعتمادها للعرض والبيع في المنصة</p>
        </div>
        <Button className="gap-2" variant="outline">
          <CheckCircle className="w-4 h-4" />
          تصدير قائمة المعتمدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المنتجات المُعتمدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,523</div>
            <p className="text-xs text-muted-foreground">82% من إجمالي المنتجات</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4.7</div>
            <p className="text-xs text-muted-foreground">من 5 نجوم</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12,456</div>
            <p className="text-xs text-muted-foreground">+890 هذا الشهر</p>
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
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                قائمة المنتجات المُعتمدة
              </CardTitle>
              <CardDescription>المنتجات المعتمدة للعرض والبيع</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن منتج..." className="pr-10 w-64" />
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
                <TableHead className="text-right">رمز المنتج</TableHead>
                <TableHead className="text-right">اسم المنتج</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">المورد</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">تاريخ الاعتماد</TableHead>
                <TableHead className="text-right">التقييم</TableHead>
                <TableHead className="text-right">الطلبات</TableHead>
                <TableHead className="text-right">المبيعات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell className="font-mono">{product.price} ر.س / {product.unit}</TableCell>
                  <TableCell>{product.approvalDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {product.orders}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-green-600">{product.revenue} ر.س</TableCell>
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
                          إلغاء الاعتماد
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

export default ApprovedProducts;