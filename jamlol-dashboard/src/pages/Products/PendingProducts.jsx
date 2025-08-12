import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, Timer, AlertTriangle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const PendingProducts = () => {
  const products = [
    {
      id: "PRD-045",
      name: "عسل طبيعي جبلي",
      category: "العسل والمنتجات الطبيعية",
      supplier: "مناحل الجبال الشمالية",
      price: "185.00",
      unit: "كيلو",
      submissionDate: "2024-01-14",
      reason: "مراجعة الجودة",
      priority: "عادي",
      documents: ["شهادة الجودة", "تحليل المختبر"]
    },
    {
      id: "PRD-046",
      name: "بن عربي محمص",
      category: "المشروبات الساخنة",
      supplier: "مقاهي الأصالة",
      price: "95.50",
      unit: "كيلو", 
      submissionDate: "2024-01-13",
      reason: "مراجعة السعر",
      priority: "عاجل",
      documents: ["شهادة المنشأ", "تقرير الجودة"]
    },
    {
      id: "PRD-047",
      name: "سمن بلدي أصلي",
      category: "الدهون والزيوت",
      supplier: "مزارع الطيبة",
      price: "65.75",
      unit: "كيلو",
      submissionDate: "2024-01-12",
      reason: "مراجعة التراخيص",
      priority: "عادي",
      documents: ["ترخيص المصنع", "شهادة الجودة"]
    },
    {
      id: "PRD-048",
      name: "لوز مقشر فاخر",
      category: "المكسرات",
      supplier: "بيت المكسرات",
      price: "125.00",
      unit: "كيلو",
      submissionDate: "2024-01-11",
      reason: "معلومات ناقصة",
      priority: "منخفض",
      documents: ["شهادة التصدير"]
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "عاجل": return "bg-red-100 text-red-800";
      case "عادي": return "bg-blue-100 text-blue-800";
      case "منخفض": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getReasonIcon = (reason) => {
    if (reason.includes("جودة")) return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    if (reason.includes("سعر")) return <Timer className="w-4 h-4 text-blue-500" />;
    if (reason.includes("ترخيص")) return <CheckCircle className="w-4 h-4 text-purple-500" />;
    return <Timer className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">المنتجات في انتظار الموافقة</h1>
          <p className="text-muted-foreground">المنتجات التي تحتاج إلى مراجعة وموافقة الإدارة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            موافقة مجمعة
          </Button>
          <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50">
            <XCircle className="w-4 h-4" />
            رفض مجمع
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">في انتظار الموافقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">234</div>
            <p className="text-xs text-muted-foreground">منتج قيد المراجعة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مراجعة عاجلة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">45</div>
            <p className="text-xs text-muted-foreground">تحتاج موافقة سريعة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متوسط المراجعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3.5</div>
            <p className="text-xs text-muted-foreground">يوم للموافقة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">معدل الموافقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89%</div>
            <p className="text-xs text-muted-foreground">من المنتجات المراجعة</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-yellow-600" />
                قائمة المنتجات قيد المراجعة
              </CardTitle>
              <CardDescription>المنتجات التي تحتاج موافقة إدارية</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن منتج..." className="pr-10 w-64" />
              </div>
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
                <TableHead className="text-right">رمز المنتج</TableHead>
                <TableHead className="text-right">اسم المنتج</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">المورد</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">تاريخ التقديم</TableHead>
                <TableHead className="text-right">سبب المراجعة</TableHead>
                <TableHead className="text-right">الأولوية</TableHead>
                <TableHead className="text-right">المستندات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-yellow-600" />
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell className="font-mono">{product.price} ر.س / {product.unit}</TableCell>
                  <TableCell>{product.submissionDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getReasonIcon(product.reason)}
                      <span className="text-sm">{product.reason}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(product.priority)}>
                      {product.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.documents.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          مراجعة تفصيلية
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          موافقة
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <XCircle className="w-4 h-4" />
                          رفض
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

export default PendingProducts;