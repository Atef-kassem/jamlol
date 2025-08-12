import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Calendar, DollarSign, Activity, TrendingUp } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "إجمالي السيارات",
      value: "154",
      change: "+12%",
      changeType: "increase",
      icon: Car,
      description: "سيارة اليوم"
    },
    {
      title: "حجوزات جديدة", 
      value: "45,500",
      change: "+3%",
      changeType: "increase",
      icon: Calendar,
      description: "حجز اليوم"
    },
    {
      title: "إيرادات اليوم",
      value: "980",
      change: "+8%",
      changeType: "increase",
      icon: DollarSign,
      description: "ر.س اليوم"
    },
    {
      title: "معدل الإشغال",
      value: "17",
      change: "+5%",
      changeType: "increase",
      icon: Activity,
      description: "مسار نشط"
    },
  ];

  return (
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
  );
};

export default StatsCards;