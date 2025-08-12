import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Phone, Calendar, ArrowLeft, Edit } from "lucide-react";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock client data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const [client, setClient] = useState({
    id: 1,
    name: "سوبر ماركت الأندلس",
    entityType: "company",
    linkedUserId: "1",
    linkedUserName: "أحمد محمد",
    countryId: "1",
    countryName: "السعودية",
    cityId: "1", 
    cityName: "الرياض",
    districtId: "1",
    districtName: "حي النزهة",
    neighborhoodId: "1",
    neighborhoodName: "النزهة الشرقية",
    street: "شارع الملك فهد",
    mobile: "+966501234567",
    status: "نشط",
    orders: 156,
    totalSpent: "125,400",
    lastOrder: "2024-01-15",
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2024-01-10T14:20:00Z"
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

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate('/clients/list')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">تفاصيل المشتري</h1>
            <p className="text-muted-foreground">عرض تفاصيل بيانات المشتري</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/clients/edit/${client.id}`)} className="gap-2">
          <Edit className="h-4 w-4" />
          تعديل المشتري
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
              <p className="text-sm font-medium text-muted-foreground">اسم المشتري</p>
              <p className="font-semibold">{client.name}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">نوع الكيان</p>
              <Badge variant="outline">
                {client.entityType === "company" ? "شركة" : "فرد"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">المستخدم المرتبط</p>
              <p className="font-semibold">{client.linkedUserName}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">الحالة</p>
              <Badge className={getStatusColor(client.status)}>
                {client.status}
              </Badge>
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
              <p className="font-mono">{client.mobile}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">العنوان الكامل</p>
              <div className="space-y-1">
                <p><span className="font-medium">الدولة:</span> {client.countryName}</p>
                <p><span className="font-medium">المدينة:</span> {client.cityName}</p>
                <p><span className="font-medium">المنطقة:</span> {client.districtName}</p>
                <p><span className="font-medium">الحي:</span> {client.neighborhoodName}</p>
                <p><span className="font-medium">الشارع:</span> {client.street}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات المشتري */}
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات المشتري</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{client.orders}</p>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{client.totalSpent}</p>
                <p className="text-sm text-muted-foreground">إجمالي المشتريات (ر.س)</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">آخر طلب</p>
              <p className="font-semibold">{client.lastOrder}</p>
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
              <p className="font-semibold">{formatDate(client.createdAt)}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">آخر تحديث</p>
              <p className="font-semibold">{formatDate(client.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDetails;