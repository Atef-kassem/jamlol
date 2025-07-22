import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Users, MapPin, Phone, Calendar, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClientRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientNumber: "",
    linkedUserId: "",
    entityType: "",
    location: "",
    mobile: "",
    createdDate: new Date().toISOString().split('T')[0],
    lastModified: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateClientNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `CL${timestamp}${random}`;
  };

  const handleSubmit = () => {
    if (!formData.linkedUserId || !formData.entityType || !formData.mobile) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم تسجيل المشتري بنجاح",
      description: "تم إضافة المشتري الجديد إلى النظام"
    });
    
    setTimeout(() => {
      navigate('/clients/list');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/clients/list');
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <User className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">تسجيل مشتري جديد</h1>
          <p className="text-muted-foreground">إضافة مشتري جديد إلى قاعدة البيانات</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* معلومات المشتري الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              معلومات المشتري الأساسية
            </CardTitle>
            <CardDescription>
              البيانات الأساسية للمشتري
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="clientNumber">رقم المشتري *</Label>
              <div className="flex gap-2">
                <Input
                  id="clientNumber"
                  value={formData.clientNumber}
                  onChange={(e) => handleInputChange("clientNumber", e.target.value)}
                  placeholder="رقم المشتري"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleInputChange("clientNumber", generateClientNumber())}
                >
                  توليد تلقائي
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="linkedUserId">معرف المستخدم المرتبط *</Label>
              <Input
                id="linkedUserId"
                value={formData.linkedUserId}
                onChange={(e) => handleInputChange("linkedUserId", e.target.value)}
                placeholder="معرف المستخدم المرتبط"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="entityType">نوع الكيان *</Label>
              <Select value={formData.entityType} onValueChange={(value) => handleInputChange("entityType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الكيان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">فرد</SelectItem>
                  <SelectItem value="company">شركة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                الموقع الجغرافي
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="الموقع الجغرافي"
              />
            </div>
          </CardContent>
        </Card>

        {/* معلومات الاتصال والتواريخ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              معلومات الاتصال والتواريخ
            </CardTitle>
            <CardDescription>
              بيانات التواصل والتواريخ المهمة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="mobile" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                رقم الجوال *
              </Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="+966 xx xxx xxxx"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="createdDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                تاريخ الإنشاء
              </Label>
              <Input
                id="createdDate"
                type="date"
                value={formData.createdDate}
                onChange={(e) => handleInputChange("createdDate", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastModified" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                تاريخ آخر تعديل
              </Label>
              <Input
                id="lastModified"
                type="date"
                value={formData.lastModified}
                onChange={(e) => handleInputChange("lastModified", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أزرار الحفظ */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="outline">مطلوب</Badge>
          <span className="text-sm text-muted-foreground">الحقول المميزة بـ * مطلوبة</span>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            إلغاء
          </Button>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            حفظ المشتري
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientRegistration;