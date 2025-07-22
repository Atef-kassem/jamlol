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
  Package, Search, Calendar, DollarSign, CheckCircle, Clock, 
  AlertCircle, Upload, Download, Edit, Eye, ArrowLeft, Building2,
  Camera, Mail, Phone, FileText, Filter, Printer, Star, TrendingUp,
  BarChart3, Bell, Shield, Zap, RefreshCw, X, Check, AlertTriangle,
  Receipt, Banknote, Calculator, FileCheck, Users, Settings, Undo2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PurchaseReturns = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("new-return");
  const [purchaseReturn, setPurchaseReturn] = useState({
    returnNumber: "PR-2024-001",
    returnDate: new Date().toISOString().split('T')[0],
    poNumber: "",
    grnNumber: "",
    supplier: "",
    department: "",
    status: "بانتظار الموافقة",
    notes: "",
    approver: "",
    supplierReceiptNumber: "",
    items: [
      { id: 1, name: "", returnedQty: "", unit: "", batchNumber: "", condition: "", reason: "", notes: "", maxQty: "" }
    ],
    attachments: []
  });

  const [existingReturns] = useState([
    {
      id: 1,
      returnNumber: "PR-2024-001",
      supplier: "شركة التوريدات المتقدمة",
      poNumber: "PO-2024-001",
      grnNumber: "GRN-2024-001",
      date: "2024-01-25",
      totalItems: 2,
      totalValue: 2400,
      status: "مكتمل",
      reason: "عيب في التصنيع",
      approvedBy: "أحمد السعدون",
      completedDate: "2024-01-28"
    },
    {
      id: 2,
      returnNumber: "PR-2024-002",
      supplier: "مؤسسة الخليج للمواد",
      poNumber: "PO-2024-002",
      grnNumber: "GRN-2024-002",
      date: "2024-01-26",
      totalItems: 1,
      totalValue: 850,
      status: "بانتظار الموافقة",
      reason: "كمية زائدة",
      approvedBy: null,
      completedDate: null
    },
    {
      id: 3,
      returnNumber: "PR-2024-003",
      supplier: "شركة الرياض التجارية",
      poNumber: "PO-2024-003",
      grnNumber: null,
      date: "2024-01-27",
      totalItems: 3,
      totalValue: 1200,
      status: "تحت التسوية المالية",
      reason: "عدم مطابقة المواصفات",
      approvedBy: "فاطمة الزهراني",
      completedDate: null
    }
  ]);

  const [purchaseOrders] = useState([
    { id: "PO-2024-001", supplier: "شركة التوريدات المتقدمة", date: "2024-01-15" },
    { id: "PO-2024-002", supplier: "مؤسسة الخليج للمواد", date: "2024-01-16" },
    { id: "PO-2024-003", supplier: "شركة الرياض التجارية", date: "2024-01-17" }
  ]);

  const [goodsReceipts] = useState([
    { id: "GRN-2024-001", poNumber: "PO-2024-001", items: ["زيت شل 5W-30", "فلاتر زيت"] },
    { id: "GRN-2024-002", poNumber: "PO-2024-002", items: ["صابون مركز", "ملمع زجاج"] }
  ]);

  const [financialSettlements] = useState([
    {
      id: 1,
      returnNumber: "PR-2024-001",
      supplier: "شركة التوريدات المتقدمة",
      returnValue: 2400,
      creditNoteNumber: "CN-2024-001",
      settlementDate: "2024-01-30",
      status: "مسوى",
      paymentMethod: "خصم من فاتورة مستقبلية"
    },
    {
      id: 2,
      returnNumber: "PR-2024-003",
      supplier: "شركة الرياض التجارية",
      returnValue: 1200,
      creditNoteNumber: "CN-2024-002",
      settlementDate: null,
      status: "بانتظار التسوية",
      paymentMethod: "استرداد نقدي"
    }
  ]);

  const addItem = () => {
    setPurchaseReturn({
      ...purchaseReturn,
      items: [...purchaseReturn.items, { 
        id: Date.now(), 
        name: "", 
        returnedQty: "", 
        unit: "", 
        batchNumber: "",
        condition: "",
        reason: "",
        notes: "",
        maxQty: ""
      }]
    });
  };

  const removeItem = (id: number) => {
    setPurchaseReturn({
      ...purchaseReturn,
      items: purchaseReturn.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: number, field: string, value: string) => {
    setPurchaseReturn({
      ...purchaseReturn,
      items: purchaseReturn.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const handleSaveReturn = () => {
    toast({
      title: "تم حفظ طلب المرتجع",
      description: "تم حفظ طلب مرتجع المشتريات بنجاح",
    });
  };

  const handleSubmitForApproval = () => {
    toast({
      title: "تم إرسال طلب الموافقة",
      description: "تم إرسال طلب المرتجع للموافقة",
    });
  };

  const handleApproveReturn = () => {
    toast({
      title: "تمت الموافقة على المرتجع",
      description: "تم اعتماد المرتجع وإشعار المورد",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "بانتظار الموافقة": "secondary",
      "معتمد": "default",
      "مرفوض": "destructive",
      "مكتمل": "default",
      "تحت التسوية المالية": "default",
      "مسوى": "default"
    };

    const icons = {
      "بانتظار الموافقة": <Clock className="w-3 h-3 mr-1" />,
      "معتمد": <CheckCircle className="w-3 h-3 mr-1" />,
      "مرفوض": <X className="w-3 h-3 mr-1" />,
      "مكتمل": <CheckCircle className="w-3 h-3 mr-1" />,
      "تحت التسوية المالية": <DollarSign className="w-3 h-3 mr-1" />,
      "مسوى": <CheckCircle className="w-3 h-3 mr-1" />
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
      "عيب في التصنيع": "bg-red-100 text-red-800",
      "كمية زائدة": "bg-blue-100 text-blue-800",
      "عدم مطابقة المواصفات": "bg-orange-100 text-orange-800",
      "تلف أثناء النقل": "bg-yellow-100 text-yellow-800",
      "انتهاء صلاحية": "bg-purple-100 text-purple-800"
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
          <h1 className="text-3xl font-bold">مرتجع المشتريات</h1>
          <p className="text-muted-foreground">
            إدارة مرتجعات المشتريات والتسوية المالية مع الموردين
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="new-return">
            <Undo2 className="ml-2 h-4 w-4" />
            مرتجع جديد
          </TabsTrigger>
          <TabsTrigger value="returns-list">
            <FileText className="ml-2 h-4 w-4" />
            قائمة المرتجعات
          </TabsTrigger>
          <TabsTrigger value="approval">
            <Shield className="ml-2 h-4 w-4" />
            موافقة المرتجعات
          </TabsTrigger>
          <TabsTrigger value="settlement">
            <DollarSign className="ml-2 h-4 w-4" />
            التسوية المالية
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="ml-2 h-4 w-4" />
            التقارير
          </TabsTrigger>
        </TabsList>

        {/* تبويب مرتجع جديد */}
        <TabsContent value="new-return" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء طلب مرتجع مشتريات</CardTitle>
              <CardDescription>إنشاء طلب إرجاع المواد للمورد مع توثيق الأسباب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* المعلومات الأساسية */}
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="returnNumber">رقم مرتجع المشتريات</Label>
                  <Input 
                    id="returnNumber" 
                    value={purchaseReturn.returnNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnDate">تاريخ المرتجع</Label>
                  <Input 
                    id="returnDate" 
                    type="date"
                    value={purchaseReturn.returnDate}
                    onChange={(e) => setPurchaseReturn({...purchaseReturn, returnDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poNumber">رقم أمر الشراء</Label>
                  <Select 
                    value={purchaseReturn.poNumber}
                    onValueChange={(value) => setPurchaseReturn({...purchaseReturn, poNumber: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر أمر الشراء" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrders.map((po) => (
                        <SelectItem key={po.id} value={po.id}>
                          {po.id} - {po.supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grnNumber">رقم سند الاستلام</Label>
                  <Select 
                    value={purchaseReturn.grnNumber}
                    onValueChange={(value) => setPurchaseReturn({...purchaseReturn, grnNumber: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر سند الاستلام" />
                    </SelectTrigger>
                    <SelectContent>
                      {goodsReceipts
                        .filter(grn => grn.poNumber === purchaseReturn.poNumber)
                        .map((grn) => (
                          <SelectItem key={grn.id} value={grn.id}>
                            {grn.id}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">اسم المورد</Label>
                  <Input 
                    id="supplier"
                    value={purchaseReturn.supplier}
                    onChange={(e) => setPurchaseReturn({...purchaseReturn, supplier: e.target.value})}
                    placeholder="سيتم سحبه تلقائياً من أمر الشراء"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">الجهة/الموقع</Label>
                  <Select 
                    value={purchaseReturn.department}
                    onValueChange={(value) => setPurchaseReturn({...purchaseReturn, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجهة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse">المستودع الرئيسي</SelectItem>
                      <SelectItem value="maintenance">قسم الصيانة</SelectItem>
                      <SelectItem value="operations">العمليات</SelectItem>
                      <SelectItem value="branch1">فرع الرياض</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* الأصناف المرتجعة */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">الأصناف المرتجعة</h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Package className="ml-2 h-4 w-4" />
                    إضافة صنف
                  </Button>
                </div>

                <div className="space-y-4">
                  {purchaseReturn.items.map((item, index) => (
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
                          <Label>الكمية المرتجعة</Label>
                          <Input 
                            type="number"
                            placeholder="0"
                            value={item.returnedQty}
                            onChange={(e) => updateItem(item.id, 'returnedQty', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الحد الأقصى</Label>
                          <Input 
                            type="number"
                            placeholder="0"
                            value={item.maxQty}
                            onChange={(e) => updateItem(item.id, 'maxQty', e.target.value)}
                            disabled
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
                              <SelectItem value="liter">لتر</SelectItem>
                              <SelectItem value="kg">كيلوجرام</SelectItem>
                              <SelectItem value="meter">متر</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>رقم التشغيلة</Label>
                          <Input 
                            placeholder="Batch #"
                            value={item.batchNumber}
                            onChange={(e) => updateItem(item.id, 'batchNumber', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>حالة المرتجع</Label>
                          <Select 
                            value={item.condition}
                            onValueChange={(value) => updateItem(item.id, 'condition', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="الحالة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="damaged">تالف</SelectItem>
                              <SelectItem value="defective">معيب</SelectItem>
                              <SelectItem value="expired">منتهي الصلاحية</SelectItem>
                              <SelectItem value="surplus">زائد عن الحاجة</SelectItem>
                              <SelectItem value="non-conforming">غير مطابق</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>سبب المرتجع</Label>
                          <Select 
                            value={item.reason}
                            onValueChange={(value) => updateItem(item.id, 'reason', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="السبب" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="عيب في التصنيع">عيب في التصنيع</SelectItem>
                              <SelectItem value="تلف أثناء النقل">تلف أثناء النقل</SelectItem>
                              <SelectItem value="عدم مطابقة المواصفات">عدم مطابقة المواصفات</SelectItem>
                              <SelectItem value="كمية زائدة">كمية زائدة</SelectItem>
                              <SelectItem value="انتهاء صلاحية">انتهاء صلاحية</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-end">
                          {purchaseReturn.items.length > 1 && (
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
                      <div className="mt-4 space-y-2">
                        <Label>ملاحظات الصنف</Label>
                        <Textarea 
                          placeholder="تفاصيل إضافية عن حالة الصنف أو سبب الإرجاع"
                          value={item.notes}
                          onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* المرفقات والصور */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">مرفقات/صور توضيحية</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        صور توضح العيب أو سبب المرتجع
                      </p>
                      <p className="text-xs text-red-500">
                        (إلزامي للمرتجعات التالفة)
                      </p>
                      <Button variant="outline" size="sm">
                        <Camera className="ml-2 h-4 w-4" />
                        التقاط صور
                      </Button>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        مستندات إضافية
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="ml-2 h-4 w-4" />
                        رفع ملفات
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* الملاحظات */}
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات عامة</Label>
                <Textarea 
                  id="notes"
                  placeholder="أي شروحات إضافية أو تعليمات خاصة بالمرتجع"
                  value={purchaseReturn.notes}
                  onChange={(e) => setPurchaseReturn({...purchaseReturn, notes: e.target.value})}
                />
              </div>

              {/* أزرار الإجراء */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleSaveReturn}>
                  <FileText className="ml-2 h-4 w-4" />
                  حفظ مسودة
                </Button>
                <Button onClick={handleSubmitForApproval}>
                  <CheckCircle className="ml-2 h-4 w-4" />
                  إرسال للموافقة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب قائمة المرتجعات */}
        <TabsContent value="returns-list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة مرتجعات المشتريات</CardTitle>
              <CardDescription>جميع طلبات مرتجع المشتريات وحالتها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="البحث في المرتجعات..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="حالة المرتجع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="pending">بانتظار الموافقة</SelectItem>
                      <SelectItem value="approved">معتمد</SelectItem>
                      <SelectItem value="completed">مكتمل</SelectItem>
                      <SelectItem value="settlement">تحت التسوية المالية</SelectItem>
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
                      <TableHead>رقم المرتجع</TableHead>
                      <TableHead>المورد</TableHead>
                      <TableHead>رقم أمر الشراء</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>عدد الأصناف</TableHead>
                      <TableHead>القيمة الإجمالية</TableHead>
                      <TableHead>السبب الرئيسي</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>المُعتمِد</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {existingReturns.map((returnItem) => (
                      <TableRow key={returnItem.id}>
                        <TableCell className="font-medium">{returnItem.returnNumber}</TableCell>
                        <TableCell>{returnItem.supplier}</TableCell>
                        <TableCell>{returnItem.poNumber}</TableCell>
                        <TableCell>{returnItem.date}</TableCell>
                        <TableCell>{returnItem.totalItems}</TableCell>
                        <TableCell>{returnItem.totalValue.toLocaleString()} ر.س</TableCell>
                        <TableCell>{getReasonBadge(returnItem.reason)}</TableCell>
                        <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                        <TableCell>{returnItem.approvedBy || "-"}</TableCell>
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

        {/* تبويب موافقة المرتجعات */}
        <TabsContent value="approval" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>موافقة طلبات المرتجع</CardTitle>
              <CardDescription>مراجعة واعتماد طلبات مرتجع المشتريات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* الطلبات المعلقة للموافقة */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">طلبات بانتظار الموافقة</h3>
                  
                  {existingReturns
                    .filter(ret => ret.status === "بانتظار الموافقة")
                    .map((returnItem) => (
                      <Card key={returnItem.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="grid grid-cols-4 gap-4 flex-1">
                            <div>
                              <p className="text-sm font-medium">رقم المرتجع</p>
                              <p className="text-lg">{returnItem.returnNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">المورد</p>
                              <p>{returnItem.supplier}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">السبب</p>
                              <p>{returnItem.reason}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">القيمة</p>
                              <p className="text-lg font-bold text-red-600">
                                {returnItem.totalValue.toLocaleString()} ر.س
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="ml-2 h-4 w-4" />
                              مراجعة
                            </Button>
                            <Button size="sm" onClick={handleApproveReturn}>
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
                          <TableHead>رقم المرتجع</TableHead>
                          <TableHead>المورد</TableHead>
                          <TableHead>القيمة</TableHead>
                          <TableHead>المُوافِق</TableHead>
                          <TableHead>تاريخ الموافقة</TableHead>
                          <TableHead>الملاحظات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {existingReturns
                          .filter(ret => ret.approvedBy)
                          .map((returnItem) => (
                            <TableRow key={returnItem.id}>
                              <TableCell className="font-medium">{returnItem.returnNumber}</TableCell>
                              <TableCell>{returnItem.supplier}</TableCell>
                              <TableCell>{returnItem.totalValue.toLocaleString()} ر.س</TableCell>
                              <TableCell>{returnItem.approvedBy}</TableCell>
                              <TableCell>{returnItem.date}</TableCell>
                              <TableCell>موافقة طبيعية</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب التسوية المالية */}
        <TabsContent value="settlement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التسوية المالية للمرتجعات</CardTitle>
              <CardDescription>إدارة التسويات المالية وإشعارات الائتمان</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* إحصائيات التسوية */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <DollarSign className="mx-auto h-8 w-8 text-green-600" />
                      <h3 className="font-medium">مسوى</h3>
                      <p className="text-2xl font-bold text-green-600">2</p>
                      <p className="text-sm text-muted-foreground">3,600 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Clock className="mx-auto h-8 w-8 text-yellow-600" />
                      <h3 className="font-medium">بانتظار التسوية</h3>
                      <p className="text-2xl font-bold text-yellow-600">1</p>
                      <p className="text-sm text-muted-foreground">1,200 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Receipt className="mx-auto h-8 w-8 text-blue-600" />
                      <h3 className="font-medium">إشعارات ائتمان</h3>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                      <p className="text-sm text-muted-foreground">4,800 ر.س</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <TrendingUp className="mx-auto h-8 w-8 text-purple-600" />
                      <h3 className="font-medium">متوسط وقت التسوية</h3>
                      <p className="text-2xl font-bold text-purple-600">5</p>
                      <p className="text-sm text-muted-foreground">أيام</p>
                    </div>
                  </Card>
                </div>

                {/* جدول التسويات */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">سجل التسويات المالية</h3>
                    <Button>
                      <Receipt className="ml-2 h-4 w-4" />
                      إنشاء إشعار ائتمان
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم المرتجع</TableHead>
                        <TableHead>المورد</TableHead>
                        <TableHead>قيمة المرتجع</TableHead>
                        <TableHead>رقم إشعار الائتمان</TableHead>
                        <TableHead>تاريخ التسوية</TableHead>
                        <TableHead>طريقة التسوية</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {financialSettlements.map((settlement) => (
                        <TableRow key={settlement.id}>
                          <TableCell className="font-medium">{settlement.returnNumber}</TableCell>
                          <TableCell>{settlement.supplier}</TableCell>
                          <TableCell>{settlement.returnValue.toLocaleString()} ر.س</TableCell>
                          <TableCell>{settlement.creditNoteNumber}</TableCell>
                          <TableCell>{settlement.settlementDate || "لم يتم بعد"}</TableCell>
                          <TableCell>{settlement.paymentMethod}</TableCell>
                          <TableCell>{getStatusBadge(settlement.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Printer className="h-4 w-4" />
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
                    <span>إجمالي المرتجعات</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>قيمة المرتجعات</span>
                    <span className="font-semibold text-red-600">48,000 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل الموافقة</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط وقت المعالجة</span>
                    <span className="font-semibold">3.5 يوم</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="ml-2 h-5 w-5" />
                  أسباب المرتجعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>عيب في التصنيع</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>عدم مطابقة المواصفات</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تلف أثناء النقل</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>كمية زائدة</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>انتهاء صلاحية</span>
                    <span className="font-semibold">5%</span>
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
                  <div className="flex justify-between items-center">
                    <span>شركة التوريدات المتقدمة</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-red-500 mr-1" />
                      <span className="font-semibold">3.2</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>شركة الرياض التجارية</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">4.1</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>مؤسسة الخليج للمواد</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-green-500 mr-1" />
                      <span className="font-semibold">4.6</span>
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
                  <Undo2 className="h-6 w-6 mb-2" />
                  تقرير المرتجعات
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  تقرير التسويات
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  تقرير أداء الموردين
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

export default PurchaseReturns;