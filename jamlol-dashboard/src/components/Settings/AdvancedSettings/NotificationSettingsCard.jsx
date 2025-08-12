import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail } from 'lucide-react';

export function NotificationSettingsCard({ notificationSettings, setNotificationSettings }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            إعدادات الإشعارات
          </CardTitle>
          <CardDescription>
            تحديد أنواع الإشعارات المطلوب تلقيها
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>إشعارات تحديثات النظام</Label>
            <Switch
              checked={notificationSettings.systemUpdates}
              onCheckedChange={(checked) => 
                setNotificationSettings(prev => ({ ...prev, systemUpdates: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>إشعارات النسخ الاحتياطية</Label>
            <Switch
              checked={notificationSettings.backupNotifications}
              onCheckedChange={(checked) => 
                setNotificationSettings(prev => ({ ...prev, backupNotifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>تنبيهات الأمان</Label>
            <Switch
              checked={notificationSettings.securityAlerts}
              onCheckedChange={(checked) => 
                setNotificationSettings(prev => ({ ...prev, securityAlerts: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>تنبيهات الأداء</Label>
            <Switch
              checked={notificationSettings.performanceAlerts}
              onCheckedChange={(checked) => 
                setNotificationSettings(prev => ({ ...prev, performanceAlerts: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            طرق الإشعارات
          </CardTitle>
          <CardDescription>
            اختيار وسائل استلام الإشعارات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>البريد الإلكتروني</Label>
            <Switch
              checked={notificationSettings.emailNotifications}
              onCheckedChange={(checked) => 
                setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>الرسائل النصية</Label>
            <Switch
              checked={notificationSettings.smsNotifications}
              onCheckedChange={(checked) => 
                setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>الإشعارات داخل التطبيق</Label>
            <Switch
              checked={notificationSettings.inAppNotifications}
              onCheckedChange={(checked) => 
                setNotificationSettings(prev => ({ ...prev, inAppNotifications: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}