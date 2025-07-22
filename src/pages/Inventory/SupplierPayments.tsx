import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  CreditCard,
  DollarSign,
  Calendar,
  FileText,
  TrendingUp,
  Calculator,
  Activity,
  MoreVertical,
  Filter,
  Eye,
  Edit
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Types
interface SupplierPayment {
  id: string;
  supplierName: string;
  invoiceNumber: string;
  totalAmount: number;
  paidAmount: number;
  paymentDate: string;
  paymentMethod: string;
  transferNumber?: string;
  attachments: string[];
  notes: string;
  status: "مدفوع" | "جزئي" | "معلق";
}

const SupplierPayments = () => {
  const { toast } = useToast();

  // State for Payments
  const [payments, setPayments] = useState<SupplierPayment[]>([
    {
      id: "PAY-001",
      supplierName: "مؤسسة العناية بالزيوت",
      invoiceNumber: "INV-2024-001",
      totalAmount: 15000,
      paidAmount: 15000,
      paymentDate: "2024-03-15",
      paymentMethod: "تحويل بنكي",
      transferNumber: "TXN-123456789",
      attachments: [],
      notes: "دفع كامل للفاتورة",
      status: "مدفوع"
    },
    {
      id: "PAY-002",
      supplierName: "متجر قطع الغيار الأوروبية",
      invoiceNumber: "INV-2024-002",
      totalAmount: 25000,
      paidAmount: 15000,
      paymentDate: "2024-03-10",
      paymentMethod: "شيك",
      transferNumber: "CHK-987654",
      attachments: [],
      notes: "دفعة جزئية - المتبقي 10000 ر.س",
      status: "جزئي"
    },
    {
      id: "PAY-003",
      supplierName: "شركة المواد الكيميائية المتقدمة",
      invoiceNumber: "INV-2024-003",
      totalAmount: 8500,
      paidAmount: 0,
      paymentDate: "2024-03-25",
      paymentMethod: "نقد",
      attachments: [],
      notes: "في انتظار الدفع",
      status: "معلق"
    }
  ]);

  const [newPayment, setNewPayment] = useState<Partial<SupplierPayment>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Functions
  const addPayment = () => {
    if (!newPayment.supplierName || !newPayment.invoiceNumber || !newPayment.paidAmount || !newPayment.paymentDate) {
      toast({
        title: "خطأ في التسجيل",
        description: "يرجى تعبئة جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const payment: SupplierPayment = {
      id: `PAY-${Date.now()}`,
      attachments: [],
      notes: "",
      status: "مدفوع",
      ...newPayment as SupplierPayment
    };

    setPayments(prev => [...prev, payment]);
    setNewPayment({});
    setShowAddForm(false);
    
    toast({
      title: "تم التسجيل بنجاح",
      description: "تم تسجيل الدفعة الجديدة",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مدفوع":
        return "bg-success/10 text-success border-success/20";
      case "جزئي":
        return "bg-warning/10 text-warning border-warning/20";
      case "معلق":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalPaid = payments.reduce((acc, payment) => acc + payment.paidAmount, 0);
  const totalDue = payments.reduce((acc, payment) => acc + (payment.totalAmount - payment.paidAmount), 0);
  const pendingPayments = payments.filter(p => p.status === "معلق").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            مدفوعات الموردين
          </h1>
          <p className="text-muted-foreground">إدارة وتتبع مدفوعات الموردين والفواتير</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          تسجيل دفعة جديدة
        </Button>
      </div>

      {/* إحصائيات المدفوعات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المدفوع</p>
                <p className="text-2xl font-bold text-success">{totalPaid.toLocaleString()} ر.س</p>
              </div>
              <DollarSign className="h-4 w-4 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المبلغ المستحق</p>
                <p className="text-2xl font-bold text-destructive">{totalDue.toLocaleString()} ر.س</p>
              </div>
              <Calculator className="h-4 w-4 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المدفوعات المعلقة</p>
                <p className="text-2xl font-bold text-warning">{pendingPayments}</p>
              </div>
              <Activity className="h-4 w-4 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المعاملات</p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* نموذج تسجيل دفعة جديدة */}
      {showAddForm && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>تسجيل دفعة جديدة</CardTitle>
            <CardDescription>تسجيل دفعة للموردين</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="supplierName">اسم المورد *</Label>
                <Select value={newPayment.supplierName || ""} onValueChange={(value) => setNewPayment(prev => ({ ...prev, supplierName: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المورد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مؤسسة العناية بالزيوت">مؤسسة العناية بالزيوت</SelectItem>
                    <SelectItem value="متجر قطع الغيار الأوروبية">متجر قطع الغيار الأوروبية</SelectItem>
                    <SelectItem value="شركة المواد الكيميائية المتقدمة">شركة المواد الكيميائية المتقدمة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="invoiceNumber">رقم الفاتورة *</Label>
                <Input
                  id="invoiceNumber"
                  value={newPayment.invoiceNumber || ""}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                  placeholder="INV-2024-001"
                />
              </div>

              <div>
                <Label htmlFor="totalAmount">إجمالي الفاتورة</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={newPayment.totalAmount || ""}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="paidAmount">المبلغ المدفوع *</Label>
                <Input
                  id="paidAmount"
                  type="number"
                  value={newPayment.paidAmount || ""}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, paidAmount: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="paymentDate">تاريخ الدفع *</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={newPayment.paymentDate || ""}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, paymentDate: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="paymentMethod">طريقة الدفع</Label>
                <Select value={newPayment.paymentMethod || ""} onValueChange={(value) => setNewPayment(prev => ({ ...prev, paymentMethod: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تحويل بنكي">تحويل بنكي</SelectItem>
                    <SelectItem value="شيك">شيك</SelectItem>
                    <SelectItem value="نقد">نقد</SelectItem>
                    <SelectItem value="بطاقة ائتمان">بطاقة ائتمان</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transferNumber">رقم التحويل/الشيك</Label>
                <Input
                  id="transferNumber"
                  value={newPayment.transferNumber || ""}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, transferNumber: e.target.value }))}
                  placeholder="رقم المرجع"
                />
              </div>

              <div>
                <Label htmlFor="status">حالة الدفع</Label>
                <Select value={newPayment.status || ""} onValueChange={(value) => setNewPayment(prev => ({ ...prev, status: value as "مدفوع" | "جزئي" | "معلق" }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مدفوع">مدفوع</SelectItem>
                    <SelectItem value="جزئي">جزئي</SelectItem>
                    <SelectItem value="معلق">معلق</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  value={newPayment.notes || ""}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="ملاحظات إضافية..."
                  rows={2}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={addPayment}>حفظ الدفعة</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>إلغاء</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* الفلاتر والبحث */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث عن مورد أو رقم فاتورة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="مدفوع">مدفوع</SelectItem>
                  <SelectItem value="جزئي">جزئي</SelectItem>
                  <SelectItem value="معلق">معلق</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول المدفوعات */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            سجل المدفوعات ({filteredPayments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الدفعة</TableHead>
                <TableHead>المورد</TableHead>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>إجمالي الفاتورة</TableHead>
                <TableHead>المبلغ المدفوع</TableHead>
                <TableHead>المتبقي</TableHead>
                <TableHead>تاريخ الدفع</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{payment.supplierName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {payment.invoiceNumber}
                    </div>
                  </TableCell>
                  <TableCell>{payment.totalAmount.toLocaleString()} ر.س</TableCell>
                  <TableCell className="text-success font-medium">{payment.paidAmount.toLocaleString()} ر.س</TableCell>
                  <TableCell className="text-destructive font-medium">
                    {(payment.totalAmount - payment.paidAmount).toLocaleString()} ر.س
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {payment.paymentDate}
                    </div>
                  </TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          تعديل الدفعة
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierPayments;