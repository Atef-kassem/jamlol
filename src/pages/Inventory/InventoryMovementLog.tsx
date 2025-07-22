import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Search, Filter, FileText, Package, TrendingUp, TrendingDown, RotateCcw, AlertTriangle, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InventoryMovement {
  id: string;
  transactionDate: string;
  transactionType: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  uom: string;
  warehouse: string;
  location: string;
  docRef: string;
  docType: string;
  user: string;
  cost: number;
  batchNumber?: string;
  expiryDate?: string;
  notes: string;
  balanceAfter: number;
}

const InventoryMovementLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterWarehouse, setFilterWarehouse] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Sample data for inventory movements
  const movements: InventoryMovement[] = [
    {
      id: "TXN-001",
      transactionDate: "2024-01-15 10:30",
      transactionType: "إدخال مشتريات",
      itemCode: "ITM-001",
      itemName: "مواد تنظيف - ديتول",
      quantity: 100,
      uom: "قطعة",
      warehouse: "المخزن الرئيسي",
      location: "A-01-001",
      docRef: "PO-2024-001",
      docType: "أمر شراء",
      user: "أحمد محمد",
      cost: 15.50,
      batchNumber: "BTH-001",
      expiryDate: "2025-01-15",
      notes: "استلام من المورد الرئيسي",
      balanceAfter: 150
    },
    {
      id: "TXN-002",
      transactionDate: "2024-01-15 14:20",
      transactionType: "صرف مبيعات",
      itemCode: "ITM-001",
      itemName: "مواد تنظيف - ديتول",
      quantity: -25,
      uom: "قطعة",
      warehouse: "المخزن الرئيسي",
      location: "A-01-001",
      docRef: "INV-2024-001",
      docType: "فاتورة مبيعات",
      user: "سارة أحمد",
      cost: 15.50,
      batchNumber: "BTH-001",
      notes: "بيع للعميل",
      balanceAfter: 125
    },
    {
      id: "TXN-003",
      transactionDate: "2024-01-16 09:15",
      transactionType: "تحويل داخلي",
      itemCode: "ITM-002",
      itemName: "ورق طباعة A4",
      quantity: -50,
      uom: "علبة",
      warehouse: "المخزن الرئيسي",
      location: "B-02-003",
      docRef: "TRF-2024-001",
      docType: "إذن تحويل",
      user: "محمد علي",
      cost: 45.00,
      notes: "تحويل لفرع جدة",
      balanceAfter: 200
    },
    {
      id: "TXN-004",
      transactionDate: "2024-01-16 16:45",
      transactionType: "تسوية جرد",
      itemCode: "ITM-003",
      itemName: "مستلزمات مكتبية",
      quantity: -5,
      uom: "صندوق",
      warehouse: "مخزن الفرع",
      location: "C-01-005",
      docRef: "ADJ-2024-001",
      docType: "تسوية جرد",
      user: "فاطمة سالم",
      cost: 25.00,
      notes: "فارق جرد سنوي",
      balanceAfter: 45
    },
    {
      id: "TXN-005",
      transactionDate: "2024-01-17 11:30",
      transactionType: "إدخال تالف",
      itemCode: "ITM-001",
      itemName: "مواد تنظيف - ديتول",
      quantity: -10,
      uom: "قطعة",
      warehouse: "المخزن الرئيسي",
      location: "A-01-001",
      docRef: "DMG-2024-001",
      docType: "تقرير تلف",
      user: "خالد أحمد",
      cost: 15.50,
      batchNumber: "BTH-001",
      expiryDate: "2025-01-15",
      notes: "تلف في التخزين",
      balanceAfter: 115
    }
  ];

  const getTransactionTypeColor = (type: string) => {
    const colors = {
      "إدخال مشتريات": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      "إدخال مرتجع مبيعات": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      "صرف مبيعات": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      "صرف إنتاج": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
      "صرف استهلاك": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      "تحويل داخلي": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      "إدخال تحويل داخلي": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300",
      "تسوية جرد": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
      "إدخال تالف": "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
      "إرجاع لمورد": "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTransactionIcon = (type: string) => {
    const icons = {
      "إدخال مشتريات": TrendingUp,
      "إدخال مرتجع مبيعات": RotateCcw,
      "صرف مبيعات": TrendingDown,
      "صرف إنتاج": Package,
      "صرف استهلاك": Package,
      "تحويل داخلي": RotateCcw,
      "إدخال تحويل داخلي": TrendingUp,
      "تسوية جرد": FileText,
      "إدخال تالف": AlertTriangle,
      "إرجاع لمورد": RotateCcw
    };
    const IconComponent = icons[type as keyof typeof icons] || Package;
    return <IconComponent className="h-4 w-4" />;
  };

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.transactionType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || movement.transactionType === filterType;
    const matchesWarehouse = filterWarehouse === "all" || movement.warehouse === filterWarehouse;
    
    return matchesSearch && matchesType && matchesWarehouse;
  });

  const totalInQuantity = filteredMovements.filter(m => m.quantity > 0).reduce((sum, m) => sum + m.quantity, 0);
  const totalOutQuantity = Math.abs(filteredMovements.filter(m => m.quantity < 0).reduce((sum, m) => sum + m.quantity, 0));

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              سجل الحركات المخزنية
            </h1>
            <p className="text-muted-foreground mt-2">
              توثيق شامل لجميع حركات المخزون مع التفاصيل والمرفقات
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 ml-2" />
              طباعة
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الداخل</p>
                  <p className="text-xl font-bold text-green-600">{totalInQuantity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الخارج</p>
                  <p className="text-xl font-bold text-red-600">{totalOutQuantity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">عدد الحركات</p>
                  <p className="text-xl font-bold text-blue-600">{filteredMovements.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المستخدمين النشطين</p>
                  <p className="text-xl font-bold text-purple-600">{new Set(movements.map(m => m.user)).size}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            البحث والفلترة المتقدمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في الأصناف والحركات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="نوع الحركة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحركات</SelectItem>
                <SelectItem value="إدخال مشتريات">إدخال مشتريات</SelectItem>
                <SelectItem value="صرف مبيعات">صرف مبيعات</SelectItem>
                <SelectItem value="تحويل داخلي">تحويل داخلي</SelectItem>
                <SelectItem value="تسوية جرد">تسوية جرد</SelectItem>
                <SelectItem value="إدخال تالف">إدخال تالف</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterWarehouse} onValueChange={setFilterWarehouse}>
              <SelectTrigger>
                <SelectValue placeholder="المخزن" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المخازن</SelectItem>
                <SelectItem value="المخزن الرئيسي">المخزن الرئيسي</SelectItem>
                <SelectItem value="مخزن الفرع">مخزن الفرع</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">اليوم</SelectItem>
                <SelectItem value="week">الأسبوع</SelectItem>
                <SelectItem value="month">الشهر</SelectItem>
                <SelectItem value="quarter">الربع</SelectItem>
                <SelectItem value="year">السنة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>سجل الحركات التفصيلي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الحركة</TableHead>
                  <TableHead>التاريخ والوقت</TableHead>
                  <TableHead>نوع الحركة</TableHead>
                  <TableHead>كود الصنف</TableHead>
                  <TableHead>اسم الصنف</TableHead>
                  <TableHead>الكمية</TableHead>
                  <TableHead>الوحدة</TableHead>
                  <TableHead>المخزن</TableHead>
                  <TableHead>المستند</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الرصيد بعد الحركة</TableHead>
                  <TableHead>ملاحظات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{movement.id}</TableCell>
                    <TableCell>{movement.transactionDate}</TableCell>
                    <TableCell>
                      <Badge className={getTransactionTypeColor(movement.transactionType)}>
                        <span className="flex items-center gap-1">
                          {getTransactionIcon(movement.transactionType)}
                          {movement.transactionType}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>{movement.itemCode}</TableCell>
                    <TableCell>{movement.itemName}</TableCell>
                    <TableCell>
                      <span className={movement.quantity > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                      </span>
                    </TableCell>
                    <TableCell>{movement.uom}</TableCell>
                    <TableCell>{movement.warehouse}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{movement.docRef}</div>
                        <div className="text-sm text-muted-foreground">{movement.docType}</div>
                      </div>
                    </TableCell>
                    <TableCell>{movement.user}</TableCell>
                    <TableCell className="font-semibold">{movement.balanceAfter}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate" title={movement.notes}>
                        {movement.notes}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryMovementLog;