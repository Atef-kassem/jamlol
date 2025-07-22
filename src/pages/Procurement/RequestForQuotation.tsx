import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Save, Send, FileText, Search, Calendar, Users, DollarSign, CheckCircle, Clock, AlertCircle, Upload, Download, Archive, Edit, Trash2, Eye, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RequestForQuotation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("new");
  const [rfq, setRfq] = useState({
    rfqNumber: "RFQ-2024-001",
    createdDate: new Date().toISOString().split('T')[0],
    subject: "",
    requestingDepartment: "",
    requiredDate: "",
    paymentTerms: "",
    deliveryTerms: "",
    notes: "",
    selectedVendors: [] as string[],
    attachments: [] as File[],
    status: "مسودة",
    items: [
      { id: 1, name: "", quantity: "", unit: "", specifications: "" }
    ]
  });

  const [vendors] = useState([
    { id: "v1", name: "شركة التوريدات المتقدمة", contact: "أحمد محمد", phone: "0501234567", email: "info@advanced.com" },
    { id: "v2", name: "مؤسسة الخليج للمواد", contact: "سالم العتيبي", phone: "0509876543", email: "sales@gulf.com" },
    { id: "v3", name: "شركة الرياض التجارية", contact: "فاطمة الزهراني", phone: "0551112233", email: "contact@riyadh.com" },
    { id: "v4", name: "مجموعة النخبة", contact: "محمد السعدون", phone: "0554445566", email: "orders@elite.com" }
  ]);

  const [existingRFQs] = useState([
    {
      id: 1,
      number: "RFQ-2024-001",
      subject: "توريد زيوت المحركات",
      department: "الصيانة",
      date: "2024-01-15",
      vendors: 3,
      status: "عروض مستلمة",
      quotesReceived: 2
    },
    {
      id: 2,
      number: "RFQ-2024-002",
      subject: "أجهزة حاسوب مكتبية",
      department: "تقنية المعلومات",
      date: "2024-01-14",
      vendors: 4,
      status: "قيد المقارنة",
      quotesReceived: 4
    },
    {
      id: 3,
      number: "RFQ-2024-003",
      subject: "مواد تنظيف",
      department: "الخدمات العامة",
      date: "2024-01-13",
      vendors: 2,
      status: "مكتمل",
      quotesReceived: 2
    }
  ]);

  const [quotations] = useState([
    {
      id: 1,
      rfqNumber: "RFQ-2024-001",
      vendor: "شركة التوريدات المتقدمة",
      totalPrice: "15,500",
      deliveryTime: "7 أيام",
      status: "مقبول",
      receivedDate: "2024-01-18"
    },
    {
      id: 2,
      rfqNumber: "RFQ-2024-001",
      vendor: "مؤسسة الخليج للمواد",
      totalPrice: "16,200",
      deliveryTime: "10 أيام",
      status: "بانتظار",
      receivedDate: "2024-01-17"
    }
  ]);

  const addItem = () => {
    setRfq({
      ...rfq,
      items: [...rfq.items, { 
        id: Date.now(), 
        name: "", 
        quantity: "", 
        unit: "", 
        specifications: ""
      }]
    });
  };

  const removeItem = (id: number) => {
    setRfq({
      ...rfq,
      items: rfq.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: number, field: string, value: string) => {
    setRfq({
      ...rfq,
      items: rfq.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const toggleVendor = (vendorId: string) => {
    const updatedVendors = rfq.selectedVendors.includes(vendorId)
      ? rfq.selectedVendors.filter(id => id !== vendorId)
      : [...rfq.selectedVendors, vendorId];
    
    setRfq({
      ...rfq,
      selectedVendors: updatedVendors
    });
  };

  const handleSave = () => {
    toast({
      title: "تم حفظ طلب العروض",
      description: "تم حفظ طلب عرض الأسعار كمسودة بنجاح",
    });
  };

  const handleSend = () => {
    if (rfq.selectedVendors.length === 0) {
      toast({
        title: "خطأ",
        description: "يجب اختيار مورد واحد على الأقل",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "تم إرسال طلب العروض",
      description: `تم إرسال طلب عرض الأسعار إلى ${rfq.selectedVendors.length} مورد`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "مرسل": "default",
      "عروض مستلمة": "default",
      "قيد المقارنة": "default",
      "مكتمل": "default"
    };

    const icons = {
      "مرسل": <Send className="w-3 h-3 mr-1" />,
      "عروض مستلمة": <FileText className="w-3 h-3 mr-1" />,
      "قيد المقارنة": <Clock className="w-3 h-3 mr-1" />,
      "مكتمل": <CheckCircle className="w-3 h-3 mr-1" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as "default"}>
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    );
  };

  const getQuotationBadge = (status: string) => {
    const variants = {
      "مقبول": "default",
      "مرفوض": "destructive",
      "بانتظار": "secondary"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as "default" | "destructive" | "secondary"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">طلب عروض الأسعار</h1>
          <p className="text-muted-foreground">
            إدارة طلبات عروض الأسعار ومقارنة العروض المستلمة
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="new">
            <Plus className="ml-2 h-4 w-4" />
            طلب عرض جديد
          </TabsTrigger>
          <TabsTrigger value="list">
            <FileText className="ml-2 h-4 w-4" />
            قائمة الطلبات
          </TabsTrigger>
          <TabsTrigger value="quotations">
            <DollarSign className="ml-2 h-4 w-4" />
            العروض المستلمة
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <Search className="ml-2 h-4 w-4" />
            مقارنة العروض
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="ml-2 h-4 w-4" />
            التقارير
          </TabsTrigger>
          <TabsTrigger value="archive">
            <Archive className="ml-2 h-4 w-4" />
            الأرشيف
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء طلب عرض أسعار جديد</CardTitle>
              <CardDescription>تعبئة بيانات طلب عرض الأسعار وإرساله للموردين</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* المعلومات الأساسية */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rfqNumber">رقم طلب العرض</Label>
                  <Input 
                    id="rfqNumber" 
                    value={rfq.rfqNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">موضوع RFQ</Label>
                  <Input 
                    id="subject"
                    placeholder="مثال: توريد زيوت محركات"
                    value={rfq.subject}
                    onChange={(e) => setRfq({...rfq, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">الجهة الطالبة</Label>
                  <Select 
                    value={rfq.requestingDepartment}
                    onValueChange={(value) => setRfq({...rfq, requestingDepartment: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجهة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">قسم الصيانة</SelectItem>
                      <SelectItem value="sales">قسم المبيعات</SelectItem>
                      <SelectItem value="admin">الإدارة العامة</SelectItem>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requiredDate">تاريخ التوريد المطلوب</Label>
                  <Input 
                    id="requiredDate" 
                    type="date"
                    value={rfq.requiredDate}
                    onChange={(e) => setRfq({...rfq, requiredDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">شروط الدفع</Label>
                  <Select 
                    value={rfq.paymentTerms}
                    onValueChange={(value) => setRfq({...rfq, paymentTerms: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر شروط الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">نقدي</SelectItem>
                      <SelectItem value="credit30">آجل 30 يوم</SelectItem>
                      <SelectItem value="credit60">آجل 60 يوم</SelectItem>
                      <SelectItem value="installments">دفعات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryTerms">شروط التسليم</Label>
                <Textarea 
                  id="deliveryTerms"
                  placeholder="موقع الفرع/المستودع/العنوان"
                  value={rfq.deliveryTerms}
                  onChange={(e) => setRfq({...rfq, deliveryTerms: e.target.value})}
                />
              </div>

              {/* الأصناف/الخدمات */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">الأصناف/الخدمات المطلوبة</h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة صنف
                  </Button>
                </div>

                <div className="space-y-4">
                  {rfq.items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>اسم الصنف/الخدمة</Label>
                          <Input 
                            placeholder="اسم المادة أو الخدمة"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الكمية</Label>
                          <Input 
                            type="number"
                            placeholder="0"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الوحدة</Label>
                          <Select 
                            value={item.unit}
                            onValueChange={(value) => updateItem(item.id, 'unit', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="الوحدة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="piece">قطعة</SelectItem>
                              <SelectItem value="meter">متر</SelectItem>
                              <SelectItem value="liter">لتر</SelectItem>
                              <SelectItem value="kg">كيلوجرام</SelectItem>
                              <SelectItem value="service">خدمة</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-end">
                          {rfq.items.length > 1 && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              حذف
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label>المواصفات والوصف</Label>
                        <Textarea 
                          placeholder="وصف تفصيلي للمادة أو الخدمة ومواصفاتها"
                          value={item.specifications}
                          onChange={(e) => updateItem(item.id, 'specifications', e.target.value)}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* اختيار الموردين */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">اختيار الموردين</h3>
                <div className="grid grid-cols-2 gap-4">
                  {vendors.map((vendor) => (
                    <Card key={vendor.id} className="p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id={vendor.id}
                          checked={rfq.selectedVendors.includes(vendor.id)}
                          onCheckedChange={() => toggleVendor(vendor.id)}
                        />
                        <div className="flex-1 space-y-1">
                          <Label htmlFor={vendor.id} className="text-sm font-medium cursor-pointer">
                            {vendor.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            التواصل: {vendor.contact}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            هاتف: {vendor.phone}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            البريد: {vendor.email}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* الملاحظات الإضافية */}
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea 
                  id="notes"
                  placeholder="أي تفاصيل تكميلية أو تعليمات للموردين"
                  value={rfq.notes}
                  onChange={(e) => setRfq({...rfq, notes: e.target.value})}
                />
              </div>

              {/* المرفقات */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">المرفقات</h3>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      اسحب الملفات هنا أو انقر للتحديد
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX, JPG, PNG (حد أقصى 10MB)
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Upload className="ml-2 h-4 w-4" />
                    اختيار ملفات
                  </Button>
                </div>
              </div>

              {/* أزرار الإجراء */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleSave}>
                  <Save className="ml-2 h-4 w-4" />
                  حفظ كمسودة
                </Button>
                <Button onClick={handleSend}>
                  <Send className="ml-2 h-4 w-4" />
                  إرسال للموردين
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة طلبات عروض الأسعار</CardTitle>
              <CardDescription>جميع طلبات عروض الأسعار المرسلة</CardDescription>
            </CardHeader>
            <CardContent>
              {/* شريط البحث والفلاتر */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="البحث برقم الطلب أو الموضوع..." 
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="حالة الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="sent">مرسل</SelectItem>
                    <SelectItem value="received">عروض مستلمة</SelectItem>
                    <SelectItem value="comparing">قيد المقارنة</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* جدول الطلبات */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>الموضوع</TableHead>
                    <TableHead>الجهة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>عدد الموردين</TableHead>
                    <TableHead>العروض المستلمة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {existingRFQs.map((rfq) => (
                    <TableRow key={rfq.id}>
                      <TableCell className="font-medium">{rfq.number}</TableCell>
                      <TableCell>{rfq.subject}</TableCell>
                      <TableCell>{rfq.department}</TableCell>
                      <TableCell>{rfq.date}</TableCell>
                      <TableCell>{rfq.vendors}</TableCell>
                      <TableCell>{rfq.quotesReceived}</TableCell>
                      <TableCell>{getStatusBadge(rfq.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            عرض
                          </Button>
                          <Button variant="outline" size="sm">
                            مقارنة
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>العروض المستلمة</CardTitle>
              <CardDescription>جميع عروض الأسعار المستلمة من الموردين</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم RFQ</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead>السعر الإجمالي</TableHead>
                    <TableHead>مدة التوريد</TableHead>
                    <TableHead>تاريخ الاستلام</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotations.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.rfqNumber}</TableCell>
                      <TableCell>{quote.vendor}</TableCell>
                      <TableCell>{quote.totalPrice} ريال</TableCell>
                      <TableCell>{quote.deliveryTime}</TableCell>
                      <TableCell>{quote.receivedDate}</TableCell>
                      <TableCell>{getQuotationBadge(quote.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            عرض
                          </Button>
                          <Button variant="outline" size="sm">
                            قبول
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مقارنة العروض</CardTitle>
              <CardDescription>مقارنة تفصيلية بين عروض الأسعار المستلمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="rfq-select">اختيار طلب العرض:</Label>
                  <Select>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="اختر رقم RFQ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RFQ-2024-001">RFQ-2024-001 - توريد زيوت المحركات</SelectItem>
                      <SelectItem value="RFQ-2024-002">RFQ-2024-002 - أجهزة حاسوب مكتبية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المعايير</TableHead>
                        <TableHead className="text-center">شركة التوريدات المتقدمة</TableHead>
                        <TableHead className="text-center">مؤسسة الخليج للمواد</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">السعر الإجمالي</TableCell>
                        <TableCell className="text-center text-green-600 font-semibold">15,500 ريال</TableCell>
                        <TableCell className="text-center">16,200 ريال</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">مدة التوريد</TableCell>
                        <TableCell className="text-center text-green-600 font-semibold">7 أيام</TableCell>
                        <TableCell className="text-center">10 أيام</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">شروط الدفع</TableCell>
                        <TableCell className="text-center">آجل 30 يوم</TableCell>
                        <TableCell className="text-center text-green-600 font-semibold">آجل 60 يوم</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">الضمان</TableCell>
                        <TableCell className="text-center text-green-600 font-semibold">سنة واحدة</TableCell>
                        <TableCell className="text-center">6 أشهر</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">التقييم العام</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-green-100 text-green-800">الأفضل</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">جيد</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button variant="outline">
                    <Download className="ml-2 h-4 w-4" />
                    تصدير المقارنة
                  </Button>
                  <Button>
                    <CheckCircle className="ml-2 h-4 w-4" />
                    اعتماد العرض المحدد
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="ml-2 h-5 w-5" />
                  إحصائيات عامة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>إجمالي طلبات RFQ</span>
                    <span className="font-semibold">25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>طلبات مكتملة</span>
                    <span className="font-semibold text-green-600">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>قيد المعالجة</span>
                    <span className="font-semibold text-orange-600">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ملغية</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="ml-2 h-5 w-5" />
                  أداء الموردين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>الأسرع في الرد</span>
                    <span className="font-semibold">شركة التوريدات المتقدمة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الأفضل سعراً</span>
                    <span className="font-semibold">مؤسسة الخليج</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الأكثر موثوقية</span>
                    <span className="font-semibold">شركة الرياض التجارية</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="ml-2 h-5 w-5" />
                  الوفورات المحققة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>هذا الشهر</span>
                    <span className="font-semibold text-green-600">45,000 ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>هذا العام</span>
                    <span className="font-semibold text-green-600">320,000 ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط الوفورات</span>
                    <span className="font-semibold">12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تقارير تفصيلية</CardTitle>
              <CardDescription>تصدير وطباعة التقارير المتخصصة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  تقرير RFQ الشهري
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  تقرير أداء الموردين
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  تقرير الوفورات
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Clock className="h-6 w-6 mb-2" />
                  تقرير أوقات الاستجابة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الأرشيف</CardTitle>
              <CardDescription>طلبات عروض الأسعار المكتملة والمؤرشفة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="البحث في الأرشيف..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="السنة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Archive className="ml-2 h-4 w-4" />
                    أرشفة متقدمة
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>الموضوع</TableHead>
                      <TableHead>تاريخ الإنشاء</TableHead>
                      <TableHead>تاريخ الإنجاز</TableHead>
                      <TableHead>المورد المختار</TableHead>
                      <TableHead>القيمة النهائية</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">RFQ-2023-048</TableCell>
                      <TableCell>مواد تنظيف شاملة</TableCell>
                      <TableCell>2023-12-15</TableCell>
                      <TableCell>2023-12-22</TableCell>
                      <TableCell>شركة النظافة المتقدمة</TableCell>
                      <TableCell>8,500 ريال</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">RFQ-2023-047</TableCell>
                      <TableCell>قطع غيار السيارات</TableCell>
                      <TableCell>2023-12-10</TableCell>
                      <TableCell>2023-12-18</TableCell>
                      <TableCell>مؤسسة قطع الغيار</TableCell>
                      <TableCell>25,300 ريال</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestForQuotation;