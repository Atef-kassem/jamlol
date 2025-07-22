import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, Package, Star } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const ProductsList = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([
    {
      id: "PRD-001",
      name: "أرز أبيض مصري فاخر",
      category: "الحبوب والبقوليات",
      supplier: "شركة الرياض للمواد الغذائية",
      price: "45.50",
      unit: "كيس 50 كيلو",
      status: "متاح",
      stock: 150,
      rating: 4.8,
      orders: 234,
      description: "أرز أبيض مصري عالي الجودة"
    },
    {
      id: "PRD-002",
      name: "تمر مجهول فاخر", 
      category: "التمور والمكسرات",
      supplier: "مؤسسة النخيل للتمور",
      price: "89.00",
      unit: "كيلو",
      status: "متاح",
      stock: 78,
      rating: 4.9,
      orders: 156,
      description: "تمر مجهول فاخر من أجود الأنواع"
    },
    {
      id: "PRD-003",
      name: "زيت الزيتون البكر الممتاز",
      category: "الزيوت والدهون",
      supplier: "شركة الأندلس للزيوت",
      price: "125.75",
      unit: "لتر",
      status: "قيد المراجعة",
      stock: 45,
      rating: 4.6,
      orders: 89,
      description: "زيت زيتون بكر ممتاز من أجود الأنواع"
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    supplier: '',
    price: '',
    unit: '',
    status: 'متاح',
    stock: 0,
    description: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "متاح": return "bg-green-100 text-green-800";
      case "قيد المراجعة": return "bg-yellow-100 text-yellow-800";
      case "غير متاح": return "bg-red-100 text-red-800";
      case "نفد المخزون": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStockColor = (stock: number) => {
    if (stock > 100) return "text-green-600";
    if (stock > 20) return "text-yellow-600";
    return "text-red-600";
  };

  const handleAddProduct = () => {
    const productToAdd = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      ...newProduct,
      rating: 0,
      orders: 0
    };

    setProducts([...products, productToAdd]);
    setIsDialogOpen(false);
    setNewProduct({
      name: '',
      category: '',
      supplier: '',
      price: '',
      unit: '',
      status: 'متاح',
      stock: 0,
      description: ''
    });
    
    toast({
      title: "تم إضافة المنتج بنجاح",
      description: "تم إضافة المنتج الجديد إلى قائمة المنتجات"
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">قائمة المنتجات</h1>
          <p className="text-muted-foreground">إدارة وعرض جميع المنتجات المتاحة في المنصة</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة منتج جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة منتج جديد</DialogTitle>
              <DialogDescription>
                أضف منتجاً جديداً إلى قائمة المنتجات المتاحة
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="productName">اسم المنتج</Label>
                <Input
                  id="productName"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="أدخل اسم المنتج"
                />
              </div>
              <div>
                <Label htmlFor="category">التصنيف</Label>
                <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الحبوب والبقوليات">الحبوب والبقوليات</SelectItem>
                    <SelectItem value="التمور والمكسرات">التمور والمكسرات</SelectItem>
                    <SelectItem value="الزيوت والدهون">الزيوت والدهون</SelectItem>
                    <SelectItem value="منتجات الألبان">منتجات الألبان</SelectItem>
                    <SelectItem value="اللحوم والدواجن">اللحوم والدواجن</SelectItem>
                    <SelectItem value="الخضار والفواكه">الخضار والفواكه</SelectItem>
                    <SelectItem value="المواد الغذائية المعلبة">المواد الغذائية المعلبة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="supplier">المورد</Label>
                <Input
                  id="supplier"
                  value={newProduct.supplier}
                  onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                  placeholder="اسم المورد"
                />
              </div>
              <div>
                <Label htmlFor="price">السعر (ر.س)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="unit">وحدة القياس</Label>
                <Select value={newProduct.unit} onValueChange={(value) => setNewProduct({...newProduct, unit: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر وحدة القياس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="كيلو">كيلو</SelectItem>
                    <SelectItem value="لتر">لتر</SelectItem>
                    <SelectItem value="قطعة">قطعة</SelectItem>
                    <SelectItem value="عبوة">عبوة</SelectItem>
                    <SelectItem value="كيس">كيس</SelectItem>
                    <SelectItem value="علبة">علبة</SelectItem>
                    <SelectItem value="حبة">حبة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="stock">المخزون</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="status">الحالة</Label>
                <Select value={newProduct.status} onValueChange={(value) => setNewProduct({...newProduct, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="متاح">متاح</SelectItem>
                    <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                    <SelectItem value="غير متاح">غير متاح</SelectItem>
                    <SelectItem value="نفد المخزون">نفد المخزون</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">وصف المنتج</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="أدخل وصف المنتج..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddProduct}>
                إضافة المنتج
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,856</div>
            <p className="text-xs text-muted-foreground">+67 هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">منتجات متاحة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,523</div>
            <p className="text-xs text-muted-foreground">82% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">قيد المراجعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">234</div>
            <p className="text-xs text-muted-foreground">13% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">تصنيفات المنتجات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">45</div>
            <p className="text-xs text-muted-foreground">تصنيف مختلف</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة المنتجات</CardTitle>
              <CardDescription>عرض وإدارة جميع المنتجات المتاحة</CardDescription>
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
                <TableHead className="text-right">وحدة القياس</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">المخزون</TableHead>
                <TableHead className="text-right">التقييم</TableHead>
                <TableHead className="text-right">الطلبات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell className="font-mono">{product.price} ر.س</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={getStockColor(product.stock)}>
                    {product.stock} قطعة
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.orders}</TableCell>
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

export default ProductsList;