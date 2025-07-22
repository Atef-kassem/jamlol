import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Package, 
  Truck, 
  Clock, 
  DollarSign,
  User,
  Phone,
  Mail,
  Save,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const NewOrder = () => {
  const [orderData, setOrderData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    pickupAddress: "",
    deliveryAddress: "",
    pickupDate: undefined as Date | undefined,
    deliveryDate: undefined as Date | undefined,
    packageType: "",
    packageWeight: "",
    packageDimensions: "",
    packageValue: "",
    serviceType: "",
    carrierId: "",
    specialInstructions: "",
    isFragile: false,
    requiresSignature: false,
    insuranceRequired: false,
    urgentDelivery: false
  });

  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setOrderData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEstimatedCost = () => {
    // حساب تقديري للتكلفة بناءً على البيانات المدخلة
    let baseCost = 50; // تكلفة أساسية
    
    if (orderData.packageWeight) {
      baseCost += parseFloat(orderData.packageWeight) * 2;
    }
    
    if (orderData.urgentDelivery) {
      baseCost *= 1.5;
    }
    
    if (orderData.insuranceRequired) {
      baseCost += 25;
    }
    
    setEstimatedCost(baseCost);
  };

  const handleSubmitOrder = () => {
    // التحقق من البيانات المطلوبة
    const requiredFields = ['clientName', 'clientPhone', 'pickupAddress', 'deliveryAddress'];
    const missingFields = requiredFields.filter(field => !orderData[field as keyof typeof orderData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إنشاء الطلب",
      description: "تم إنشاء الطلب بنجاح وسيتم تخصيص ناقل قريباً",
    });

    // إعادة تعيين النموذج
    setOrderData({
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      pickupAddress: "",
      deliveryAddress: "",
      pickupDate: undefined,
      deliveryDate: undefined,
      packageType: "",
      packageWeight: "",
      packageDimensions: "",
      packageValue: "",
      serviceType: "",
      carrierId: "",
      specialInstructions: "",
      isFragile: false,
      requiresSignature: false,
      insuranceRequired: false,
      urgentDelivery: false
    });
    setEstimatedCost(null);
  };

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إضافة طلب جديد</h1>
          <p className="text-muted-foreground">إنشاء طلب نقل جديد</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={calculateEstimatedCost}>
            <DollarSign className="h-4 w-4 ml-2" />
            حساب التكلفة التقديرية
          </Button>
          <Button onClick={handleSubmitOrder}>
            <Save className="h-4 w-4 ml-2" />
            حفظ الطلب
          </Button>
        </div>
      </div>

      {estimatedCost && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-primary">التكلفة التقديرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {estimatedCost.toFixed(2)} ر.س
            </div>
            <p className="text-sm text-muted-foreground">
              هذه تكلفة تقديرية قد تتغير حسب الناقل المختار
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* معلومات العميل */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              معلومات العميل
            </CardTitle>
            <CardDescription>
              بيانات العميل الأساسية
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">اسم العميل *</Label>
              <Input
                id="clientName"
                value={orderData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="أدخل اسم العميل"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">رقم الهاتف *</Label>
              <Input
                id="clientPhone"
                value={orderData.clientPhone}
                onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                placeholder="05xxxxxxxx"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">البريد الإلكتروني</Label>
              <Input
                id="clientEmail"
                type="email"
                value={orderData.clientEmail}
                onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                placeholder="client@example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* تفاصيل التسليم */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              تفاصيل التسليم
            </CardTitle>
            <CardDescription>
              عناوين الاستلام والتسليم
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickupAddress">عنوان الاستلام *</Label>
              <Textarea
                id="pickupAddress"
                value={orderData.pickupAddress}
                onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                placeholder="أدخل عنوان الاستلام التفصيلي"
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryAddress">عنوان التسليم *</Label>
              <Textarea
                id="deliveryAddress"
                value={orderData.deliveryAddress}
                onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                placeholder="أدخل عنوان التسليم التفصيلي"
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* معلومات الشحنة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              معلومات الشحنة
            </CardTitle>
            <CardDescription>
              تفاصيل الطرد المراد نقله
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="packageType">نوع الطرد</Label>
              <Select value={orderData.packageType} onValueChange={(value) => handleInputChange('packageType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الطرد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="documents">وثائق</SelectItem>
                  <SelectItem value="electronics">إلكترونيات</SelectItem>
                  <SelectItem value="clothing">ملابس</SelectItem>
                  <SelectItem value="food">طعام</SelectItem>
                  <SelectItem value="furniture">أثاث</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packageWeight">الوزن (كجم)</Label>
                <Input
                  id="packageWeight"
                  type="number"
                  step="0.1"
                  value={orderData.packageWeight}
                  onChange={(e) => handleInputChange('packageWeight', e.target.value)}
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packageValue">القيمة (ر.س)</Label>
                <Input
                  id="packageValue"
                  type="number"
                  value={orderData.packageValue}
                  onChange={(e) => handleInputChange('packageValue', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="packageDimensions">الأبعاد (سم)</Label>
              <Input
                id="packageDimensions"
                value={orderData.packageDimensions}
                onChange={(e) => handleInputChange('packageDimensions', e.target.value)}
                placeholder="الطول × العرض × الارتفاع"
              />
            </div>
          </CardContent>
        </Card>

        {/* تفاصيل الخدمة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              تفاصيل الخدمة
            </CardTitle>
            <CardDescription>
              نوع الخدمة والناقل
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>نوع الخدمة</Label>
              <RadioGroup 
                value={orderData.serviceType} 
                onValueChange={(value) => handleInputChange('serviceType', value)}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">عادي (2-3 أيام)</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">سريع (24 ساعة)</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent">عاجل (نفس اليوم)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="carrierId">الناقل المفضل</Label>
              <Select value={orderData.carrierId} onValueChange={(value) => handleInputChange('carrierId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الناقل (اختياري)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">تخصيص تلقائي</SelectItem>
                  <SelectItem value="car001">شركة النقل السريع</SelectItem>
                  <SelectItem value="car002">ناقل المدينة</SelectItem>
                  <SelectItem value="car003">خدمات التوصيل المتقدمة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* التواريخ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              مواعيد التسليم
            </CardTitle>
            <CardDescription>
              تحديد مواعيد الاستلام والتسليم
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>تاريخ الاستلام</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-right font-normal w-full"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {orderData.pickupDate ? format(orderData.pickupDate, "PPP", { locale: ar }) : "اختر تاريخ الاستلام"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={orderData.pickupDate}
                    onSelect={(date) => handleInputChange('pickupDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>تاريخ التسليم المطلوب</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-right font-normal w-full"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {orderData.deliveryDate ? format(orderData.deliveryDate, "PPP", { locale: ar }) : "اختر تاريخ التسليم"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={orderData.deliveryDate}
                    onSelect={(date) => handleInputChange('deliveryDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* خيارات إضافية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              خيارات إضافية
            </CardTitle>
            <CardDescription>
              خدمات وتعليمات خاصة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox 
                  id="isFragile" 
                  checked={orderData.isFragile}
                  onCheckedChange={(checked) => handleInputChange('isFragile', checked)}
                />
                <Label htmlFor="isFragile">شحنة قابلة للكسر</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox 
                  id="requiresSignature" 
                  checked={orderData.requiresSignature}
                  onCheckedChange={(checked) => handleInputChange('requiresSignature', checked)}
                />
                <Label htmlFor="requiresSignature">يتطلب توقيع المستلم</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox 
                  id="insuranceRequired" 
                  checked={orderData.insuranceRequired}
                  onCheckedChange={(checked) => handleInputChange('insuranceRequired', checked)}
                />
                <Label htmlFor="insuranceRequired">تأمين على الشحنة</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox 
                  id="urgentDelivery" 
                  checked={orderData.urgentDelivery}
                  onCheckedChange={(checked) => handleInputChange('urgentDelivery', checked)}
                />
                <Label htmlFor="urgentDelivery">تسليم عاجل</Label>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">تعليمات خاصة</Label>
              <Textarea
                id="specialInstructions"
                value={orderData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="أدخل أي تعليمات خاصة للناقل..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewOrder;