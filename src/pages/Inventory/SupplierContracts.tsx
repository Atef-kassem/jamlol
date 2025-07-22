import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format, differenceInDays, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Calendar as CalendarIcon, 
  FileText, 
  Download, 
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Building,
  DollarSign,
  Timer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types
interface Contract {
  id: string;
  contractNumber: string;
  supplierId: string;
  supplierName: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  contractType: string;
  contractValue: number;
  paymentTerms: string;
  description: string;
  mainTerms: string;
  contractDocument: string;
  status: string;
  nextRenewalDate?: Date;
  responsibleEmployee: string;
  notes: string;
  createdAt: Date;
  renewalHistory: ContractAction[];
}

interface ContractAction {
  id: string;
  contractId: string;
  actionType: string;
  actionDate: Date;
  description: string;
  performedBy: string;
}

const SupplierContracts = () => {
  const { toast } = useToast();

  // Sample contracts data
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      contractNumber: "CT-2024-001",
      supplierId: "1",
      supplierName: "شركة الأولى للمواد الكيميائية",
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 11, 31),
      duration: 12,
      contractType: "توريد مواد كيميائية",
      contractValue: 250000,
      paymentTerms: "30 يوم من تاريخ الفاتورة",
      description: "عقد توريد مواد تنظيف ومعقمات للفروع",
      mainTerms: "توريد شهري، جودة عالية، ضمان استبدال",
      contractDocument: "contract-001.pdf",
      status: "ساري",
      responsibleEmployee: "أحمد محمد",
      notes: "عقد متميز مع شروط جيدة",
      createdAt: new Date(2023, 11, 15),
      renewalHistory: []
    },
    {
      id: "2",
      contractNumber: "CT-2024-002",
      supplierId: "2",
      supplierName: "مؤسسة النجاح لقطع الغيار",
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 7, 31),
      duration: 6,
      contractType: "توريد قطع غيار",
      contractValue: 180000,
      paymentTerms: "عند التسليم",
      description: "عقد توريد قطع غيار أصلية للمعدات",
      mainTerms: "توريد حسب الطلب، ضمان سنة، صيانة مجانية",
      contractDocument: "contract-002.pdf",
      status: "منتهي",
      responsibleEmployee: "سارة أحمد",
      notes: "انتهى العقد، تم التجديد لسنة أخرى",
      createdAt: new Date(2024, 1, 10),
      renewalHistory: []
    },
    {
      id: "3",
      contractNumber: "CT-2024-003",
      supplierId: "3",
      supplierName: "شركة التميز للزيوت",
      startDate: new Date(2024, 5, 1),
      endDate: new Date(2025, 4, 30),
      duration: 12,
      contractType: "توريد زيوت ومواد تشحيم",
      contractValue: 320000,
      paymentTerms: "دفعات شهرية",
      description: "عقد توريد زيوت محركات وزيوت هيدروليك",
      mainTerms: "توريد حسب الجدولة، خصم كمية، دعم فني",
      contractDocument: "contract-003.pdf",
      status: "ساري",
      nextRenewalDate: new Date(2025, 2, 30),
      responsibleEmployee: "محمد علي",
      notes: "عقد استراتيجي مع خصم 15%",
      createdAt: new Date(2024, 4, 15),
      renewalHistory: []
    }
  ]);

  // Form states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [contractTypeFilter, setContractTypeFilter] = useState("الكل");

  // New contract form
  const [newContract, setNewContract] = useState({
    supplierName: "",
    startDate: new Date(),
    endDate: new Date(),
    contractType: "",
    contractValue: "",
    paymentTerms: "",
    description: "",
    mainTerms: "",
    responsibleEmployee: "",
    notes: ""
  });

  // Get contract status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ساري": return "bg-green-100 text-green-800";
      case "منتهي": return "bg-red-100 text-red-800";
      case "موقوف": return "bg-yellow-100 text-yellow-800";
      case "قيد التجديد": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Check if contract is expiring soon
  const isExpiringSoon = (endDate: Date) => {
    const daysUntilExpiry = differenceInDays(endDate, new Date());
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  // Filter contracts
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "الكل" || contract.status === statusFilter;
    const matchesType = contractTypeFilter === "الكل" || contract.contractType === contractTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Add new contract
  const addContract = () => {
    if (!newContract.supplierName || !newContract.contractType) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إكمال الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const contract: Contract = {
      id: Date.now().toString(),
      contractNumber: `CT-2024-${String(contracts.length + 1).padStart(3, '0')}`,
      supplierId: Date.now().toString(),
      supplierName: newContract.supplierName,
      startDate: newContract.startDate,
      endDate: newContract.endDate,
      duration: Math.round(differenceInDays(newContract.endDate, newContract.startDate) / 30),
      contractType: newContract.contractType,
      contractValue: parseFloat(newContract.contractValue) || 0,
      paymentTerms: newContract.paymentTerms,
      description: newContract.description,
      mainTerms: newContract.mainTerms,
      contractDocument: "",
      status: "ساري",
      responsibleEmployee: newContract.responsibleEmployee,
      notes: newContract.notes,
      createdAt: new Date(),
      renewalHistory: []
    };

    setContracts(prev => [...prev, contract]);
    setIsAddDialogOpen(false);
    setNewContract({
      supplierName: "",
      startDate: new Date(),
      endDate: new Date(),
      contractType: "",
      contractValue: "",
      paymentTerms: "",
      description: "",
      mainTerms: "",
      responsibleEmployee: "",
      notes: ""
    });

    toast({
      title: "تم إضافة العقد بنجاح",
      description: `رقم العقد: ${contract.contractNumber}`,
    });
  };

  // Renew contract
  const renewContract = (contractId: string) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? { 
            ...contract, 
            status: "قيد التجديد",
            nextRenewalDate: addDays(contract.endDate, 365)
          }
        : contract
    ));
    
    toast({
      title: "تم بدء إجراءات التجديد",
      description: "سيتم إشعارك عند اكتمال التجديد",
    });
  };

  // Terminate contract
  const terminateContract = (contractId: string) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? { ...contract, status: "منتهي" }
        : contract
    ));
    
    toast({
      title: "تم إنهاء العقد",
      description: "تم تسجيل إنهاء العقد في النظام",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            عقود الموردين
          </h1>
          <p className="text-muted-foreground">إدارة شاملة لجميع العقود والاتفاقيات مع الموردين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير قائمة
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                إضافة عقد جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إضافة عقد جديد</DialogTitle>
                <DialogDescription>إدخال بيانات العقد الجديد مع المورد</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>اسم المورد *</Label>
                    <Input
                      value={newContract.supplierName}
                      onChange={(e) => setNewContract(prev => ({ ...prev, supplierName: e.target.value }))}
                      placeholder="اختر أو أدخل اسم المورد"
                    />
                  </div>
                  <div>
                    <Label>نوع العقد *</Label>
                    <Select value={newContract.contractType} onValueChange={(value) => setNewContract(prev => ({ ...prev, contractType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع العقد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="توريد مواد كيميائية">توريد مواد كيميائية</SelectItem>
                        <SelectItem value="توريد قطع غيار">توريد قطع غيار</SelectItem>
                        <SelectItem value="توريد زيوت ومواد تشحيم">توريد زيوت ومواد تشحيم</SelectItem>
                        <SelectItem value="صيانة دورية">صيانة دورية</SelectItem>
                        <SelectItem value="خدمات استشارية">خدمات استشارية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>تاريخ بدء العقد</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(newContract.startDate, "yyyy-MM-dd")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newContract.startDate}
                          onSelect={(date) => date && setNewContract(prev => ({ ...prev, startDate: date }))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>تاريخ نهاية العقد</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(newContract.endDate, "yyyy-MM-dd")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newContract.endDate}
                          onSelect={(date) => date && setNewContract(prev => ({ ...prev, endDate: date }))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>قيمة العقد (ريال)</Label>
                    <Input
                      type="number"
                      value={newContract.contractValue}
                      onChange={(e) => setNewContract(prev => ({ ...prev, contractValue: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label>شروط الدفع</Label>
                    <Select value={newContract.paymentTerms} onValueChange={(value) => setNewContract(prev => ({ ...prev, paymentTerms: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر شروط الدفع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="عند التسليم">عند التسليم</SelectItem>
                        <SelectItem value="30 يوم من تاريخ الفاتورة">30 يوم من تاريخ الفاتورة</SelectItem>
                        <SelectItem value="دفعات شهرية">دفعات شهرية</SelectItem>
                        <SelectItem value="دفع مقدم">دفع مقدم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>المسؤول عن العقد</Label>
                    <Input
                      value={newContract.responsibleEmployee}
                      onChange={(e) => setNewContract(prev => ({ ...prev, responsibleEmployee: e.target.value }))}
                      placeholder="اسم الموظف المسؤول"
                    />
                  </div>
                </div>
                <div>
                  <Label>وصف موجز للعقد</Label>
                  <Textarea
                    value={newContract.description}
                    onChange={(e) => setNewContract(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="ملخص مختصر لشروط وأهداف العقد"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>البنود الأساسية</Label>
                  <Textarea
                    value={newContract.mainTerms}
                    onChange={(e) => setNewContract(prev => ({ ...prev, mainTerms: e.target.value }))}
                    placeholder="البنود والشروط الأساسية للعقد"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>ملاحظات إضافية</Label>
                  <Textarea
                    value={newContract.notes}
                    onChange={(e) => setNewContract(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="أي ملاحظات أو تفاصيل إضافية"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={addContract}>
                    حفظ العقد
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="active" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <CheckCircle className="w-4 h-4" />
            العقود السارية
          </TabsTrigger>
          <TabsTrigger 
            value="expired" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Clock className="w-4 h-4" />
            العقود المنتهية
          </TabsTrigger>
          <TabsTrigger 
            value="alerts" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <AlertTriangle className="w-4 h-4" />
            تنبيهات التجديد
          </TabsTrigger>
          <TabsTrigger 
            value="all" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            جميع العقود
          </TabsTrigger>
        </TabsList>

        {/* العقود السارية */}
        <TabsContent value="active">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  العقود السارية
                </div>
                <Badge variant="secondary">
                  {contracts.filter(c => c.status === "ساري").length} عقد
                </Badge>
              </CardTitle>
              <CardDescription>قائمة العقود الجارية والنشطة</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="البحث برقم العقد أو اسم المورد..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="نوع العقد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الكل">جميع الأنواع</SelectItem>
                    <SelectItem value="توريد مواد كيميائية">مواد كيميائية</SelectItem>
                    <SelectItem value="توريد قطع غيار">قطع غيار</SelectItem>
                    <SelectItem value="توريد زيوت ومواد تشحيم">زيوت ومواد تشحيم</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredContracts
                  .filter(contract => contract.status === "ساري")
                  .map((contract) => (
                    <div key={contract.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{contract.contractNumber}</h3>
                            <Badge className={getStatusColor(contract.status)}>
                              {contract.status}
                            </Badge>
                            {isExpiringSoon(contract.endDate) && (
                              <Badge variant="destructive" className="gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                ينتهي قريباً
                              </Badge>
                            )}
                          </div>
                          <p className="text-lg font-medium">{contract.supplierName}</p>
                          <p className="text-sm text-muted-foreground">{contract.contractType}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {format(contract.startDate, "yyyy-MM-dd")} - {format(contract.endDate, "yyyy-MM-dd")}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {contract.contractValue.toLocaleString()} ريال
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="w-4 h-4" />
                              {contract.duration} شهر
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedContract(contract)}
                            className="gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            تفاصيل
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => renewContract(contract.id)}
                            className="gap-1"
                          >
                            <RefreshCw className="w-4 h-4" />
                            تجديد
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                          >
                            <Upload className="w-4 h-4" />
                            مستند
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* العقود المنتهية */}
        <TabsContent value="expired">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  العقود المنتهية
                </div>
                <Badge variant="destructive">
                  {contracts.filter(c => c.status === "منتهي").length} عقد
                </Badge>
              </CardTitle>
              <CardDescription>العقود التي انتهت صلاحيتها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts
                  .filter(contract => contract.status === "منتهي")
                  .map((contract) => (
                    <div key={contract.id} className="p-4 border rounded-lg bg-red-50 border-red-200">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{contract.contractNumber}</h3>
                            <Badge className={getStatusColor(contract.status)}>
                              {contract.status}
                            </Badge>
                          </div>
                          <p className="text-lg font-medium">{contract.supplierName}</p>
                          <p className="text-sm text-muted-foreground">{contract.contractType}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>انتهى في: {format(contract.endDate, "yyyy-MM-dd")}</span>
                            <span>القيمة: {contract.contractValue.toLocaleString()} ريال</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => renewContract(contract.id)}
                            className="gap-1"
                          >
                            <RefreshCw className="w-4 h-4" />
                            إعادة التجديد
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedContract(contract)}
                            className="gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            تفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تنبيهات التجديد */}
        <TabsContent value="alerts">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  تنبيهات التجديد
                </div>
                <Badge variant="outline">
                  {contracts.filter(c => isExpiringSoon(c.endDate) && c.status === "ساري").length} تنبيه
                </Badge>
              </CardTitle>
              <CardDescription>العقود التي تحتاج إلى تجديد خلال 30 يوم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts
                  .filter(contract => isExpiringSoon(contract.endDate) && contract.status === "ساري")
                  .map((contract) => {
                    const daysLeft = differenceInDays(contract.endDate, new Date());
                    return (
                      <div key={contract.id} className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{contract.contractNumber}</h3>
                              <Badge variant="destructive" className="gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {daysLeft} يوم متبقي
                              </Badge>
                            </div>
                            <p className="text-lg font-medium">{contract.supplierName}</p>
                            <p className="text-sm text-muted-foreground">{contract.contractType}</p>
                            <div className="text-sm text-muted-foreground">
                              ينتهي في: <span className="font-medium text-red-600">{format(contract.endDate, "yyyy-MM-dd")}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => renewContract(contract.id)}
                              className="gap-1"
                            >
                              <RefreshCw className="w-4 h-4" />
                              بدء التجديد
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedContract(contract)}
                              className="gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              تفاصيل
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {contracts.filter(contract => isExpiringSoon(contract.endDate) && contract.status === "ساري").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد عقود تحتاج إلى تجديد في الوقت الحالي</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* جميع العقود */}
        <TabsContent value="all">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  جميع العقود
                </div>
                <Badge variant="secondary">
                  {contracts.length} عقد إجمالي
                </Badge>
              </CardTitle>
              <CardDescription>قائمة شاملة بجميع العقود</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="البحث برقم العقد أو اسم المورد..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الكل">جميع الحالات</SelectItem>
                    <SelectItem value="ساري">ساري</SelectItem>
                    <SelectItem value="منتهي">منتهي</SelectItem>
                    <SelectItem value="موقوف">موقوف</SelectItem>
                    <SelectItem value="قيد التجديد">قيد التجديد</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="نوع العقد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الكل">جميع الأنواع</SelectItem>
                    <SelectItem value="توريد مواد كيميائية">مواد كيميائية</SelectItem>
                    <SelectItem value="توريد قطع غيار">قطع غيار</SelectItem>
                    <SelectItem value="توريد زيوت ومواد تشحيم">زيوت ومواد تشحيم</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredContracts.map((contract) => (
                  <div key={contract.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{contract.contractNumber}</h3>
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                          {isExpiringSoon(contract.endDate) && contract.status === "ساري" && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              ينتهي قريباً
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg font-medium">{contract.supplierName}</p>
                        <p className="text-sm text-muted-foreground">{contract.contractType}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {format(contract.startDate, "yyyy-MM-dd")} - {format(contract.endDate, "yyyy-MM-dd")}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {contract.contractValue.toLocaleString()} ريال
                          </span>
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {contract.responsibleEmployee}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedContract(contract)}
                          className="gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          تفاصيل
                        </Button>
                        {contract.status === "ساري" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => renewContract(contract.id)}
                            className="gap-1"
                          >
                            <RefreshCw className="w-4 h-4" />
                            تجديد
                          </Button>
                        )}
                        {contract.status === "ساري" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => terminateContract(contract.id)}
                            className="gap-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            إنهاء
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contract Details Dialog */}
      {selectedContract && (
        <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>تفاصيل العقد - {selectedContract.contractNumber}</DialogTitle>
              <DialogDescription>معلومات مفصلة عن العقد</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">رقم العقد</Label>
                  <p className="text-sm bg-muted p-2 rounded">{selectedContract.contractNumber}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">اسم المورد</Label>
                  <p className="text-sm bg-muted p-2 rounded">{selectedContract.supplierName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">نوع العقد</Label>
                  <p className="text-sm bg-muted p-2 rounded">{selectedContract.contractType}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">حالة العقد</Label>
                  <Badge className={getStatusColor(selectedContract.status)}>
                    {selectedContract.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">تاريخ البدء</Label>
                  <p className="text-sm bg-muted p-2 rounded">{format(selectedContract.startDate, "yyyy-MM-dd")}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">تاريخ الانتهاء</Label>
                  <p className="text-sm bg-muted p-2 rounded">{format(selectedContract.endDate, "yyyy-MM-dd")}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">مدة العقد</Label>
                  <p className="text-sm bg-muted p-2 rounded">{selectedContract.duration} شهر</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">قيمة العقد</Label>
                  <p className="text-sm bg-muted p-2 rounded">{selectedContract.contractValue.toLocaleString()} ريال</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">شروط الدفع</Label>
                  <p className="text-sm bg-muted p-2 rounded">{selectedContract.paymentTerms}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">المسؤول عن العقد</Label>
                  <p className="text-sm bg-muted p-2 rounded">{selectedContract.responsibleEmployee}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">وصف العقد</Label>
                <p className="text-sm bg-muted p-3 rounded">{selectedContract.description}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">البنود الأساسية</Label>
                <p className="text-sm bg-muted p-3 rounded">{selectedContract.mainTerms}</p>
              </div>
              
              {selectedContract.notes && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">ملاحظات إضافية</Label>
                  <p className="text-sm bg-muted p-3 rounded">{selectedContract.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    تحميل مستند
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    تنزيل العقد
                  </Button>
                </div>
                <Button onClick={() => setSelectedContract(null)}>
                  إغلاق
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SupplierContracts;