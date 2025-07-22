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
  Package, Search, Calendar, Users, DollarSign, CheckCircle, Clock, 
  AlertCircle, Upload, Download, Edit, Eye, Truck, MapPin, Camera,
  FileText, User, Signature, AlertTriangle, ShieldCheck, TrendingUp,
  BarChart3, Bell, Star, Filter, Printer, RefreshCw, X, Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GoodsReceipt = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tracking");
  const [goodsReceipt, setGoodsReceipt] = useState({
    grnNumber: "GRN-2024-001",
    poNumber: "",
    receiverName: "",
    receiptDate: new Date().toISOString().split('T')[0],
    receiptTime: new Date().toTimeString().slice(0, 5),
    notes: "",
    status: "مكتمل",
    signature: "",
    items: [
      { id: 1, name: "", orderedQty: "", receivedQty: "", condition: "", notes: "", rejected: false }
    ],
    rejectedItems: [],
    attachments: []
  });

  const [purchaseOrders] = useState([
    {
      id: "PO-2024-001",
      supplier: "شركة التوريدات المتقدمة",
      date: "2024-01-15",
      expectedDelivery: "2024-01-25",
      actualDelivery: "2024-01-24",
      status: "تم التسليم",
      trackingStatus: "مكتمل",
      total: 25000,
      items: [
        { name: "زيت شل 5W-30", orderedQty: 20, receivedQty: 20, unit: "لتر" },
        { name: "فلاتر زيت", orderedQty: 15, receivedQty: 15, unit: "قطعة" }
      ],
      location: "في المستودع الرئيسي",
      delay: 0
    },
    {
      id: "PO-2024-002",
      supplier: "مؤسسة الخليج للمواد",
      date: "2024-01-16",
      expectedDelivery: "2024-01-28",
      actualDelivery: null,
      status: "قيد النقل",
      trackingStatus: "في الطريق",
      total: 18500,
      items: [
        { name: "صابون مركز", orderedQty: 10, receivedQty: 0, unit: "علبة" },
        { name: "ملمع زجاج", orderedQty: 25, receivedQty: 0, unit: "قارورة" }
      ],
      location: "خرج من المورد - الرياض",
      delay: 0
    },
    {
      id: "PO-2024-003",
      supplier: "شركة الرياض التجارية",
      date: "2024-01-17",
      expectedDelivery: "2024-01-22",
      actualDelivery: null,
      status: "متأخر",
      trackingStatus: "متأخر",
      total: 32000,
      items: [
        { name: "زيت ديزل", orderedQty: 50, receivedQty: 0, unit: "لتر" },
        { name: "مضاد تجمد", orderedQty: 30, receivedQty: 0, unit: "لتر" }
      ],
      location: "لم يتم الشحن بعد",
      delay: 3
    }
  ]);

  const [goodsReceiptList] = useState([
    {
      id: 1,
      grnNumber: "GRN-2024-001",
      poNumber: "PO-2024-001",
      supplier: "شركة التوريدات المتقدمة",
      receiver: "أحمد السعدون",
      date: "2024-01-24",
      time: "10:30",
      status: "مكتمل",
      totalItems: 2,
      rejectedItems: 0,
      condition: "ممتاز"
    },
    {
      id: 2,
      grnNumber: "GRN-2024-002",
      poNumber: "PO-2024-004",
      supplier: "مؤسسة الخليج للمواد",
      receiver: "فاطمة الزهراني",
      date: "2024-01-23",
      time: "14:15",
      status: "جزئي",
      totalItems: 3,
      rejectedItems: 1,
      condition: "جيد"
    }
  ]);

  const addItem = () => {
    setGoodsReceipt({
      ...goodsReceipt,
      items: [...goodsReceipt.items, { 
        id: Date.now(), 
        name: "", 
        orderedQty: "", 
        receivedQty: "", 
        condition: "",
        notes: "",
        rejected: false
      }]
    });
  };

  const removeItem = (id: number) => {
    setGoodsReceipt({
      ...goodsReceipt,
      items: goodsReceipt.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: number, field: string, value: string | boolean) => {
    setGoodsReceipt({
      ...goodsReceipt,
      items: goodsReceipt.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const handleSaveReceipt = () => {
    toast({
      title: "تم حفظ سند الاستلام",
      description: "تم حفظ سند الاستلام وتحديث المخزون بنجاح",
    });
  };

  const handleCompleteReceipt = () => {
    toast({
      title: "تم إكمال الاستلام",
      description: "تم إكمال عملية الاستلام وإشعار المورد",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "بانتظار شحن": "secondary",
      "قيد النقل": "default",
      "في الطريق": "default", 
      "وصل جزئياً": "default",
      "تم التسليم": "default",
      "مكتمل": "default",
      "متأخر": "destructive"
    };

    const icons = {
      "بانتظار شحن": <Clock className="w-3 h-3 mr-1" />,
      "قيد النقل": <Truck className="w-3 h-3 mr-1" />,
      "في الطريق": <Truck className="w-3 h-3 mr-1" />,
      "وصل جزئياً": <Package className="w-3 h-3 mr-1" />,
      "تم التسليم": <CheckCircle className="w-3 h-3 mr-1" />,
      "مكتمل": <CheckCircle className="w-3 h-3 mr-1" />,
      "متأخر": <AlertTriangle className="w-3 h-3 mr-1" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as "default" | "destructive" | "secondary"}>
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    );
  };

  const getConditionBadge = (condition: string) => {
    const colors = {
      "ممتاز": "bg-green-100 text-green-800",
      "جيد": "bg-blue-100 text-blue-800", 
      "مقبول": "bg-yellow-100 text-yellow-800",
      "غير مطابق": "bg-red-100 text-red-800"
    };

    return (
      <Badge className={colors[condition as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {condition}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">متابعة واستلام البضائع</h1>
          <p className="text-muted-foreground">
            تتبع الشحنات واستلام البضائع وإدارة سندات الاستلام
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tracking">
            <Truck className="ml-2 h-4 w-4" />
            تتبع الشحنات
          </TabsTrigger>
          <TabsTrigger value="receipt">
            <Package className="ml-2 h-4 w-4" />
            استلام البضائع
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileText className="ml-2 h-4 w-4" />
            سجل الاستلام
          </TabsTrigger>
          <TabsTrigger value="quality">
            <ShieldCheck className="ml-2 h-4 w-4" />
            مراقبة الجودة
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="ml-2 h-4 w-4" />
            التقارير
          </TabsTrigger>
        </TabsList>

        {/* تبويب تتبع الشحنات */}
        <TabsContent value="tracking" className="space-y-6">
          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">قيد النقل</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {purchaseOrders.filter(po => po.status === "قيد النقل").length}
                    </p>
                  </div>
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">تم التسليم</p>
                    <p className="text-2xl font-bold text-green-600">
                      {purchaseOrders.filter(po => po.status === "تم التسليم").length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">متأخر</p>
                    <p className="text-2xl font-bold text-red-600">
                      {purchaseOrders.filter(po => po.status === "متأخر").length}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي القيم</p>
                    <p className="text-lg font-bold text-green-600">
                      {purchaseOrders.reduce((total, po) => total + po.total, 0).toLocaleString()} ر.س
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* التنبيهات الاستباقية */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Bell className="ml-2 h-5 w-5" />
                تنبيهات مهمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {purchaseOrders
                  .filter(po => po.delay > 0)
                  .map((po) => (
                    <div key={po.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-red-800">أمر الشراء {po.id} متأخر {po.delay} أيام</p>
                          <p className="text-sm text-red-600">المورد: {po.supplier}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        تواصل مع المورد
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* لوحة تتبع الطلبات */}
          <Card>
            <CardHeader>
              <CardTitle>لوحة تتبع الطلبات</CardTitle>
              <CardDescription>حالة جميع أوامر الشراء والشحنات الحالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="البحث في الطلبات..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="حالة الشحنة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="shipping">بانتظار شحن</SelectItem>
                      <SelectItem value="transit">قيد النقل</SelectItem>
                      <SelectItem value="delivered">تم التسليم</SelectItem>
                      <SelectItem value="delayed">متأخر</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <RefreshCw className="ml-2 h-4 w-4" />
                    تحديث
                  </Button>
                </div>

                <div className="grid gap-4">
                  {purchaseOrders.map((po) => (
                    <Card key={po.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant="outline" className="font-mono">
                                {po.id}
                              </Badge>
                              {getStatusBadge(po.status)}
                              {po.delay > 0 && (
                                <Badge variant="destructive">
                                  متأخر {po.delay} أيام
                                </Badge>
                              )}
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">{po.supplier}</h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">تاريخ الطلب</p>
                                <p className="font-medium">{po.date}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">التسليم المتوقع</p>
                                <p className="font-medium">{po.expectedDelivery}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">التسليم الفعلي</p>
                                <p className="font-medium">{po.actualDelivery || "لم يتم بعد"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">القيمة</p>
                                <p className="font-medium text-green-600">{po.total.toLocaleString()} ر.س</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span className="text-sm">{po.location}</span>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium">الأصناف:</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {po.items.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span className="text-sm">{item.name}</span>
                                    <span className="text-sm font-medium">
                                      {item.receivedQty}/{item.orderedQty} {item.unit}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="ml-2 h-4 w-4" />
                              التفاصيل
                            </Button>
                            {po.status === "تم التسليم" && (
                              <Button size="sm" onClick={() => setActiveTab("receipt")}>
                                <Package className="ml-2 h-4 w-4" />
                                استلام البضائع
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب استلام البضائع */}
        <TabsContent value="receipt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سند استلام البضائع (GRN)</CardTitle>
              <CardDescription>إنشاء سند استلام جديد وتسجيل البضائع المستلمة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* المعلومات الأساسية */}
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grnNumber">رقم سند الاستلام</Label>
                  <Input 
                    id="grnNumber" 
                    value={goodsReceipt.grnNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poNumber">رقم أمر الشراء</Label>
                  <Select 
                    value={goodsReceipt.poNumber}
                    onValueChange={(value) => setGoodsReceipt({...goodsReceipt, poNumber: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر أمر الشراء" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrders
                        .filter(po => po.status === "تم التسليم")
                        .map((po) => (
                          <SelectItem key={po.id} value={po.id}>
                            {po.id} - {po.supplier}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiptDate">تاريخ الاستلام</Label>
                  <Input 
                    id="receiptDate" 
                    type="date"
                    value={goodsReceipt.receiptDate}
                    onChange={(e) => setGoodsReceipt({...goodsReceipt, receiptDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiptTime">وقت الاستلام</Label>
                  <Input 
                    id="receiptTime" 
                    type="time"
                    value={goodsReceipt.receiptTime}
                    onChange={(e) => setGoodsReceipt({...goodsReceipt, receiptTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiverName">اسم المستلم</Label>
                <Select 
                  value={goodsReceipt.receiverName}
                  onValueChange={(value) => setGoodsReceipt({...goodsReceipt, receiverName: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المستلم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="أحمد السعدون">أحمد السعدون - مشرف المستودع</SelectItem>
                    <SelectItem value="فاطمة الزهراني">فاطمة الزهراني - مسؤولة المشتريات</SelectItem>
                    <SelectItem value="محمد العتيبي">محمد العتيبي - فني الاستلام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* الأصناف المستلمة */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">الأصناف المستلمة</h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Package className="ml-2 h-4 w-4" />
                    إضافة صنف
                  </Button>
                </div>

                <div className="space-y-4">
                  {goodsReceipt.items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="grid grid-cols-6 gap-4">
                        <div className="space-y-2">
                          <Label>اسم الصنف</Label>
                          <Input 
                            placeholder="اسم المادة"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الكمية المطلوبة</Label>
                          <Input 
                            type="number"
                            placeholder="0"
                            value={item.orderedQty}
                            onChange={(e) => updateItem(item.id, 'orderedQty', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الكمية المستلمة</Label>
                          <Input 
                            type="number"
                            placeholder="0"
                            value={item.receivedQty}
                            onChange={(e) => updateItem(item.id, 'receivedQty', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>حالة الجودة</Label>
                          <Select 
                            value={item.condition}
                            onValueChange={(value) => updateItem(item.id, 'condition', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="الحالة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ممتاز">ممتاز</SelectItem>
                              <SelectItem value="جيد">جيد</SelectItem>
                              <SelectItem value="مقبول">مقبول</SelectItem>
                              <SelectItem value="غير مطابق">غير مطابق</SelectItem>
                              <SelectItem value="تحت الفحص">تحت الفحص</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>مرفوض</Label>
                          <div className="flex items-center space-x-2 pt-2">
                            <Checkbox 
                              id={`rejected-${item.id}`}
                              checked={item.rejected}
                              onCheckedChange={(checked) => updateItem(item.id, 'rejected', checked)}
                            />
                            <Label htmlFor={`rejected-${item.id}`} className="text-sm">
                              صنف مرفوض
                            </Label>
                          </div>
                        </div>
                        <div className="flex items-end">
                          {goodsReceipt.items.length > 1 && (
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
                        <Label>ملاحظات</Label>
                        <Textarea 
                          placeholder="أي ملاحظات على الصنف"
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
                <h3 className="text-lg font-medium">صور ومرفقات الاستلام</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        صور البضائع المستلمة
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
                        محاضر تسليم ومستندات
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="ml-2 h-4 w-4" />
                        رفع ملفات
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* التوقيع والملاحظات */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات عامة</Label>
                  <Textarea 
                    id="notes"
                    placeholder="أي ملاحظات أو تعليقات على عملية الاستلام"
                    value={goodsReceipt.notes}
                    onChange={(e) => setGoodsReceipt({...goodsReceipt, notes: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <Label>توقيع المستلم</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Signature className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        توقيع إلكتروني أو كود تأكيد
                      </p>
                      <Button variant="outline" size="sm">
                        <Signature className="ml-2 h-4 w-4" />
                        إضافة توقيع
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* أزرار الإجراء */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleSaveReceipt}>
                  <FileText className="ml-2 h-4 w-4" />
                  حفظ مسودة
                </Button>
                <Button variant="outline">
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة سند
                </Button>
                <Button onClick={handleCompleteReceipt}>
                  <CheckCircle className="ml-2 h-4 w-4" />
                  إكمال الاستلام
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب سجل الاستلام */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل عمليات الاستلام</CardTitle>
              <CardDescription>جميع سندات الاستلام والعمليات المكتملة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="البحث في سندات الاستلام..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="حالة الاستلام" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="complete">مكتمل</SelectItem>
                      <SelectItem value="partial">جزئي</SelectItem>
                      <SelectItem value="rejected">مرفوض</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم السند</TableHead>
                      <TableHead>رقم أمر الشراء</TableHead>
                      <TableHead>المورد</TableHead>
                      <TableHead>المستلم</TableHead>
                      <TableHead>التاريخ والوقت</TableHead>
                      <TableHead>حالة الاستلام</TableHead>
                      <TableHead>عدد الأصناف</TableHead>
                      <TableHead>الأصناف المرفوضة</TableHead>
                      <TableHead>الحالة العامة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {goodsReceiptList.map((receipt) => (
                      <TableRow key={receipt.id}>
                        <TableCell className="font-medium">{receipt.grnNumber}</TableCell>
                        <TableCell>{receipt.poNumber}</TableCell>
                        <TableCell>{receipt.supplier}</TableCell>
                        <TableCell>{receipt.receiver}</TableCell>
                        <TableCell>{receipt.date} - {receipt.time}</TableCell>
                        <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                        <TableCell>{receipt.totalItems}</TableCell>
                        <TableCell>
                          {receipt.rejectedItems > 0 ? (
                            <Badge variant="destructive">{receipt.rejectedItems}</Badge>
                          ) : (
                            <Badge variant="outline">0</Badge>
                          )}
                        </TableCell>
                        <TableCell>{getConditionBadge(receipt.condition)}</TableCell>
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

        {/* تبويب مراقبة الجودة */}
        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="ml-2 h-5 w-5" />
                  إحصائيات الجودة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>معدل المطابقة</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>أصناف مرفوضة</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تحت الفحص</span>
                    <span className="font-semibold text-yellow-600">5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="ml-2 h-5 w-5" />
                  مشاكل الجودة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>عدم مطابقة المواصفات</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تلف أثناء النقل</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نقص في الكمية</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>انتهاء صلاحية</span>
                    <span className="font-semibold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="ml-2 h-5 w-5" />
                  تقييم الموردين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>شركة التوريدات المتقدمة</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>شركة الرياض التجارية</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">4.6</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>مؤسسة الخليج للمواد</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">4.2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تقرير مراقبة الجودة التفصيلي</CardTitle>
              <CardDescription>تفاصيل فحص الجودة للشحنات المستلمة</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم السند</TableHead>
                    <TableHead>الصنف</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead>حالة الفحص</TableHead>
                    <TableHead>ملاحظات الجودة</TableHead>
                    <TableHead>المفتش</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الإجراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">GRN-2024-001</TableCell>
                    <TableCell>زيت شل 5W-30</TableCell>
                    <TableCell>شركة التوريدات المتقدمة</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        مطابق
                      </Badge>
                    </TableCell>
                    <TableCell>جودة ممتازة، مطابق للمواصفات</TableCell>
                    <TableCell>أحمد السعدون</TableCell>
                    <TableCell>2024-01-24</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        موافقة
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">GRN-2024-002</TableCell>
                    <TableCell>صابون مركز</TableCell>
                    <TableCell>مؤسسة الخليج للمواد</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">
                        غير مطابق
                      </Badge>
                    </TableCell>
                    <TableCell>تغيير في اللون، لزوجة غير مناسبة</TableCell>
                    <TableCell>فاطمة الزهراني</TableCell>
                    <TableCell>2024-01-23</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm">
                        رفض
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
                    <span>إجمالي الاستلامات</span>
                    <span className="font-semibold">48</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل الاستلام في الوقت</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط وقت المعالجة</span>
                    <span className="font-semibold">45 دقيقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل الجودة</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="ml-2 h-5 w-5" />
                  كفاءة العمليات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>استلامات مكتملة</span>
                    <span className="font-semibold text-green-600">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span>استلامات جزئية</span>
                    <span className="font-semibold text-yellow-600">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مرفوضة</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تحت المراجعة</span>
                    <span className="font-semibold text-blue-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="ml-2 h-5 w-5" />
                  القيم المالية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>قيمة البضائع المستلمة</span>
                    <span className="font-semibold text-green-600">1,250,000 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>قيمة البضائع المرفوضة</span>
                    <span className="font-semibold text-red-600">15,000 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>وفورات من الرفض</span>
                    <span className="font-semibold text-green-600">8,500 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تكلفة المعالجة</span>
                    <span className="font-semibold">2,200 ر.س</span>
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
                  <Package className="h-6 w-6 mb-2" />
                  تقرير الاستلام
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <ShieldCheck className="h-6 w-6 mb-2" />
                  تقرير الجودة
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  تقرير الكفاءة
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  تقرير الموردين
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoodsReceipt;