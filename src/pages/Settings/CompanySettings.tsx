import { useState } from "react";
import { Save, Upload, Building, Phone, Mail, MapPin, FileText, Settings, Image, Folder, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function CompanySettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameAr: "شركة جملول",
    nameEn: "Gamlol Company",
    commercialRegister: "1234567890",
    taxNumber: "300123456700003",
    phone: "+966501234567",
    mobile: "+966501234567",
    email: "info@gamlol.com",
    website: "www.gamlol.com",
    country: "المملكة العربية السعودية",
    city: "الرياض",
    district: "حي الملقا",
    street: "شارع الملك فهد",
    postalCode: "12345",
    description: "شركة جملول الرائدة في مجال التجارة الإلكترونية والتكنولوجيا"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ بيانات الشركة بنجاح",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">بيانات الشركة / المؤسسة</h1>
          <p className="text-muted-foreground">إدارة المعلومات الأساسية للشركة / المؤسسة</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isLoading} 
          className="gap-2 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Save className="w-4 h-4" />
          {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="basic" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Building className="w-4 h-4" />
            البيانات الأساسية
          </TabsTrigger>
          <TabsTrigger 
            value="contact" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            معلومات الاتصال
          </TabsTrigger>
          <TabsTrigger 
            value="address" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <MapPin className="w-4 h-4" />
            العنوان
          </TabsTrigger>
          <TabsTrigger 
            value="legal" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            البيانات القانونية
          </TabsTrigger>
          <TabsTrigger 
            value="attachments" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Folder className="w-4 h-4" />
            المرفقات
          </TabsTrigger>
        </TabsList>

        {/* البيانات الأساسية */}
        <TabsContent value="basic" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-4 h-4 text-primary" />
                </div>
                هوية الشركة
              </CardTitle>
              <CardDescription>المعلومات الأساسية والهوية البصرية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="nameAr" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-primary" />
                    اسم الشركة (عربي) *
                  </Label>
                  <Input
                    id="nameAr"
                    value={formData.nameAr}
                    onChange={(e) => handleInputChange("nameAr", e.target.value)}
                    placeholder="أدخل اسم الشركة بالعربية"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="nameEn" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-secondary-blue" />
                    اسم الشركة (إنجليزي)
                  </Label>
                  <Input
                    id="nameEn"
                    value={formData.nameEn}
                    onChange={(e) => handleInputChange("nameEn", e.target.value)}
                    placeholder="أدخل اسم الشركة بالإنجليزية"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
                
                {/* Logo Upload */}
                <div>
                  <Label className="flex items-center gap-2">
                    <Upload className="w-3 h-3 text-primary" />
                    شعار الشركة
                  </Label>
                  <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">اسحب وأفلت أو انقر لرفع الشعار</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG، JPG حتى 2MB</p>
                    <Button variant="outline" className="mt-3 group-hover:border-primary group-hover:text-primary transition-all duration-200">
                      اختيار ملف
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    وصف مختصر عن الشركة
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="وصف مختصر عن الشركة ونشاطها"
                    rows={4}
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* معلومات الاتصال */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-4 h-4 text-secondary-blue" />
                </div>
                معلومات الاتصال
              </CardTitle>
              <CardDescription>طرق التواصل مع الشركة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-primary" />
                    الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+966xxxxxxxxx"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile" className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-secondary-blue" />
                    الجوال
                  </Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    placeholder="+966xxxxxxxxx"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-primary" />
                  البريد الإلكتروني *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="info@company.com"
                  className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div>
                <Label htmlFor="website" className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-secondary-blue" />
                  الموقع الإلكتروني
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="www.company.com"
                  className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* العنوان */}
        <TabsContent value="address" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-4 h-4 text-success" />
                </div>
                العنوان
              </CardTitle>
              <CardDescription>موقع المقر الرئيسي للشركة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label htmlFor="country" className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-success" />
                    الدولة *
                  </Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    placeholder="الدولة"
                    className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-primary" />
                    المدينة *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="المدينة"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="district" className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-secondary-blue" />
                    الحي
                  </Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    placeholder="الحي"
                    className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-warning" />
                    الرمز البريدي
                  </Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="12345"
                    className="focus:ring-2 focus:ring-warning/20 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="street" className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-success" />
                  الشارع *
                </Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  placeholder="الشارع"
                  className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* البيانات القانونية */}
        <TabsContent value="legal" className="space-y-6">
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-warning/5 border-l-4 border-l-warning">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-4 h-4 text-warning" />
                </div>
                البيانات القانونية
              </CardTitle>
              <CardDescription>المعلومات الرسمية والقانونية للشركة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="commercialRegister" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-primary" />
                    السجل التجاري *
                  </Label>
                  <Input
                    id="commercialRegister"
                    value={formData.commercialRegister}
                    onChange={(e) => handleInputChange("commercialRegister", e.target.value)}
                    placeholder="رقم السجل التجاري"
                    className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="taxNumber" className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-warning" />
                    الرقم الضريبي *
                  </Label>
                  <Input
                    id="taxNumber"
                    value={formData.taxNumber}
                    onChange={(e) => handleInputChange("taxNumber", e.target.value)}
                    placeholder="الرقم الضريبي"
                    className="focus:ring-2 focus:ring-warning/20 transition-all duration-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* المرفقات */}
        <TabsContent value="attachments" className="space-y-6">
          {/* مرفقات الهوية */}
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                مرفقات الهوية
              </CardTitle>
              <CardDescription>الوثائق الرسمية للشركة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* السجل التجاري */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-primary" />
                    السجل التجاري
                  </Label>
                  <div className="border-2 border-dashed border-primary/25 rounded-lg p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                    <FileText className="w-8 h-8 mx-auto text-primary/60 mb-2 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">رفع صورة السجل التجاري</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، JPG، PNG حتى 5MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-primary group-hover:text-primary transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      اختيار ملف
                    </Button>
                  </div>
                </div>

                {/* الشهادة الضريبية */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-warning" />
                    الشهادة الضريبية
                  </Label>
                  <div className="border-2 border-dashed border-warning/25 rounded-lg p-4 text-center hover:border-warning/50 hover:bg-warning/5 transition-all duration-300 cursor-pointer group">
                    <FileText className="w-8 h-8 mx-auto text-warning/60 mb-2 group-hover:text-warning group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-warning transition-colors duration-200">رفع الشهادة الضريبية</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، JPG، PNG حتى 5MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-warning group-hover:text-warning transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      اختيار ملف
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* مرفقات التراخيص */}
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-4 h-4 text-secondary-blue" />
                </div>
                التراخيص والشهادات
              </CardTitle>
              <CardDescription>تراخيص مزاولة النشاط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* رخصة النشاط */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-secondary-blue" />
                    رخصة النشاط
                  </Label>
                  <div className="border-2 border-dashed border-secondary-blue/25 rounded-lg p-4 text-center hover:border-secondary-blue/50 hover:bg-secondary-blue/5 transition-all duration-300 cursor-pointer group">
                    <Shield className="w-8 h-8 mx-auto text-secondary-blue/60 mb-2 group-hover:text-secondary-blue group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-secondary-blue transition-colors duration-200">رفع رخصة مزاولة النشاط</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، JPG، PNG حتى 5MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-secondary-blue group-hover:text-secondary-blue transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      اختيار ملف
                    </Button>
                  </div>
                </div>

                {/* شهادة الجودة */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-success" />
                    شهادة الجودة
                  </Label>
                  <div className="border-2 border-dashed border-success/25 rounded-lg p-4 text-center hover:border-success/50 hover:bg-success/5 transition-all duration-300 cursor-pointer group">
                    <Shield className="w-8 h-8 mx-auto text-success/60 mb-2 group-hover:text-success group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-success transition-colors duration-200">رفع شهادة الجودة</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، JPG، PNG حتى 5MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-success group-hover:text-success transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      اختيار ملف
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* مرفقات إضافية */}
          <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Folder className="w-4 h-4 text-success" />
                </div>
                مرفقات إضافية
              </CardTitle>
              <CardDescription>وثائق ومرفقات أخرى</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {/* شعار عالي الجودة */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Image className="w-4 h-4 text-primary" />
                    شعار عالي الجودة
                  </Label>
                  <div className="border-2 border-dashed border-primary/25 rounded-lg p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                    <Image className="w-8 h-8 mx-auto text-primary/60 mb-2 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">شعار للطباعة</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG، SVG، AI حتى 10MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-primary group-hover:text-primary transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع
                    </Button>
                  </div>
                </div>

                {/* صور المنشآت */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Image className="w-4 h-4 text-secondary-blue" />
                    صور المنشآت
                  </Label>
                  <div className="border-2 border-dashed border-secondary-blue/25 rounded-lg p-4 text-center hover:border-secondary-blue/50 hover:bg-secondary-blue/5 transition-all duration-300 cursor-pointer group">
                    <Image className="w-8 h-8 mx-auto text-secondary-blue/60 mb-2 group-hover:text-secondary-blue group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-secondary-blue transition-colors duration-200">صور الفروع</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG، PNG حتى 20MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-secondary-blue group-hover:text-secondary-blue transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع
                    </Button>
                  </div>
                </div>

                {/* مرفقات أخرى */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Folder className="w-4 h-4 text-warning" />
                    مرفقات أخرى
                  </Label>
                  <div className="border-2 border-dashed border-warning/25 rounded-lg p-4 text-center hover:border-warning/50 hover:bg-warning/5 transition-all duration-300 cursor-pointer group">
                    <Folder className="w-8 h-8 mx-auto text-warning/60 mb-2 group-hover:text-warning group-hover:scale-110 transition-all duration-300" />
                    <p className="text-sm text-muted-foreground group-hover:text-warning transition-colors duration-200">ملفات متنوعة</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF، DOC، XLS حتى 15MB</p>
                    <Button variant="outline" size="sm" className="mt-3 group-hover:border-warning group-hover:text-warning transition-all duration-200">
                      <Upload className="w-3 h-3 mr-1" />
                      رفع
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}