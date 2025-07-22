import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Filter, Eye, Edit, Trash2, Activity } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Order {
  id: string;
  orderNumber: string;
  buyerNumber: string;
  supplierNumber: string;
  status: 'initial' | 'waiting_carrier' | 'in_delivery' | 'completed' | 'rejected';
  totalPrice: number;
  carrierNumber?: string;
  draftInvoiceNumber?: string;
  finalInvoiceNumber?: string;
  orderDate: string;
  lastModified: string;
}

const ProcessingOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-003',
      buyerNumber: 'BUY-001',
      supplierNumber: 'SUP-001',
      status: 'in_delivery',
      totalPrice: 1500,
      carrierNumber: 'CAR-001',
      orderDate: '2024-01-13',
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-004',
      buyerNumber: 'BUY-002',
      supplierNumber: 'SUP-002',
      status: 'in_delivery',
      totalPrice: 2300,
      carrierNumber: 'CAR-002',
      orderDate: '2024-01-12',
      lastModified: '2024-01-14'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newOrder, setNewOrder] = useState({
    orderNumber: '',
    buyerNumber: '',
    supplierNumber: '',
    status: 'in_delivery' as Order['status'],
    totalPrice: 0,
    carrierNumber: '',
    draftInvoiceNumber: '',
    finalInvoiceNumber: '',
    orderDate: new Date(),
    lastModified: new Date()
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'initial': return 'bg-gray-100 text-gray-800';
      case 'waiting_carrier': return 'bg-yellow-100 text-yellow-800';
      case 'in_delivery': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'initial': return 'مبدئي';
      case 'waiting_carrier': return 'بانتظار ناقل';
      case 'in_delivery': return 'جاري التوصيل';
      case 'completed': return 'مكتمل';
      case 'rejected': return 'مرفوض';
      default: return status;
    }
  };

  const handleAddOrder = () => {
    const orderToAdd = {
      id: Date.now().toString(),
      ...newOrder,
      orderDate: format(newOrder.orderDate, 'yyyy-MM-dd'),
      lastModified: format(new Date(), 'yyyy-MM-dd')
    };

    setOrders([...orders, orderToAdd]);
    setIsDialogOpen(false);
    setNewOrder({
      orderNumber: '',
      buyerNumber: '',
      supplierNumber: '',
      status: 'in_delivery',
      totalPrice: 0,
      carrierNumber: '',
      draftInvoiceNumber: '',
      finalInvoiceNumber: '',
      orderDate: new Date(),
      lastModified: new Date()
    });
    
    toast({
      title: "تم إضافة الطلب بنجاح",
      description: "تم إضافة الطلب الجديد إلى قائمة الطلبات قيد التنفيذ"
    });
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.buyerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.supplierNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const processingCount = orders.filter(o => o.status === 'in_delivery').length;
  const totalValue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-purple-500" />
          <h1 className="text-3xl font-bold">الطلبات قيد التنفيذ</h1>
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
              <DialogTitle>إضافة طلب جديد قيد التنفيذ</DialogTitle>
              <DialogDescription>
                أضف طلباً جديداً إلى قائمة الطلبات قيد التنفيذ والشحن
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="orderNumber">رقم الطلب</Label>
                <Input
                  id="orderNumber"
                  value={newOrder.orderNumber}
                  onChange={(e) => setNewOrder({...newOrder, orderNumber: e.target.value})}
                  placeholder="ORD-2024-XXX"
                />
              </div>
              <div>
                <Label htmlFor="buyerNumber">رقم المشتري</Label>
                <Input
                  id="buyerNumber"
                  value={newOrder.buyerNumber}
                  onChange={(e) => setNewOrder({...newOrder, buyerNumber: e.target.value})}
                  placeholder="BUY-XXX"
                />
              </div>
              <div>
                <Label htmlFor="supplierNumber">رقم المورد</Label>
                <Input
                  id="supplierNumber"
                  value={newOrder.supplierNumber}
                  onChange={(e) => setNewOrder({...newOrder, supplierNumber: e.target.value})}
                  placeholder="SUP-XXX"
                />
              </div>
              <div>
                <Label htmlFor="status">حالة الطلب</Label>
                <Select value={newOrder.status} onValueChange={(value) => setNewOrder({...newOrder, status: value as Order['status']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="initial">مبدئي</SelectItem>
                    <SelectItem value="waiting_carrier">بانتظار ناقل</SelectItem>
                    <SelectItem value="in_delivery">جاري التوصيل</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="rejected">مرفوض</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="totalPrice">السعر الإجمالي</Label>
                <Input
                  id="totalPrice"
                  type="number"
                  value={newOrder.totalPrice}
                  onChange={(e) => setNewOrder({...newOrder, totalPrice: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="carrierNumber">رقم الناقل</Label>
                <Input
                  id="carrierNumber"
                  value={newOrder.carrierNumber}
                  onChange={(e) => setNewOrder({...newOrder, carrierNumber: e.target.value})}
                  placeholder="CAR-XXX"
                />
              </div>
              <div>
                <Label htmlFor="draftInvoiceNumber">رقم مسودة الفاتورة (اختياري)</Label>
                <Input
                  id="draftInvoiceNumber"
                  value={newOrder.draftInvoiceNumber}
                  onChange={(e) => setNewOrder({...newOrder, draftInvoiceNumber: e.target.value})}
                  placeholder="DRF-XXX"
                />
              </div>
              <div>
                <Label htmlFor="finalInvoiceNumber">رقم الفاتورة النهائية (اختياري)</Label>
                <Input
                  id="finalInvoiceNumber"
                  value={newOrder.finalInvoiceNumber}
                  onChange={(e) => setNewOrder({...newOrder, finalInvoiceNumber: e.target.value})}
                  placeholder="INV-XXX"
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
                      {newOrder.orderDate ? format(newOrder.orderDate, "PPP") : <span>اختر التاريخ</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newOrder.orderDate}
                      onSelect={(date) => date && setNewOrder({...newOrder, orderDate: date})}
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
              <Button onClick={handleAddOrder}>
                إضافة الطلب
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قيد التنفيذ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{processingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">القيمة الإجمالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalValue.toLocaleString()} ر.س</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط قيمة الطلب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.length > 0 ? Math.round(totalValue / orders.length).toLocaleString() : 0} ر.س
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>قائمة الطلبات قيد التنفيذ</CardTitle>
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
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>رقم المشتري</TableHead>
                <TableHead>رقم المورد</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>السعر الإجمالي</TableHead>
                <TableHead>رقم الناقل</TableHead>
                <TableHead>تاريخ الطلب</TableHead>
                <TableHead>آخر تعديل</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.buyerNumber}</TableCell>
                  <TableCell>{order.supplierNumber}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.totalPrice.toLocaleString()} ر.س</TableCell>
                  <TableCell>{order.carrierNumber || '-'}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.lastModified}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">فتح القائمة</span>
                          ⋮
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessingOrders;