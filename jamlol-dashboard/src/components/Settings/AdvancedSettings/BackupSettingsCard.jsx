import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Database, HardDrive, Cloud } from 'lucide-react';

export function BackupSettingsCard({ backupSettings, setBackupSettings }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          إعدادات النسخ الاحتياطي
        </CardTitle>
        <CardDescription>
          تكوين النسخ الاحتياطي التلقائي والإعدادات المتعلقة به
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-backup">النسخ الاحتياطي التلقائي</Label>
          <Switch
            id="auto-backup"
            checked={backupSettings.autoBackup}
            onCheckedChange={(checked) => 
              setBackupSettings(prev => ({ ...prev, autoBackup: checked }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>تكرار النسخ الاحتياطي</Label>
          <Select
            value={backupSettings.backupFrequency}
            onValueChange={(value) => 
              setBackupSettings(prev => ({ ...prev, backupFrequency: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">كل ساعة</SelectItem>
              <SelectItem value="daily">يومياً</SelectItem>
              <SelectItem value="weekly">أسبوعياً</SelectItem>
              <SelectItem value="monthly">شهرياً</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>وقت النسخ الاحتياطي</Label>
          <Input
            type="time"
            value={backupSettings.backupTime}
            onChange={(e) => 
              setBackupSettings(prev => ({ ...prev, backupTime: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>مكان التخزين</Label>
          <Select
            value={backupSettings.storageLocation}
            onValueChange={(value) => 
              setBackupSettings(prev => ({ ...prev, storageLocation: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  محلياً
                </div>
              </SelectItem>
              <SelectItem value="cloud">
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  السحابة
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>مدة الاحتفاظ (بالأيام)</Label>
          <Input
            type="number"
            value={backupSettings.retentionDays}
            onChange={(e) => 
              setBackupSettings(prev => ({ ...prev, retentionDays: parseInt(e.target.value) }))
            }
            min="1"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>تشفير النسخ الاحتياطية</Label>
          <Switch
            checked={backupSettings.encryption}
            onCheckedChange={(checked) => 
              setBackupSettings(prev => ({ ...prev, encryption: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>ضغط البيانات</Label>
          <Switch
            checked={backupSettings.compression}
            onCheckedChange={(checked) => 
              setBackupSettings(prev => ({ ...prev, compression: checked }))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}