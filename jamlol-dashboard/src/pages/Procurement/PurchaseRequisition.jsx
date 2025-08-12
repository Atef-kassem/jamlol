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
import { Plus, Save, Send, FileText, Search, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PurchaseRequisition = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("new");
  const [requisition, setRequisition] = useState({
    requestNumber: "PR-2024-001",
    requestType: "",
    requestingDepartment: "",
    requiredDate: "",
    priority: "normal",
    notes: "",
    items: [
      { id: 1, name: "", quantity: "", unit: "", specifications: "", estimatedPrice: "" }
    ]
  });

  const [existingRequisitions] = useState([
    {
      id: 1,
      number: "PR-2024-001",
      department: "الصيانة",
      date: "2024-01-15",
      status: "بانتظار الموافقة",
      items: 3,
      total: "2,500"
    },
    {
      id: 2,
      number: "PR-2024-002", 
      department: "المبيعات",
      date: "2024-01-14",
      status: "معتمد",
      items: 5,
      total: "4,200"
    },
    {
      id: 3,
      number: "PR-2024-003",
      department: "الإدارة العامة",
      date: "2024-01-13", 
      status: "مرفوض",
      items: 2,
      total: "1,800"
    }
  ]);

  const addItem = () => {
    setRequisition({
      ...requisition,
      items: [...requisition.items, { 
        id: Date.now(), 
        name: "", 
        quantity: "", 
        unit: "", 
        specifications: "", 
        estimatedPrice: "" 
      }]
    });
  };

  const removeItem = (id) => {
    setRequisition({
      ...requisition,
      items: requisition.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id, field, value) => {
    setRequisition({
      ...requisition,
      items: requisition.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const handleSave = () => {
    toast({
      title: "تم حفظ طلب الشراء",
      description: "تم حفظ طلب الشراء كمسودة بنجاح",
    });
  };

  const handleSubmit = () => {
    toast({
      title: "تم إرسال طلب الشراء",
      description: "تم إرسال طلب الشراء للموافقة بنجاح",
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      "بانتظار الموافقة": "default",
      "معتمد": "default", 
      "مرفوض": "destructive"
    };

    const icons = {
      "بانتظار الموافقة": <Clock className="w-3 h-3 mr-1" />,
      "معتمد": <CheckCircle className="w-3 h-3 mr-1" />,
      "مرفوض": <AlertCircle className="w-3 h-3 mr-1" />
    };

    return (
      <Badge variant={variants[status]}>
        {icons[status]}
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">طلبات الشراء الداخلية</h1>
          <p className="text-muted-foreground">
            إدارة وتتبع جميع طلبات الشراء الداخلية
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">
            <Plus className="ml-2 h-4 w-4" />
            طلب شراء جديد
          </TabsTrigger>
          <TabsTrigger value="list">
            <FileText className="ml-2 h-4 w-4" />
            قائمة الطلبات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء طلب شراء جديد</CardTitle>
              <CardDescription>تعبئة بيانات طلب الشراء الداخلي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* المعلومات الأساسية */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requestNumber">رقم الطلب</Label>
                  <Input 
                    id="requestNumber" 
                    value={requisition.requestNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestType">نوع الطلب</Label>
                  <Select 
                    value={requisition.requestType}
                    onValueChange={(value) => setRequisition({...requisition, requestType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الطلب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="materials">مواد استهلاكية</SelectItem>
                      <SelectItem value="equipment">أجهزة ومعدات</SelectItem>
                      <SelectItem value="spares">قطع غيار</SelectItem>
                      <SelectItem value="services">خدمات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">الجهة الطالبة</Label>
                  <Select 
                    value={requisition.requestingDepartment}
                    onValueChange={(value) => setRequisition({...requisition, requestingDepartment: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجهة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">قسم الصيانة</SelectItem>
                      <SelectItem value="sales">قسم المبيعات</SelectItem>
                      <SelectItem value="admin">الإدارة العامة</SelectItem>
                      <SelectItem value="operations">العمليات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requiredDate">تاريخ الحاجة الفعلي</Label>
                  <Input 
                    id="requiredDate" 
                    type="date"
                    value={requisition.requiredDate}
                    onChange={(e) => setRequisition({...requisition, requiredDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">أولوية الطلب</Label>
                  <Select 
                    value={requisition.priority}
                    onValueChange={(value) => setRequisition({...requisition, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">عاجل</SelectItem>
                      <SelectItem value="normal">عادي</SelectItem>
                      <SelectItem value="low">منخفض</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* الأصناف المطلوبة */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">الأصناف المطلوبة</h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة صنف
                  </Button>
                </div>

                <div className="space-y-4">
                  {requisition.items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="grid grid-cols-5 gap-4">
                        <div className="space-y-2">
                          <Label>اسم الصنف</Label>
                          <Input 
                            placeholder="اسم المادة أو المنتج"
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
                              <SelectItem value="box">صندوق</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>السعر التقديري</Label>
                          <Input 
                            type="number"
                            placeholder="0.00"
                            value={item.estimatedPrice}
                            onChange={(e) => updateItem(item.id, 'estimatedPrice', e.target.value)}
                          />
                        </div>
                        <div className="flex items-end">
                          {requisition.items.length > 1 && (
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
                          placeholder="وصف تفصيلي للمادة ومواصفاتها الفنية"
                          value={item.specifications}
                          onChange={(e) => updateItem(item.id, 'specifications', e.target.value)}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* الملاحظات */}
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea 
                  id="notes"
                  placeholder="أي ملاحظات أو تعليمات خاصة"
                  value={requisition.notes}
                  onChange={(e) => setRequisition({...requisition, notes: e.target.value})}
                />
              </div>

              {/* أزرار الإجراء */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleSave}>
                  <Save className="ml-2 h-4 w-4" />
                  حفظ كمسودة
                </Button>
                <Button onClick={handleSubmit}>
                  <Send className="ml-2 h-4 w-4" />
                  إرسال للموافقة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة طلبات الشراء</CardTitle>
              <CardDescription>جميع طلبات الشراء الداخلية</CardDescription>
            </CardHeader>
            <CardContent>
              {/* شريط البحث والفلاتر */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="البحث برقم الطلب أو الجهة..." 
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
                    <SelectItem value="pending">بانتظار الموافقة</SelectItem>
                    <SelectItem value="approved">معتمد</SelectItem>
                    <SelectItem value="rejected">مرفوض</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Calendar className="ml-2 h-4 w-4" />
                  تصفية بالتاريخ
                </Button>
              </div>

              {/* جدول الطلبات */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>الجهة الطالبة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>عدد الأصناف</TableHead>
                    <TableHead>القيمة التقديرية</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {existingRequisitions.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.number}</TableCell>
                      <TableCell>{req.department}</TableCell>
                      <TableCell>{req.date}</TableCell>
                      <TableCell>{req.items}</TableCell>
                      <TableCell>{req.total} ريال</TableCell>
                      <TableCell>{getStatusBadge(req.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            عرض
                          </Button>
                          <Button variant="outline" size="sm">
                            تعديل
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
      </Tabs>
    </div>
  );
};

export default PurchaseRequisition;