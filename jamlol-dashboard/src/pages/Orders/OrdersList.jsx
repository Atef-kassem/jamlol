import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Package2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OrdersList = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      buyerNumber: "BUY-001",
      supplierNumber: "SUP-001",
      status: "initial",
      totalPrice: 1500,
      carrierNumber: "",
      orderDate: "2024-01-15",
      lastModified: "2024-01-15",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      buyerNumber: "BUY-002",
      supplierNumber: "SUP-002",
      status: "waiting_carrier",
      totalPrice: 2300,
      orderDate: "2024-01-14",
      lastModified: "2024-01-14",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      buyerNumber: "BUY-001",
      supplierNumber: "SUP-001",
      status: "in_delivery",
      totalPrice: 1500,
      carrierNumber: "CAR-001",
      orderDate: "2024-01-13",
      lastModified: "2024-01-15",
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      buyerNumber: "BUY-003",
      supplierNumber: "SUP-003",
      status: "completed",
      totalPrice: 3200,
      carrierNumber: "CAR-002",
      orderDate: "2024-01-12",
      lastModified: "2024-01-13",
    },
    {
      id: "5",
      orderNumber: "ORD-2024-005",
      buyerNumber: "BUY-004",
      supplierNumber: "SUP-002",
      status: "cancelled",
      totalPrice: 1800,
      carrierNumber: "",
      orderDate: "2024-01-11",
      lastModified: "2024-01-12",
    },
    {
      id: "6",
      orderNumber: "ORD-2024-006",
      buyerNumber: "BUY-005",
      supplierNumber: "SUP-001",
      status: "completed",
      totalPrice: 2800,
      carrierNumber: "CAR-003",
      orderDate: "2024-01-10",
      lastModified: "2024-01-11",
    },
    {
      id: "7",
      orderNumber: "ORD-2024-007",
      buyerNumber: "BUY-006",
      supplierNumber: "SUP-004",
      status: "cancelled",
      totalPrice: 950,
      carrierNumber: "",
      orderDate: "2024-01-09",
      lastModified: "2024-01-10",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newOrder, setNewOrder] = useState({
    orderNumber: "",
    buyerNumber: "",
    supplierNumber: "",
    status: "initial",
    totalPrice: 0,
    carrierNumber: "",
    draftInvoiceNumber: "",
    finalInvoiceNumber: "",
    orderDate: new Date(),
    lastModified: new Date(),
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "initial":
        return "bg-gray-100 text-gray-800";
      case "waiting_carrier":
        return "bg-yellow-100 text-yellow-800";
      case "in_delivery":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "initial":
        return "قيد المراجعة";
      case "waiting_carrier":
        return "بانتظار ناقل";
      case "in_delivery":
        return "قيد التنفيذ";
      case "completed":
        return "مكتمل";
      case "cancelled":
        return "ملغى";
      default:
        return status;
    }
  };

  const handleAddOrder = () => {
    const orderToAdd = {
      id: Date.now().toString(),
      ...newOrder,
      orderDate: format(newOrder.orderDate, "yyyy-MM-dd"),
      lastModified: format(new Date(), "yyyy-MM-dd"),
    };

    setOrders([...orders, orderToAdd]);
    setIsDialogOpen(false);
    setNewOrder({
      orderNumber: "",
      buyerNumber: "",
      supplierNumber: "",
      status: "initial",
      totalPrice: 0,
      carrierNumber: "",
      draftInvoiceNumber: "",
      finalInvoiceNumber: "",
      orderDate: new Date(),
      lastModified: new Date(),
    });

    toast({
      title: "تم إضافة الطلب بنجاح",
      description: "تم إضافة الطلب الجديد إلى قائمة الطلبات",
    });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplierNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Statistics calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === "initial" || o.status === "waiting_carrier"
  ).length;
  const processingOrders = orders.filter(
    (o) => o.status === "in_delivery"
  ).length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;
  const totalValue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">حالات الطلبات</h1>
            <p className="text-muted-foreground">
              إدارة ومتابعة جميع الطلبات وحالاتها في المنصة
            </p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              طلب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة طلب جديد</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="orderNumber">رقم الطلب</Label>
                <Input
                  id="orderNumber"
                  value={newOrder.orderNumber}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, orderNumber: e.target.value })
                  }
                  placeholder="ORD-2024-XXX"
                />
              </div>
              <div>
                <Label htmlFor="buyerNumber">رقم المشتري</Label>
                <Input
                  id="buyerNumber"
                  value={newOrder.buyerNumber}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, buyerNumber: e.target.value })
                  }
                  placeholder="BUY-XXX"
                />
              </div>
              <div>
                <Label htmlFor="supplierNumber">رقم المورد</Label>
                <Input
                  id="supplierNumber"
                  value={newOrder.supplierNumber}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, supplierNumber: e.target.value })
                  }
                  placeholder="SUP-XXX"
                />
              </div>
              <div>
                <Label htmlFor="status">حالة الطلب</Label>
                <Select
                  value={newOrder.status}
                  onValueChange={(value) =>
                    setNewOrder({ ...newOrder, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="initial">قيد المراجعة</SelectItem>
                    <SelectItem value="waiting_carrier">
                      بانتظار ناقل
                    </SelectItem>
                    <SelectItem value="in_delivery">قيد التنفيذ</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="cancelled">ملغى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="totalPrice">السعر الإجمالي</Label>
                <Input
                  id="totalPrice"
                  type="number"
                  value={newOrder.totalPrice}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      totalPrice: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="carrierNumber">رقم الناقل (اختياري)</Label>
                <Input
                  id="carrierNumber"
                  value={newOrder.carrierNumber}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, carrierNumber: e.target.value })
                  }
                  placeholder="CAR-XXX"
                />
              </div>
              <div className="col-span-2">
                <Label>تاريخ الطلب</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newOrder.orderDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newOrder.orderDate ? (
                        format(newOrder.orderDate, "PPP")
                      ) : (
                        <span>اختر التاريخ</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newOrder.orderDate}
                      onSelect={(date) =>
                        date && setNewOrder({ ...newOrder, orderDate: date })
                      }
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
              <Button onClick={handleAddOrder}>إضافة الطلب</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي الطلبات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قيد المراجعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {pendingOrders}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قيد التنفيذ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {processingOrders}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مكتملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedOrders}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ملغاة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {cancelledOrders}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              القيمة الإجمالية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalValue.toLocaleString()} ر.س
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>قائمة الطلبات</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الطلبات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="initial">قيد المراجعة</SelectItem>
                  <SelectItem value="waiting_carrier">بانتظار ناقل</SelectItem>
                  <SelectItem value="in_delivery">قيد التنفيذ</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="cancelled">ملغى</SelectItem>
                </SelectContent>
              </Select>
              {statusFilter !== "all" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className="px-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم الطلب</TableHead>
                <TableHead className="text-right">رقم المشتري</TableHead>
                <TableHead className="text-right">رقم المورد</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">السعر الإجمالي</TableHead>
                <TableHead className="text-right">رقم الناقل</TableHead>
                <TableHead className="text-right">تاريخ الطلب</TableHead>
                <TableHead className="text-right">آخر تعديل</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-medium">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>{order.buyerNumber}</TableCell>
                  <TableCell>{order.supplierNumber}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">
                    {order.totalPrice.toLocaleString()} ر.س
                  </TableCell>
                  <TableCell>{order.carrierNumber || "-"}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.lastModified}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">فتح القائمة</span>⋮
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد طلبات مطابقة للبحث أو الفلتر المحدد
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersList;
