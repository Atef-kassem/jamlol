import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  FileDown, 
  Upload, 
  Lock, 
  Unlock,
  Save,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface OpeningStockItem {
  id: string;
  itemCode: string;
  itemName: string;
  unit: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  notes?: string;
}

interface OpeningStockRecord {
  id: string;
  recordNumber: string;
  warehouse: string;
  date: string;
  user: string;
  itemCount: number;
  totalValue: number;
  isLocked: boolean;
  items: OpeningStockItem[];
}

export default function OpeningStock() {
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [newRecord, setNewRecord] = useState({
    warehouse: "",
    date: new Date().toISOString().split('T')[0],
    items: [] as OpeningStockItem[]
  });

  // بيانات تجريبية
  const warehouses = [
    { id: "1", name: "المستودع الرئيسي" },
    { id: "2", name: "مستودع جدة" },
    { id: "3", name: "مستودع الدمام" },
    { id: "4", name: "مستودع الرياض" }
  ];

  const availableItems = [
    { code: "OIL-001", name: "زيت محرك شل 5W-30", unit: "لتر" },
    { code: "CLN-004", name: "صابون مركز", unit: "لتر" },
    { code: "CLO-007", name: "فوطة قطنية", unit: "قطعة" },
    { code: "WAX-003", name: "شمع سيارات", unit: "عبوة" },
    { code: "FLT-001", name: "فلتر زيت", unit: "قطعة" }
  ];

  const openingStockRecords: OpeningStockRecord[] = [
    {
      id: "1",
      recordNumber: "OS-001",
      warehouse: "المستودع الرئيسي",
      date: "2024-01-01",
      user: "محمد العتيبي",
      itemCount: 15,
      totalValue: 8200,
      isLocked: true,
      items: [
        {
          id: "1",
          itemCode: "OIL-001",
          itemName: "زيت محرك شل 5W-30",
          unit: "لتر",
          quantity: 50,
          unitCost: 25,
          totalCost: 1250,
          notes: "حالة ممتازة"
        }
      ]
    },
    {
      id: "2",
      recordNumber: "OS-002",
      warehouse: "مستودع جدة",
      date: "2024-01-03",
      user: "سالم الحربي",
      itemCount: 8,
      totalValue: 4130,
      isLocked: true,
      items: []
    },
    {
      id: "3",
      recordNumber: "OS-003",
      warehouse: "مستودع الدمام",
      date: "2024-02-15",
      user: "سارة الشهراني",
      itemCount: 11,
      totalValue: 7800,
      isLocked: false,
      items: []
    }
  ];

  const filteredRecords = openingStockRecords.filter(record =>
    record.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.recordNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItemToRecord = () => {
    const newItem: OpeningStockItem = {
      id: Date.now().toString(),
      itemCode: "",
      itemName: "",
      unit: "",
      quantity: 0,
      unitCost: 0,
      totalCost: 0,
      notes: ""
    };
    setNewRecord(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItem = (index: number, field: keyof OpeningStockItem, value: any) => {
    setNewRecord(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value
      };
      
      // حساب التكلفة الإجمالية
      if (field === 'quantity' || field === 'unitCost') {
        updatedItems[index].totalCost = updatedItems[index].quantity * updatedItems[index].unitCost;
      }
      
      return {
        ...prev,
        items: updatedItems
      };
    });
  };

  const removeItem = (index: number) => {
    setNewRecord(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const selectItem = (index: number, itemCode: string) => {
    const selectedItem = availableItems.find(item => item.code === itemCode);
    if (selectedItem) {
      updateItem(index, 'itemCode', selectedItem.code);
      updateItem(index, 'itemName', selectedItem.name);
      updateItem(index, 'unit', selectedItem.unit);
    }
  };

  const getTotalValue = () => {
    return newRecord.items.reduce((sum, item) => sum + item.totalCost, 0);
  };

  const saveRecord = () => {
    if (!newRecord.warehouse) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار المستودع",
        variant: "destructive"
      });
      return;
    }

    if (newRecord.items.length === 0) {
      toast({
        title: "خطأ",
        description: "يرجى إضافة صنف واحد على الأقل",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "نجح الحفظ",
      description: "تم حفظ بضاعة أول المدة بنجاح",
    });

    // إعادة تعيين النموذج
    setNewRecord({
      warehouse: "",
      date: new Date().toISOString().split('T')[0],
      items: []
    });
    setActiveTab("list");
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">بضاعة أول المدة</h1>
          <p className="text-muted-foreground mt-2">إدارة الكميات والتكاليف الافتتاحية للمخزون</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">قائمة بضاعة أول المدة</TabsTrigger>
          <TabsTrigger value="new">إضافة بضاعة أول مدة جديدة</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة عمليات بضاعة أول المدة</CardTitle>
              <CardDescription>استعراض جميع عمليات بضاعة أول المدة المدخلة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="relative">
                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث في العمليات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-8 w-64"
                    />
                  </div>
                  <Badge variant="outline">
                    إجمالي العمليات: {filteredRecords.length}
                  </Badge>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">رقم العملية</TableHead>
                      <TableHead className="text-right">المستودع</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">المستخدم</TableHead>
                      <TableHead className="text-right">عدد الأصناف</TableHead>
                      <TableHead className="text-right">القيمة الإجمالية</TableHead>
                      <TableHead className="text-right">حالة القفل</TableHead>
                      <TableHead className="text-center">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.recordNumber}</TableCell>
                        <TableCell>{record.warehouse}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.user}</TableCell>
                        <TableCell>{record.itemCount}</TableCell>
                        <TableCell>{record.totalValue.toLocaleString()} ر.س</TableCell>
                        <TableCell>
                          <Badge variant={record.isLocked ? "default" : "secondary"}>
                            {record.isLocked ? (
                              <>
                                <Lock className="w-3 h-3 mr-1" />
                                مقفلة
                              </>
                            ) : (
                              <>
                                <Unlock className="w-3 h-3 mr-1" />
                                مفتوحة
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center space-x-2 space-x-reverse">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>تفاصيل العملية {record.recordNumber}</DialogTitle>
                                  <DialogDescription>
                                    عرض تفاصيل أصناف بضاعة أول المدة
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>المستودع</Label>
                                      <p className="text-sm text-muted-foreground">{record.warehouse}</p>
                                    </div>
                                    <div>
                                      <Label>التاريخ</Label>
                                      <p className="text-sm text-muted-foreground">{record.date}</p>
                                    </div>
                                  </div>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="text-right">كود الصنف</TableHead>
                                        <TableHead className="text-right">اسم الصنف</TableHead>
                                        <TableHead className="text-right">الوحدة</TableHead>
                                        <TableHead className="text-right">الكمية</TableHead>
                                        <TableHead className="text-right">تكلفة الوحدة</TableHead>
                                        <TableHead className="text-right">الإجمالي</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {record.items.map((item) => (
                                        <TableRow key={item.id}>
                                          <TableCell>{item.itemCode}</TableCell>
                                          <TableCell>{item.itemName}</TableCell>
                                          <TableCell>{item.unit}</TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>{item.unitCost} ر.س</TableCell>
                                          <TableCell>{item.totalCost} ر.س</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {!record.isLocked && (
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            
                            <Button variant="ghost" size="sm">
                              <FileDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إضافة بضاعة أول مدة جديدة</CardTitle>
              <CardDescription>إدخال الكميات والتكاليف الافتتاحية للأصناف</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="warehouse">المستودع *</Label>
                  <Select value={newRecord.warehouse} onValueChange={(value) => setNewRecord(prev => ({ ...prev, warehouse: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستودع" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.name}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">تاريخ بضاعة أول المدة</Label>
                  <Input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">أصناف بضاعة أول المدة</h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button onClick={addItemToRecord} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      إضافة صنف
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      استيراد Excel
                    </Button>
                  </div>
                </div>

                {newRecord.items.length > 0 && (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-right">كود الصنف</TableHead>
                          <TableHead className="text-right">اسم الصنف</TableHead>
                          <TableHead className="text-right">الوحدة</TableHead>
                          <TableHead className="text-right">الكمية</TableHead>
                          <TableHead className="text-right">تكلفة الوحدة</TableHead>
                          <TableHead className="text-right">الإجمالي</TableHead>
                          <TableHead className="text-right">ملاحظات</TableHead>
                          <TableHead className="text-center">إجراء</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newRecord.items.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Select 
                                value={item.itemCode} 
                                onValueChange={(value) => selectItem(index, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="اختر" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableItems.map((availableItem) => (
                                    <SelectItem key={availableItem.code} value={availableItem.code}>
                                      {availableItem.code}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input 
                                value={item.itemName}
                                onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                                className="w-40"
                                placeholder="اسم الصنف"
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                value={item.unit}
                                onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                className="w-20"
                                placeholder="الوحدة"
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number"
                                value={item.quantity || ''}
                                onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                                className="w-20"
                                placeholder="0"
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number"
                                value={item.unitCost || ''}
                                onChange={(e) => updateItem(index, 'unitCost', parseFloat(e.target.value) || 0)}
                                className="w-24"
                                placeholder="0.00"
                              />
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">{item.totalCost.toFixed(2)} ر.س</span>
                            </TableCell>
                            <TableCell>
                              <Input 
                                value={item.notes || ''}
                                onChange={(e) => updateItem(index, 'notes', e.target.value)}
                                className="w-32"
                                placeholder="ملاحظات"
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {newRecord.items.length > 0 && (
                  <div className="flex justify-between items-center bg-muted p-4 rounded-md">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">إجمالي الأصناف: {newRecord.items.length}</p>
                      <p className="text-lg font-semibold">إجمالي القيمة: {getTotalValue().toFixed(2)} ر.س</p>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button variant="outline">
                        <FileDown className="h-4 w-4 mr-2" />
                        تصدير Excel
                      </Button>
                      <Button onClick={saveRecord}>
                        <Save className="h-4 w-4 mr-2" />
                        حفظ بضاعة أول المدة
                      </Button>
                    </div>
                  </div>
                )}

                {newRecord.items.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد أصناف مضافة بعد</p>
                    <p className="text-sm">اضغط على "إضافة صنف" لبدء إدخال البيانات</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}