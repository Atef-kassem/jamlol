import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Timer, CalendarIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Pie } from 'recharts';
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const OverviewTab = () => {
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
            توزيع أوقات الذروة خلال اليوم
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* الطلبات الأخيرة */}
      <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Timer className="w-4 h-4 text-secondary-blue" />
            </div>
            الطلبات الأخيرة
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            آخر الطلبات المسجلة في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background/50 to-background/30 hover:from-background/70 hover:to-background/50 transition-all duration-300 border border-border/40">
                <div className="flex-1">
                  <p className="font-medium text-sm">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.service}</p>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-primary">{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* جدولة اليوم */}
      <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <CalendarIcon className="w-4 h-4 text-success" />
            </div>
            جدولة اليوم
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            الحجوزات المجدولة لهذا اليوم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaySchedule.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background/50 to-background/30 hover:from-background/70 hover:to-background/50 transition-all duration-300 border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{appointment.time}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{appointment.customer}</p>
                    <p className="text-xs text-muted-foreground">{appointment.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;