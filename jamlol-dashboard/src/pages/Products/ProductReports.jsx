import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  DollarSign,
  Download,
  Filter,
  CalendarIcon,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const ProductReports = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "تقرير المبيعات الشهري",
      type: "مبيعات",
      period: "الشهر الحالي",
      status: "مكتمل",
      generatedAt: "2024-01-15",
      records: 450
    },
    {
      id: 2,
      name: "تقرير المخزون المنخفض",
      type: "مخزون",
      period: "أسبوعي",
      status: "جاري",
      generatedAt: "2024-01-14",
      records: 23
    },
    {
      id: 3,
      name: "تقرير الأرباح والخسائر",
      type: "مالي",
      period: "ربع سنوي",
      status: "مكتمل",
      generatedAt: "2024-01-10",
      records: 1250
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    type: '',
    period: '',
    startDate: new Date(),
    endDate: new Date(),
    description: ''
  });

  const metrics = [
    {
      title: "إجمالي التقارير",
      value: "24",
      change: "+12%",
      icon: BarChart3,
      trend: "up"
    },
    {
      title: "التقارير المكتملة",
      value: "18",
      change: "+5%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "المنتجات المراقبة",
      value: "1,234",
      change: "+8%",
      icon: Package,
      trend: "up"
    },
    {
      title: "قيمة التقارير",
      value: "₪ 45,230",
      change: "+15%",
      icon: DollarSign,
      trend: "up"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "مكتمل":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">مكتمل</Badge>;
      case "جاري":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">جاري</Badge>;
      case "معلق":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">معلق</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreateReport = () => {
    const reportToAdd = {
      id: reports.length + 1,
      ...newReport,
      status: "جاري",
      generatedAt: format(new Date(), 'yyyy-MM-dd'),
      records: Math.floor(Math.random() * 1000) + 1
    };

    setReports([...reports, reportToAdd]);
    setIsDialogOpen(false);
    setNewReport({
      name: '',
      type: '',
      period: '',
      startDate: new Date(),
      endDate: new Date(),
      description: ''
    });
    
    toast({
      title: "تم إنشاء التقرير بنجاح",
      description: "جاري إعداد التقرير الجديد، سيكون متاحاً قريباً"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تقارير المنتجات</h1>
          <p className="text-muted-foreground mt-2">
            إدارة ومراقبة تقارير المنتجات والمبيعات
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 ml-2" />
            فترة زمنية
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <BarChart3 className="h-4 w-4 ml-2" />
                تقرير جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إنشاء تقرير جديد</DialogTitle>
                <DialogDescription>
                  أنشئ تقريراً جديداً للمنتجات والمبيعات
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="reportName">اسم التقرير</Label>
                  <Input
                    id="reportName"
                    value={newReport.name}
                    onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                    placeholder="أدخل اسم التقرير"
                  />
                </div>
                <div>
                  <Label htmlFor="reportType">نوع التقرير</Label>
                  <Select value={newReport.type} onValueChange={(value) => setNewReport({...newReport, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="مبيعات">تقرير المبيعات</SelectItem>
                      <SelectItem value="مخزون">تقرير المخزون</SelectItem>
                      <SelectItem value="مالي">التقرير المالي</SelectItem>
                      <SelectItem value="أداء">تقرير الأداء</SelectItem>
                      <SelectItem value="عملاء">تقرير العملاء</SelectItem>
                      <SelectItem value="موردين">تقرير الموردين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="period">الفترة الزمنية</Label>
                  <Select value={newReport.period} onValueChange={(value) => setNewReport({...newReport, period: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="يومي">يومي</SelectItem>
                      <SelectItem value="أسبوعي">أسبوعي</SelectItem>
                      <SelectItem value="شهري">شهري</SelectItem>
                      <SelectItem value="ربع سنوي">ربع سنوي</SelectItem>
                      <SelectItem value="سنوي">سنوي</SelectItem>
                      <SelectItem value="مخصص">فترة مخصصة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>تاريخ البداية</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newReport.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newReport.startDate ? format(newReport.startDate, "PPP") : <span>اختر التاريخ</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newReport.startDate}
                        onSelect={(date) => date && setNewReport({...newReport, startDate: date})}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>تاريخ النهاية</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newReport.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newReport.endDate ? format(newReport.endDate, "PPP") : <span>اختر التاريخ</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newReport.endDate}
                        onSelect={(date) => date && setNewReport({...newReport, endDate: date})}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleCreateReport}>
                  إنشاء التقرير
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <p className={`text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change} من الشهر الماضي
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <metric.icon className={`h-5 w-5 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>التقارير المتاحة</span>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير الكل
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم التقرير</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">الفترة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                <TableHead className="text-right">عدد السجلات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.generatedAt}</TableCell>
                  <TableCell>{report.records.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        عرض
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">تقرير مبيعات سريع</h3>
            <p className="text-sm text-muted-foreground">
              إنشاء تقرير مبيعات للفترة المحددة
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">تقرير المخزون</h3>
            <p className="text-sm text-muted-foreground">
              مراقبة مستويات المخزون والتنبيهات
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">تحليل الأداء</h3>
            <p className="text-sm text-muted-foreground">
              تحليل أداء المنتجات والاتجاهات
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductReports;