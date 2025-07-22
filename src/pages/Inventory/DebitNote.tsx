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
import { 
  FileText, Search, Calendar, DollarSign, CheckCircle, Clock, 
  AlertCircle, Upload, Download, Edit, Eye, CreditCard, Building2,
  Mail, Phone, Package, Filter, Printer, Star, TrendingUp,
  BarChart3, Bell, Shield, Zap, RefreshCw, X, Check, AlertTriangle,
  Receipt, Banknote, Calculator, FileCheck, Users, Settings, Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DebitNote = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("new-debit");
  const [debitNote, setDebitNote] = useState({
    debitNumber: "DN-2024-001",
    debitDate: new Date().toISOString().split('T')[0],
    supplier: "",
    poNumber: "",
    invoiceNumber: "",
    reason: "",
    reasonDetails: "",
    debitAmount: 0,
    status: "مسودة",
    approver: "",
    sentDate: "",
    notes: "",
    items: [
      { id: 1, name: "", description: "", quantity: "", unitPrice: "", amount: 0 }
    ],
    attachments: []
  });

  const [existingDebits] = useState([
    {
      id: 1,
      debitNumber: "DN-2024-001",
      supplier: "شركة التوريدات المتقدمة",
      poNumber: "PO-2024-001",
      invoiceNumber: "INV-2024-001",
      date: "2024-01-25",
      amount: 1500,
      reason: "فرق كمية",
      status: "مرسل للمورد",
      approvedBy: "أحمد السعدون",
      sentDate: "2024-01-26"
    },
    {
      id: 2,
      debitNumber: "DN-2024-002",
      supplier: "مؤسسة الخليج للمواد",
      poNumber: "PO-2024-002",
      invoiceNumber: "INV-2024-002",
      date: "2024-01-26",
      amount: 850,
      reason: "غرامة تأخير",
      status: "بانتظار الموافقة",
      approvedBy: null,
      sentDate: null
    },
    {
      id: 3,
      debitNumber: "DN-2024-003",
      supplier: "شركة الرياض التجارية",
      poNumber: "PO-2024-003",
      invoiceNumber: "INV-2024-003",
      date: "2024-01-27",
      amount: 2200,
      reason: "عيب فني",
      status: "معتمد",
      approvedBy: "فاطمة الزهراني",
      sentDate: null
    }
  ]);

  const [suppliers] = useState([
    { id: "s1", name: "شركة التوريدات المتقدمة", contact: "أحمد محمد", email: "info@advanced.com" },
    { id: "s2", name: "مؤسسة الخليج للمواد", contact: "سالم العتيبي", email: "sales@gulf.com" },
    { id: "s3", name: "شركة الرياض التجارية", contact: "فاطمة الزهراني", email: "contact@riyadh.com" }
  ]);

  const [purchaseOrders] = useState([
    { id: "PO-2024-001", supplier: "شركة التوريدات المتقدمة", amount: 25000 },
    { id: "PO-2024-002", supplier: "مؤسسة الخليج للمواد", amount: 18500 },
    { id: "PO-2024-003", supplier: "شركة الرياض التجارية", amount: 31000 }
  ]);

  const [invoices] = useState([
    { id: "INV-2024-001", poNumber: "PO-2024-001", amount: 25000 },
    { id: "INV-2024-002", poNumber: "PO-2024-002", amount: 18500 },
    { id: "INV-2024-003", poNumber: "PO-2024-003", amount: 31000 }
  ]);

  const addItem = () => {
    setDebitNote({
      ...debitNote,
      items: [...debitNote.items, { 
        id: Date.now(), 
        name: "", 
        description: "", 
        quantity: "", 
        unitPrice: "",
        amount: 0
      }]
    });
  };

  const removeItem = (id: number) => {
    setDebitNote({
      ...debitNote,
      items: debitNote.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: number, field: string, value: string) => {
    const updatedItems = debitNote.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          const quantity = parseFloat(updatedItem.quantity) || 0;
          const unitPrice = parseFloat(updatedItem.unitPrice) || 0;
          updatedItem.amount = quantity * unitPrice;
        }
        return updatedItem;
      }
      return item;
    });
    
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    
    setDebitNote({
      ...debitNote,
      items: updatedItems,
      debitAmount: totalAmount
    });
  };

  const handleSaveDebit = () => {
    toast({
      title: "تم حفظ إشعار المدين",
      description: "تم حفظ إشعار المدين كمسودة بنجاح",
    });
  };

  const handleSubmitForApproval = () => {
    toast({
      title: "تم إرسال للموافقة",
      description: "تم إرسال إشعار المدين للموافقة الإدارية",
    });
  };

  const handleApproveDebit = () => {
    toast({
      title: "تمت الموافقة على الإشعار",
      description: "تم اعتماد إشعار المدين",
    });
  };

  const handleSendToSupplier = () => {
    toast({
      title: "تم إرسال الإشعار للمورد",
      description: "تم إرسال إشعار المدين للمورد إلكترونياً",
    });
  };

  const calculateAutomaticDifference = () => {
    // محاكاة حساب الفرق التلقائي
    const difference = Math.random() * 1000 + 500; // فرق عشوائي
    setDebitNote({
      ...debitNote,
      debitAmount: difference,
      reason: "فرق كمية",
      reasonDetails: "فرق في الكمية المستلمة مقارنة بالفاتورة"
    });
    
    toast({
      title: "تم حساب الفرق تلقائياً",
      description: `تم اكتشاف فرق بقيمة ${difference.toFixed(2)} ريال`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "مسودة": "secondary",
      "بانتظار الموافقة": "secondary",
      "معتمد": "default",
      "مرفوض": "destructive",
      "مرسل للمورد": "default"
    };

    const icons = {
      "مسودة": <Edit className="w-3 h-3 mr-1" />,
      "بانتظار الموافقة": <Clock className="w-3 h-3 mr-1" />,
      "معتمد": <CheckCircle className="w-3 h-3 mr-1" />,
      "مرفوض": <X className="w-3 h-3 mr-1" />,
      "مرسل للمورد": <Mail className="w-3 h-3 mr-1" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as "default" | "destructive" | "secondary"}>
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    );
  };

  const getReasonBadge = (reason: string) => {
    const colors = {
      "فرق كمية": "bg-blue-100 text-blue-800",
      "غرامة تأخير": "bg-red-100 text-red-800",
      "عيب فني": "bg-orange-100 text-orange-800",
      "تعديل سعر": "bg-purple-100 text-purple-800",
      "خصم اتفاقي": "bg-green-100 text-green-800"
    };

    return (
      <Badge className={colors[reason as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {reason}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إشعار مدين</h1>
          <p className="text-muted-foreground">
            إدارة إشعارات المدين والتسويات المالية مع الموردين
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="new-debit">
            <Plus className="ml-2 h-4 w-4" />
            إشعار جديد
          </TabsTrigger>
          <TabsTrigger value="debits-list">
            <FileText className="ml-2 h-4 w-4" />
            قائمة الإشعارات
          </TabsTrigger>
          <TabsTrigger value="approval">
            <Shield className="ml-2 h-4 w-4" />
            الموافقات
          </TabsTrigger>
          <TabsTrigger value="settlement">
            <Calculator className="ml-2 h-4 w-4" />
            التسوية المحاسبية
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="ml-2 h-4 w-4" />
            التقارير
          </TabsTrigger>
        </TabsList>

        {/* تبويب إشعار جديد */}
        <TabsContent value="new-debit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء إشعار مدين جديد</CardTitle>
              <CardDescription>إصدار إشعار مدين للمورد بمبلغ إضافي مستحق</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* المعلومات الأساسية */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="debitNumber">رقم الإشعار المدين</Label>
                  <Input 
                    id="debitNumber" 
                    value={debitNote.debitNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="debitDate">تاريخ الإشعار</Label>
                  <Input 
                    id="debitDate" 
                    type="date"
                    value={debitNote.debitDate}
                    onChange={(e) => setDebitNote({...debitNote, debitDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">اسم المورد</Label>
                  <Select 
                    value={debitNote.supplier}
                    onValueChange={(value) => setDebitNote({...debitNote, supplier: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المورد" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.name}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ربط أمر الشراء والفاتورة */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="poNumber">رقم أمر الشراء (اختياري)</Label>
                  <Select 
                    value={debitNote.poNumber}
                    onValueChange={(value) => setDebitNote({...debitNote, poNumber: value})}
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
                  <Label htmlFor="invoiceNumber">رقم الفاتورة المرتبطة (اختياري)</Label>
                  <Select 
                    value={debitNote.invoiceNumber}
                    onValueChange={(value) => setDebitNote({...debitNote, invoiceNumber: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفاتورة" />
                    </SelectTrigger>
                    <SelectContent>
                      {invoices
                        .filter(inv => inv.poNumber === debitNote.poNumber)
                        .map((invoice) => (
                          <SelectItem key={invoice.id} value={invoice.id}>
                            {invoice.id} - ({invoice.amount.toLocaleString()} ر.س)
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* سبب الإشعار المدين */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">سبب الإشعار المدين</Label>
                  <Select 
                    value={debitNote.reason}
                    onValueChange={(value) => setDebitNote({...debitNote, reason: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر السبب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="فرق كمية">فرق كمية</SelectItem>
                      <SelectItem value="غرامة تأخير">غرامة تأخير توريد</SelectItem>
                      <SelectItem value="عيب فني">عيب فني</SelectItem>
                      <SelectItem value="تعديل سعر">تعديل سعر</SelectItem>
                      <SelectItem value="خصم اتفاقي">خصم اتفاقي</SelectItem>
                      <SelectItem value="أخرى">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="debitAmount">قيمة الإشعار المدين</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="debitAmount"
                      type="number"
                      placeholder="0.00"
                      value={debitNote.debitAmount}
                      onChange={(e) => setDebitNote({...debitNote, debitAmount: parseFloat(e.target.value) || 0})}
                    />
                    <Button variant="outline" onClick={calculateAutomaticDifference}>
                      <Calculator className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* تفاصيل السبب */}
              <div className="space-y-2">
                <Label htmlFor="reasonDetails">شرح/تفاصيل السبب</Label>
                <Textarea 
                  id="reasonDetails"
                  placeholder="توضيح دقيق لسبب إصدار الإشعار المدين"
                  value={debitNote.reasonDetails}
                  onChange={(e) => setDebitNote({...debitNote, reasonDetails: e.target.value})}
                />
              </div>

              {/* الأصناف أو البنود (اختياري) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">الأصناف أو البنود (اختياري)</h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة بند
                  </Button>
                </div>

                <div className="space-y-4">
                  {debitNote.items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="grid grid-cols-5 gap-4">
                        <div className="space-y-2">
                          <Label>اسم الصنف/الوصف</Label>
                          <Input 
                            placeholder="اسم الصنف"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>التفاصيل</Label>
                          <Input 
                            placeholder="تفاصيل إضافية"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
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
                          <Label>سعر الوحدة</Label>
                          <Input 
                            type="number"
                            placeholder="0.00"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="space-y-2 flex-1">
                            <Label>المبلغ الفرعي</Label>
                            <Input 
                              value={item.amount.toFixed(2)}
                              disabled
                            />
                          </div>
                          {debitNote.items.length > 1 && (
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

              {/* المرفقات */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">مرفقات/صور/مستندات</h3>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      مستند إثبات، تقرير فني، صور توضيحية
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="ml-2 h-4 w-4" />
                      رفع ملفات
                    </Button>
                  </div>
                </div>
              </div>

              {/* ملاحظات إضافية */}
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea 
                  id="notes"
                  placeholder="أي ملاحظات أو تعليمات إضافية"
                  value={debitNote.notes}
                  onChange={(e) => setDebitNote({...debitNote, notes: e.target.value})}
                />
              </div>

              {/* إجمالي الإشعار */}
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">إجمالي الإشعار المدين:</span>
                    <span className="text-2xl font-bold text-red-600">
                      {debitNote.debitAmount.toFixed(2)} ريال
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* أزرار الإجراء */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleSaveDebit}>
                  <FileText className="ml-2 h-4 w-4" />
                  حفظ مسودة
                </Button>
                <Button onClick={handleSubmitForApproval}>
                  <Shield className="ml-2 h-4 w-4" />
                  إرسال للموافقة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب قائمة الإشعارات */}
        <TabsContent value="debits-list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة إشعارات المدين</CardTitle>
              <CardDescription>جميع إشعارات المدين الصادرة وحالتها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="البحث في إشعارات المدين..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="حالة الإشعار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="pending">بانتظار الموافقة</SelectItem>
                      <SelectItem value="approved">معتمد</SelectItem>
                      <SelectItem value="sent">مرسل للمورد</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <RefreshCw className="ml-2 h-4 w-4" />
                    تحديث
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الإشعار</TableHead>
                      <TableHead>المورد</TableHead>
                      <TableHead>رقم أمر الشراء</TableHead>
                      <TableHead>رقم الفاتورة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>السبب</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>المُعتمِد</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {existingDebits.map((debit) => (
                      <TableRow key={debit.id}>
                        <TableCell className="font-medium">{debit.debitNumber}</TableCell>
                        <TableCell>{debit.supplier}</TableCell>
                        <TableCell>{debit.poNumber}</TableCell>
                        <TableCell>{debit.invoiceNumber}</TableCell>
                        <TableCell>{debit.date}</TableCell>
                        <TableCell className="font-bold text-red-600">
                          {debit.amount.toLocaleString()} ر.س
                        </TableCell>
                        <TableCell>{getReasonBadge(debit.reason)}</TableCell>
                        <TableCell>{getStatusBadge(debit.status)}</TableCell>
                        <TableCell>{debit.approvedBy || "-"}</TableCell>
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

        {/* تبويب الموافقات */}
        <TabsContent value="approval" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الموافقة الإدارية</CardTitle>
              <CardDescription>مراجعة واعتماد إشعارات المدين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* الإشعارات المعلقة للموافقة */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">إشعارات بانتظار الموافقة</h3>
                  
                  {existingDebits
                    .filter(debit => debit.status === "بانتظار الموافقة")
                    .map((debit) => (
                      <Card key={debit.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="grid grid-cols-4 gap-4 flex-1">
                            <div>
                              <p className="text-sm font-medium">رقم الإشعار</p>
                              <p className="text-lg">{debit.debitNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">المورد</p>
                              <p>{debit.supplier}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">السبب</p>
                              <p>{debit.reason}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">المبلغ</p>
                              <p className="text-lg font-bold text-red-600">
                                {debit.amount.toLocaleString()} ر.س
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="ml-2 h-4 w-4" />
                              مراجعة
                            </Button>
                            <Button size="sm" onClick={handleApproveDebit}>
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
                          <TableHead>رقم الإشعار</TableHead>
                          <TableHead>المورد</TableHead>
                          <TableHead>المبلغ</TableHead>
                          <TableHead>المُوافِق</TableHead>
                          <TableHead>تاريخ الموافقة</TableHead>
                          <TableHead>الملاحظات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {existingDebits
                          .filter(debit => debit.approvedBy)
                          .map((debit) => (
                            <TableRow key={debit.id}>
                              <TableCell className="font-medium">{debit.debitNumber}</TableCell>
                              <TableCell>{debit.supplier}</TableCell>
                              <TableCell>{debit.amount.toLocaleString()} ر.س</TableCell>
                              <TableCell>{debit.approvedBy}</TableCell>
                              <TableCell>{debit.date}</TableCell>
                              <TableCell>موافقة عادية</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* إرسال للموردين */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إرسال للموردين</CardTitle>
                    <CardDescription>إشعارات معتمدة جاهزة للإرسال</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {existingDebits
                        .filter(debit => debit.status === "معتمد")
                        .map((debit) => (
                          <div key={debit.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="font-medium">{debit.debitNumber}</p>
                                <p className="text-sm text-muted-foreground">{debit.supplier}</p>
                              </div>
                              <div>
                                <p className="font-bold text-red-600">{debit.amount.toLocaleString()} ر.س</p>
                              </div>
                            </div>
                            <Button onClick={handleSendToSupplier}>
                              <Mail className="ml-2 h-4 w-4" />
                              إرسال للمورد
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب التسوية المحاسبية */}
        <TabsContent value="settlement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التسوية المحاسبية</CardTitle>
              <CardDescription>ربط إشعارات المدين بالفواتير والتسويات المالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* إحصائيات التسوية */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <DollarSign className="mx-auto h-8 w-8 text-red-600" />
                      <h3 className="font-medium">إجمالي الإشعارات</h3>
                      <p className="text-2xl font-bold text-red-600">4,550 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                      <h3 className="font-medium">تم التسوية</h3>
                      <p className="text-2xl font-bold text-green-600">1,500 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Clock className="mx-auto h-8 w-8 text-yellow-600" />
                      <h3 className="font-medium">بانتظار التسوية</h3>
                      <p className="text-2xl font-bold text-yellow-600">3,050 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Calculator className="mx-auto h-8 w-8 text-blue-600" />
                      <h3 className="font-medium">متوسط الإشعار</h3>
                      <p className="text-2xl font-bold text-blue-600">1,138 ر.س</p>
                    </div>
                  </Card>
                </div>

                {/* ربط الحسابات */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ربط الحسابات التلقائي</CardTitle>
                    <CardDescription>تحديث أرصدة الموردين والالتزامات المالية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="p-3">
                          <div className="text-center">
                            <h4 className="font-medium">شركة التوريدات المتقدمة</h4>
                            <p className="text-sm text-muted-foreground">رصيد قبل الإشعار: 25,000 ر.س</p>
                            <p className="text-sm text-muted-foreground">إشعار مدين: -1,500 ر.س</p>
                            <p className="font-bold text-green-600">الرصيد الجديد: 23,500 ر.س</p>
                          </div>
                        </Card>
                        <Card className="p-3">
                          <div className="text-center">
                            <h4 className="font-medium">مؤسسة الخليج للمواد</h4>
                            <p className="text-sm text-muted-foreground">رصيد قبل الإشعار: 18,500 ر.س</p>
                            <p className="text-sm text-muted-foreground">إشعار مدين: -850 ر.س</p>
                            <p className="font-bold text-green-600">الرصيد الجديد: 17,650 ر.س</p>
                          </div>
                        </Card>
                        <Card className="p-3">
                          <div className="text-center">
                            <h4 className="font-medium">شركة الرياض التجارية</h4>
                            <p className="text-sm text-muted-foreground">رصيد قبل الإشعار: 31,000 ر.س</p>
                            <p className="text-sm text-muted-foreground">إشعار مدين: -2,200 ر.س</p>
                            <p className="font-bold text-green-600">الرصيد الجديد: 28,800 ر.س</p>
                          </div>
                        </Card>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button>
                          <Zap className="ml-2 h-4 w-4" />
                          تنفيذ التسوية التلقائية
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                    <span>إجمالي الإشعارات</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>قيمة الإشعارات</span>
                    <span className="font-semibold text-red-600">32,400 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل الموافقة</span>
                    <span className="font-semibold text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط وقت المعالجة</span>
                    <span className="font-semibold">2.3 يوم</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="ml-2 h-5 w-5" />
                  أسباب الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>فرق كمية</span>
                    <span className="font-semibold">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>غرامة تأخير</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>عيب فني</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تعديل سعر</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>خصم اتفاقي</span>
                    <span className="font-semibold">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="ml-2 h-5 w-5" />
                  الموردين الأكثر تعرضاً
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>شركة الرياض التجارية</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-red-600">6 إشعارات</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>شركة التوريدات المتقدمة</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-orange-600">4 إشعارات</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>مؤسسة الخليج للمواد</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-yellow-600">2 إشعارات</span>
                    </div>
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
                  تقرير الإشعارات
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Calculator className="h-6 w-6 mb-2" />
                  تقرير التسويات
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  تقرير الموردين
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  تحليل الأسباب
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DebitNote;