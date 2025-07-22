import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  CalendarIcon, 
  Search, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  PlusCircle,
  Eye,
  Edit,
  Save,
  X,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';

// Types
interface StockCountSession {
  id: string;
  sessionNumber: string;
  warehouse: string;
  countType: 'دوري' | 'مستمر' | 'مفاجئ';
  date: string;
  status: 'جاري' | 'مكتمل' | 'معتمد' | 'ملغي';
  teamMembers: string[];
  itemsCount: number;
  discrepanciesCount: number;
  totalValue: number;
  notes?: string;
}

interface CountItem {
  id: string;
  itemCode: string;
  itemName: string;
  bookStock: number;
  physicalStock: number;
  variance: number;
  variancePercentage: number;
  unitCost: number;
  totalVarianceValue: number;
  reason?: string;
  location: string;
  batchNumber?: string;
  expiryDate?: string;
  status: 'مطابق' | 'فرق موجب' | 'فرق سالب';
}

interface Adjustment {
  id: string;
  adjustmentNumber: string;
  date: string;
  type: 'نقص' | 'زيادة' | 'قيمة';
  itemCode: string;
  itemName: string;
  adjustedQuantity: number;
  adjustedValue: number;
  reason: string;
  approvedBy: string;
  status: 'معلق' | 'معتمد' | 'مرفوض';
  attachments?: string[];
}

export default function StockTaking() {
  const [activeTab, setActiveTab] = useState('sessions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [newSession, setNewSession] = useState<Partial<StockCountSession>>({
    warehouse: '',
    countType: 'دوري',
    date: '',
    teamMembers: [],
    notes: ''
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedPhysicalStock, setEditedPhysicalStock] = useState<number>(0);
  const [varianceReason, setVarianceReason] = useState('');
  
  const { toast } = useToast();

  // Sample data
  const warehouses = ['المستودع الرئيسي', 'فرع الرياض', 'فرع جدة', 'مستودع قطع الغيار'];
  const teamMembers = ['أحمد السعيد', 'فاطمة الزهراني', 'محمد العتيبي', 'نوال القحطاني'];

  const stockSessions: StockCountSession[] = [
    {
      id: '1',
      sessionNumber: 'SC-2024-001',
      warehouse: 'المستودع الرئيسي',
      countType: 'دوري',
      date: '2024-01-15',
      status: 'معتمد',
      teamMembers: ['أحمد السعيد', 'فاطمة الزهراني'],
      itemsCount: 245,
      discrepanciesCount: 12,
      totalValue: 125000,
      notes: 'جرد ربع سنوي'
    },
    {
      id: '2',
      sessionNumber: 'SC-2024-002',
      warehouse: 'فرع الرياض',
      countType: 'مفاجئ',
      date: '2024-01-20',
      status: 'جاري',
      teamMembers: ['محمد العتيبي'],
      itemsCount: 89,
      discrepanciesCount: 5,
      totalValue: 45000,
      notes: 'جرد مفاجئ بعد تقرير نقص'
    }
  ];

  const countItems: CountItem[] = [
    {
      id: '1',
      itemCode: 'IT-001',
      itemName: 'لابتوب ديل إنسبايرون',
      bookStock: 50,
      physicalStock: 48,
      variance: -2,
      variancePercentage: -4,
      unitCost: 2500,
      totalVarianceValue: -5000,
      reason: 'تلف جهازين',
      location: 'A-1-15',
      status: 'فرق سالب'
    },
    {
      id: '2',
      itemCode: 'ST-002',
      itemName: 'مواد تنظيف متنوعة',
      bookStock: 100,
      physicalStock: 102,
      variance: 2,
      variancePercentage: 2,
      unitCost: 25,
      totalVarianceValue: 50,
      reason: 'استلام غير مسجل',
      location: 'B-2-08',
      status: 'فرق موجب'
    },
    {
      id: '3',
      itemCode: 'OF-003',
      itemName: 'أوراق طباعة A4',
      bookStock: 200,
      physicalStock: 200,
      variance: 0,
      variancePercentage: 0,
      unitCost: 15,
      totalVarianceValue: 0,
      location: 'C-1-12',
      status: 'مطابق'
    }
  ];

  const adjustments: Adjustment[] = [
    {
      id: '1',
      adjustmentNumber: 'ADJ-2024-001',
      date: '2024-01-16',
      type: 'نقص',
      itemCode: 'IT-001',
      itemName: 'لابتوب ديل إنسبايرون',
      adjustedQuantity: -2,
      adjustedValue: -5000,
      reason: 'تلف جهازين بسبب عطل في التكييف',
      approvedBy: 'مدير المستودع',
      status: 'معتمد'
    },
    {
      id: '2',
      adjustmentNumber: 'ADJ-2024-002',
      date: '2024-01-17',
      type: 'زيادة',
      itemCode: 'ST-002',
      itemName: 'مواد تنظيف متنوعة',
      adjustedQuantity: 2,
      adjustedValue: 50,
      reason: 'استلام طارئ لم يسجل في النظام',
      approvedBy: 'مشرف المشتريات',
      status: 'معلق'
    }
  ];

  // Filter functions
  const filteredSessions = stockSessions.filter(session => {
    const matchesSearch = session.sessionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse = !selectedWarehouse || selectedWarehouse === 'all' || session.warehouse === selectedWarehouse;
    const matchesStatus = !selectedStatus || selectedStatus === 'all-status' || session.status === selectedStatus;
    
    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  const filteredItems = countItems.filter(item => {
    return item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredAdjustments = adjustments.filter(adjustment => {
    return adjustment.adjustmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
           adjustment.itemName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Functions
  const startNewSession = () => {
    if (!newSession.warehouse || !newSession.countType || !selectedDate) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى تعبئة جميع الحقول المطلوبة"
      });
      return;
    }

    toast({
      title: "تم بدء جلسة الجرد",
      description: `تم إنشاء جلسة جرد جديدة للمستودع: ${newSession.warehouse}`
    });

    // Reset form
    setNewSession({
      warehouse: '',
      countType: 'دوري',
      date: '',
      teamMembers: [],
      notes: ''
    });
    setSelectedDate(undefined);
    setActiveTab('sessions');
  };

  const saveItemCount = (itemId: string) => {
    const item = countItems.find(item => item.id === itemId);
    if (!item) return;

    const variance = editedPhysicalStock - item.bookStock;
    const variancePercentage = item.bookStock > 0 ? (variance / item.bookStock) * 100 : 0;

    toast({
      title: "تم حفظ نتيجة الجرد",
      description: `تم تحديث الكمية الفعلية للصنف: ${item.itemName}`
    });

    setEditingItemId(null);
    setEditedPhysicalStock(0);
    setVarianceReason('');
  };

  const approveAdjustment = (adjustmentId: string) => {
    toast({
      title: "تم اعتماد التسوية",
      description: "تم اعتماد التسوية الجردية وتحديث الأرصدة"
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'جاري': 'bg-yellow-100 text-yellow-800',
      'مكتمل': 'bg-blue-100 text-blue-800',
      'معتمد': 'bg-green-100 text-green-800',
      'ملغي': 'bg-red-100 text-red-800',
      'معلق': 'bg-orange-100 text-orange-800',
      'مرفوض': 'bg-red-100 text-red-800',
      'مطابق': 'bg-green-100 text-green-800',
      'فرق موجب': 'bg-blue-100 text-blue-800',
      'فرق سالب': 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={cn(statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800')}>
        {status}
      </Badge>
    );
  };

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return <TrendingUp className="h-4 w-4 text-blue-600" />;
    if (variance < 0) return <AlertTriangle className="h-4 w-4 text-red-600" />;
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">الجرد المخزني والتسويات</h1>
          <p className="text-muted-foreground">إدارة عمليات الجرد والتسويات الجردية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            تصدير البيانات
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            التقارير
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sessions">جلسات الجرد</TabsTrigger>
          <TabsTrigger value="new-session">جرد جديد</TabsTrigger>
          <TabsTrigger value="count-results">نتائج الجرد</TabsTrigger>
          <TabsTrigger value="adjustments">التسويات الجردية</TabsTrigger>
        </TabsList>

        {/* Stock Count Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                جلسات الجرد
              </CardTitle>
              <CardDescription>
                عرض وإدارة جلسات الجرد المخزني
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="البحث في جلسات الجرد..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="جميع المستودعات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستودعات</SelectItem>
                    {warehouses.map(warehouse => (
                      <SelectItem key={warehouse} value={warehouse}>{warehouse}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="جميع الحالات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">جميع الحالات</SelectItem>
                    <SelectItem value="جاري">جاري</SelectItem>
                    <SelectItem value="مكتمل">مكتمل</SelectItem>
                    <SelectItem value="معتمد">معتمد</SelectItem>
                    <SelectItem value="ملغي">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الجلسة</TableHead>
                    <TableHead>المستودع</TableHead>
                    <TableHead>نوع الجرد</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>عدد الأصناف</TableHead>
                    <TableHead>الفروقات</TableHead>
                    <TableHead>القيمة الإجمالية</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.sessionNumber}</TableCell>
                      <TableCell>{session.warehouse}</TableCell>
                      <TableCell>{session.countType}</TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell>{session.itemsCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {session.discrepanciesCount > 0 && (
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                          )}
                          {session.discrepanciesCount}
                        </div>
                      </TableCell>
                      <TableCell>{session.totalValue.toLocaleString()} ر.س</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileSpreadsheet className="h-4 w-4" />
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

        {/* New Session Tab */}
        <TabsContent value="new-session" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                بدء جلسة جرد جديدة
              </CardTitle>
              <CardDescription>
                إعداد وبدء جلسة جرد مخزني جديدة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="warehouse">المستودع *</Label>
                  <Select 
                    value={newSession.warehouse} 
                    onValueChange={(value) => setNewSession(prev => ({ ...prev, warehouse: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستودع" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map(warehouse => (
                        <SelectItem key={warehouse} value={warehouse}>{warehouse}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="countType">نوع الجرد *</Label>
                  <Select 
                    value={newSession.countType} 
                    onValueChange={(value: any) => setNewSession(prev => ({ ...prev, countType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الجرد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="دوري">دوري</SelectItem>
                      <SelectItem value="مستمر">مستمر</SelectItem>
                      <SelectItem value="مفاجئ">مفاجئ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>تاريخ الجرد *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>أعضاء فريق الجرد</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر أعضاء الفريق" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member} value={member}>{member}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  placeholder="أدخل أي ملاحظات حول جلسة الجرد..."
                  value={newSession.notes}
                  onChange={(e) => setNewSession(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={startNewSession} className="flex-1">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  بدء جلسة الجرد
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  تصدير قائمة الأصناف
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Count Results Tab */}
        <TabsContent value="count-results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                نتائج الجرد
              </CardTitle>
              <CardDescription>
                إدخال ومراجعة نتائج الجرد المخزني
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="البحث في الأصناف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  استيراد نتائج
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>كود الصنف</TableHead>
                    <TableHead>اسم الصنف</TableHead>
                    <TableHead>الرصيد الدفتري</TableHead>
                    <TableHead>الرصيد الفعلي</TableHead>
                    <TableHead>الفرق</TableHead>
                    <TableHead>النسبة المئوية</TableHead>
                    <TableHead>قيمة الفرق</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.itemCode}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.bookStock}</TableCell>
                      <TableCell>
                        {editingItemId === item.id ? (
                          <Input
                            type="number"
                            value={editedPhysicalStock}
                            onChange={(e) => setEditedPhysicalStock(Number(e.target.value))}
                            className="w-20"
                          />
                        ) : (
                          item.physicalStock
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getVarianceIcon(item.variance)}
                          <span className={cn(
                            "font-medium",
                            item.variance > 0 ? "text-blue-600" : item.variance < 0 ? "text-red-600" : "text-green-600"
                          )}>
                            {item.variance > 0 ? '+' : ''}{item.variance}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-medium",
                          item.variancePercentage > 0 ? "text-blue-600" : item.variancePercentage < 0 ? "text-red-600" : "text-green-600"
                        )}>
                          {item.variancePercentage > 0 ? '+' : ''}{item.variancePercentage.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-medium",
                          item.totalVarianceValue > 0 ? "text-blue-600" : item.totalVarianceValue < 0 ? "text-red-600" : "text-green-600"
                        )}>
                          {item.totalVarianceValue > 0 ? '+' : ''}{item.totalVarianceValue.toLocaleString()} ر.س
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {editingItemId === item.id ? (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => saveItemCount(item.id)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setEditingItemId(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setEditingItemId(item.id);
                                setEditedPhysicalStock(item.physicalStock);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Adjustments Tab */}
        <TabsContent value="adjustments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                التسويات الجردية
              </CardTitle>
              <CardDescription>
                مراجعة واعتماد التسويات الجردية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="البحث في التسويات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير التسويات
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم التسوية</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>كود الصنف</TableHead>
                    <TableHead>اسم الصنف</TableHead>
                    <TableHead>الكمية المسواة</TableHead>
                    <TableHead>القيمة المسواة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdjustments.map((adjustment) => (
                    <TableRow key={adjustment.id}>
                      <TableCell className="font-medium">{adjustment.adjustmentNumber}</TableCell>
                      <TableCell>{adjustment.date}</TableCell>
                      <TableCell>
                        <Badge variant={adjustment.type === 'نقص' ? 'destructive' : 'default'}>
                          {adjustment.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{adjustment.itemCode}</TableCell>
                      <TableCell>{adjustment.itemName}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-medium",
                          adjustment.adjustedQuantity > 0 ? "text-blue-600" : "text-red-600"
                        )}>
                          {adjustment.adjustedQuantity > 0 ? '+' : ''}{adjustment.adjustedQuantity}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-medium",
                          adjustment.adjustedValue > 0 ? "text-blue-600" : "text-red-600"
                        )}>
                          {adjustment.adjustedValue > 0 ? '+' : ''}{adjustment.adjustedValue.toLocaleString()} ر.س
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(adjustment.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {adjustment.status === 'معلق' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => approveAdjustment(adjustment.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
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
}