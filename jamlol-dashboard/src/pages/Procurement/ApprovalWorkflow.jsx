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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  MessageSquare, 
  Eye, 
  Search, 
  Calendar, 
  Clock, 
  AlertCircle, 
  FileText,
  User,
  Building,
  DollarSign,
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApprovalWorkflow = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalAction, setApprovalAction] = useState("");
  const [approvalNotes, setApprovalNotes] = useState("");

  const [pendingRequests] = useState([
    {
      id: 1,
      number: "PR-2024-001",
      requester: "أحمد محمد",
      department: "قسم الصيانة",
      date: "2024-01-15",
      priority: "عاجل",
      estimatedValue: "15,500",
      itemsCount: 5,
      currentApprover: "مدير المشتريات",
      daysWaiting: 2,
      status: "بانتظار الموافقة",
      items: [
        { name: "زيت محرك", quantity: 10, unit: "لتر", specifications: "زيت محرك 5W-30 أصلي", estimatedPrice: "50" },
        { name: "فلتر هواء", quantity: 5, unit: "قطعة", specifications: "فلتر هواء للسيارات الصغيرة", estimatedPrice: "25" },
        { name: "شمع تنظيف", quantity: 20, unit: "عبوة", specifications: "شمع تنظيف عالي الجودة", estimatedPrice: "35" }
      ],
      history: [
        { action: "إنشاء الطلب", user: "أحمد محمد", date: "2024-01-15", time: "09:30", notes: "طلب عاجل لصيانة السيارات" },
        { action: "إرسال للموافقة", user: "أحمد محمد", date: "2024-01-15", time: "09:35", notes: "" }
      ]
    },
    {
      id: 2,
      number: "PR-2024-002",
      requester: "فاطمة الزهراني",
      department: "قسم المبيعات", 
      date: "2024-01-14",
      priority: "عادي",
      estimatedValue: "8,200",
      itemsCount: 3,
      currentApprover: "مدير القسم",
      daysWaiting: 3,
      status: "بانتظار الموافقة",
      items: [
        { name: "أجهزة حاسوب", quantity: 2, unit: "قطعة", specifications: "أجهزة حاسوب مكتبية", estimatedPrice: "3500" },
        { name: "طابعة", quantity: 1, unit: "قطعة", specifications: "طابعة ليزر ملونة", estimatedPrice: "1200" }
      ],
      history: [
        { action: "إنشاء الطلب", user: "فاطمة الزهراني", date: "2024-01-14", time: "10:15", notes: "أجهزة للمكتب الجديد" },
        { action: "إرسال للموافقة", user: "فاطمة الزهراني", date: "2024-01-14", time: "10:20", notes: "" }
      ]
    },
    {
      id: 3,
      number: "PR-2024-003",
      requester: "محمد العتيبي",
      department: "الإدارة العامة",
      date: "2024-01-13",
      priority: "منخفض",
      estimatedValue: "3,800",
      itemsCount: 4,
      currentApprover: "المدير العام",
      daysWaiting: 4,
      status: "بانتظار الموافقة",
      items: [
        { name: "مواد تنظيف", quantity: 50, unit: "عبوة", specifications: "مواد تنظيف متنوعة", estimatedPrice: "15" },
        { name: "أوراق", quantity: 10, unit: "رزمة", specifications: "أوراق A4 بيضاء", estimatedPrice: "25" }
      ],
      history: [
        { action: "إنشاء الطلب", user: "محمد العتيبي", date: "2024-01-13", time: "11:00", notes: "احتياجات المكتب الشهرية" },
        { action: "إرسال للموافقة", user: "محمد العتيبي", date: "2024-01-13", time: "11:05", notes: "" }
      ]
    }
  ]);

  const [approvedRequests] = useState([
    {
      id: 4,
      number: "PR-2024-004",
      requester: "سارة الحربي",
      department: "قسم التقنية",
      date: "2024-01-12",
      approvedDate: "2024-01-13",
      approver: "مدير التقنية",
      estimatedValue: "12,000",
      status: "معتمد"
    },
    {
      id: 5,
      number: "PR-2024-005",
      requester: "علي الشهراني",
      department: "قسم الأمن",
      date: "2024-01-11",
      approvedDate: "2024-01-12",
      approver: "مدير الأمن",
      estimatedValue: "6,500",
      status: "معتمد"
    }
  ]);

  const handleApproval = (action) => {
    if (!selectedRequest) return;
    
    const messages = {
      approve: "تم اعتماد طلب الشراء بنجاح",
      reject: "تم رفض طلب الشراء",
      return: "تم إرجاع طلب الشراء للتعديل"
    };

    toast({
      title: messages[action],
      description: `طلب رقم ${selectedRequest.number}`,
    });

    setSelectedRequest(null);
    setApprovalNotes("");
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      "عاجل": "destructive",
      "عادي": "default", 
      "منخفض": "secondary"
    };

    return (
      <Badge variant={variants[priority]}>
        {priority}
      </Badge>
    );
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
      "مرفوض": <XCircle className="w-3 h-3 mr-1" />
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
          <h1 className="text-3xl font-bold">دورة الموافقات</h1>
          <p className="text-muted-foreground">
            إدارة موافقات طلبات الشراء ومتابعة سير العمليات
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingRequests.length}</div>
            <div className="text-sm text-muted-foreground">بانتظار الموافقة</div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            <Clock className="ml-2 h-4 w-4" />
            بانتظار الموافقة ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            <CheckCircle className="ml-2 h-4 w-4" />
            معتمدة ({approvedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileText className="ml-2 h-4 w-4" />
            سجل الموافقات
          </TabsTrigger>
        </TabsList>

        {/* الطلبات بانتظار الموافقة */}
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>طلبات الشراء بانتظار الموافقة</CardTitle>
              <CardDescription>قائمة بجميع طلبات الشراء التي تحتاج موافقة</CardDescription>
            </CardHeader>
            <CardContent>
              {/* شريط البحث والفلاتر */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="البحث برقم الطلب أو اسم الطالب..." 
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="أولوية الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأولويات</SelectItem>
                    <SelectItem value="urgent">عاجل</SelectItem>
                    <SelectItem value="normal">عادي</SelectItem>
                    <SelectItem value="low">منخفض</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأقسام</SelectItem>
                    <SelectItem value="maintenance">قسم الصيانة</SelectItem>
                    <SelectItem value="sales">قسم المبيعات</SelectItem>
                    <SelectItem value="admin">الإدارة العامة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* جدول الطلبات */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>الطالب</TableHead>
                    <TableHead>القسم</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الأولوية</TableHead>
                    <TableHead>القيمة التقديرية</TableHead>
                    <TableHead>عدد الأصناف</TableHead>
                    <TableHead>أيام الانتظار</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.number}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          {request.requester}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          {request.department}
                        </div>
                      </TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          {request.estimatedValue} ريال
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4 text-blue-600" />
                          {request.itemsCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={request.daysWaiting > 3 ? "destructive" : "secondary"}>
                          {request.daysWaiting} أيام
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="ml-2 h-4 w-4" />
                              مراجعة
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh]">
                            <DialogHeader>
                              <DialogTitle>مراجعة طلب الشراء - {request.number}</DialogTitle>
                              <DialogDescription>
                                مراجعة تفاصيل الطلب واتخاذ قرار الموافقة
                              </DialogDescription>
                            </DialogHeader>
                            
                            <ScrollArea className="max-h-[60vh]">
                              <div className="space-y-6 p-1">
                                {/* معلومات الطلب الأساسية */}
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label>رقم الطلب</Label>
                                    <div className="font-medium">{request.number}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>الطالب</Label>
                                    <div className="font-medium">{request.requester}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>القسم</Label>
                                    <div className="font-medium">{request.department}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>تاريخ الطلب</Label>
                                    <div className="font-medium">{request.date}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>الأولوية</Label>
                                    <div>{getPriorityBadge(request.priority)}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>القيمة التقديرية</Label>
                                    <div className="font-medium text-green-600">{request.estimatedValue} ريال</div>
                                  </div>
                                </div>

                                <Separator />

                                {/* الأصناف المطلوبة */}
                                <div className="space-y-4">
                                  <h3 className="text-lg font-medium">الأصناف المطلوبة</h3>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>اسم الصنف</TableHead>
                                        <TableHead>الكمية</TableHead>
                                        <TableHead>الوحدة</TableHead>
                                        <TableHead>المواصفات</TableHead>
                                        <TableHead>السعر التقديري</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {request.items.map((item, index) => (
                                        <TableRow key={index}>
                                          <TableCell className="font-medium">{item.name}</TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>{item.unit}</TableCell>
                                          <TableCell className="max-w-xs">{item.specifications}</TableCell>
                                          <TableCell>{item.estimatedPrice} ريال</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>

                                <Separator />

                                {/* سجل العمليات */}
                                <div className="space-y-4">
                                  <h3 className="text-lg font-medium">سجل العمليات</h3>
                                  <div className="space-y-3">
                                    {request.history.map((entry, index) => (
                                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 text-sm">
                                            <span className="font-medium">{entry.action}</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-gray-600">{entry.user}</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-gray-600">{entry.date} - {entry.time}</span>
                                          </div>
                                          {entry.notes && (
                                            <div className="text-sm text-gray-600 mt-1">{entry.notes}</div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <Separator />

                                {/* ملاحظات الموافقة */}
                                <div className="space-y-4">
                                  <h3 className="text-lg font-medium">ملاحظات وقرار الموافقة</h3>
                                  <Textarea 
                                    placeholder="إضافة ملاحظات أو سبب الرفض/الإرجاع..."
                                    value={approvalNotes}
                                    onChange={(e) => setApprovalNotes(e.target.value)}
                                    rows={3}
                                  />
                                </div>
                              </div>
                            </ScrollArea>

                            <DialogFooter>
                              <div className="flex gap-2 w-full">
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleApproval('reject')}
                                  className="flex-1"
                                >
                                  <XCircle className="ml-2 h-4 w-4" />
                                  رفض الطلب
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleApproval('return')}
                                  className="flex-1"
                                >
                                  <RotateCcw className="ml-2 h-4 w-4" />
                                  إرجاع للتعديل
                                </Button>
                                <Button 
                                  onClick={() => handleApproval('approve')}
                                  className="flex-1"
                                >
                                  <CheckCircle className="ml-2 h-4 w-4" />
                                  اعتماد الطلب
                                </Button>
                              </div>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الطلبات المعتمدة */}
        <TabsContent value="approved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات المعتمدة</CardTitle>
              <CardDescription>قائمة بجميع طلبات الشراء المعتمدة</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>الطالب</TableHead>
                    <TableHead>القسم</TableHead>
                    <TableHead>تاريخ الطلب</TableHead>
                    <TableHead>تاريخ الاعتماد</TableHead>
                    <TableHead>المعتمد من</TableHead>
                    <TableHead>القيمة التقديرية</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.number}</TableCell>
                      <TableCell>{request.requester}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{request.approvedDate}</TableCell>
                      <TableCell>{request.approver}</TableCell>
                      <TableCell>{request.estimatedValue} ريال</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="ml-2 h-4 w-4" />
                            عرض
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="ml-2 h-4 w-4" />
                            طباعة
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

        {/* سجل الموافقات */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل جميع الموافقات</CardTitle>
              <CardDescription>سجل شامل لجميع عمليات الموافقة والرفض</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد سجلات</h3>
                <p className="mt-1 text-sm text-gray-500">سيتم عرض سجل الموافقات هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprovalWorkflow;