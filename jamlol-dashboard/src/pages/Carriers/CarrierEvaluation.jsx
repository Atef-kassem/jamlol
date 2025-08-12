import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Search, Eye, Plus, MessageSquare, TrendingUp, TrendingDown, Award, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockCarrierEvaluations = [
  {
    id: "CAR001",
    carrierName: "شركة النقل السريع",
    rating: 4.8,
    completedOrders: 156,
    onTimeDelivery: 95,
    customerSatisfaction: 4.7,
    qualityScore: 88,
    lastEvaluation: "2024-01-15",
    status: "ممتاز",
    notes: "أداء ممتاز في جميع المعايير"
  },
  {
    id: "CAR002",
    carrierName: "ناقل المدينة",
    rating: 4.2,
    completedOrders: 89,
    onTimeDelivery: 88,
    customerSatisfaction: 4.1,
    qualityScore: 82,
    lastEvaluation: "2024-01-10",
    status: "جيد",
    notes: "أداء جيد مع إمكانية التحسن"
  },
  {
    id: "CAR003",
    carrierName: "خدمات التوصيل المتقدمة",
    rating: 3.8,
    completedOrders: 67,
    onTimeDelivery: 75,
    customerSatisfaction: 3.6,
    qualityScore: 68,
    lastEvaluation: "2024-01-08",
    status: "مقبول",
    notes: "يحتاج إلى تحسين في مواعيد التسليم"
  }
];

const CarrierEvaluation = () => {
  const [evaluations, setEvaluations] = useState(mockCarrierEvaluations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || evaluation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "ممتاز":
        return "bg-success text-success-foreground";
      case "جيد":
        return "bg-primary text-primary-foreground";
      case "مقبول":
        return "bg-warning text-warning-foreground";
      case "ضعيف":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleNewEvaluation = () => {
    toast({
      title: "تقييم جديد",
      description: "تم إضافة تقييم جديد بنجاح",
    });
    setIsEvaluationDialogOpen(false);
  };

  const totalEvaluations = evaluations.length;
  const excellentCarriers = evaluations.filter(e => e.status === "ممتاز").length;
  const averageRating = evaluations.reduce((sum, e) => sum + e.rating, 0) / evaluations.length;
  const averageOnTime = evaluations.reduce((sum, e) => sum + e.onTimeDelivery, 0) / evaluations.length;

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تقييم الناقلين</h1>
          <p className="text-muted-foreground">إدارة ومراقبة أداء الناقلين</p>
        </div>
        <Dialog open={isEvaluationDialogOpen} onOpenChange={setIsEvaluationDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              تقييم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة تقييم جديد</DialogTitle>
              <DialogDescription>
                أضف تقييم جديد لأداء الناقل
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="carrier">الناقل</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الناقل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carrier1">شركة النقل السريع</SelectItem>
                    <SelectItem value="carrier2">ناقل المدينة</SelectItem>
                    <SelectItem value="carrier3">خدمات التوصيل المتقدمة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">التقييم العام</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التقييم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">ممتاز</SelectItem>
                    <SelectItem value="good">جيد</SelectItem>
                    <SelectItem value="acceptable">مقبول</SelectItem>
                    <SelectItem value="poor">ضعيف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  placeholder="أدخل ملاحظات التقييم..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleNewEvaluation}>حفظ التقييم</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات التقييم */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الناقلين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvaluations}</div>
            <p className="text-xs text-muted-foreground">
              ناقل مسجل
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ناقلين ممتازين</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{excellentCarriers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+{Math.round((excellentCarriers/totalEvaluations)*100)}%</span> من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              من 5.0 نجوم
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التسليم في الموعد</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageOnTime.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              متوسط الالتزام بالمواعيد
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
                placeholder="البحث عن ناقل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="حالة التقييم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التقييمات</SelectItem>
                <SelectItem value="ممتاز">ممتاز</SelectItem>
                <SelectItem value="جيد">جيد</SelectItem>
                <SelectItem value="مقبول">مقبول</SelectItem>
                <SelectItem value="ضعيف">ضعيف</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* جدول التقييمات */}
      <Card>
        <CardHeader>
          <CardTitle>تقييمات الناقلين</CardTitle>
          <CardDescription>
            عرض شامل لتقييمات وأداء جميع الناقلين
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الناقل</TableHead>
                <TableHead>اسم الناقل</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>الطلبات المكتملة</TableHead>
                <TableHead>التسليم في الموعد</TableHead>
                <TableHead>رضا العملاء</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>آخر تقييم</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell className="font-medium">{evaluation.id}</TableCell>
                  <TableCell>{evaluation.carrierName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getRatingStars(evaluation.rating)}
                      <span className="text-sm text-muted-foreground mr-1">
                        ({evaluation.rating})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{evaluation.completedOrders}</TableCell>
                  <TableCell>{evaluation.onTimeDelivery}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getRatingStars(evaluation.customerSatisfaction)}
                      <span className="text-sm text-muted-foreground mr-1">
                        ({evaluation.customerSatisfaction})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(evaluation.status)}>
                      {evaluation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{evaluation.lastEvaluation}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCarrier(evaluation)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* عرض تفاصيل التقييم */}
      {selectedCarrier && (
        <Dialog open={!!selectedCarrier} onOpenChange={() => setSelectedCarrier(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل تقييم: {selectedCarrier.carrierName}</DialogTitle>
              <DialogDescription>
                معلومات مفصلة عن أداء الناقل
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>التقييم العام</Label>
                  <div className="flex items-center gap-2">
                    {getRatingStars(selectedCarrier.rating)}
                    <span className="font-medium">{selectedCarrier.rating}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Badge className={getStatusColor(selectedCarrier.status)}>
                    {selectedCarrier.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الطلبات المكتملة</Label>
                  <p className="text-2xl font-bold">{selectedCarrier.completedOrders}</p>
                </div>
                <div className="space-y-2">
                  <Label>التسليم في الموعد</Label>
                  <p className="text-2xl font-bold">{selectedCarrier.onTimeDelivery}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>رضا العملاء</Label>
                  <div className="flex items-center gap-2">
                    {getRatingStars(selectedCarrier.customerSatisfaction)}
                    <span className="font-medium">{selectedCarrier.customerSatisfaction}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>نقاط الجودة</Label>
                  <p className="text-2xl font-bold">{selectedCarrier.qualityScore}/100</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>ملاحظات</Label>
                <p className="text-muted-foreground">{selectedCarrier.notes}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CarrierEvaluation;