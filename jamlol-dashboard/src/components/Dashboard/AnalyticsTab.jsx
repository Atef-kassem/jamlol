import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, PieChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Pie } from 'recharts';

const AnalyticsTab = () => {
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

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* تحليل الطلبات والإيرادات */}
      <Card className="lg:col-span-2 group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            تحليل الطلبات والإيرادات الأسبوعية
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            مقارنة الطلبات والإيرادات خلال الأسبوع الحالي
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value, name) => [
                    name === 'orders' ? `${value} طلب` : `${value} ر.س`,
                    name === 'orders' ? 'الطلبات' : 'الإيرادات'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات الخدمات */}
      <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-4 h-4 text-secondary-blue" />
            </div>
            إحصائيات الخدمات
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            أكثر الخدمات طلباً هذا الشهر
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs" 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`${value} طلب`, 'عدد الطلبات']}
                />
                <Bar 
                  dataKey="value" 
                  fill="#06b6d4"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* توزيع الفروع */}
      <Card className="group shadow-card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <PieChart className="w-4 h-4 text-success" />
            </div>
            توزيع الطلبات حسب الفروع
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            نسبة الطلبات لكل فرع هذا الشهر
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={branchData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                  labelLine={false}
                  fontSize={10}
                >
                  {branchData.map((entry, index) => (
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
    </div>
  );
};

export default AnalyticsTab;