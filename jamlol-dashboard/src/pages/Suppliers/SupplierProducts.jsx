import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Search, 
  Filter,
  Package,
  Tag,
  DollarSign,
  MapPin,
  Image as ImageIcon,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const productSchema = z.object({
  productName: z.string().min(1, "اسم المنتج مطلوب"),
  description: z.string().min(1, "وصف المنتج مطلوب"),
  price: z.number().min(0, "السعر يجب أن يكون أكبر من أو يساوي صفر"),
  category: z.string().min(1, "التصنيف مطلوب"),
  location: z.string().min(1, "الموقع مطلوب"),
  imageUrl: z.string().optional(),
});

// ProductForm type removed - using form validation instead

// Product structure: { id, name, category, price, location, description, imageUrl, createdAt, lastModified }

const mockProducts = [
  {
    id: "1",
    productName: "أجهزة كمبيوتر محمولة",
    description: "أجهزة كمبيوتر محمولة عالية الأداء مناسبة للأعمال والدراسة، معالج إنتل i7، ذاكرة 16GB، قرص SSD 512GB",
    price: 2500,
    category: "إلكترونيات",
    location: "الرياض",
    imageUrl: `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d`,
    createdAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    productName: "أجهزة الدوائر الإلكترونية",
    description: "مكونات ودوائر إلكترونية متطورة للمشاريع التقنية، شرائح Arduino، مقاومات، مكثفات، وكابلات التوصيل",
    price: 150,
    category: "إلكترونيات",
    location: "جدة",
    imageUrl: `https://images.unsplash.com/photo-1518770660439-4636190af475`,
    createdAt: "2024-01-14T14:20:00Z",
    lastModified: "2024-01-14T14:20:00Z"
  },
  {
    id: "3",
    productName: "أدوات البرمجة التقنية",
    description: "أدوات وبرمجيات تطوير متقدمة للمطورين والمبرمجين، تراخيص برمجيات، أدوات تطوير الويب والتطبيقات",
    price: 500,
    category: "برمجيات",
    location: "الدمام",
    imageUrl: `https://images.unsplash.com/photo-1461749280684-dccba630e2f6`,
    createdAt: "2024-01-13T09:15:00Z",
    lastModified: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    productName: "ملابس رجالية عصرية",
    description: "مجموعة متنوعة من الملابس الرجالية العصرية، قمصان، بناطيل، جاكيتات من أجود الخامات والماركات العالمية",
    price: 300,
    category: "ملابس وأزياء",
    location: "الرياض",
    imageUrl: `https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7`,
    createdAt: "2024-01-12T16:45:00Z",
    lastModified: "2024-01-12T16:45:00Z"
  }
];

const locationOptions = [
  "الرياض",
  "جدة", 
  "الدمام",
  "مكة المكرمة",
  "المدينة المنورة",
  "الطائف",
  "تبوك",
  "أبها",
  "الأحساء",
  "حائل",
  "القصيم",
  "جازان",
  "نجران",
  "الباحة",
  "الحدود الشمالية"
];

const categoryOptions = [
  "إلكترونيات",
  "أجهزة كمبيوتر",
  "برمجيات",
  "ملابس وأزياء",
  "مواد غذائية",
  "مستلزمات طبية",
  "أدوات وآلات",
  "مواد بناء",
  "كتب ومطبوعات",
  "ألعاب وهدايا",
  "مستحضرات تجميل",
  "رياضة ولياقة",
  "سيارات وقطع غيار",
  "أثاث ومنزل"
];

const SupplierProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("name");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    try {
      const newProduct = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      };

      setProducts(prev => [...prev, newProduct]);
      
      toast({
        title: "تم إضافة المنتج بنجاح",
        description: `تم إنشاء المنتج ${data.productName} بنجاح`,
      });

      reset();
      setShowAddForm(false);
    } catch (error) {
      toast({
        title: "خطأ في إضافة المنتج",
        description: "حدث خطأ أثناء حفظ بيانات المنتج",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesLocation = locationFilter === "all" || product.location === locationFilter;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Sort products based on selected criteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price; // من الأرخص للأغلى
    }
    if (sortBy === "location") {
      return a.location.localeCompare(b.location, 'ar');
    }
    return a.productName.localeCompare(b.productName, 'ar');
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">منتجات الموردين</h1>
          <p className="text-muted-foreground mt-2">
            العناصر التي يعرضها الموردين داخل التطبيق - يمكن للمشترين مشاهدة المنتجات الأقرب جغرافياً أو الأرخص سعراً
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 ml-2" />
          إضافة منتج جديد
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
                <p className="text-2xl font-bold text-blue-600">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">التصنيفات</p>
                <p className="text-2xl font-bold text-green-600">{new Set(products.map(p => p.category)).size}</p>
              </div>
              <Tag className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">متوسط السعر</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {products.length > 0 
                    ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString()
                    : 0
                  } ريال
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">المواقع</p>
                <p className="text-2xl font-bold text-purple-600">{new Set(products.map(p => p.location)).size}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-xl text-right flex items-center gap-2">
              <Package className="h-5 w-5" />
              إضافة منتج جديد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* اسم المنتج */}
                <div className="space-y-2">
                  <Label htmlFor="productName" className="text-right block">
                    اسم المنتج *
                  </Label>
                  <Input
                    id="productName"
                    {...register("productName")}
                    placeholder="أدخل اسم المنتج"
                    className="text-right"
                  />
                  {errors.productName && (
                    <p className="text-sm text-destructive text-right">
                      {errors.productName.message}
                    </p>
                  )}
                </div>

                {/* السعر */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-right block">
                    السعر (ريال) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                    placeholder="أدخل السعر"
                    className="text-right"
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive text-right">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* التصنيف */}
                <div className="space-y-2">
                  <Label className="text-right block">
                    التصنيف *
                  </Label>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category} className="text-right">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive text-right">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* الموقع */}
                <div className="space-y-2">
                  <Label className="text-right block">
                    الموقع *
                  </Label>
                  <Select onValueChange={(value) => setValue("location", value)}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الموقع" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((location) => (
                        <SelectItem key={location} value={location} className="text-right">
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && (
                    <p className="text-sm text-destructive text-right">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              {/* وصف المنتج */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-right block">
                  وصف المنتج *
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="أدخل وصف تفصيلي للمنتج..."
                  className="text-right min-h-[100px]"
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-destructive text-right">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* صورة المنتج */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-right block">
                  رابط صورة المنتج (اختياري)
                </Label>
                <Input
                  id="imageUrl"
                  {...register("imageUrl")}
                  placeholder="أدخل رابط صورة المنتج"
                  className="text-right"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  إلغاء
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                  {isSubmitting ? "جاري الحفظ..." : "حفظ المنتج"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث باسم المنتج أو الوصف أو الموقع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-right pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 text-right">
                  <Tag className="h-4 w-4 ml-2" />
                  <SelectValue placeholder="فلترة بالتصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-right">جميع التصنيفات</SelectItem>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category} className="text-right">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-48 text-right">
                  <MapPin className="h-4 w-4 ml-2" />
                  <SelectValue placeholder="فلترة بالموقع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-right">جميع المواقع</SelectItem>
                  {locationOptions.map((location) => (
                    <SelectItem key={location} value={location} className="text-right">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-48 text-right">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name" className="text-right">الاسم</SelectItem>
                  <SelectItem value="price" className="text-right">السعر (من الأقل)</SelectItem>
                  <SelectItem value="location" className="text-right">الموقع</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
            {product.imageUrl && (
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={product.imageUrl} 
                  alt={product.productName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{product.productName}</h3>
                  <Badge variant="secondary" className="mr-2">{product.category}</Badge>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-primary">
                    <DollarSign className="h-4 w-4 ml-1" />
                    <span className="font-bold text-lg">{product.price.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 ml-1" />
                    <span className="text-sm">{product.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Eye className="h-4 w-4 ml-1" />
                        عرض التفاصيل
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-right">{product.productName}</DialogTitle>
                        <DialogDescription className="text-right">
                          تفاصيل المنتج المعروض من المورد
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 text-right">
                        {product.imageUrl && (
                          <div className="flex justify-center">
                            <img 
                              src={product.imageUrl} 
                              alt={product.productName}
                              className="max-w-md max-h-64 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-semibold">السعر:</span>
                            <p className="text-lg font-bold text-primary">{product.price.toLocaleString()} ريال</p>
                          </div>
                          <div>
                            <span className="font-semibold">الموقع:</span>
                            <p>{product.location}</p>
                          </div>
                          <div>
                            <span className="font-semibold">التصنيف:</span>
                            <p>{product.category}</p>
                          </div>
                          <div>
                            <span className="font-semibold">تاريخ الإضافة:</span>
                            <p>{new Date(product.createdAt).toLocaleDateString('ar-EG')}</p>
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold">الوصف:</span>
                          <p className="mt-1">{product.description}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {sortedProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">لا توجد منتجات</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== "all" || locationFilter !== "all"
                ? "لا توجد منتجات تطابق معايير البحث والفلترة المحددة"
                : "لا توجد منتجات مضافة حتى الآن"
              }
            </p>
            {!searchTerm && categoryFilter === "all" && locationFilter === "all" && (
              <Button onClick={() => setShowAddForm(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 ml-2" />
                إضافة أول منتج
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupplierProducts;