import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Download, FileText, BarChart3, PieChart, TrendingUp, Calendar as CalendarIcon, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { gregorianLocale } from "@/lib/dateConfig";

const mockReports = [
  {
    id: "RPT001",
    reportName: "تقرير الأداء الشهري",
    reportType: "أداء",
    carrierId: "CAR001",
    carrierName: "شركة النقل السريع",
    period: "يناير 2024",
    generatedDate: "2024-02-01",
    status: "مكتمل",
    fileSize: "2.5 MB",
    downloadCount: 15
  },
  {
    id: "RPT002",
    reportName: "تقرير الإيرادات الربعية",
    reportType: "مالي",
    carrierId: "CAR002",
    carrierName: "ناقل المدينة",
    period: "Q1 2024",
    generatedDate: "2024-01-28",
    status: "مكتمل",
    fileSize: "1.8 MB",
    downloadCount: 8
  },
  {
    id: "RPT003",
    reportName: "تحليل العمليات اليومية",
    reportType: "تشغيلي",
    carrierId: "CAR003",
    carrierName: "خدمات التوصيل المتقدمة",
    period: "يناير 2024",
    generatedDate: "2024-01-25",
    status: "قيد الإعداد",
    fileSize: "-",
    downloadCount: 0
  },
  {
    id: "RPT004",
    reportName: "تقرير تحليل المناطق",
    reportType: "تحليلي",
    carrierId: "CAR001",
    carrierName: "شركة النقل السريع",
    period: "ديسمبر 2023",
    generatedDate: "2024-01-15",
    status: "مكتمل",
    fileSize: "3.2 MB",
    downloadCount: 22
  }
];

const CarrierReports = () => {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const { toast } = useToast();

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.carrierId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesType = typeFilter === "all" || report.reportType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "مكتمل":
        return "bg-success text-success-foreground";
      case "قيد الإعداد":
        return "bg-warning text-warning-foreground";
      case "خطأ":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "أداء":
        return "bg-blue-100 text-blue-800";
      case "مالي":
        return "bg-green-100 text-green-800";
      case "تشغيلي":
        return "bg-yellow-100 text-yellow-800";
      case "تحليلي":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleGenerateReport = () => {
    toast({
      title: "تم إنشاء التقرير",
      description: "سيتم إشعارك عند اكتمال إعداد التقرير",
    });
    setIsGenerateDialogOpen(false);
  };

  const handleDownloadReport = (reportId) => {
    toast({
      title: "تم بدء التحميل",
      description: "جاري تحميل التقرير...",
    });
  };

  const totalReports = reports.length;
  const completedReports = reports.filter(r => r.status === "مكتمل").length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloadCount, 0);
  const avgFileSize = reports
    .filter(r => r.fileSize !== "-")
    .reduce((sum, r) => sum + parseFloat(r.fileSize), 0) / 
    reports.filter(r => r.fileSize !== "-").length;

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تقارير الناقلين</h1>
          <p className="text-muted-foreground">إنشاء وإدارة تقارير أداء وإحصائيات الناقلين</p>
        </div>
        <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              إنشاء تقرير جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إنشاء تقرير جديد</DialogTitle>
              <DialogDescription>
                اختر نوع التقرير والفترة الزمنية المطلوبة
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">نوع التقرير</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">تقرير الأداء</SelectItem>
                      <SelectItem value="financial">التقرير المالي</SelectItem>
                      <SelectItem value="operational">التقرير التشغيلي</SelectItem>
                      <SelectItem value="analytical">التقرير التحليلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrier">الناقل</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الناقل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الناقلين</SelectItem>
                      <SelectItem value="car001">شركة النقل السريع</SelectItem>
                      <SelectItem value="car002">ناقل المدينة</SelectItem>
                      <SelectItem value="car003">خدمات التوصيل المتقدمة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>من تاريخ</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-right font-normal"
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "PPP") : "اختر التاريخ"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>إلى تاريخ</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-right font-normal"
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "PPP") : "اختر التاريخ"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">تنسيق التقرير</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleGenerateReport}>
                إنشاء التقرير
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات التقارير */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التقارير</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">
              تقرير منشأ
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التقارير المكتملة</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedReports}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+{Math.round((completedReports/totalReports)*100)}%</span> نسبة الإكمال
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التحميلات</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads}</div>
            <p className="text-xs text-muted-foreground">
              عملية تحميل
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط حجم الملف</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgFileSize.toFixed(1)} MB</div>
            <p className="text-xs text-muted-foreground">
              حجم التقرير
            </p>
          </CardContent>
        </Card>
      </div>

      {/* فلاتر البحث */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والفلترة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في التقارير أو الناقلين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="حالة التقرير" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="مكتمل">مكتمل</SelectItem>
                <SelectItem value="قيد الإعداد">قيد الإعداد</SelectItem>
                <SelectItem value="خطأ">خطأ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="نوع التقرير" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="أداء">أداء</SelectItem>
                <SelectItem value="مالي">مالي</SelectItem>
                <SelectItem value="تشغيلي">تشغيلي</SelectItem>
                <SelectItem value="تحليلي">تحليلي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* جدول التقارير */}
      <Card>
        <CardHeader>
          <CardTitle>التقارير المتاحة</CardTitle>
          <CardDescription>
            عرض وإدارة جميع التقارير المنشأة للناقلين
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم التقرير</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الناقل</TableHead>
                <TableHead>الفترة</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>حجم الملف</TableHead>
                <TableHead>التحميلات</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.reportName}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(report.reportType)}>
                      {report.reportType}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.carrierName}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{report.generatedDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.fileSize}</TableCell>
                  <TableCell>{report.downloadCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {report.status === "مكتمل" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
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

export default CarrierReports;