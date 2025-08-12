import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Shield, Lock, Timer, AlertTriangle } from 'lucide-react';

export function SecurityPoliciesCard({ securityPolicies, setSecurityPolicies }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            سياسات كلمات المرور
          </CardTitle>
          <CardDescription>
            إعدادات الأمان لكلمات المرور
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>الحد الأدنى لطول كلمة المرور</Label>
            <Input
              type="number"
              value={securityPolicies.passwordMinLength}
              onChange={(e) => 
                setSecurityPolicies(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))
              }
              min="4"
              max="32"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>تعقيد كلمة المرور</Label>
              <p className="text-sm text-muted-foreground">أحرف كبيرة وصغيرة وأرقام ورموز</p>
            </div>
            <Switch
              checked={securityPolicies.passwordComplexity}
              onCheckedChange={(checked) => 
                setSecurityPolicies(prev => ({ ...prev, passwordComplexity: checked }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>انتهاء صلاحية كلمة المرور (أيام)</Label>
            <Input
              type="number"
              value={securityPolicies.passwordExpiry}
              onChange={(e) => 
                setSecurityPolicies(prev => ({ ...prev, passwordExpiry: parseInt(e.target.value) }))
              }
              min="0"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            سياسات الجلسات والدخول
          </CardTitle>
          <CardDescription>
            إعدادات الأمان للجلسات ومحاولات الدخول
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>مهلة انتهاء الجلسة (دقائق)</Label>
            <Input
              type="number"
              value={securityPolicies.sessionTimeout}
              onChange={(e) => 
                setSecurityPolicies(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))
              }
              min="5"
            />
          </div>

          <div className="space-y-2">
            <Label>الحد الأقصى لمحاولات الدخول</Label>
            <Input
              type="number"
              value={securityPolicies.maxLoginAttempts}
              onChange={(e) => 
                setSecurityPolicies(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))
              }
              min="1"
              max="10"
            />
          </div>

          <div className="space-y-2">
            <Label>مدة القفل بعد فشل الدخول (دقائق)</Label>
            <Input
              type="number"
              value={securityPolicies.lockoutDuration}
              onChange={(e) => 
                setSecurityPolicies(prev => ({ ...prev, lockoutDuration: parseInt(e.target.value) }))
              }
              min="1"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>المصادقة الثنائية</Label>
            <Switch
              checked={securityPolicies.twoFactorAuth}
              onCheckedChange={(checked) => 
                setSecurityPolicies(prev => ({ ...prev, twoFactorAuth: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>القائمة البيضاء للـ IP</Label>
            <Switch
              checked={securityPolicies.ipWhitelist}
              onCheckedChange={(checked) => 
                setSecurityPolicies(prev => ({ ...prev, ipWhitelist: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}