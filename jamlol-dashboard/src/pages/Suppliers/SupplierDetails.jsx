import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Phone, Calendar, ArrowLeft, Edit, Star, Package, ShoppingCart } from "lucide-react";

const SupplierDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock supplier data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const [supplier, setSupplier] = useState({
    id: 1,
    name: "شركة الرياض للمواد الغذائية",
    entityType: "company",
    linkedUserId: "1",
    linkedUserName: "محمد أحمد",
    countryId: "1",
    countryName: "السعودية",
    cityId: "1", 
    cityName: "الرياض",
    districtId: "1",
    districtName: "حي النخيل",
    neighborhoodId: "1",
    neighborhoodName: "النخيل الشرقي",
    street: "شارع الملك عبدالعزيز",
    mobile: "+966501234567",
    status: "نشط",
    rating: 4.5,
    products: 125,
    orders: 89,
    totalSales: "245,600",
    lastOrder: "2024-01-15",
    createdAt: "2023-06-10T08:30:00Z",
    updatedAt: "2024-01-12T16:45:00Z"
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "نشط": return "bg-green-100 text-green-800";
      case "قيد المراجعة": return "bg-yellow-100 text-yellow-800";
      case "متوقف": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate('/suppliers/list')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">تفاصيل المورد</h1>
            <p className="text-muted-foreground">عرض تفاصيل بيانات المورد</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/suppliers/edit/${supplier.id}`)} className="gap-2">
          <Edit className="h-4 w-4" />
          تعديل المورد
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">اسم المورد</p>
              <p className="font-semibold">{supplier.name}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">نوع الكيان</p>
              <Badge variant="outline">
                {supplier.entityType === "company" ? "شركة" : "فرد"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">المستخدم المرتبط</p>
              <p className="font-semibold">{supplier.linkedUserName}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">الحالة</p>
              <Badge className={getStatusColor(supplier.status)}>
                {supplier.status}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">التقييم</p>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(supplier.rating)}</div>
                <span className="font-semibold">{supplier.rating}</span>
                <span className="text-sm text-muted-foreground">من 5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الاتصال والموقع */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              معلومات الاتصال والموقع
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                رقم الجوال
              </p>
              <p className="font-mono">{supplier.mobile}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">العنوان الكامل</p>
              <div className="space-y-1">
                <p><span className="font-medium">الدولة:</span> {supplier.countryName}</p>
                <p><span className="font-medium">المدينة:</span> {supplier.cityName}</p>
                <p><span className="font-medium">المنطقة:</span> {supplier.districtName}</p>
                <p><span className="font-medium">الحي:</span> {supplier.neighborhoodName}</p>
                <p><span className="font-medium">الشارع:</span> {supplier.street}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات المورد */}
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات المورد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{supplier.products}</p>
                <p className="text-sm text-muted-foreground">المنتجات</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{supplier.orders}</p>
                <p className="text-sm text-muted-foreground">الطلبات</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">إجمالي المبيعات</p>
              <p className="text-2xl font-bold text-green-600">{supplier.totalSales} ر.س</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">آخر طلب</p>
              <p className="font-semibold">{supplier.lastOrder}</p>
            </div>
          </CardContent>
        </Card>

        {/* التواريخ والنشاط */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              التواريخ والنشاط
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">تاريخ التسجيل</p>
              <p className="font-semibold">{formatDate(supplier.createdAt)}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">آخر تحديث</p>
              <p className="font-semibold">{formatDate(supplier.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierDetails;