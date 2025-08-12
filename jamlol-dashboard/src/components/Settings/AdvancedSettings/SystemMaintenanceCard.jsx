import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Settings, RefreshCw, HardDrive, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export function SystemMaintenanceCard() {
  const systemStats = [
    { label: 'استخدام المعالج', value: 45, status: 'normal' },
    { label: 'استخدام الذاكرة', value: 68, status: 'warning' },
    { label: 'مساحة القرص', value: 78, status: 'critical' },
    { label: 'اتصال الشبكة', value: 92, status: 'good' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'normal': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'normal': return <Activity className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          صيانة النظام والمراقبة
        </CardTitle>
        <CardDescription>
          مراقبة أداء النظام وأدوات الصيانة
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* إحصائيات النظام */}
        <div className="space-y-4">
          <h4 className="font-medium">إحصائيات الأداء</h4>
          {systemStats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${getStatusColor(stat.status)}`}>
                    {stat.value}%
                  </span>
                  <span className={getStatusColor(stat.status)}>
                    {getStatusIcon(stat.status)}
                  </span>
                </div>
              </div>
              <Progress value={stat.value} className="h-2" />
            </div>
          ))}
        </div>

        {/* أدوات الصيانة */}
        <div className="space-y-4">
          <h4 className="font-medium">أدوات الصيانة</h4>
          <div className="grid gap-3">
            <Button variant="outline" className="justify-start gap-2">
              <RefreshCw className="h-4 w-4" />
              تنظيف ملفات مؤقتة
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <HardDrive className="h-4 w-4" />
              فحص قاعدة البيانات
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Activity className="h-4 w-4" />
              تحسين الأداء
            </Button>
          </div>
        </div>

        {/* حالة الخدمات */}
        <div className="space-y-4">
          <h4 className="font-medium">حالة الخدمات</h4>
          <div className="space-y-2">
            {[
              { name: 'خادم قاعدة البيانات', status: 'نشط', color: 'success' },
              { name: 'خدمة البريد الإلكتروني', status: 'نشط', color: 'success' },
              { name: 'خدمة النسخ الاحتياطي', status: 'متوقف', color: 'destructive' },
              { name: 'خدمة المراقبة', status: 'نشط', color: 'success' },
            ].map((service, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <span className="text-sm">{service.name}</span>
                <Badge variant={service.color}>{service.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}