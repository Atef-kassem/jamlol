import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, MoreHorizontal, Eye, Download, Calendar, Package, TrendingUp, TrendingDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PurchaseHistory = () => {
  const [dateFilter, setDateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const purchaseHistory = [
    {
      id: "PH-2024-001",
      clientName: "سوبر ماركت الأندلس",
      clientType: "شركة",
      orderDate: "2024-01-15",
      totalAmount: "15,250",
      itemsCount: 12,
      orderStatus: "مكتمل",
      paymentMethod: "تحويل بنكي",
      category: "مواد غذائية",
      location: "الرياض - حي النزهة"
    },
    {
      id: "PH-2024-002",
      clientName: "أحمد محمد السليم",
      clientType: "فرد",
      orderDate: "2024-01-10",
      totalAmount: "2,800",
      itemsCount: 5,
      orderStatus: "مكتمل",
      paymentMethod: "كاش",
      category: "منتجات تنظيف",
      location: "جدة - حي الصفا"
    },
    {
      id: "PH-2024-003",
      clientName: "مطعم الكبسة الملكية",
      clientType: "مؤسسة",
      orderDate: "2024-01-08",
      totalAmount: "8,900",
      itemsCount: 8,
      orderStatus: "مكتمل",
      paymentMethod: "آجل",
      category: "مواد خام",
      location: "الدمام - الكورنيش"
    },
    {
      id: "PH-2023-156",
      clientName: "سوبر ماركت الأندلس",
      clientType: "شركة",
      orderDate: "2023-12-20",
      totalAmount: "22,500",
      itemsCount: 20,
      orderStatus: "مكتمل",
      paymentMethod: "تحويل بنكي",
      category: "مواد غذائية",
      location: "الرياض - حي النزهة"
    },
    {
      id: "PH-2023-145",
      clientName: "مجمع الأسواق التجاري",
      clientType: "شركة",
      orderDate: "2023-12-15",
      totalAmount: "45,800",
      itemsCount: 35,
      orderStatus: "مكتمل",
      paymentMethod: "شيك",
      category: "متنوعة",
      location: "المدينة المنورة - العوالي"
    }
  ];

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "تحويل بنكي": return "bg-blue-100 text-blue-800";
      case "كاش": return "bg-green-100 text-green-800";
      case "آجل": return "bg-yellow-100 text-yellow-800";
      case "شيك": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredHistory = purchaseHistory.filter(purchase => {
    const matchesSearch = purchase.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "2024" && purchase.orderDate.includes("2024")) ||
                       (dateFilter === "2023" && purchase.orderDate.includes("2023"));
    return matchesSearch && matchesDate;
  });

  const totalPurchases = purchaseHistory.reduce((sum, purchase) => sum + parseFloat(purchase.totalAmount.replace(',', '')), 0);
  const avgOrderValue = totalPurchases / purchaseHistory.length;

  const exportToCSV = () => {
    const headers = [
      'رقم المشترى',
      'اسم المشتري', 
      'نوع العميل',
      'تاريخ الشراء',
      'المبلغ الإجمالي',
      'عدد المنتجات',
      'طريقة الدفع',
      'الفئة',
      'الموقع'
    ];

    const csvData = [
      headers.join(','),
      ...filteredHistory.map(purchase => [
        purchase.id,
        `"${purchase.clientName}"`,
        purchase.clientType,
        purchase.orderDate,
        purchase.totalAmount,
        purchase.itemsCount,
        purchase.paymentMethod,
        purchase.category,
        `"${purchase.location}"`
      ].join(','))
    ].join('\n');

    // إضافة BOM للـ UTF-8 لضمان عرض النص العربي بشكل صحيح
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvData], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `سجل_المشتريات_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">سجل المشتريات</h1>
          <p className="text-muted-foreground">تاريخ وسجل مشتريات جميع العملاء والمشترين</p>
        </div>
        <Button className="gap-2" onClick={exportToCSV}>
          <Download className="w-4 h-4" />
          تصدير التقرير
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              إجمالي المشتريات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{purchaseHistory.length}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +12% من الشهر الماضي
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">القيمة الإجمالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalPurchases.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">ريال سعودي</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متوسط قيمة الطلب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{Math.round(avgOrderValue).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">ريال سعودي</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مشتريات هذا الشهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-red-500" />
              -5% من الشهر الماضي
            </p>
          </CardContent>
        </Card>
      </div>

      {/* جدول سجل المشتريات */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>سجل المشتريات التفصيلي</CardTitle>
              <CardDescription>عرض تاريخ وتفاصيل جميع المشتريات</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="البحث في السجل..." 
                  className="pr-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع السنوات</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم المشترى</TableHead>
                <TableHead className="text-right">اسم المشتري</TableHead>
                <TableHead className="text-right">نوع العميل</TableHead>
                <TableHead className="text-right">تاريخ الشراء</TableHead>
                <TableHead className="text-right">المبلغ الإجمالي</TableHead>
                <TableHead className="text-right">عدد المنتجات</TableHead>
                <TableHead className="text-right">طريقة الدفع</TableHead>
                <TableHead className="text-right">الفئة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((purchase, index) => (
                <TableRow key={purchase.id} className="hover:bg-muted/50 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TableCell className="font-medium font-mono">{purchase.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{purchase.clientName}</span>
                      <span className="text-sm text-muted-foreground">{purchase.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{purchase.clientType}</TableCell>
                  <TableCell className="font-mono">{purchase.orderDate}</TableCell>
                  <TableCell className="font-mono font-medium">{purchase.totalAmount} ر.س</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{purchase.itemsCount} منتج</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentMethodColor(purchase.paymentMethod)}>
                      {purchase.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell>{purchase.category}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {purchase.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover-scale">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Download className="w-4 h-4" />
                          تحميل الفاتورة
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Calendar className="w-4 h-4" />
                          طلب مماثل
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

export default PurchaseHistory;