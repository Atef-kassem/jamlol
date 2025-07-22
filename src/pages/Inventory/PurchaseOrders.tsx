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
import { 
  Plus, Save, Send, FileText, Search, Calendar, Users, DollarSign, 
  CheckCircle, Clock, AlertCircle, Upload, Download, Archive, Edit, 
  Trash2, Eye, Mail, Phone, Package, Filter, Printer, Star,
  TrendingUp, BarChart3, Building2, Truck, Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PurchaseOrders = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("new");
  const [purchaseOrder, setPurchaseOrder] = useState({
    poNumber: "PO-2024-001",
    purchaseRequestNumber: "",
    supplier: "",
    createdDate: new Date().toISOString().split('T')[0],
    expectedDeliveryDate: "",
    paymentTerms: "",
    deliveryTerms: "",
    notes: "",
    status: "مسودة",
    totalAmount: 0,
    items: [
      { id: 1, name: "", quantity: "", unit: "", price: "", specifications: "", total: 0 }
    ]
  });

  const [suppliers] = useState([
    { 
      id: "s1", 
      name: "شركة التوريدات المتقدمة", 
      contact: "أحمد محمد", 
      phone: "0501234567", 
      email: "info@advanced.com",
      rating: 4.8,
      avgDeliveryTime: "5 أيام",
      reliability: "ممتاز"
    },
    { 
      id: "s2", 
      name: "مؤسسة الخليج للمواد", 
      contact: "سالم العتيبي", 
      phone: "0509876543", 
      email: "sales@gulf.com",
      rating: 4.5,
      avgDeliveryTime: "7 أيام",
      reliability: "جيد جداً"
    },
    { 
      id: "s3", 
      name: "شركة الرياض التجارية", 
      contact: "فاطمة الزهراني", 
      phone: "0551112233", 
      email: "contact@riyadh.com",
      rating: 4.9,
      avgDeliveryTime: "3 أيام",
      reliability: "ممتاز"
    }
  ]);

  const [existingPOs] = useState([
    {
      id: 1,
      poNumber: "PO-2024-001",
      prNumber: "PR-2024-015",
      supplier: "شركة التوريدات المتقدمة",
      date: "2024-01-15",
      deliveryDate: "2024-01-25",
      total: 25000,
      status: "مؤكد",
      items: 5,
      paymentTerms: "آجل 30 يوم"
    },
    {
      id: 2,
      poNumber: "PO-2024-002",
      prNumber: "PR-2024-016",
      supplier: "مؤسسة الخليج للمواد",
      date: "2024-01-16",
      deliveryDate: "2024-01-28",
      total: 18500,
      status: "مرسل",
      items: 3,
      paymentTerms: "نقدي"
    },
    {
      id: 3,
      poNumber: "PO-2024-003",
      prNumber: "PR-2024-017",
      supplier: "شركة الرياض التجارية",
      date: "2024-01-17",
      deliveryDate: "2024-01-22",
      total: 32000,
      status: "قيد التنفيذ",
      items: 8,
      paymentTerms: "دفعات"
    }
  ]);

  const [purchaseRequests] = useState([
    {
      id: "PR-2024-018",
      description: "طلب توريد زيوت محركات",
      department: "الصيانة",
      date: "2024-01-18",
      status: "موافق عليه",
      total: 15000,
      items: ["زيت شل 5W-30", "زيت توتال 10W-40", "فلاتر زيت"]
    },
    {
      id: "PR-2024-019",
      description: "طلب مواد تنظيف",
      department: "الخدمات العامة",
      date: "2024-01-19",
      status: "موافق عليه",
      total: 8500,
      items: ["صابون مركز", "ملمع زجاج", "فوط ميكروفايبر"]
    }
  ]);

  const addItem = () => {
    setPurchaseOrder({
      ...purchaseOrder,
      items: [...purchaseOrder.items, { 
        id: Date.now(), 
        name: "", 
        quantity: "", 
        unit: "", 
        price: "",
        specifications: "",
        total: 0
      }]
    });
  };

  const removeItem = (id: number) => {
    setPurchaseOrder({
      ...purchaseOrder,
      items: purchaseOrder.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: number, field: string, value: string) => {
    const updatedItems = purchaseOrder.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          const quantity = parseFloat(updatedItem.quantity) || 0;
          const price = parseFloat(updatedItem.price) || 0;
          updatedItem.total = quantity * price;
        }
        return updatedItem;
      }
      return item;
    });
    
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
    
    setPurchaseOrder({
      ...purchaseOrder,
      items: updatedItems,
      totalAmount
    });
  };

  const handleSave = () => {
    toast({
      title: "تم حفظ أمر الشراء",
      description: "تم حفظ أمر الشراء كمسودة بنجاح",
    });
  };

  const handleSend = () => {
    if (!purchaseOrder.supplier) {
      toast({
        title: "خطأ",
        description: "يجب اختيار مورد لإرسال أمر الشراء",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "تم إرسال أمر الشراء",
      description: "تم إرسال أمر الشراء للمورد وإشعار المالية",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "مسودة": "secondary",
      "مرسل": "default",
      "مؤكد": "default",
      "قيد التنفيذ": "default",
      "مكتمل": "default",
      "ملغي": "destructive"
    };

    const icons = {
      "مسودة": <Edit className="w-3 h-3 mr-1" />,
      "مرسل": <Send className="w-3 h-3 mr-1" />,
      "مؤكد": <CheckCircle className="w-3 h-3 mr-1" />,
      "قيد التنفيذ": <Clock className="w-3 h-3 mr-1" />,
      "مكتمل": <CheckCircle className="w-3 h-3 mr-1" />,
      "ملغي": <AlertCircle className="w-3 h-3 mr-1" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as "default" | "destructive" | "secondary"}>
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    );
  };

  const getSupplierRecommendation = (supplierId: string) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return null;
    
    return (
      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">تقييم المورد: {supplier.rating}/5</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {supplier.reliability}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          متوسط وقت التوريد: {supplier.avgDeliveryTime}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">أوامر الشراء</h1>
          <p className="text-muted-foreground">
            إصدار ومتابعة أوامر الشراء والتعاقدات مع الموردين
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="new">
            <Plus className="ml-2 h-4 w-4" />
            أمر شراء جديد
          </TabsTrigger>
          <TabsTrigger value="requests">
            <FileText className="ml-2 h-4 w-4" />
            طلبات الشراء
          </TabsTrigger>
          <TabsTrigger value="list">
            <Package className="ml-2 h-4 w-4" />
            قائمة الأوامر
          </TabsTrigger>
          <TabsTrigger value="tracking">
            <Truck className="ml-2 h-4 w-4" />
            التتبع والمراقبة
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <Shield className="ml-2 h-4 w-4" />
            العقود والاتفاقيات
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="ml-2 h-4 w-4" />
            التقارير والتحليلات
          </TabsTrigger>
        </TabsList>

        {/* تبويب إنشاء أمر شراء جديد */}
        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إصدار أمر شراء جديد</CardTitle>
              <CardDescription>تحويل طلب الشراء المعتمد إلى أمر شراء رسمي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* المعلومات الأساسية */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="poNumber">رقم أمر الشراء</Label>
                  <Input 
                    id="poNumber" 
                    value={purchaseOrder.poNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prNumber">رقم طلب الشراء</Label>
                  <Select 
                    value={purchaseOrder.purchaseRequestNumber}
                    onValueChange={(value) => setPurchaseOrder({...purchaseOrder, purchaseRequestNumber: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر طلب الشراء" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseRequests.map((pr) => (
                        <SelectItem key={pr.id} value={pr.id}>
                          {pr.id} - {pr.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="createdDate">تاريخ الإنشاء</Label>
                  <Input 
                    id="createdDate" 
                    type="date"
                    value={purchaseOrder.createdDate}
                    disabled
                  />
                </div>
              </div>

              {/* اختيار المورد مع التوصيات الذكية */}
              <div className="space-y-4">
                <Label htmlFor="supplier">اختيار المورد</Label>
                <Select 
                  value={purchaseOrder.supplier}
                  onValueChange={(value) => setPurchaseOrder({...purchaseOrder, supplier: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المورد" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{supplier.name}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs">{supplier.rating}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {purchaseOrder.supplier && getSupplierRecommendation(purchaseOrder.supplier)}
              </div>

              {/* شروط الدفع والتسليم */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedDeliveryDate">تاريخ التسليم المتوقع</Label>
                  <Input 
                    id="expectedDeliveryDate" 
                    type="date"
                    value={purchaseOrder.expectedDeliveryDate}
                    onChange={(e) => setPurchaseOrder({...purchaseOrder, expectedDeliveryDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">شروط الدفع</Label>
                  <Select 
                    value={purchaseOrder.paymentTerms}
                    onValueChange={(value) => setPurchaseOrder({...purchaseOrder, paymentTerms: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر شروط الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="advance">مسبق</SelectItem>
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
                  placeholder="عنوان الفرع أو الموقع وشروط النقل"
                  value={purchaseOrder.deliveryTerms}
                  onChange={(e) => setPurchaseOrder({...purchaseOrder, deliveryTerms: e.target.value})}
                />
              </div>

              {/* الأصناف والمواد */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">أصناف الطلب</h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة صنف
                  </Button>
                </div>

                <div className="space-y-4">
                  {purchaseOrder.items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="grid grid-cols-5 gap-4">
                        <div className="space-y-2">
                          <Label>اسم الصنف</Label>
                          <Input 
                            placeholder="اسم المادة"
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
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>السعر</Label>
                          <Input 
                            type="number"
                            placeholder="0.00"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="space-y-2 flex-1">
                            <Label>الإجمالي</Label>
                            <Input 
                              value={item.total.toFixed(2)}
                              disabled
                            />
                          </div>
                          {purchaseOrder.items.length > 1 && (
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
                          placeholder="وصف تفصيلي للمادة ومواصفاتها"
                          value={item.specifications}
                          onChange={(e) => updateItem(item.id, 'specifications', e.target.value)}
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                {/* إجمالي أمر الشراء */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">الإجمالي النهائي:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {purchaseOrder.totalAmount.toFixed(2)} ريال
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* المرفقات والملاحظات */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea 
                    id="notes"
                    placeholder="أي تعليمات أو ملاحظات إضافية"
                    value={purchaseOrder.notes}
                    onChange={(e) => setPurchaseOrder({...purchaseOrder, notes: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">إرفاق المستندات</h3>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        اسحب الملفات هنا أو انقر للتحديد
                      </p>
                      <p className="text-xs text-muted-foreground">
                        عروض أسعار، اتفاقيات، مواصفات فنية (PDF, DOC, JPG)
                      </p>
                    </div>
                    <Button variant="outline" className="mt-4">
                      <Upload className="ml-2 h-4 w-4" />
                      اختيار ملفات
                    </Button>
                  </div>
                </div>
              </div>

              {/* أزرار الإجراء */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleSave}>
                  <Save className="ml-2 h-4 w-4" />
                  حفظ كمسودة
                </Button>
                <Button variant="outline">
                  <Eye className="ml-2 h-4 w-4" />
                  معاينة PDF
                </Button>
                <Button onClick={handleSend}>
                  <Send className="ml-2 h-4 w-4" />
                  إرسال للمورد
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب طلبات الشراء المعتمدة */}
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>طلبات الشراء المعتمدة</CardTitle>
              <CardDescription>تحويل طلبات الشراء المعتمدة إلى أوامر شراء</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>القسم</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.description}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{request.total.toLocaleString()} ريال</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => setActiveTab("new")}>
                          <Plus className="ml-2 h-4 w-4" />
                          تحويل لأمر شراء
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب قائمة أوامر الشراء */}
        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة أوامر الشراء</CardTitle>
              <CardDescription>جميع أوامر الشراء المُصدرة ومتابعة حالتها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="البحث في أوامر الشراء..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="حالة الأمر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="sent">مرسل</SelectItem>
                      <SelectItem value="confirmed">مؤكد</SelectItem>
                      <SelectItem value="inprogress">قيد التنفيذ</SelectItem>
                      <SelectItem value="completed">مكتمل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الأمر</TableHead>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>المورد</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>التسليم</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {existingPOs.map((po) => (
                      <TableRow key={po.id}>
                        <TableCell className="font-medium">{po.poNumber}</TableCell>
                        <TableCell>{po.prNumber}</TableCell>
                        <TableCell>{po.supplier}</TableCell>
                        <TableCell>{po.date}</TableCell>
                        <TableCell>{po.deliveryDate}</TableCell>
                        <TableCell>{po.total.toLocaleString()} ريال</TableCell>
                        <TableCell>{getStatusBadge(po.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب التتبع والمراقبة */}
        <TabsContent value="tracking" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="ml-2 h-5 w-5" />
                  سجل الإرسال
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">PO-2024-001</p>
                        <p className="text-sm text-muted-foreground">أُرسل إلى شركة التوريدات</p>
                      </div>
                      <span className="text-xs text-muted-foreground">اليوم 10:30</span>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs bg-green-100">
                        تم فتح الإيميل
                      </Badge>
                    </div>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">PO-2024-002</p>
                        <p className="text-sm text-muted-foreground">أُرسل إلى مؤسسة الخليج</p>
                      </div>
                      <span className="text-xs text-muted-foreground">أمس 14:20</span>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs bg-yellow-100">
                        في انتظار التأكيد
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="ml-2 h-5 w-5" />
                  حالة التأكيد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>أوامر مؤكدة</span>
                    <span className="font-semibold text-green-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>في انتظار التأكيد</span>
                    <span className="font-semibold text-yellow-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مرفوضة</span>
                    <span className="font-semibold text-red-600">1</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">معدل التأكيد: 67%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="ml-2 h-5 w-5" />
                  التسليم والمتابعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>تم التسليم</span>
                    <span className="font-semibold text-green-600">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>قيد التوريد</span>
                    <span className="font-semibold text-blue-600">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متأخر</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '50%'}}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">معدل التسليم في الوقت: 75%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تفاصيل التتبع</CardTitle>
              <CardDescription>متابعة تفصيلية لحالة كل أمر شراء</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الأمر</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead>حالة الإرسال</TableHead>
                    <TableHead>حالة التأكيد</TableHead>
                    <TableHead>حالة التوريد</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">PO-2024-001</TableCell>
                    <TableCell>شركة التوريدات المتقدمة</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        تم الإرسال
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        مؤكد
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">
                        قيد التوريد
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب العقود والاتفاقيات */}
        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>العقود والاتفاقيات السنوية</CardTitle>
              <CardDescription>إدارة العقود طويلة المدى والاتفاقيات المجمعة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">العقود النشطة</h3>
                  <Button>
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة عقد جديد
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم العقد</TableHead>
                      <TableHead>المورد</TableHead>
                      <TableHead>نوع العقد</TableHead>
                      <TableHead>تاريخ البداية</TableHead>
                      <TableHead>تاريخ الانتهاء</TableHead>
                      <TableHead>القيمة</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">CON-2024-001</TableCell>
                      <TableCell>شركة التوريدات المتقدمة</TableCell>
                      <TableCell>عقد زيوت سنوي</TableCell>
                      <TableCell>2024-01-01</TableCell>
                      <TableCell>2024-12-31</TableCell>
                      <TableCell>500,000 ريال</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          نشط
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CON-2024-002</TableCell>
                      <TableCell>مؤسسة الخليج للمواد</TableCell>
                      <TableCell>اتفاقية مواد تنظيف</TableCell>
                      <TableCell>2024-01-15</TableCell>
                      <TableCell>2025-01-15</TableCell>
                      <TableCell>200,000 ريال</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          نشط
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
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

        {/* تبويب التقارير والتحليلات */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="ml-2 h-5 w-5" />
                  إحصائيات عامة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>إجمالي أوامر الشراء</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>القيمة الإجمالية</span>
                    <span className="font-semibold text-green-600">1,250,000 ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط قيمة الأمر</span>
                    <span className="font-semibold">27,800 ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل التنفيذ</span>
                    <span className="font-semibold text-blue-600">89%</span>
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
                    <span>أفضل مورد</span>
                    <span className="font-semibold">شركة الرياض التجارية</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الأسرع في التوريد</span>
                    <span className="font-semibold">شركة التوريدات المتقدمة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الأوفر سعراً</span>
                    <span className="font-semibold">مؤسسة الخليج</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل الالتزام</span>
                    <span className="font-semibold text-green-600">92%</span>
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
                    <span className="font-semibold text-green-600">65,000 ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>هذا العام</span>
                    <span className="font-semibold text-green-600">450,000 ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط الوفورات</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>أكبر وفورات</span>
                    <span className="font-semibold text-green-600">85,000 ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تقارير تفصيلية</CardTitle>
              <CardDescription>إنتاج وتصدير التقارير المتخصصة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  تقرير أوامر الشراء
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
                  <Building2 className="h-6 w-6 mb-2" />
                  تقرير العقود
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchaseOrders;