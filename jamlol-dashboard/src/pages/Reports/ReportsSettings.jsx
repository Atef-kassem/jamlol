import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, FileText, Bell, Mail, Database, Download, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportsSettings = () => {
  const [settings, setSettings] = useState({
    general: {
      defaultFormat: "pdf",
      autoSave: true,
      compressionEnabled: true,
      watermarkEnabled: false,
      watermarkText: "سري",
      maxFileSize: "50"
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true,
      reportReady: true,
      reportFailed: true,
      weeklyDigest: false,
      monthlyDigest: true
    },
    email: {
      smtpServer: "smtp.company.com",
      smtpPort: "587",
      username: "reports@company.com",
      fromName: "نظام التقارير",
      signature: "مع تحيات فريق إدارة التقارير"
    },
    storage: {
      retention: "365",
      autoCleanup: true,
      backupEnabled: true,
      cloudStorage: "enabled"
    }
  });

  const { toast } = useToast();

  const reportFormats = [
    { value: "pdf", label: "PDF" },
    { value: "excel", label: "Excel" },
    { value: "csv", label: "CSV" },
    { value: "json", label: "JSON" }
  ];

  const templates = [
    {
      id: 1,
      name: "قالب التقارير الأساسي",
      type: "عام",
      description: "قالب أساسي لجميع أنواع التقارير",
      status: "نشط"
    },
    {
      id: 2,
      name: "قالب التقارير المالية",
      type: "مالي",
      description: "قالب مخصص للتقارير المالية والمحاسبية",
      status: "نشط"
    },
    {
      id: 3,
      name: "قالب تقارير المبيعات",
      type: "مبيعات",
      description: "قالب مصمم خصيصاً لتقارير المبيعات",
      status: "معطل"
    }
  ];

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const saveSettings = () => {
    console.log("حفظ الإعدادات:", settings);
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات التقارير بنجاح",
    });
  };

  const testEmailSettings = () => {
    console.log("اختبار إعدادات البريد الإلكتروني");
    toast({
      title: "جاري الاختبار",
      description: "جاري إرسال رسالة تجريبية لاختبار الإعدادات",
    });
  };

  const cleanupOldReports = () => {
    console.log("تنظيف التقارير القديمة");
    toast({
      title: "تم بدء عملية التنظيف",
      description: "جاري حذف التقارير القديمة التي تجاوزت فترة الاحتفاظ",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إعدادات التقارير</h1>
          <p className="text-muted-foreground mt-2">
            تخصيص وإدارة إعدادات نظام التقارير
          </p>
        </div>
        <Button onClick={saveSettings}>
          <Settings className="h-4 w-4 ml-2" />
          حفظ الإعدادات
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="email">البريد الإلكتروني</TabsTrigger>
          <TabsTrigger value="storage">التخزين</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  إعدادات التقارير العامة
                </CardTitle>
                <CardDescription>
                  الإعدادات الأساسية لإنتاج التقارير
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="defaultFormat">التنسيق الافتراضي</Label>
                  <Select
                    value={settings.general.defaultFormat}
                    onValueChange={(value) => updateSetting('general', 'defaultFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxFileSize">الحد الأقصى لحجم الملف (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.general.maxFileSize}
                    onChange={(e) => updateSetting('general', 'maxFileSize', e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoSave">حفظ تلقائي</Label>
                  <Switch
                    id="autoSave"
                    checked={settings.general.autoSave}
                    onCheckedChange={(checked) => updateSetting('general', 'autoSave', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compression">ضغط الملفات</Label>
                  <Switch
                    id="compression"
                    checked={settings.general.compressionEnabled}
                    onCheckedChange={(checked) => updateSetting('general', 'compressionEnabled', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  العلامة المائية
                </CardTitle>
                <CardDescription>
                  إعدادات العلامة المائية للتقارير
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="watermark">تفعيل العلامة المائية</Label>
                  <Switch
                    id="watermark"
                    checked={settings.general.watermarkEnabled}
                    onCheckedChange={(checked) => updateSetting('general', 'watermarkEnabled', checked)}
                  />
                </div>
                {settings.general.watermarkEnabled && (
                  <div className="grid gap-2">
                    <Label htmlFor="watermarkText">نص العلامة المائية</Label>
                    <Input
                      id="watermarkText"
                      value={settings.general.watermarkText}
                      onChange={(e) => updateSetting('general', 'watermarkText', e.target.value)}
                      placeholder="نص العلامة المائية"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                إعدادات الإشعارات
              </CardTitle>
              <CardDescription>
                تخصيص إشعارات التقارير ووسائل التنبيه
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">وسائل الإشعار</h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">إشعارات البريد الإلكتروني</Label>
                    <Switch
                      id="emailNotifications"
                      checked={settings.notifications.emailEnabled}
                      onCheckedChange={(checked) => updateSetting('notifications', 'emailEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications">إشعارات الرسائل النصية</Label>
                    <Switch
                      id="smsNotifications"
                      checked={settings.notifications.smsEnabled}
                      onCheckedChange={(checked) => updateSetting('notifications', 'smsEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">الإشعارات الفورية</Label>
                    <Switch
                      id="pushNotifications"
                      checked={settings.notifications.pushEnabled}
                      onCheckedChange={(checked) => updateSetting('notifications', 'pushEnabled', checked)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">أنواع الإشعارات</h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reportReady">التقرير جاهز</Label>
                    <Switch
                      id="reportReady"
                      checked={settings.notifications.reportReady}
                      onCheckedChange={(checked) => updateSetting('notifications', 'reportReady', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reportFailed">فشل في إنتاج التقرير</Label>
                    <Switch
                      id="reportFailed"
                      checked={settings.notifications.reportFailed}
                      onCheckedChange={(checked) => updateSetting('notifications', 'reportFailed', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weeklyDigest">ملخص أسبوعي</Label>
                    <Switch
                      id="weeklyDigest"
                      checked={settings.notifications.weeklyDigest}
                      onCheckedChange={(checked) => updateSetting('notifications', 'weeklyDigest', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monthlyDigest">ملخص شهري</Label>
                    <Switch
                      id="monthlyDigest"
                      checked={settings.notifications.monthlyDigest}
                      onCheckedChange={(checked) => updateSetting('notifications', 'monthlyDigest', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                إعدادات البريد الإلكتروني
              </CardTitle>
              <CardDescription>
                تكوين خادم البريد الإلكتروني لإرسال التقارير
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="smtpServer">خادم SMTP</Label>
                  <Input
                    id="smtpServer"
                    value={settings.email.smtpServer}
                    onChange={(e) => updateSetting('email', 'smtpServer', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="smtpPort">منفذ SMTP</Label>
                  <Input
                    id="smtpPort"
                    value={settings.email.smtpPort}
                    onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <Input
                    id="username"
                    value={settings.email.username}
                    onChange={(e) => updateSetting('email', 'username', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fromName">اسم المرسل</Label>
                  <Input
                    id="fromName"
                    value={settings.email.fromName}
                    onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signature">التوقيع</Label>
                <Textarea
                  id="signature"
                  rows={3}
                  value={settings.email.signature}
                  onChange={(e) => updateSetting('email', 'signature', e.target.value)}
                />
              </div>
              <Button onClick={testEmailSettings} variant="outline">
                اختبار إعدادات البريد
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                إعدادات التخزين
              </CardTitle>
              <CardDescription>
                إدارة تخزين التقارير والنسخ الاحتياطية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="retention">فترة الاحتفاظ (أيام)</Label>
                  <Input
                    id="retention"
                    type="number"
                    value={settings.storage.retention}
                    onChange={(e) => updateSetting('storage', 'retention', e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoCleanup">تنظيف تلقائي</Label>
                  <Switch
                    id="autoCleanup"
                    checked={settings.storage.autoCleanup}
                    onCheckedChange={(checked) => updateSetting('storage', 'autoCleanup', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="backup">نسخ احتياطي</Label>
                  <Switch
                    id="backup"
                    checked={settings.storage.backupEnabled}
                    onCheckedChange={(checked) => updateSetting('storage', 'backupEnabled', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cloud">التخزين السحابي</Label>
                  <Switch
                    id="cloud"
                    checked={settings.storage.cloudStorage === "enabled"}
                    onCheckedChange={(checked) => updateSetting('storage', 'cloudStorage', checked ? "enabled" : "disabled")}
                  />
                </div>
              </div>
              <Button onClick={cleanupOldReports} variant="outline">
                تنظيف التقارير القديمة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قوالب التقارير</CardTitle>
              <CardDescription>
                إدارة قوالب التصميم للتقارير المختلفة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{template.type}</Badge>
                        <Badge variant={template.status === "نشط" ? "default" : "secondary"}>
                          {template.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        تعديل
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsSettings;