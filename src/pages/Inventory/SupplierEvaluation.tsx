import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Star, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Users,
  BarChart3,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types
interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number;
  rating: number;
  notes: string;
}

interface SupplierEvaluation {
  id: string;
  supplierId: string;
  supplierName: string;
  evaluatorName: string;
  evaluationDate: Date;
  contractNumber: string;
  criteria: EvaluationCriteria[];
  totalScore: number;
  generalNotes: string;
  recommendation: string;
  nextEvaluationDate: Date;
  attachments: string[];
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  contractsCount: number;
  averageRating: number;
  status: string;
  lastEvaluation: Date;
}

const SupplierEvaluation = () => {
  const { toast } = useToast();

  // Default evaluation criteria
  const defaultCriteria: EvaluationCriteria[] = [
    { id: "1", name: "جودة المنتجات/الخدمة", weight: 30, rating: 3, notes: "" },
    { id: "2", name: "الالتزام بالمواعيد", weight: 20, rating: 3, notes: "" },
    { id: "3", name: "الأسعار والتكلفة", weight: 15, rating: 3, notes: "" },
    { id: "4", name: "المرونة والاستجابة", weight: 10, rating: 3, notes: "" },
    { id: "5", name: "استكمال الوثائق", weight: 10, rating: 3, notes: "" },
    { id: "6", name: "خدمة ما بعد البيع", weight: 10, rating: 3, notes: "" },
    { id: "7", name: "علاقات العمل", weight: 5, rating: 3, notes: "" },
  ];

  // Sample suppliers
  const [suppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "شركة الأولى للمواد الكيميائية",
      category: "مواد كيميائية",
      contractsCount: 15,
      averageRating: 4.2,
      status: "نشط",
      lastEvaluation: new Date(2024, 0, 15)
    },
    {
      id: "2", 
      name: "مؤسسة النجاح لقطع الغيار",
      category: "قطع غيار",
      contractsCount: 8,
      averageRating: 3.8,
      status: "تحت المراقبة",
      lastEvaluation: new Date(2024, 1, 20)
    },
    {
      id: "3",
      name: "شركة التميز للزيوت",
      category: "زيوت ومواد تشحيم", 
      contractsCount: 12,
      averageRating: 4.5,
      status: "متميز",
      lastEvaluation: new Date(2024, 2, 10)
    },
  ]);

  // Form states
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [evaluatorName, setEvaluatorName] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [evaluationDate, setEvaluationDate] = useState<Date>(new Date());
  const [nextEvaluationDate, setNextEvaluationDate] = useState<Date>();
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>(defaultCriteria);
  const [generalNotes, setGeneralNotes] = useState("");
  const [recommendation, setRecommendation] = useState("");

  // Calculate total score
  const calculateTotalScore = () => {
    return criteria.reduce((total, criterion) => {
      return total + (criterion.rating * criterion.weight / 100);
    }, 0);
  };

  // Update criterion rating
  const updateCriterionRating = (id: string, rating: number) => {
    setCriteria(prev => prev.map(c => 
      c.id === id ? { ...c, rating } : c
    ));
  };

  // Update criterion notes
  const updateCriterionNotes = (id: string, notes: string) => {
    setCriteria(prev => prev.map(c => 
      c.id === id ? { ...c, notes } : c
    ));
  };

  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "متميز": return "default";
      case "نشط": return "secondary";
      case "تحت المراقبة": return "destructive";
      default: return "outline";
    }
  };

  // Submit evaluation
  const submitEvaluation = () => {
    if (!selectedSupplier || !evaluatorName) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إكمال الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const totalScore = calculateTotalScore();
    
    toast({
      title: "تم حفظ التقييم بنجاح",
      description: `إجمالي التقييم: ${totalScore.toFixed(1)} من 5`,
    });

    // Reset form
    setSelectedSupplier("");
    setEvaluatorName("");
    setContractNumber("");
    setCriteria(defaultCriteria);
    setGeneralNotes("");
    setRecommendation("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">
            تقييم الموردين
          </h1>
          <p className="text-muted-foreground">نظام شامل لتقييم أداء الموردين وفق معايير موحدة</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          تصدير التقارير
        </Button>
      </div>

      <Tabs defaultValue="evaluation" className="w-full">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="evaluation" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Star className="w-4 h-4" />
            تقييم جديد
          </TabsTrigger>
          <TabsTrigger 
            value="suppliers" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <Users className="w-4 h-4" />
            قائمة الموردين
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <BarChart3 className="w-4 h-4" />
            التقارير والإحصائيات
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            سجل التقييمات
          </TabsTrigger>
        </TabsList>

        {/* تقييم جديد */}
        <TabsContent value="evaluation">
          <div className="grid gap-6">
            {/* معلومات التقييم الأساسية */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  معلومات التقييم الأساسية
                </CardTitle>
                <CardDescription>تحديد المورد والمعلومات الأساسية للتقييم</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">اختيار المورد *</Label>
                    <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المورد" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.name} - {supplier.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="evaluator">اسم المقيم *</Label>
                    <Input
                      id="evaluator"
                      value={evaluatorName}
                      onChange={(e) => setEvaluatorName(e.target.value)}
                      placeholder="اسم الموظف المسؤول"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contract">رقم العقد/الطلبية</Label>
                    <Input
                      id="contract"
                      value={contractNumber}
                      onChange={(e) => setContractNumber(e.target.value)}
                      placeholder="رقم العقد (اختياري)"
                    />
                  </div>
                  <div>
                    <Label>تاريخ التقييم</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !evaluationDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {evaluationDate ? format(evaluationDate, "yyyy-MM-dd") : "اختر التاريخ"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={evaluationDate}
                          onSelect={(date) => date && setEvaluationDate(date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* معايير التقييم */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  معايير التقييم
                </CardTitle>
                <CardDescription>تقييم المورد وفق المعايير المحددة (1-5 نجوم)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {criteria.map((criterion) => (
                  <div key={criterion.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{criterion.name}</h4>
                        <Badge variant="outline">{criterion.weight}%</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getRatingColor(criterion.rating)}`}>
                          {criterion.rating}
                        </span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 cursor-pointer ${
                                star <= criterion.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => updateCriterionRating(criterion.id, star)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>التقييم (1-5)</Label>
                      <Slider
                        value={[criterion.rating]}
                        onValueChange={(value) => updateCriterionRating(criterion.id, value[0])}
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label>ملاحظات</Label>
                      <Textarea
                        value={criterion.notes}
                        onChange={(e) => updateCriterionNotes(criterion.id, e.target.value)}
                        placeholder="أضف ملاحظات على هذا المعيار..."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}

                {/* إجمالي التقييم */}
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary-blue/10 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">إجمالي التقييم</h3>
                    <div className="text-2xl font-bold text-primary">
                      {calculateTotalScore().toFixed(1)} / 5.0
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= Math.round(calculateTotalScore())
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* الملاحظات والتوصيات */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  الملاحظات والتوصيات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="generalNotes">ملاحظات عامة</Label>
                  <Textarea
                    id="generalNotes"
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    placeholder="أضف ملاحظات عامة حول أداء المورد..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="recommendation">التوصية النهائية</Label>
                  <Select value={recommendation} onValueChange={setRecommendation}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التوصية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="continue">الاستمرار بالتعامل</SelectItem>
                      <SelectItem value="monitor">وضع المورد تحت المراقبة</SelectItem>
                      <SelectItem value="improve">اقتراح تطوير/إجراءات تصحيحية</SelectItem>
                      <SelectItem value="stop">إيقاف التعامل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>تاريخ التقييم القادم</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !nextEvaluationDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {nextEvaluationDate ? format(nextEvaluationDate, "yyyy-MM-dd") : "اختر التاريخ"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={nextEvaluationDate}
                        onSelect={setNextEvaluationDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button onClick={submitEvaluation} className="w-full" size="lg">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  حفظ التقييم
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* قائمة الموردين */}
        <TabsContent value="suppliers">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                قائمة الموردين وتقييماتهم
              </CardTitle>
              <CardDescription>عرض جميع الموردين مع آخر تقييم لكل منهم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <p className="text-sm text-muted-foreground">{supplier.category}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span>عدد العقود: {supplier.contractsCount}</span>
                          <span>•</span>
                          <span>آخر تقييم: {format(supplier.lastEvaluation, "yyyy-MM-dd")}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.round(supplier.averageRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-semibold">{supplier.averageRating}</span>
                        </div>
                        <Badge variant={getStatusVariant(supplier.status)}>
                          {supplier.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التقارير والإحصائيات */}
        <TabsContent value="reports">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">متوسط التقييمات</p>
                      <p className="text-2xl font-bold">4.2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">موردين تحت المراقبة</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">موردين متميزين</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>أفضل الموردين</CardTitle>
                <CardDescription>الموردين الحاصلين على أعلى التقييمات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suppliers
                    .sort((a, b) => b.averageRating - a.averageRating)
                    .slice(0, 5)
                    .map((supplier, index) => (
                      <div key={supplier.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{supplier.name}</h4>
                            <p className="text-sm text-muted-foreground">{supplier.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= Math.round(supplier.averageRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold">{supplier.averageRating}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* سجل التقييمات */}
        <TabsContent value="history">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                سجل التقييمات السابقة
              </CardTitle>
              <CardDescription>عرض جميع التقييمات السابقة مع إمكانية البحث والفلترة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد تقييمات سابقة للعرض</p>
                <p className="text-sm">ابدأ بإضافة تقييم جديد من التبويب الأول</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierEvaluation;