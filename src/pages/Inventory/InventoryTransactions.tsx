import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  ArrowRightLeft,
  Calendar,
  User,
  Package,
  Edit,
  Eye,
  MoreVertical,
  Filter,
  Save,
  Trash2,
  Upload,
  Scan,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  ArrowLeft,
  Settings
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Types
interface TransactionItem {
  id: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  price?: number;
  total?: number;
  notes?: string;
}

interface Transaction {
  id: string;
  type: string;
  date: string;
  time: string;
  sourceWarehouse: string;
  targetWarehouse?: string;
  reference: string;
  user: string;
  status: "معتمدة" | "غير معتمدة" | "مسودة";
  items: TransactionItem[];
  notes?: string;
  attachments?: string[];
  reason?: string;
}

const InventoryTransactions = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [userFilter, setUserFilter] = useState("all");

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "INV-0015",
      type: "استلام",
      date: "2024-06-20",
      time: "10:30",
      sourceWarehouse: "المستودع الرئيسي",
      reference: "PO-1050",
      user: "أحمد العتيبي",
      status: "معتمدة",
      reason: "استلام من أمر شراء",
      items: [
        { 
          id: "1", 
          itemCode: "OIL001", 
          itemName: "زيت محرك شل", 
          quantity: 20, 
          unit: "لتر", 
          price: 45, 
          total: 900 
        },
        { 
          id: "2", 
          itemCode: "FLT001", 
          itemName: "فلتر زيت", 
          quantity: 10, 
          unit: "قطعة", 
          price: 25, 
          total: 250 
        }
      ]
    },
    {
      id: "INV-0016",
      type: "صرف",
      date: "2024-06-20",
      time: "14:15",
      sourceWarehouse: "المستودع الرئيسي",
      reference: "SRV-001",
      user: "محمد الشهري",
      status: "معتمدة",
      reason: "صرف للخدمة",
      items: [
        { 
          id: "1", 
          itemCode: "SOAP001", 
          itemName: "صابون مركز", 
          quantity: 2, 
          unit: "عبوة"
        },
        { 
          id: "2", 
          itemCode: "TOWEL001", 
          itemName: "فوطة ميكروفايبر", 
          quantity: 5, 
          unit: "قطعة"
        }
      ]
    },
    {
      id: "INV-0017",
      type: "تحويل",
      date: "2024-06-21",
      time: "09:00",
      sourceWarehouse: "المستودع الرئيسي",
      targetWarehouse: "مستودع الدمام",
      reference: "TRANS-001",
      user: "سارة الحربي",
      status: "معتمدة",
      reason: "نقل للفرع",
      items: [
        { 
          id: "1", 
          itemCode: "OIL002", 
          itemName: "زيت توتال", 
          quantity: 15, 
          unit: "لتر"
        },
        { 
          id: "2", 
          itemCode: "POL001", 
          itemName: "ملمع زجاج", 
          quantity: 8, 
          unit: "عبوة"
        }
      ]
    },
    {
      id: "INV-0018",
      type: "جرد",
      date: "2024-06-21",
      time: "16:45",
      sourceWarehouse: "مستودع الزيوت",
      reference: "AUDIT-06-2024",
      user: "فهد القحطاني",
      status: "معتمدة",
      reason: "جرد دوري شهري",
      items: [
        { 
          id: "1", 
          itemCode: "OIL003", 
          itemName: "زيت ديزل", 
          quantity: -2, 
          unit: "لتر",
          notes: "عجز في المخزون"
        },
        { 
          id: "2", 
          itemCode: "OIL004", 
          itemName: "زيت ناقل حركة", 
          quantity: 3, 
          unit: "لتر",
          notes: "زيادة في المخزون"
        }
      ]
    },
    {
      id: "INV-0019",
      type: "إتلاف",
      date: "2024-06-22",
      time: "11:20",
      sourceWarehouse: "المستودع الرئيسي",
      reference: "DAMAGE-001",
      user: "نوف السبيعي",
      status: "معتمدة",
      reason: "انتهاء صلاحية",
      items: [
        { 
          id: "1", 
          itemCode: "SOAP002", 
          itemName: "صابون منتهي الصلاحية", 
          quantity: 5, 
          unit: "عبوة",
          notes: "انتهت الصلاحية في يونيو 2024"
        }
      ]
    },
    {
      id: "INV-0020",
      type: "مرتجع مشتريات",
      date: "2024-06-22",
      time: "13:30",
      sourceWarehouse: "المستودع الرئيسي",
      reference: "RET-001",
      user: "عبدالله المطيري",
      status: "غير معتمدة",
      reason: "عيب في المنتج",
      items: [
        { 
          id: "1", 
          itemCode: "BRU001", 
          itemName: "فرش غسيل معيبة", 
          quantity: 20, 
          unit: "قطعة"
        }
      ]
    },
    {
      id: "INV-0021",
      type: "مرتجع مبيعات",
      date: "2024-06-23",
      time: "10:15",
      sourceWarehouse: "المستودع الرئيسي",
      reference: "SALES-RET-001",
      user: "خالد الزهراني",
      status: "معتمدة",
      reason: "إرجاع من عميل",
      items: [
        { 
          id: "1", 
          itemCode: "WAX001", 
          itemName: "شمع سيارات", 
          quantity: 2, 
          unit: "عبوة"
        }
      ]
    }
  ]);

  // New transaction form state
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    type: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5),
    sourceWarehouse: "",
    targetWarehouse: "",
    reference: "",
    user: "المستخدم الحالي",
    status: "مسودة",
    items: [],
    notes: "",
    reason: ""
  });

  const [newItem, setNewItem] = useState<Partial<TransactionItem>>({
    itemCode: "",
    itemName: "",
    quantity: 0,
    unit: "",
    price: 0,
    notes: ""
  });

  const transactionTypes = [
    { value: "استلام", label: "استلام / توريد", icon: TrendingUp, color: "text-green-600" },
    { value: "صرف", label: "صرف / إخراج", icon: TrendingDown, color: "text-red-600" },
    { value: "تحويل", label: "تحويل بين المستودعات", icon: ArrowRightLeft, color: "text-blue-600" },
    { value: "جرد", label: "جرد وتعديل", icon: Package, color: "text-purple-600" },
    { value: "إتلاف", label: "إتلاف / شطب", icon: Trash2, color: "text-orange-600" },
    { value: "مرتجع مشتريات", label: "مرتجع مشتريات", icon: ArrowLeft, color: "text-indigo-600" },
    { value: "مرتجع مبيعات", label: "مرتجع مبيعات", icon: ArrowRightLeft, color: "text-teal-600" }
  ];

  const warehouses = [
    "المستودع الرئيسي",
    "مستودع الزيوت", 
    "مستودع الدمام",
    "مستودع الإكسسوارات",
    "مستودع المواد الكيميائية"
  ];

  const users = ["أحمد العتيبي", "محمد الشهري", "سارة الحربي", "فهد القحطاني", "نوف السبيعي"];

  const units = ["قطعة", "لتر", "كيلو", "عبوة", "متر", "صندوق", "كرتون"];

  // Sample items for search
  const availableItems = [
    { code: "OIL001", name: "زيت محرك شل", unit: "لتر", price: 45 },
    { code: "OIL002", name: "زيت توتال", unit: "لتر", price: 42 },
    { code: "SOAP001", name: "صابون مركز", unit: "عبوة", price: 15 },
    { code: "TOWEL001", name: "فوطة ميكروفايبر", unit: "قطعة", price: 8 },
    { code: "FLT001", name: "فلتر زيت", unit: "قطعة", price: 25 },
    { code: "POL001", name: "ملمع زجاج", unit: "عبوة", price: 20 },
    { code: "WAX001", name: "شمع سيارات", unit: "عبوة", price: 35 },
    { code: "BRU001", name: "فرش غسيل", unit: "قطعة", price: 12 }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.items.some(item => 
                           item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesWarehouse = warehouseFilter === "all" || 
                            transaction.sourceWarehouse.includes(warehouseFilter) ||
                            (transaction.targetWarehouse && transaction.targetWarehouse.includes(warehouseFilter));
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesUser = userFilter === "all" || transaction.user === userFilter;
    
    return matchesSearch && matchesType && matchesWarehouse && matchesStatus && matchesUser;
  });

  const getTypeColor = (type: string) => {
    const typeConfig = transactionTypes.find(t => t.value === type);
    return typeConfig?.color || "text-gray-600";
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = transactionTypes.find(t => t.value === type);
    const IconComponent = typeConfig?.icon || Package;
    return <IconComponent className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "معتمدة":
        return "bg-success/10 text-success border-success/20";
      case "غير معتمدة":
        return "bg-warning/10 text-warning border-warning/20";
      case "مسودة":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const addItemToTransaction = () => {
    if (!newItem.itemCode || !newItem.itemName || !newItem.quantity) {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى تعبئة جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const item: TransactionItem = {
      id: Date.now().toString(),
      itemCode: newItem.itemCode!,
      itemName: newItem.itemName!,
      quantity: newItem.quantity!,
      unit: newItem.unit || "قطعة",
      price: newItem.price || 0,
      total: (newItem.quantity! * (newItem.price || 0)),
      notes: newItem.notes || ""
    };

    setNewTransaction(prev => ({
      ...prev,
      items: [...(prev.items || []), item]
    }));

    setNewItem({
      itemCode: "",
      itemName: "",
      quantity: 0,
      unit: "",
      price: 0,
      notes: ""
    });
  };

  const removeItemFromTransaction = (itemId: string) => {
    setNewTransaction(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.id !== itemId) || []
    }));
  };

  const saveTransaction = () => {
    if (!newTransaction.type || !newTransaction.sourceWarehouse || !newTransaction.items?.length) {
      toast({
        title: "خطأ في الحفظ",
        description: "يرجى تعبئة جميع الحقول المطلوبة وإضافة صنف واحد على الأقل",
        variant: "destructive"
      });
      return;
    }

    if (newTransaction.type === "تحويل" && !newTransaction.targetWarehouse) {
      toast({
        title: "خطأ في الحفظ",
        description: "يرجى تحديد المستودع المستقبل للتحويل",
        variant: "destructive"
      });
      return;
    }

    const transaction: Transaction = {
      id: `INV-${Date.now()}`,
      type: newTransaction.type!,
      date: newTransaction.date!,
      time: newTransaction.time!,
      sourceWarehouse: newTransaction.sourceWarehouse!,
      targetWarehouse: newTransaction.targetWarehouse,
      reference: newTransaction.reference || `AUTO-${Date.now()}`,
      user: newTransaction.user!,
      status: "مسودة",
      items: newTransaction.items!,
      notes: newTransaction.notes,
      reason: newTransaction.reason
    };

    setTransactions(prev => [transaction, ...prev]);
    
    // Reset form
    setNewTransaction({
      type: "",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5),
      sourceWarehouse: "",
      targetWarehouse: "",
      reference: "",
      user: "المستخدم الحالي",
      status: "مسودة",
      items: [],
      notes: "",
      reason: ""
    });

    setActiveTab("list");

    toast({
      title: "تم الحفظ بنجاح",
      description: `تم إنشاء الحركة ${transaction.id} بنجاح`,
    });
  };

  const selectItem = (item: any) => {
    setNewItem(prev => ({
      ...prev,
      itemCode: item.code,
      itemName: item.name,
      unit: item.unit,
      price: item.price
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            الحركات المخزنية
          </h1>
          <p className="text-muted-foreground mt-2">تسجيل ومتابعة جميع حركات المخزون</p>
        </div>
        <Button 
          onClick={() => setActiveTab("add")}
          className="gap-2 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90"
        >
          <Plus className="w-4 h-4" />
          إضافة حركة جديدة
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="list" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white"
          >
            <Package className="w-4 h-4" />
            قائمة الحركات
          </TabsTrigger>
          <TabsTrigger 
            value="add" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white"
          >
            <Plus className="w-4 h-4" />
            إضافة حركة جديدة
          </TabsTrigger>
        </TabsList>

        {/* قائمة الحركات */}
        <TabsContent value="list" className="space-y-6">
          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي الحركات</p>
                    <p className="text-2xl font-bold text-primary">{transactions.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            {transactionTypes.slice(0, 6).map((type) => (
              <Card key={type.value} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{type.value}</p>
                      <p className={`text-2xl font-bold ${type.color}`}>
                        {transactions.filter(t => t.type === type.value).length}
                      </p>
                    </div>
                    <type.icon className={`w-8 h-8 ${type.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* البحث والفلترة */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="نوع الحركة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    {transactionTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="المستودع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستودعات</SelectItem>
                    {warehouses.map(warehouse => (
                      <SelectItem key={warehouse} value={warehouse}>{warehouse}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="معتمدة">معتمدة</SelectItem>
                    <SelectItem value="غير معتمدة">غير معتمدة</SelectItem>
                    <SelectItem value="مسودة">مسودة</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="المستخدم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستخدمين</SelectItem>
                    {users.map(user => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  فلترة متقدمة
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <Card key={transaction.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs font-mono">
                              {transaction.id}
                            </Badge>
                            <Badge className={`${getTypeColor(transaction.type)} bg-opacity-10 border`}>
                              <div className="flex items-center gap-1">
                                {getTypeIcon(transaction.type)}
                                {transaction.type}
                              </div>
                            </Badge>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                          
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary" />
                            {transaction.sourceWarehouse}
                            {transaction.targetWarehouse && (
                              <>
                                <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                                {transaction.targetWarehouse}
                              </>
                            )}
                          </CardTitle>
                          
                          <CardDescription className="mt-1 flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {transaction.date} - {transaction.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {transaction.user}
                            </span>
                            {transaction.reference && (
                              <Badge variant="secondary" className="text-xs">
                                {transaction.reference}
                              </Badge>
                            )}
                          </CardDescription>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              عرض التفاصيل
                            </DropdownMenuItem>
                            {transaction.status === "مسودة" && (
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                تعديل
                              </DropdownMenuItem>
                            )}
                            {transaction.status === "غير معتمدة" && (
                              <DropdownMenuItem>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                اعتماد
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {transaction.reason && (
                        <div className="mb-3 p-2 bg-muted/30 rounded">
                          <p className="text-sm text-muted-foreground">السبب: {transaction.reason}</p>
                        </div>
                      )}
                      
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium text-muted-foreground mb-2">الأصناف ({transaction.items.length}):</p>
                        <div className="space-y-1">
                          {transaction.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="flex items-center gap-2">
                                <code className="text-xs bg-muted px-1 rounded">{item.itemCode}</code>
                                {item.itemName}
                              </span>
                              <span className={`font-medium ${
                                item.quantity > 0 ? 'text-success' : 'text-destructive'
                              }`}>
                                {item.quantity > 0 ? '+' : ''}{item.quantity} {item.unit}
                                {item.price && item.price > 0 && (
                                  <span className="text-muted-foreground mr-2">
                                    ({item.total?.toLocaleString()} ر.س)
                                  </span>
                                )}
                              </span>
                            </div>
                          ))}
                          {transaction.items.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              ... و {transaction.items.length - 3} أصناف أخرى
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          عرض التفاصيل
                        </Button>
                        {transaction.status === "مسودة" && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            تعديل
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">لا توجد حركات</h3>
                  <p className="text-sm text-muted-foreground mt-2">لم يتم العثور على حركات تطابق البحث</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* إضافة حركة جديدة */}
        <TabsContent value="add" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                إضافة حركة مخزنية جديدة
              </CardTitle>
              <CardDescription>
                املأ البيانات أدناه لإنشاء حركة مخزنية جديدة
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* البيانات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="transactionType">نوع الحركة *</Label>
                  <Select onValueChange={(value) => setNewTransaction(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الحركة" />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sourceWarehouse">المستودع المصدر *</Label>
                  <Select onValueChange={(value) => setNewTransaction(prev => ({ ...prev, sourceWarehouse: value }))}>
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

                {newTransaction.type === "تحويل" && (
                  <div>
                    <Label htmlFor="targetWarehouse">المستودع المستقبل *</Label>
                    <Select onValueChange={(value) => setNewTransaction(prev => ({ ...prev, targetWarehouse: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستودع المستقبل" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses.filter(w => w !== newTransaction.sourceWarehouse).map(warehouse => (
                          <SelectItem key={warehouse} value={warehouse}>{warehouse}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="transactionDate">التاريخ *</Label>
                  <Input
                    id="transactionDate"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="transactionTime">الوقت *</Label>
                  <Input
                    id="transactionTime"
                    type="time"
                    value={newTransaction.time}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="reference">رقم المرجع</Label>
                  <Input
                    id="reference"
                    value={newTransaction.reference}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, reference: e.target.value }))}
                    placeholder="PO-1234 أو AUTO"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reason">سبب الحركة</Label>
                  <Textarea
                    id="reason"
                    value={newTransaction.reason}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="اكتب سبب الحركة..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    value={newTransaction.notes}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="ملاحظات اختيارية..."
                    rows={2}
                  />
                </div>
              </div>

              {/* إضافة الأصناف */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  إضافة الأصناف
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="lg:col-span-2">
                    <Label htmlFor="itemSearch">البحث عن صنف</Label>
                    <div className="relative">
                      <Input
                        id="itemSearch"
                        value={newItem.itemCode}
                        onChange={(e) => setNewItem(prev => ({ ...prev, itemCode: e.target.value }))}
                        placeholder="كود الصنف أو مسح باركود"
                      />
                      <Button 
                        type="button" 
                        size="icon" 
                        variant="ghost" 
                        className="absolute left-1 top-1/2 transform -translate-y-1/2"
                      >
                        <Scan className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* قائمة الأصناف المتاحة */}
                    {newItem.itemCode && (
                      <div className="mt-2 max-h-32 overflow-y-auto border rounded-md bg-background">
                        {availableItems
                          .filter(item => 
                            item.code.toLowerCase().includes(newItem.itemCode!.toLowerCase()) ||
                            item.name.toLowerCase().includes(newItem.itemCode!.toLowerCase())
                          )
                          .map(item => (
                            <div 
                              key={item.code}
                              className="p-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                              onClick={() => selectItem(item)}
                            >
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{item.code} - {item.unit}</div>
                            </div>
                          ))
                        }
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="itemName">اسم الصنف *</Label>
                    <Input
                      id="itemName"
                      value={newItem.itemName}
                      onChange={(e) => setNewItem(prev => ({ ...prev, itemName: e.target.value }))}
                      placeholder="اسم الصنف"
                    />
                  </div>

                  <div>
                    <Label htmlFor="quantity">الكمية *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="unit">الوحدة</Label>
                    <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, unit: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الوحدة" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map(unit => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">السعر</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button type="button" onClick={addItemToTransaction} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة الصنف
                  </Button>
                  <Button type="button" variant="outline" className="gap-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    استيراد من ملف
                  </Button>
                </div>

                {/* جدول الأصناف المضافة */}
                {newTransaction.items && newTransaction.items.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">الأصناف المضافة ({newTransaction.items.length})</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-right">كود الصنف</TableHead>
                            <TableHead className="text-right">اسم الصنف</TableHead>
                            <TableHead className="text-right">الكمية</TableHead>
                            <TableHead className="text-right">الوحدة</TableHead>
                            <TableHead className="text-right">السعر</TableHead>
                            <TableHead className="text-right">الإجمالي</TableHead>
                            <TableHead className="text-right">إجراء</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {newTransaction.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-mono text-sm">{item.itemCode}</TableCell>
                              <TableCell>{item.itemName}</TableCell>
                              <TableCell className={item.quantity > 0 ? "text-success" : "text-destructive"}>
                                {item.quantity > 0 ? '+' : ''}{item.quantity}
                              </TableCell>
                              <TableCell>{item.unit}</TableCell>
                              <TableCell>{item.price?.toLocaleString()} ر.س</TableCell>
                              <TableCell className="font-medium">{item.total?.toLocaleString()} ر.س</TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => removeItemFromTransaction(item.id)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 p-4 bg-muted/20 rounded-lg">
                      <span className="font-medium">إجمالي القيمة:</span>
                      <span className="text-xl font-bold text-primary">
                        {newTransaction.items.reduce((total, item) => total + (item.total || 0), 0).toLocaleString()} ر.س
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* أزرار الحفظ */}
              <div className="flex gap-4 justify-end border-t pt-6">
                <Button type="button" variant="outline" onClick={() => setActiveTab("list")}>
                  <X className="w-4 h-4 mr-2" />
                  إلغاء
                </Button>
                <Button type="button" variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  إرفاق مستند
                </Button>
                <Button type="button" onClick={saveTransaction} className="gap-2">
                  <Save className="w-4 h-4" />
                  حفظ الحركة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryTransactions;