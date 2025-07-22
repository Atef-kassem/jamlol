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
  FileText, Search, Calendar, DollarSign, CheckCircle, Clock, 
  AlertCircle, Upload, Download, Edit, Eye, CreditCard, Building2,
  Scan, Mail, Phone, Package, Filter, Printer, Star, TrendingUp,
  BarChart3, Bell, Shield, Zap, RefreshCw, X, Check, AlertTriangle,
  Receipt, Banknote, Calculator, FileCheck, Users, Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InvoiceProcessing = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("processing");
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split('T')[0],
    supplier: "",
    poNumber: "",
    grnNumber: "",
    invoiceAmount: 0,
    dueDate: "",
    paymentMethod: "",
    actualPaymentDate: "",
    status: "بانتظار مطابقة",
    matchingStatus: "تحت المراجعة",
    notes: "",
    items: [
      { id: 1, name: "", quantity: "", price: "", total: 0, poQuantity: "", grnQuantity: "", variance: 0 }
    ],
    attachments: []
  });

  const [invoiceList] = useState([
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      supplier: "شركة التوريدات المتقدمة",
      poNumber: "PO-2024-001",
      grnNumber: "GRN-2024-001",
      date: "2024-01-25",
      amount: 25000,
      dueDate: "2024-02-24",
      status: "مدفوعة",
      matchingStatus: "مطابق",
      paymentDate: "2024-02-20",
      approvedBy: "أحمد السعدون",
      variance: 0
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      supplier: "مؤسسة الخليج للمواد",
      poNumber: "PO-2024-002",
      grnNumber: "GRN-2024-002",
      date: "2024-01-26",
      amount: 18750,
      dueDate: "2024-02-25",
      status: "بانتظار الدفع",
      matchingStatus: "مطابق",
      paymentDate: null,
      approvedBy: "فاطمة الزهراني",
      variance: 250
    },
    {
      id: 3,
      invoiceNumber: "INV-2024-003",
      supplier: "شركة الرياض التجارية",
      poNumber: "PO-2024-003",
      grnNumber: null,
      date: "2024-01-27",
      amount: 32500,
      dueDate: "2024-02-26",
      status: "غير مطابقة",
      matchingStatus: "غير مطابق",
      paymentDate: null,
      approvedBy: null,
      variance: 1500
    }
  ]);

  const [purchaseOrders] = useState([
    { id: "PO-2024-001", supplier: "شركة التوريدات المتقدمة", amount: 25000 },
    { id: "PO-2024-002", supplier: "مؤسسة الخليج للمواد", amount: 18500 },
    { id: "PO-2024-003", supplier: "شركة الرياض التجارية", amount: 31000 }
  ]);

  const [goodsReceipts] = useState([
    { id: "GRN-2024-001", poNumber: "PO-2024-001", receivedAmount: 25000 },
    { id: "GRN-2024-002", poNumber: "PO-2024-002", receivedAmount: 18500 }
  ]);

  const [paymentSchedule] = useState([
    {
      id: 1,
      invoiceNumber: "INV-2024-002",
      supplier: "مؤسسة الخليج للمواد",
      amount: 18750,
      dueDate: "2024-02-25",
      scheduledDate: "2024-02-24",
      status: "مجدول",
      paymentMethod: "تحويل بنكي"
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-004",
      supplier: "شركة المواد الصناعية",
      amount: 42000,
      dueDate: "2024-03-01",
      scheduledDate: "2024-02-28",
      status: "بانتظار الموافقة",
      paymentMethod: "شيك"
    }
  ]);

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { 
        id: Date.now(), 
        name: "", 
        quantity: "", 
        price: "", 
        total: 0,
        poQuantity: "",
        grnQuantity: "",
        variance: 0
      }]
    });
  };

  const removeItem = (id: number) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: number, field: string, value: string) => {
    const updatedItems = invoice.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          const quantity = parseFloat(updatedItem.quantity) || 0;
          const price = parseFloat(updatedItem.price) || 0;
          updatedItem.total = quantity * price;
          
          // Calculate variance
          const poQty = parseFloat(updatedItem.poQuantity) || 0;
          const grnQty = parseFloat(updatedItem.grnQuantity) || 0;
          updatedItem.variance = Math.abs(quantity - grnQty) * price;
        }
        return updatedItem;
      }
      return item;
    });
    
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
    
    setInvoice({
      ...invoice,
      items: updatedItems,
      invoiceAmount: totalAmount
    });
  };

  const performThreeWayMatch = () => {
    // Simulate three-way matching logic
    const hasDiscrepancies = invoice.items.some(item => item.variance > 0);
    
    if (hasDiscrepancies) {
      setInvoice({
        ...invoice,
        matchingStatus: "غير مطابق",
        status: "تحت المراجعة"
      });
      toast({
        title: "تم اكتشاف عدم تطابق",
        description: "توجد فروقات بين الفاتورة وسند الاستلام",
        variant: "destructive"
      });
    } else {
      setInvoice({
        ...invoice,
        matchingStatus: "مطابق",
        status: "بانتظار الموافقة"
      });
      toast({
        title: "تمت المطابقة بنجاح",
        description: "الفاتورة متطابقة مع أمر الشراء وسند الاستلام",
      });
    }
  };

  const handleOCRScan = () => {
    toast({
      title: "تم بدء المسح الضوئي",
      description: "جاري قراءة وتحليل الفاتورة...",
    });
    
    // Simulate OCR processing
    setTimeout(() => {
      setInvoice({
        ...invoice,
        invoiceNumber: "INV-OCR-" + Date.now(),
        supplier: "مورد تم اكتشافه",
        invoiceAmount: 15000
      });
      toast({
        title: "تم المسح بنجاح",
        description: "تم استخراج بيانات الفاتورة تلقائياً",
      });
    }, 2000);
  };

  const handleApprovePayment = () => {
    toast({
      title: "تمت الموافقة على الدفع",
      description: "تم إرسال الفاتورة لجدولة الدفع",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "بانتظار مطابقة": "secondary",
      "مطابق": "default",
      "غير مطابق": "destructive",
      "تحت المراجعة": "secondary",
      "بانتظار الموافقة": "default",
      "بانتظار الدفع": "default",
      "مدفوعة": "default",
      "مرفوضة": "destructive",
      "مجدول": "default"
    };

    const icons = {
      "بانتظار مطابقة": <Clock className="w-3 h-3 mr-1" />,
      "مطابق": <CheckCircle className="w-3 h-3 mr-1" />,
      "غير مطابق": <AlertTriangle className="w-3 h-3 mr-1" />,
      "تحت المراجعة": <Search className="w-3 h-3 mr-1" />,
      "بانتظار الموافقة": <Clock className="w-3 h-3 mr-1" />,
      "بانتظار الدفع": <CreditCard className="w-3 h-3 mr-1" />,
      "مدفوعة": <CheckCircle className="w-3 h-3 mr-1" />,
      "مرفوضة": <X className="w-3 h-3 mr-1" />,
      "مجدول": <Calendar className="w-3 h-3 mr-1" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as "default" | "destructive" | "secondary"}>
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">معالجة الفواتير والدفع</h1>
          <p className="text-muted-foreground">
            المطابقة الثلاثية الذكية ومعالجة دفعات الموردين
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="processing">
            <FileText className="ml-2 h-4 w-4" />
            معالجة الفواتير
          </TabsTrigger>
          <TabsTrigger value="matching">
            <FileCheck className="ml-2 h-4 w-4" />
            المطابقة الثلاثية
          </TabsTrigger>
          <TabsTrigger value="approval">
            <Shield className="ml-2 h-4 w-4" />
            موافقة الدفع
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="ml-2 h-4 w-4" />
            جدولة الدفع
          </TabsTrigger>
          <TabsTrigger value="history">
            <Receipt className="ml-2 h-4 w-4" />
            سجل الفواتير
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="ml-2 h-4 w-4" />
            التقارير
          </TabsTrigger>
        </TabsList>

        {/* تبويب معالجة الفواتير */}
        <TabsContent value="processing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إدخال فاتورة جديدة</CardTitle>
              <CardDescription>إدخال وقراءة الفواتير مع المسح الضوئي الذكي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* خيارات الإدخال */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="text-center space-y-2">
                    <Scan className="mx-auto h-12 w-12 text-blue-600" />
                    <h3 className="font-medium">مسح ضوئي ذكي</h3>
                    <p className="text-sm text-muted-foreground">قراءة الفاتورة تلقائياً بـ OCR</p>
                    <Button onClick={handleOCRScan} size="sm" className="w-full">
                      <Scan className="ml-2 h-4 w-4" />
                      بدء المسح
                    </Button>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="text-center space-y-2">
                    <Mail className="mx-auto h-12 w-12 text-green-600" />
                    <h3 className="font-medium">من البريد الإلكتروني</h3>
                    <p className="text-sm text-muted-foreground">استيراد من إيميل المورد</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="ml-2 h-4 w-4" />
                      استيراد
                    </Button>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="text-center space-y-2">
                    <Edit className="mx-auto h-12 w-12 text-orange-600" />
                    <h3 className="font-medium">إدخال يدوي</h3>
                    <p className="text-sm text-muted-foreground">كتابة بيانات الفاتورة يدوياً</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="ml-2 h-4 w-4" />
                      إدخال يدوي
                    </Button>
                  </div>
                </Card>
              </div>

              {/* المعلومات الأساسية */}
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">رقم الفاتورة</Label>
                  <Input 
                    id="invoiceNumber"
                    placeholder="INV-2024-001"
                    value={invoice.invoiceNumber}
                    onChange={(e) => setInvoice({...invoice, invoiceNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceDate">تاريخ الفاتورة</Label>
                  <Input 
                    id="invoiceDate" 
                    type="date"
                    value={invoice.invoiceDate}
                    onChange={(e) => setInvoice({...invoice, invoiceDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">اسم المورد</Label>
                  <Select 
                    value={invoice.supplier}
                    onValueChange={(value) => setInvoice({...invoice, supplier: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المورد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="شركة التوريدات المتقدمة">شركة التوريدات المتقدمة</SelectItem>
                      <SelectItem value="مؤسسة الخليج للمواد">مؤسسة الخليج للمواد</SelectItem>
                      <SelectItem value="شركة الرياض التجارية">شركة الرياض التجارية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceAmount">مبلغ الفاتورة</Label>
                  <Input 
                    id="invoiceAmount"
                    type="number"
                    placeholder="0.00"
                    value={invoice.invoiceAmount}
                    onChange={(e) => setInvoice({...invoice, invoiceAmount: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>

              {/* ربط أمر الشراء وسند الاستلام */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="poNumber">رقم أمر الشراء</Label>
                  <Select 
                    value={invoice.poNumber}
                    onValueChange={(value) => setInvoice({...invoice, poNumber: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر أمر الشراء" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrders.map((po) => (
                        <SelectItem key={po.id} value={po.id}>
                          {po.id} - {po.supplier} ({po.amount.toLocaleString()} ر.س)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grnNumber">رقم سند الاستلام</Label>
                  <Select 
                    value={invoice.grnNumber}
                    onValueChange={(value) => setInvoice({...invoice, grnNumber: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر سند الاستلام" />
                    </SelectTrigger>
                    <SelectContent>
                      {goodsReceipts
                        .filter(grn => grn.poNumber === invoice.poNumber)
                        .map((grn) => (
                          <SelectItem key={grn.id} value={grn.id}>
                            {grn.id} - ({grn.receivedAmount.toLocaleString()} ر.س)
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* الأصناف بالفاتورة */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">الأصناف بالفاتورة</h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <FileText className="ml-2 h-4 w-4" />
                    إضافة صنف
                  </Button>
                </div>

                <div className="space-y-4">
                  {invoice.items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="grid grid-cols-8 gap-4">
                        <div className="space-y-2">
                          <Label>اسم الصنف</Label>
                          <Input 
                            placeholder="اسم المادة"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>كمية الفاتورة</Label>
                          <Input 
                            type="number"
                            placeholder="0"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          />
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
                        <div className="space-y-2">
                          <Label>الإجمالي</Label>
                          <Input 
                            value={item.total.toFixed(2)}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>كمية أمر الشراء</Label>
                          <Input 
                            type="number"
                            placeholder="0"
                            value={item.poQuantity}
                            onChange={(e) => updateItem(item.id, 'poQuantity', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>كمية الاستلام</Label>
                          <Input 
                            type="number"
                            placeholder="0"
                            value={item.grnQuantity}
                            onChange={(e) => updateItem(item.id, 'grnQuantity', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الفرق</Label>
                          <Input 
                            value={item.variance.toFixed(2)}
                            disabled
                            className={item.variance > 0 ? "text-red-600" : "text-green-600"}
                          />
                        </div>
                        <div className="flex items-end">
                          {invoice.items.length > 1 && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* شروط الدفع */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">تاريخ الاستحقاق</Label>
                  <Input 
                    id="dueDate" 
                    type="date"
                    value={invoice.dueDate}
                    onChange={(e) => setInvoice({...invoice, dueDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">طريقة الدفع</Label>
                  <Select 
                    value={invoice.paymentMethod}
                    onValueChange={(value) => setInvoice({...invoice, paymentMethod: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر طريقة الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer">تحويل بنكي</SelectItem>
                      <SelectItem value="check">شيك</SelectItem>
                      <SelectItem value="cash">نقدي</SelectItem>
                      <SelectItem value="credit">بطاقة ائتمان</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actualPaymentDate">تاريخ الدفع الفعلي</Label>
                  <Input 
                    id="actualPaymentDate" 
                    type="date"
                    value={invoice.actualPaymentDate}
                    onChange={(e) => setInvoice({...invoice, actualPaymentDate: e.target.value})}
                  />
                </div>
              </div>

              {/* المرفقات والملاحظات */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات/اختلافات</Label>
                  <Textarea 
                    id="notes"
                    placeholder="أي ملاحظات على الفاتورة، خصومات، غرامات تأخير..."
                    value={invoice.notes}
                    onChange={(e) => setInvoice({...invoice, notes: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <Label>مرفقات الفاتورة</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        صورة الفاتورة، مستندات إثبات
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="ml-2 h-4 w-4" />
                        رفع ملفات
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* أزرار الإجراء */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline">
                  <FileText className="ml-2 h-4 w-4" />
                  حفظ مسودة
                </Button>
                <Button onClick={performThreeWayMatch}>
                  <Zap className="ml-2 h-4 w-4" />
                  تنفيذ المطابقة الثلاثية
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب المطابقة الثلاثية */}
        <TabsContent value="matching" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المطابقة الثلاثية الذكية</CardTitle>
              <CardDescription>مراجعة مطابقة الفاتورة مع أمر الشراء وسند الاستلام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* حالة المطابقة */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Package className="mx-auto h-8 w-8 text-blue-600" />
                      <h3 className="font-medium">أمر الشراء</h3>
                      <p className="text-sm text-muted-foreground">PO-2024-001</p>
                      <Badge className="bg-green-100 text-green-800">مطابق</Badge>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Receipt className="mx-auto h-8 w-8 text-green-600" />
                      <h3 className="font-medium">سند الاستلام</h3>
                      <p className="text-sm text-muted-foreground">GRN-2024-001</p>
                      <Badge className="bg-green-100 text-green-800">مطابق</Badge>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <FileText className="mx-auto h-8 w-8 text-orange-600" />
                      <h3 className="font-medium">الفاتورة</h3>
                      <p className="text-sm text-muted-foreground">INV-2024-001</p>
                      <Badge className="bg-yellow-100 text-yellow-800">تحت المراجعة</Badge>
                    </div>
                  </Card>
                </div>

                {/* تفاصيل المطابقة */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">تفاصيل المطابقة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>الصنف</TableHead>
                          <TableHead>كمية أمر الشراء</TableHead>
                          <TableHead>كمية الاستلام</TableHead>
                          <TableHead>كمية الفاتورة</TableHead>
                          <TableHead>سعر أمر الشراء</TableHead>
                          <TableHead>سعر الفاتورة</TableHead>
                          <TableHead>الفرق</TableHead>
                          <TableHead>الحالة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">زيت شل 5W-30</TableCell>
                          <TableCell>20</TableCell>
                          <TableCell>20</TableCell>
                          <TableCell>20</TableCell>
                          <TableCell>120 ر.س</TableCell>
                          <TableCell>120 ر.س</TableCell>
                          <TableCell>0 ر.س</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              مطابق
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">فلاتر زيت</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>18</TableCell>
                          <TableCell>45 ر.س</TableCell>
                          <TableCell>45 ر.س</TableCell>
                          <TableCell>135 ر.س</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              غير مطابق
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* إجراءات المطابقة */}
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">
                    <AlertCircle className="ml-2 h-4 w-4" />
                    تحويل للمراجعة
                  </Button>
                  <Button variant="outline">
                    <Phone className="ml-2 h-4 w-4" />
                    التواصل مع المورد
                  </Button>
                  <Button>
                    <CheckCircle className="ml-2 h-4 w-4" />
                    قبول مع الملاحظات
                  </Button>
                  <Button variant="destructive">
                    <X className="ml-2 h-4 w-4" />
                    رفض الفاتورة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب موافقة الدفع */}
        <TabsContent value="approval" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>دورة موافقة الدفع</CardTitle>
              <CardDescription>مراجعة وموافقة الفواتير للدفع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* الفواتير المعلقة للموافقة */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">الفواتير بانتظار الموافقة</h3>
                  
                  {invoiceList
                    .filter(inv => inv.status === "بانتظار الموافقة" || inv.status === "بانتظار الدفع")
                    .map((invoice) => (
                      <Card key={invoice.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="grid grid-cols-4 gap-4 flex-1">
                            <div>
                              <p className="text-sm font-medium">رقم الفاتورة</p>
                              <p className="text-lg">{invoice.invoiceNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">المورد</p>
                              <p>{invoice.supplier}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">المبلغ</p>
                              <p className="text-lg font-bold text-green-600">
                                {invoice.amount.toLocaleString()} ر.س
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">تاريخ الاستحقاق</p>
                              <p>{invoice.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="ml-2 h-4 w-4" />
                              مراجعة
                            </Button>
                            <Button size="sm" onClick={handleApprovePayment}>
                              <CheckCircle className="ml-2 h-4 w-4" />
                              موافقة
                            </Button>
                            <Button variant="destructive" size="sm">
                              <X className="ml-2 h-4 w-4" />
                              رفض
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>

                {/* سجل الموافقات */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">سجل الموافقات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>رقم الفاتورة</TableHead>
                          <TableHead>المورد</TableHead>
                          <TableHead>المبلغ</TableHead>
                          <TableHead>المُوافِق</TableHead>
                          <TableHead>تاريخ الموافقة</TableHead>
                          <TableHead>الملاحظات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV-2024-001</TableCell>
                          <TableCell>شركة التوريدات المتقدمة</TableCell>
                          <TableCell>25,000 ر.س</TableCell>
                          <TableCell>أحمد السعدون</TableCell>
                          <TableCell>2024-01-25</TableCell>
                          <TableCell>موافقة عادية</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV-2024-002</TableCell>
                          <TableCell>مؤسسة الخليج للمواد</TableCell>
                          <TableCell>18,750 ر.س</TableCell>
                          <TableCell>فاطمة الزهراني</TableCell>
                          <TableCell>2024-01-26</TableCell>
                          <TableCell>موافقة مع خصم تأخير</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب جدولة الدفع */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>جدولة الدفعات</CardTitle>
              <CardDescription>تنظيم وجدولة دفعات الموردين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* إحصائيات الدفع */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Calendar className="mx-auto h-8 w-8 text-blue-600" />
                      <h3 className="font-medium">مجدول اليوم</h3>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">45,000 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Clock className="mx-auto h-8 w-8 text-yellow-600" />
                      <h3 className="font-medium">مستحق هذا الأسبوع</h3>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">120,000 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <AlertTriangle className="mx-auto h-8 w-8 text-red-600" />
                      <h3 className="font-medium">متأخر</h3>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">15,000 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                      <h3 className="font-medium">مدفوع اليوم</h3>
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-sm text-muted-foreground">75,000 ر.س</p>
                    </div>
                  </Card>
                </div>

                {/* جدول الدفعات المجدولة */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">الدفعات المجدولة</h3>
                    <Button>
                      <CreditCard className="ml-2 h-4 w-4" />
                      إجراء دفعة
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الفاتورة</TableHead>
                        <TableHead>المورد</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>تاريخ الاستحقاق</TableHead>
                        <TableHead>تاريخ الدفع المجدول</TableHead>
                        <TableHead>طريقة الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentSchedule.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                          <TableCell>{payment.supplier}</TableCell>
                          <TableCell>{payment.amount.toLocaleString()} ر.س</TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>{payment.scheduledDate}</TableCell>
                          <TableCell>{payment.paymentMethod}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm">
                                <CreditCard className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب سجل الفواتير */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل الفواتير</CardTitle>
              <CardDescription>جميع الفواتير المعالجة وحالتها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="البحث في الفواتير..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="حالة الفاتورة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="pending">بانتظار المطابقة</SelectItem>
                      <SelectItem value="matched">مطابقة</SelectItem>
                      <SelectItem value="approved">موافق عليها</SelectItem>
                      <SelectItem value="paid">مدفوعة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الفاتورة</TableHead>
                      <TableHead>المورد</TableHead>
                      <TableHead>رقم أمر الشراء</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>حالة المطابقة</TableHead>
                      <TableHead>حالة الدفع</TableHead>
                      <TableHead>الفرق</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceList.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.supplier}</TableCell>
                        <TableCell>{invoice.poNumber}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount.toLocaleString()} ر.س</TableCell>
                        <TableCell>{getStatusBadge(invoice.matchingStatus)}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          {invoice.variance > 0 ? (
                            <span className="text-red-600 font-medium">
                              {invoice.variance.toLocaleString()} ر.س
                            </span>
                          ) : (
                            <span className="text-green-600">0 ر.س</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
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

        {/* تبويب التقارير */}
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
                    <span>إجمالي الفواتير</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل المطابقة</span>
                    <span className="font-semibold text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط وقت المعالجة</span>
                    <span className="font-semibold">2.5 يوم</span>
                  </div>
                  <div className="flex justify-between">
                    <span>إجمالي المدفوعات</span>
                    <span className="font-semibold text-green-600">2,450,000 ر.س</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="ml-2 h-5 w-5" />
                  كفاءة المطابقة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>مطابقة تلقائية</span>
                    <span className="font-semibold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مطابقة يدوية</span>
                    <span className="font-semibold text-blue-600">16%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>فواتير مرفوضة</span>
                    <span className="font-semibold text-red-600">6%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="ml-2 h-5 w-5" />
                  أداء المدفوعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>دفع في الوقت</span>
                    <span className="font-semibold text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>دفع مبكر</span>
                    <span className="font-semibold text-blue-600">7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>دفع متأخر</span>
                    <span className="font-semibold text-red-600">4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط الخصم المحقق</span>
                    <span className="font-semibold text-green-600">2.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تقارير تفصيلية</CardTitle>
              <CardDescription>إنتاج وتصدير التقارير المالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  تقرير الفواتير
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Calculator className="h-6 w-6 mb-2" />
                  تقرير المطابقة
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <CreditCard className="h-6 w-6 mb-2" />
                  تقرير المدفوعات
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  تحليل الأداء
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceProcessing;