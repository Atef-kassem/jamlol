import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, MoreHorizontal, Eye, Star, TrendingUp, Award, Users, ShoppingCart, Calendar } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const ClientEvaluation = () => {
  const [ratingFilter, setRatingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const clientEvaluations = [
    {
      id: "CE-001",
      clientName: "سوبر ماركت الأندلس",
      clientType: "شركة",
      overallRating: 4.8,
      totalOrders: 156,
      onTimePayment: 95,
      orderFrequency: "عالية",
      avgOrderValue: "15,250",
      lastEvaluation: "2024-01-15",
      loyaltyScore: 92,
      communicationRating: 4.9,
      reliabilityRating: 4.7,
      location: "الرياض - حي النزهة",
      membershipDuration: "2 سنة",
      status: "ممتاز"
    },
    {
      id: "CE-002", 
      clientName: "أحمد محمد السليم",
      clientType: "فرد",
      overallRating: 4.2,
      totalOrders: 23,
      onTimePayment: 87,
      orderFrequency: "متوسطة",
      avgOrderValue: "2,800",
      lastEvaluation: "2024-01-10",
      loyaltyScore: 78,
      communicationRating: 4.0,
      reliabilityRating: 4.3,
      location: "جدة - حي الصفا",
      membershipDuration: "8 أشهر",
      status: "جيد"
    },
    {
      id: "CE-003",
      clientName: "مطعم الكبسة الملكية",
      clientType: "مؤسسة",
      overallRating: 4.5,
      totalOrders: 45,
      onTimePayment: 91,
      orderFrequency: "عالية",
      avgOrderValue: "8,900",
      lastEvaluation: "2024-01-08",
      loyaltyScore: 85,
      communicationRating: 4.4,
      reliabilityRating: 4.6,
      location: "الدمام - الكورنيش",
      membershipDuration: "1.5 سنة",
      status: "جيد جداً"
    },
    {
      id: "CE-004",
      clientName: "مجمع الأسواق التجاري",
      clientType: "شركة",
      overallRating: 3.8,
      totalOrders: 78,
      onTimePayment: 75,
      orderFrequency: "متوسطة",
      avgOrderValue: "12,400",
      lastEvaluation: "2024-01-05",
      loyaltyScore: 68,
      communicationRating: 3.5,
      reliabilityRating: 4.0,
      location: "المدينة المنورة - العوالي",
      membershipDuration: "3 سنوات",
      status: "متوسط"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "ممتاز": return "bg-green-100 text-green-800";
      case "جيد جداً": return "bg-blue-100 text-blue-800";
      case "جيد": return "bg-yellow-100 text-yellow-800";
      case "متوسط": return "bg-orange-100 text-orange-800";
      case "ضعيف": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  const filteredEvaluations = clientEvaluations.filter(client => {
    const matchesSearch = client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "all" || 
                         (ratingFilter === "excellent" && client.overallRating >= 4.5) ||
                         (ratingFilter === "good" && client.overallRating >= 3.5 && client.overallRating < 4.5) ||
                         (ratingFilter === "average" && client.overallRating < 3.5);
    return matchesSearch && matchesRating;
  });

  const avgRating = clientEvaluations.reduce((sum, client) => sum + client.overallRating, 0) / clientEvaluations.length;
  const excellentClients = clientEvaluations.filter(client => client.overallRating >= 4.5).length;
  const avgLoyalty = clientEvaluations.reduce((sum, client) => sum + client.loyaltyScore, 0) / clientEvaluations.length;

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">تقييم المشترين</h1>
          <p className="text-muted-foreground">تقييم أداء وجودة المشترين والعملاء</p>
        </div>
        <Button className="gap-2">
          <Award className="w-4 h-4" />
          إنشاء تقرير تقييم
        </Button>
      </div>

      {/* إحصائيات التقييم */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              متوسط التقييم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{avgRating.toFixed(1)}</div>
            <div className="flex items-center gap-1 mt-1">
              {getRatingStars(avgRating)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-green-500" />
              عملاء ممتازون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{excellentClients}</div>
            <p className="text-xs text-muted-foreground">من إجمالي {clientEvaluations.length} عميل</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              درجة الولاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{Math.round(avgLoyalty)}%</div>
            <p className="text-xs text-muted-foreground">متوسط درجة الولاء</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              نمو التقييمات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">+15%</div>
            <p className="text-xs text-muted-foreground">مقارنة بالشهر الماضي</p>
          </CardContent>
        </Card>
      </div>

      {/* جدول تقييم المشترين */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>تفاصيل تقييم المشترين</CardTitle>
              <CardDescription>عرض تقييمات مفصلة لأداء العملاء</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="البحث في التقييمات..." 
                  className="pr-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="فلترة التقييم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التقييمات</SelectItem>
                  <SelectItem value="excellent">ممتاز (4.5+)</SelectItem>
                  <SelectItem value="good">جيد (3.5-4.5)</SelectItem>
                  <SelectItem value="average">متوسط (أقل من 3.5)</SelectItem>
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
                <TableHead className="text-right">المشتري</TableHead>
                <TableHead className="text-right">التقييم الإجمالي</TableHead>
                <TableHead className="text-right">عدد الطلبات</TableHead>
                <TableHead className="text-right">الدفع في الوقت</TableHead>
                <TableHead className="text-right">تكرار الطلبات</TableHead>
                <TableHead className="text-right">درجة الولاء</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">آخر تقييم</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvaluations.map((client, index) => (
                <TableRow key={client.id} className="hover:bg-muted/50 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{client.clientName}</span>
                      <span className="text-sm text-muted-foreground">{client.clientType} • {client.location}</span>
                      <span className="text-xs text-muted-foreground">عضو منذ {client.membershipDuration}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{client.overallRating}</span>
                        <div className="flex">
                          {getRatingStars(client.overallRating)}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>التواصل: {client.communicationRating}/5</div>
                        <div>الموثوقية: {client.reliabilityRating}/5</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      {client.totalOrders}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      متوسط: {client.avgOrderValue} ر.س
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{client.onTimePayment}%</span>
                      </div>
                      <Progress value={client.onTimePayment} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        client.orderFrequency === "عالية" ? "border-green-500 text-green-700" :
                        client.orderFrequency === "متوسطة" ? "border-yellow-500 text-yellow-700" :
                        "border-red-500 text-red-700"
                      }
                    >
                      {client.orderFrequency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{client.loyaltyScore}%</span>
                      </div>
                      <Progress value={client.loyaltyScore} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{client.lastEvaluation}</TableCell>
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
                          <Star className="w-4 h-4" />
                          تحديث التقييم
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Calendar className="w-4 h-4" />
                          جدولة تقييم
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

export default ClientEvaluation;