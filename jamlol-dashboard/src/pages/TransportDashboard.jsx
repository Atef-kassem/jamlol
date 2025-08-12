import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
  Package,
  Car,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  Award,
  Globe,
} from "lucide-react";

const Dashboard = () => {
  // Mock data for the transport platform
  const stats = [
    {
      title: "إجمالي الموردين",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "إجمالي المشترين",
      value: "5,329",
      change: "+8.2%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "bg-emerald-500",
    },
    {
      title: "إجمالي الناقلين",
      value: "1,256",
      change: "+15.7%",
      changeType: "positive",
      icon: Car,
      color: "bg-yellow-500",
    },
    {
      title: "الطلبات النشطة",
      value: "892",
      change: "+3.1%",
      changeType: "positive",
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "إجمالي الإيرادات",
      value: "2.4M ر.س",
      change: "+18.3%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "متوسط وقت التسليم",
      value: "2.3 يوم",
      change: "-12%",
      changeType: "positive",
      icon: Clock,
      color: "bg-indigo-500",
    },
  ];

  const orderStatusData = [
    { name: "مكتملة", value: 45, color: "#10b981" },
    { name: "قيد التنفيذ", value: 30, color: "#f59e0b" },
    { name: "قيد المراجعة", value: 15, color: "#3b82f6" },
    { name: "ملغاة", value: 10, color: "#ef4444" },
  ];

  const monthlyData = [
    { month: "يناير", orders: 120, revenue: 85000, suppliers: 45 },
    { month: "فبراير", orders: 145, revenue: 95000, suppliers: 52 },
    { month: "مارس", orders: 189, revenue: 125000, suppliers: 68 },
    { month: "أبريل", orders: 167, revenue: 110000, suppliers: 71 },
    { month: "مايو", orders: 203, revenue: 140000, suppliers: 89 },
    { month: "يونيو", orders: 234, revenue: 165000, suppliers: 94 },
  ];

  const topRegions = [
    { region: "الرياض", orders: 458, percentage: 35 },
    { region: "جدة", orders: 342, percentage: 26 },
    { region: "الدمام", orders: 287, percentage: 22 },
    { region: "مكة المكرمة", orders: 156, percentage: 12 },
    { region: "المدينة المنورة", orders: 67, percentage: 5 },
  ];

  const recentActivities = [
    { type: "طلب جديد", description: "طلب نقل من المورد أحمد للمشتري محمد", time: "منذ 5 دقائق", status: "جديد" },
    { type: "شحنة مكتملة", description: "تم تسليم الشحنة #12456 بنجاح", time: "منذ 15 دقيقة", status: "مكتمل" },
    { type: "ناقل جديد", description: "انضم ناقل جديد: شركة النقل السريع", time: "منذ 30 دقيقة", status: "جديد" },
    { type: "تقييم مورد", description: "تم تقييم المورد سعد بـ 5 نجوم", time: "منذ ساعة", status: "تقييم" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "جديد": return "bg-blue-500";
      case "مكتمل": return "bg-green-500";
      case "تقييم": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">لوحة تحكم جملول</h1>
          <p className="text-muted-foreground mt-1">نظرة شاملة على أداء منصة النقل الذكية</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Globe className="w-3 h-3 mr-1" />
            منصة نشطة
          </Badge>
          <Button className="bg-gradient-primary text-white">
            <Calendar className="w-4 h-4 mr-2" />
            تقرير شهري
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center text-sm mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">{stat.change}</span>
                  <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">الأداء الشهري</CardTitle>
            <CardDescription>الطلبات والإيرادات خلال الأشهر الماضية</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.2}
                  name="الطلبات"
                />
                <Area 
                  type="monotone" 
                  dataKey="suppliers" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2}
                  name="الموردين الجدد"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">حالة الطلبات</CardTitle>
            <CardDescription>توزيع الطلبات حسب الحالة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Regions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">أكثر المناطق نشاطاً</CardTitle>
            <CardDescription>توزيع الطلبات حسب المنطقة الجغرافية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topRegions.map((region, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{region.region}</p>
                    <p className="text-sm text-muted-foreground">{region.orders} طلب</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={region.percentage} className="w-20" />
                  <span className="text-sm font-medium text-muted-foreground w-8">
                    {region.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">النشاطات الأخيرة</CardTitle>
            <CardDescription>آخر الأحداث والنشاطات في المنصة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{activity.type}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;