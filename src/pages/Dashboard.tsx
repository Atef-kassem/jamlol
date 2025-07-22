import { useState } from "react";
import {
  Car,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Timer,
  Target,
  BarChart3,
  PieChart,
  Home,
  FileText,
  Bell,
  CalendarIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BranchSelector } from "@/components/BranchSelector";
import { ServicePathsStatus } from "@/components/ServicePathsStatus";
import { ActiveAlerts } from "@/components/ActiveAlerts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Pie } from 'recharts';
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const stats = [
    {
      title: "إجمالي السيارات",
      value: "154",
      change: "+12%",
      changeType: "increase" as const,
      icon: Car,
      description: "سيارة اليوم"
    },
    {
      title: "حجوزات جديدة", 
      value: "45,500",
      change: "+3%",
      changeType: "increase" as const,
      icon: Calendar,
      description: "حجز اليوم"
    },
    {
      title: "إيرادات اليوم",
      value: "980",
      change: "+8%",
      changeType: "increase" as const,
      icon: DollarSign,
      description: "ر.س اليوم"
    },
    {
      title: "معدل الإشغال",
      value: "17",
      change: "+5%",
      changeType: "increase" as const,
      icon: Activity,
      description: "مسار نشط"
    },
  ];

  // بيانات الرسم البياني الخطي
  const dailyData = [
    { name: 'السبت', orders: 30, revenue: 4000 },
    { name: 'الأحد', orders: 45, revenue: 6000 },
    { name: 'الاثنين', orders: 60, revenue: 8000 },
    { name: 'الثلاثاء', orders: 80, revenue: 12000 },
    { name: 'الأربعاء', orders: 55, revenue: 7000 },
    { name: 'الخميس', orders: 70, revenue: 9000 },
    { name: 'الجمعة', orders: 65, revenue: 8500 },
  ];

  // بيانات الرسم البياني العمودي
  const serviceData = [
    { name: 'الغسيل الخارجي', value: 120 },
    { name: 'الغسيل الداخلي', value: 80 },
    { name: 'التلميع', value: 60 },
    { name: 'تغيير الزيت', value: 40 },
  ];

  // بيانات الرسم البياني الدائري  
  const branchData = [
    { name: 'فرع الرياض', value: 40, color: '#3b82f6' },
    { name: 'فرع جدة', value: 30, color: '#06b6d4' },
    { name: 'فرع الدمام', value: 20, color: '#8b5cf6' },
    { name: 'فرع الخبر', value: 10, color: '#f59e0b' },
  ];

  // بيانات الجدول التفصيلي
  const detailedStats = [
    {
      branch: 'فرع الرياض',
      cars: 76000,
      completed: 150000,
      active: 25000,
      revenue: 154
    },
    {
      branch: 'فرع جدة', 
      cars: 45000,
      completed: 126000,
      active: 18000,
      revenue: 98
    },
    {
      branch: 'فرع الدمام',
      cars: 30000,
      completed: 96000,
      active: 15000,
      revenue: 72
    }
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "أحمد محمد",
      service: "غسيل خارجي + داخلي",
      amount: "80 ريال",
      status: "مكتمل",
      time: "منذ 5 دقائق",
    },
    {
      id: "ORD-002",
      customer: "سارة أحمد",
      service: "تنظيف شامل",
      amount: "150 ريال",
      status: "قيد التنفيذ",
      time: "منذ 15 دقيقة",
    },
    {
      id: "ORD-003",
      customer: "محمد العتيبي",
      service: "غسيل سريع",
      amount: "40 ريال",
      status: "في الانتظار",
      time: "منذ 30 دقيقة",
    },
  ];

  const todaySchedule = [
    { time: "09:00", customer: "فاطمة الزهراني", service: "تنظيف شامل", status: "مؤكد" },
    { time: "10:30", customer: "خالد الأحمد", service: "غسيل خارجي", status: "مؤكد" },
    { time: "11:00", customer: "نور محمد", service: "تلميع السيارة", status: "قيد الانتظار" },
    { time: "14:00", customer: "عبدالله سعد", service: "غسيل شامل", status: "مؤكد" },
  ];

  return (
    <div className="space-y-6">
      {/* صف التاريخ والوقت واختيار الفرع */}
      <Card className="shadow-card bg-gradient-to-r from-card to-card/80 border">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-end gap-4 lg:gap-6">
            {/* من تاريخ ووقت */}
            <div className="flex flex-col gap-2 min-w-[200px]">
              <Label htmlFor="start-datetime" className="text-sm font-medium text-foreground">من تاريخ ووقت:</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <Input
                  id="start-datetime"
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  className="bg-background border-border focus:ring-2 focus:ring-primary/20"
                  placeholder="يوم/شهر/سنة --:--"
                />
              </div>
            </div>
            
            {/* إلى تاريخ ووقت */}
            <div className="flex flex-col gap-2 min-w-[200px]">
              <Label htmlFor="end-datetime" className="text-sm font-medium text-foreground">إلى تاريخ ووقت:</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <Input
                  id="end-datetime"
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                  className="bg-background border-border focus:ring-2 focus:ring-primary/20"
                  placeholder="يوم/شهر/سنة --:--"
                />
              </div>
            </div>
            
            {/* اختيار الفرع */}
            <div className="flex flex-col gap-2 min-w-[150px]">
              <Label className="text-sm font-medium text-foreground">اختيار الفرع:</Label>
              <BranchSelector />
            </div>
            
            {/* تطبيق الفلتر */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium opacity-0">تطبيق</Label>
              <Button 
                onClick={() => {
                  console.log("تطبيق الفلتر من:", startDateTime, "إلى:", endDateTime);
                }}
                className="bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={!startDateTime || !endDateTime}
              >
                <Activity className="w-4 h-4 mr-2" />
                تطبيق الفلتر
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* صف إحصائيات الفروع */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* إجمالي السيارات */}
        <Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Car className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold text-green-500">+12%</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">154</p>
              <p className="text-sm font-semibold text-foreground mb-1">إجمالي السيارات</p>
              <p className="text-xs text-muted-foreground">سيارة اليوم</p>
            </div>
          </CardContent>
        </Card>

        {/* إجمالي الإيرادات */}
        <Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary-blue to-secondary-blue/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold text-green-500">+8%</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-secondary-blue to-primary bg-clip-text text-transparent">980</p>
              <p className="text-sm font-semibold text-foreground mb-1">إيرادات اليوم</p>
              <p className="text-xs text-muted-foreground">ريال سعودي</p>
            </div>
          </CardContent>
        </Card>

        {/* حجوزات جديدة */}
        <Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-success to-success/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold text-green-500">+3%</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">45</p>
              <p className="text-sm font-semibold text-foreground mb-1">حجوزات جديدة</p>
              <p className="text-xs text-muted-foreground">حجز اليوم</p>
            </div>
          </CardContent>
        </Card>

        {/* معدل الإشغال */}
        <Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-warning/5 border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-warning to-warning/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold text-green-500">+5%</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-warning to-secondary-blue bg-clip-text text-transparent">17</p>
              <p className="text-sm font-semibold text-foreground mb-1">معدل الإشغال</p>
              <p className="text-xs text-muted-foreground">مسار نشط</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* باقي المحتوى - التبويبات المحسنة */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Home className="w-4 h-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <BarChart3 className="w-4 h-4" />
            التحليلات
          </TabsTrigger>
          <TabsTrigger 
            value="operations" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Activity className="w-4 h-4" />
            العمليات
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            التقارير
          </TabsTrigger>
          <TabsTrigger 
            value="alerts" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105"
          >
            <Bell className="w-4 h-4 animate-pulse" />
            التنبيهات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* نظرة عامة - الرسوم البيانية */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* المبيعات حسب الفترة */}
            <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PieChart className="w-4 h-4 text-primary" />
                  </div>
                  المبيعات حسب أوقات الذروة
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {startDateTime && endDateTime 
                    ? `من ${format(new Date(startDateTime), 'dd/MM/yyyy HH:mm', { locale: ar })} إلى ${format(new Date(endDateTime), 'dd/MM/yyyy HH:mm', { locale: ar })}`
                    : "يرجى تحديد الفترة الزمنية لعرض توزيع أوقات الذروة"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {startDateTime && endDateTime ? (
                  <div className="h-48 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'أوقات الذروة', value: 65, color: '#ef4444' },
                            { name: 'أوقات عادية', value: 35, color: '#22c55e' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={70}
                          dataKey="value"
                        >
                          {[
                            { name: 'أوقات الذروة', value: 65, color: '#ef4444' },
                            { name: 'أوقات عادية', value: 35, color: '#22c55e' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'النسبة']}
                          labelFormatter={(label) => label}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-muted-foreground">
                    <CalendarIcon className="h-16 w-16 mb-4 opacity-50" />
                    <p className="text-sm text-center">
                      يرجى تحديد التاريخ والوقت في الأعلى<br />
                      لعرض توزيع المبيعات حسب أوقات الذروة
                    </p>
                  </div>
                )}
                {startDateTime && endDateTime && (
                  <>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-red-700 dark:text-red-300">أوقات الذروة</span>
                          <p className="text-xs text-red-600 dark:text-red-400">65% - 8,087 ريال</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">أوقات عادية</span>
                          <p className="text-xs text-green-600 dark:text-green-400">35% - 4,363 ريال</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-background/50 rounded-lg border">
                      <div className="text-center">
                        <span className="text-sm font-medium text-muted-foreground">إجمالي المبيعات للفترة</span>
                        <p className="text-xl font-bold text-primary mt-1">12,450 ريال</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          أوقات الذروة: 10:00-14:00 و 18:00-22:00
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* المبيعات الشهرية */}
            <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PieChart className="w-4 h-4 text-secondary-blue" />
                  </div>
                  المبيعات الشهرية
                </CardTitle>
                <CardDescription className="text-center text-sm font-bold text-primary">
                  Jul : 94794.14
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: 'أبريل', value: 30, color: '#3b82f6' },
                          { name: 'يونيو', value: 35, color: '#10b981' },
                          { name: 'مايو', value: 35, color: '#8b5cf6' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        dataKey="value"
                      >
                        {[
                          { name: 'أبريل', value: 30, color: '#3b82f6' },
                          { name: 'يونيو', value: 35, color: '#10b981' },
                          { name: 'مايو', value: 35, color: '#8b5cf6' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-1">
                  {[
                    { name: 'أبريل', color: '#3b82f6' },
                    { name: 'يونيو', color: '#10b981' },
                    { name: 'مايو', color: '#8b5cf6' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* المبيعات حسب الفرع */}
            <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-4 h-4 text-success" />
                  </div>
                  المبيعات حسب الفرع
                </CardTitle>
                <CardDescription className="text-center text-sm font-bold text-success">
                  0.00
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center">
                  <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'فرع الرياض', value: 1250000, color: '#3b82f6' },
                          { name: 'فرع جدة', value: 950000, color: '#10b981' },
                          { name: 'فرع الدمام', value: 750000, color: '#8b5cf6' },
                          { name: 'فرع الخبر', value: 450000, color: '#f59e0b' },
                          { name: 'فرع مكة', value: 650000, color: '#ef4444' }
                        ]}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip 
                          formatter={(value) => [`${Number(value).toLocaleString()} ريال`, 'المبيعات']}
                          labelStyle={{ textAlign: 'right' }}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#10b981"
                          radius={[2, 2, 0, 0]}
                          className="hover:opacity-80 transition-opacity duration-200"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {[
                    { name: 'فرع الرياض', amount: '1.25M', color: '#3b82f6' },
                    { name: 'فرع جدة', amount: '950K', color: '#10b981' },
                    { name: 'فرع الدمام', amount: '750K', color: '#8b5cf6' },
                    { name: 'فرع الخبر', amount: '450K', color: '#f59e0b' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-1 rounded bg-muted/30">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-muted-foreground text-[10px]">{item.name}</span>
                      </div>
                      <span className="font-medium text-[10px]">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Paths Status */}
          <ServicePathsStatus />

          {/* Performance Overview */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  معدل إنجاز الطلبات
                </CardTitle>
                <CardDescription>نسبة الطلبات المكتملة اليوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>مكتمل</span>
                    <span className="font-bold">35 من 45</span>
                  </div>
                  <Progress value={78} className="h-3 bg-gradient-to-r from-success/20 to-success/40" />
                  <p className="text-sm text-success font-medium">78% معدل الإنجاز</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-warning/5 border-l-4 border-l-warning">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-4 h-4 text-warning" />
                  </div>
                  رضا العملاء
                </CardTitle>
                <CardDescription>متوسط تقييمات العملاء</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التقييم</span>
                    <span className="font-bold">4.8 من 5</span>
                  </div>
                  <Progress value={96} className="h-3 bg-gradient-to-r from-warning/20 to-warning/40" />
                  <p className="text-sm text-warning font-medium">96% رضا العملاء</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  الإيرادات الشهرية
                </CardTitle>
                <CardDescription>هدف الشهر الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>تحقق</span>
                    <span className="font-bold">85,000 من 100,000</span>
                  </div>
                  <Progress value={85} className="h-3 bg-gradient-to-r from-primary/20 to-primary/40" />
                  <p className="text-sm text-primary font-medium">85% من الهدف الشهري</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* التحليلات */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Line Chart */}
            <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  الطلبات
                </CardTitle>
                <CardDescription>إحصائيات الطلبات الأسبوعية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-4 h-4 text-secondary-blue" />
                  </div>
                  التوزيع
                </CardTitle>
                <CardDescription>توزيع أنواع الخدمات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="hsl(var(--secondary-blue))" 
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Table and Pie Chart */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Statistics Table */}
            <Card className="shadow-card lg:col-span-2">
              <CardHeader>
                <CardTitle>التوزيع</CardTitle>
                <CardDescription>إحصائيات مفصلة حسب الفروع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-2">الفرع</th>
                        <th className="text-right py-2">عدد السيارات</th>
                        <th className="text-right py-2">مكتملة</th>
                        <th className="text-right py-2">نشطة</th>
                        <th className="text-right py-2">الإيرادات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailedStats.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 font-medium">{row.branch}</td>
                          <td className="py-3">{row.cars.toLocaleString()}</td>
                          <td className="py-3">{row.completed.toLocaleString()}</td>
                          <td className="py-3">{row.active.toLocaleString()}</td>
                          <td className="py-3 font-semibold text-primary">{row.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  نظرة 2
                </CardTitle>
                <CardDescription>توزيع الفروع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={branchData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {branchData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {branchData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                        <span className="mr-auto font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* العمليات */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Orders */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  الطلبات الحديثة
                </CardTitle>
                <CardDescription>آخر الطلبات المتلقاة اليوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{order.customer}</p>
                          <Badge variant="outline" className="text-xs">
                            {order.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.service}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-primary">{order.amount}</p>
                        <Badge
                          variant={
                            order.status === "مكتمل"
                              ? "default"
                              : order.status === "قيد التنفيذ"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  جدول اليوم
                </CardTitle>
                <CardDescription>المواعيد المجدولة لليوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((appointment, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <div className="w-16 text-center">
                        <p className="text-sm font-medium">{appointment.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{appointment.customer}</p>
                        <p className="text-sm text-muted-foreground">{appointment.service}</p>
                      </div>
                      <Badge
                        variant={appointment.status === "مؤكد" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* التقارير */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>تقرير الأداء اليومي</CardTitle>
                <CardDescription>ملخص أداء اليوم الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span>إجمالي السيارات المخدومة</span>
                    <span className="font-bold text-primary">87</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span>متوسط وقت الخدمة</span>
                    <span className="font-bold text-primary">25 دقيقة</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span>نسبة رضا العملاء</span>
                    <span className="font-bold text-success">96%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span>الإيرادات الإجمالية</span>
                    <span className="font-bold text-primary">15,420 ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>تقرير الخدمات الأكثر طلباً</CardTitle>
                <CardDescription>أهم الخدمات المطلوبة هذا الأسبوع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceData.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span>{service.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{service.value}</span>
                        <span className="text-sm text-muted-foreground">طلب</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* التنبيهات */}
        <TabsContent value="alerts" className="space-y-6">
          <ActiveAlerts />
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                سجل التنبيهات
              </CardTitle>
              <CardDescription>جميع التنبيهات والإشعارات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-800">تنبيه نقص مخزون</p>
                    <p className="text-sm text-yellow-700">مواد التنظيف في فرع الرياض تحتاج إعادة تعبئة</p>
                    <p className="text-xs text-yellow-600 mt-1">منذ ساعتين</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">اكتمال صيانة</p>
                    <p className="text-sm text-blue-700">تم الانتهاء من صيانة معدات مسار رقم 3</p>
                    <p className="text-xs text-blue-600 mt-1">منذ 4 ساعات</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Target className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-green-800">هدف مكتمل</p>
                    <p className="text-sm text-green-700">تم تحقيق هدف الإيرادات اليومية بنسبة 120%</p>
                    <p className="text-xs text-green-600 mt-1">منذ 6 ساعات</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
