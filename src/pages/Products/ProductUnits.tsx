import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Target, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductUnits = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const units = [
    {
      id: 1,
      name: "كيلوجرام",
      symbol: "كجم",
      type: "وزن",
      baseUnit: "جرام", 
      conversionFactor: 1000,
      status: "نشط",
      productsCount: 245
    },
    {
      id: 2,
      name: "لتر",
      symbol: "لتر",
      type: "حجم",
      baseUnit: "مليلتر",
      conversionFactor: 1000,
      status: "نشط",
      productsCount: 156
    },
    {
      id: 3,
      name: "قطعة",
      symbol: "قطعة",
      type: "عدد",
      baseUnit: "قطعة",
      conversionFactor: 1,
      status: "نشط",
      productsCount: 789
    },
    {
      id: 4,
      name: "كيس",
      symbol: "كيس",
      type: "تعبئة",
      baseUnit: "قطعة",
      conversionFactor: 1,
      status: "نشط",
      productsCount: 123
    },
    {
      id: 5,
      name: "علبة",
      symbol: "علبة",
      type: "تعبئة",
      baseUnit: "قطعة",
      conversionFactor: 1,
      status: "نشط",
      productsCount: 234
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "وزن": return "bg-blue-100 text-blue-800";
      case "حجم": return "bg-green-100 text-green-800";
      case "عدد": return "bg-purple-100 text-purple-800";
      case "تعبئة": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط": return "bg-green-100 text-green-800";
      case "غير نشط": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">وحدات القياس</h1>
          <p className="text-muted-foreground">إدارة وحدات القياس والوزن للمنتجات</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة وحدة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة وحدة قياس جديدة</DialogTitle>
              <DialogDescription>
                قم بإضافة وحدة قياس جديدة للمنتجات
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">اسم الوحدة</Label>
                <Input id="name" placeholder="مثال: كيلوجرام" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="symbol">الرمز</Label>
                <Input id="symbol" placeholder="مثال: كجم" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">نوع الوحدة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الوحدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight">وزن</SelectItem>
                    <SelectItem value="volume">حجم</SelectItem>
                    <SelectItem value="count">عدد</SelectItem>
                    <SelectItem value="packaging">تعبئة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="baseUnit">الوحدة الأساسية</Label>
                <Input id="baseUnit" placeholder="مثال: جرام" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="conversion">معامل التحويل</Label>
                <Input id="conversion" type="number" placeholder="مثال: 1000" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">حفظ الوحدة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الوحدات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">28</div>
            <p className="text-xs text-muted-foreground">+2 هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">وحدات نشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">25</div>
            <p className="text-xs text-muted-foreground">89% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">أنواع الوحدات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4</div>
            <p className="text-xs text-muted-foreground">وزن، حجم، عدد، تعبئة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">منتجات مرتبطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">1,547</div>
            <p className="text-xs text-muted-foreground">منتج يستخدم الوحدات</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                قائمة وحدات القياس
              </CardTitle>
              <CardDescription>عرض وإدارة جميع وحدات القياس والوزن</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن وحدة..." className="pr-10 w-64" />
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
                <TableHead className="text-right">اسم الوحدة</TableHead>
                <TableHead className="text-right">الرمز</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">الوحدة الأساسية</TableHead>
                <TableHead className="text-right">معامل التحويل</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">عدد المنتجات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.name}</TableCell>
                  <TableCell className="font-mono">{unit.symbol}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(unit.type)}>
                      {unit.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{unit.baseUnit}</TableCell>
                  <TableCell className="font-mono">{unit.conversionFactor.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(unit.status)}>
                      {unit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {unit.productsCount}
                    </Badge>
                  </TableCell>
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

export default ProductUnits;