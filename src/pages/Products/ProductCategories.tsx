import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Bookmark, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProductCategories = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const categories = [
    {
      id: 1,
      name: "الحبوب والبقوليات",
      description: "أرز، عدس، فول، حمص وجميع أنواع الحبوب",
      productsCount: 145,
      status: "نشط",
      createdDate: "2024-01-10"
    },
    {
      id: 2,
      name: "التمور والمكسرات",
      description: "جميع أنواع التمور والمكسرات والفواكه المجففة",
      productsCount: 78,
      status: "نشط", 
      createdDate: "2024-01-08"
    },
    {
      id: 3,
      name: "الزيوت والدهون",
      description: "زيت الزيتون، زيت الذرة، السمن والزبدة",
      productsCount: 34,
      status: "نشط",
      createdDate: "2024-01-05"
    },
    {
      id: 4,
      name: "منتجات الألبان",
      description: "حليب، أجبان، لبن وجميع منتجات الألبان",
      productsCount: 67,
      status: "قيد المراجعة",
      createdDate: "2024-01-03"
    },
    {
      id: 5,
      name: "المشروبات",
      description: "عصائر، مياه، مشروبات غازية ومشروبات ساخنة",
      productsCount: 89,
      status: "نشط",
      createdDate: "2023-12-28"
    }
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
          <h1 className="text-3xl font-bold text-primary">تصنيفات المنتجات</h1>
          <p className="text-muted-foreground">إدارة وتنظيم تصنيفات المنتجات في المنصة</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة تصنيف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة تصنيف جديد</DialogTitle>
              <DialogDescription>
                قم بإضافة تصنيف جديد لتنظيم المنتجات
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">اسم التصنيف</Label>
                <Input id="name" placeholder="أدخل اسم التصنيف" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea id="description" placeholder="وصف التصنيف..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">حفظ التصنيف</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التصنيفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">45</div>
            <p className="text-xs text-muted-foreground">+3 هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">تصنيفات نشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">38</div>
            <p className="text-xs text-muted-foreground">84% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,856</div>
            <p className="text-xs text-muted-foreground">موزعة على التصنيفات</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متوسط المنتجات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">41</div>
            <p className="text-xs text-muted-foreground">منتج لكل تصنيف</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary" />
                قائمة التصنيفات
              </CardTitle>
              <CardDescription>عرض وإدارة جميع تصنيفات المنتجات</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن تصنيف..." className="pr-10 w-64" />
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
                <TableHead className="text-right">اسم التصنيف</TableHead>
                <TableHead className="text-right">الوصف</TableHead>
                <TableHead className="text-right">عدد المنتجات</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {category.productsCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(category.status)}>
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{category.createdDate}</TableCell>
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
                          عرض المنتجات
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

export default ProductCategories;