import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  DollarSign,
  Users,
  Truck,
  Target,
  Zap,
  Eye,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  Bell,
  Settings,
  FileText,
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  Database,
  Lightbulb,
  Brain,
  Shield
} from 'lucide-react';

// Mock data for charts and analytics
const consumptionTrends = [
  { month: 'يناير', استهلاك: 45, توريد: 50, رصيد: 120 },
  { month: 'فبراير', استهلاك: 52, توريد: 45, رصيد: 113 },
  { month: 'مارس', استهلاك: 48, توريد: 60, رصيد: 125 },
  { month: 'أبريل', استهلاك: 61, توريد: 55, رصيد: 119 },
  { month: 'مايو', استهلاك: 55, توريد: 70, رصيد: 134 },
  { month: 'يونيو', استهلاك: 67, توريد: 65, رصيد: 132 }
];

const inventoryCategories = [
  { name: 'منتجات تنظيف', value: 35, color: '#8884d8' },
  { name: 'قطع غيار', value: 25, color: '#82ca9d' },
  { name: 'مواد خام', value: 20, color: '#ffc658' },
  { name: 'مستلزمات', value: 15, color: '#ff7300' },
  { name: 'أخرى', value: 5, color: '#8dd1e1' }
];

const turnoverAnalysis = [
  { item: 'شامبو السيارات', turnover: 12.5, category: 'سريع' },
  { item: 'شمع السيارات', turnover: 8.2, category: 'متوسط' },
  { item: 'منظف المقاعد', turnover: 15.1, category: 'سريع' },
  { item: 'معطر الهواء', turnover: 6.3, category: 'متوسط' },
  { item: 'مادة التلميع', turnover: 3.2, category: 'بطيء' },
  { item: 'فرش التنظيف', turnover: 9.8, category: 'متوسط' }
];

const alertsData = [
  { type: 'نفاد', count: 5, color: 'destructive' },
  { type: 'صلاحية', count: 3, color: 'secondary' },
  { type: 'فروقات', count: 2, color: 'outline' },
  { type: 'تالف', count: 1, color: 'default' }
];

const forecastData = [
  { week: 'الأسبوع 1', predicted: 120, actual: 115 },
  { week: 'الأسبوع 2', predicted: 135, actual: 142 },
  { week: 'الأسبوع 3', predicted: 125, actual: 118 },
  { week: 'الأسبوع 4', predicted: 140, actual: null },
  { week: 'الأسبوع 5', predicted: 145, actual: null },
  { week: 'الأسبوع 6', predicted: 130, actual: null }
];

const kpiData = [
  {
    title: 'معدل دوران المخزون',
    value: '8.5',
    unit: 'مرة/سنة',
    trend: 'up',
    percentage: '+12%',
    description: 'مقارنة بالشهر الماضي',
    icon: RefreshCw,
    color: 'text-green-500'
  },
  {
    title: 'أيام المخزون المتبقي',
    value: '42',
    unit: 'يوم',
    trend: 'down',
    percentage: '-8%',
    description: 'انخفاض جيد',
    icon: Clock,
    color: 'text-blue-500'
  },
  {
    title: 'نسبة التالف والفاقد',
    value: '2.1',
    unit: '%',
    trend: 'down',
    percentage: '-0.5%',
    description: 'تحسن ملحوظ',
    icon: AlertTriangle,
    color: 'text-orange-500'
  },
  {
    title: 'دقة الجرد',
    value: '98.5',
    unit: '%',
    trend: 'up',
    percentage: '+1.2%',
    description: 'أداء ممتاز',
    icon: Target,
    color: 'text-purple-500'
  },
  {
    title: 'قيمة المخزون',
    value: '245,000',
    unit: 'ريال',
    trend: 'up',
    percentage: '+5%',
    description: 'زيادة صحية',
    icon: DollarSign,
    color: 'text-green-500'
  },
  {
    title: 'الأصناف الحرجة',
    value: '8',
    unit: 'صنف',
    trend: 'stable',
    percentage: '0%',
    description: 'تحت المراقبة',
    icon: Bell,
    color: 'text-red-500'
  }
];

export default function InventoryAnalytics() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "تم تحديث البيانات بنجاح",
        description: "تم تحديث جميع التقارير والمؤشرات",
      });
    } catch (error) {
      toast({
        title: "خطأ في تحديث البيانات",
        description: "حدث خطأ أثناء تحديث البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportReport = (type: string) => {
    toast({
      title: `تم تصدير ${type} بنجاح`,
      description: "سيتم تحميل الملف خلال ثوان",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">البيانات والتحليل الذكي</h1>
          <p className="text-muted-foreground">لوحة تحكم ذكية لمراقبة وتحليل أداء المخزون</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefreshData} disabled={isLoading} variant="outline" className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث البيانات
          </Button>
          <Button onClick={() => handleExportReport('التقرير الشامل')} className="gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* فلاتر سريعة */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-2">
              <Label>الفترة الزمنية</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="last-7-days">آخر 7 أيام</SelectItem>
                  <SelectItem value="last-30-days">آخر 30 يوم</SelectItem>
                  <SelectItem value="last-3-months">آخر 3 أشهر</SelectItem>
                  <SelectItem value="last-year">آخر سنة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>التصنيف</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="cleaning">منتجات تنظيف</SelectItem>
                  <SelectItem value="spare-parts">قطع غيار</SelectItem>
                  <SelectItem value="raw-materials">مواد خام</SelectItem>
                  <SelectItem value="supplies">مستلزمات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>المخزن</Label>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المخازن</SelectItem>
                  <SelectItem value="main">المخزن الرئيسي</SelectItem>
                  <SelectItem value="branch1">فرع الرياض</SelectItem>
                  <SelectItem value="branch2">فرع جدة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" className="gap-2 mt-7">
              <Filter className="h-4 w-4" />
              تطبيق الفلاتر
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="trends" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            اتجاهات الاستهلاك
          </TabsTrigger>
          <TabsTrigger value="forecasting" className="gap-2">
            <Brain className="h-4 w-4" />
            التنبؤ الذكي
          </TabsTrigger>
          <TabsTrigger value="quality" className="gap-2">
            <Shield className="h-4 w-4" />
            جودة المخزون
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="gap-2">
            <Zap className="h-4 w-4" />
            كفاءة العمليات
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-2">
            <Bell className="h-4 w-4" />
            التنبيهات والمخاطر
          </TabsTrigger>
        </TabsList>

        {/* لوحة التحكم الرئيسية */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* مؤشرات الأداء الرئيسية */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {kpi.value} <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {kpi.trend === 'up' && <ArrowUp className="h-4 w-4 text-green-500" />}
                    {kpi.trend === 'down' && <ArrowDown className="h-4 w-4 text-red-500" />}
                    {kpi.trend === 'stable' && <Minus className="h-4 w-4 text-gray-500" />}
                    <span className={`text-xs ${
                      kpi.trend === 'up' ? 'text-green-500' : 
                      kpi.trend === 'down' ? 'text-red-500' : 
                      'text-gray-500'
                    }`}>
                      {kpi.percentage}
                    </span>
                    <span className="text-xs text-muted-foreground">{kpi.description}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* الرسوم البيانية الرئيسية */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  نظرة عامة على الحركات الشهرية
                </CardTitle>
                <CardDescription>
                  مقارنة الاستهلاك والتوريد والأرصدة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={consumptionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="استهلاك" fill="#8884d8" />
                    <Bar dataKey="توريد" fill="#82ca9d" />
                    <Bar dataKey="رصيد" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  توزيع المخزون حسب التصنيف
                </CardTitle>
                <CardDescription>
                  نسبة كل تصنيف من إجمالي المخزون
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={inventoryCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* تنبيهات سريعة */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                التنبيهات النشطة
              </CardTitle>
              <CardDescription>
                أهم التنبيهات التي تحتاج لمتابعة فورية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {alertsData.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-2xl font-bold">{alert.count}</p>
                    </div>
                    <Badge variant={alert.color as any}>عاجل</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* اتجاهات الاستهلاك */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  تحليل اتجاهات الاستهلاك
                </CardTitle>
                <CardDescription>
                  مراقبة أنماط الاستهلاك عبر الزمن واكتشاف التغيرات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={consumptionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="استهلاك" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="توريد" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="رصيد" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  تحليل دوران الأصناف
                </CardTitle>
                <CardDescription>
                  تصنيف الأصناف حسب سرعة الحركة ومعدل الدوران
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {turnoverAnalysis.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.item}</h4>
                        <p className="text-sm text-muted-foreground">معدل الدوران: {item.turnover} مرة/سنة</p>
                      </div>
                      <Badge variant={
                        item.category === 'سريع' ? 'default' :
                        item.category === 'متوسط' ? 'secondary' : 'outline'
                      }>
                        {item.category} الحركة
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* التنبؤ الذكي */}
        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                نموذج التنبؤ بالطلب
              </CardTitle>
              <CardDescription>
                توقعات ذكية للاستهلاك المستقبلي بناءً على البيانات التاريخية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="الاستهلاك الفعلي"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="التوقعات"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  توصيات ذكية
                </CardTitle>
                <CardDescription>
                  اقتراحات آلية لتحسين إدارة المخزون
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium">توصية للشراء</span>
                    </div>
                    <p className="text-sm text-green-700">
                      يُنصح بطلب 200 قطعة من شامبو السيارات خلال الأسبوع القادم
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">تحذير من النفاد</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      متوقع نفاد مادة التلميع خلال 10 أيام بناءً على الاستهلاك الحالي
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">تحسين التوزيع</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      يمكن نقل 50 قطعة من فرش التنظيف من الفرع الرئيسي إلى فرع جدة
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  دقة التنبؤات
                </CardTitle>
                <CardDescription>
                  مقياس موثوقية النموذج التنبؤي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">دقة التنبؤ الإجمالية</span>
                      <span className="text-sm font-bold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">أداء الأسبوع الماضي</span>
                      <span className="text-sm font-bold">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">متوسط الانحراف</span>
                      <span className="text-sm font-bold">±5%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <Separator />
                  
                  <div className="text-xs text-muted-foreground">
                    النموذج يتحسن باستمرار مع إضافة المزيد من البيانات التاريخية
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* جودة المخزون */}
        <TabsContent value="quality" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  مؤشرات جودة المخزون
                </CardTitle>
                <CardDescription>
                  تحليل الفاقد والتالف ودقة الجرد
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">نسبة التالف الإجمالية</p>
                      <p className="text-sm text-muted-foreground">آخر 30 يوم</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-500">2.1%</p>
                      <p className="text-xs text-green-500">↓ تحسن 0.5%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">فروقات الجرد</p>
                      <p className="text-sm text-muted-foreground">آخر جرد دوري</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">1.5%</p>
                      <p className="text-xs text-gray-500">= مستقر</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">دقة الرقابة</p>
                      <p className="text-sm text-muted-foreground">متوسط شهري</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-500">98.5%</p>
                      <p className="text-xs text-green-500">↑ تحسن 1.2%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  تحليل أعمار المخزون
                </CardTitle>
                <CardDescription>
                  توزيع الأصناف حسب فترة البقاء في المخزن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={[
                    { period: '0-30 يوم', count: 45 },
                    { period: '31-60 يوم', count: 32 },
                    { period: '61-90 يوم', count: 18 },
                    { period: '91-180 يوم', count: 12 },
                    { period: '+180 يوم', count: 8 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* كفاءة العمليات */}
        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  متوسط زمن العمليات
                </CardTitle>
                <CardDescription>
                  قياس سرعة تنفيذ العمليات الأساسية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">الاستلام</span>
                    <span className="font-medium">15 دقيقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">الصرف</span>
                    <span className="font-medium">8 دقائق</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">التحويل</span>
                    <span className="font-medium">12 دقيقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">الجرد</span>
                    <span className="font-medium">45 دقيقة</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  إنتاجية المستخدمين
                </CardTitle>
                <CardDescription>
                  معدل العمليات لكل مستخدم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">أحمد محمد</span>
                    <span className="font-medium">45 عملية/يوم</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">سارة أحمد</span>
                    <span className="font-medium">38 عملية/يوم</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">محمد علي</span>
                    <span className="font-medium">42 عملية/يوم</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">فاطمة خالد</span>
                    <span className="font-medium">35 عملية/يوم</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  معدل الاستغلال
                </CardTitle>
                <CardDescription>
                  نسبة استخدام سعة المخازن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">المخزن الرئيسي</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">فرع الرياض</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    <Progress value={72} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">فرع جدة</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* التنبيهات والمخاطر */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  مركز التنبيهات والإنذار المبكر
                </CardTitle>
                <CardDescription>
                  مراقبة المخاطر والانحرافات التي تحتاج لتدخل فوري
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-l-red-500 bg-red-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-red-800">تنبيه عاجل - نفاد وشيك</h4>
                      <Badge variant="destructive">عاجل</Badge>
                    </div>
                    <p className="text-sm text-red-700 mb-2">
                      5 أصناف ستنفد خلال الـ 48 ساعة القادمة بناءً على معدل الاستهلاك الحالي
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive">
                        عرض التفاصيل
                      </Button>
                      <Button size="sm" variant="outline">
                        إنشاء طلب شراء
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-orange-800">تحذير انتهاء صلاحية</h4>
                      <Badge variant="secondary">متوسط</Badge>
                    </div>
                    <p className="text-sm text-orange-700 mb-2">
                      3 منتجات ستنتهي صلاحيتها خلال أسبوع - يُنصح بالصرف السريع أو التصفية
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        عرض المنتجات
                      </Button>
                      <Button size="sm" variant="outline">
                        إنشاء طلب صرف
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-800">فروقات جرد</h4>
                      <Badge variant="outline">للمراجعة</Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      تم اكتشاف فروقات في 2 أصناف أثناء الجرد اليومي - تحتاج لمراجعة ومطابقة
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        مراجعة الفروقات
                      </Button>
                      <Button size="sm" variant="outline">
                        تقرير مفصل
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-green-800">تحسن في الأداء</h4>
                      <Badge variant="default" className="bg-green-500">إيجابي</Badge>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      انخفضت نسبة التالف بـ 15% هذا الشهر مقارنة بالشهر الماضي
                    </p>
                    <Button size="sm" variant="outline">
                      عرض التقرير
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    إعدادات التنبيهات
                  </CardTitle>
                  <CardDescription>
                    تخصيص حساسية ونوع التنبيهات
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>تنبيه الحد الأدنى</Label>
                      <Input type="number" defaultValue={10} className="w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>تنبيه انتهاء الصلاحية (أيام)</Label>
                      <Input type="number" defaultValue={30} className="w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>حد فروقات الجرد (%)</Label>
                      <Input type="number" defaultValue={5} className="w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>نسبة التالف القصوى (%)</Label>
                      <Input type="number" defaultValue={3} className="w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    تقارير الاستثناءات
                  </CardTitle>
                  <CardDescription>
                    تقارير مخصصة للحالات الاستثنائية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      تقرير الأصناف الراكدة
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      تقرير الحركات الاستثنائية
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      تقرير المستخدمين الأكثر نشاطاً
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      تحليل التالف والفقدان
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}