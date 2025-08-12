import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Download, Upload, CheckCircle, XCircle } from 'lucide-react';

export function BackupOperationsCard({ isLoading, handleBackupNow, handleRestoreData }) {
  const backupHistory = [
    { date: '2024-01-15 02:00', size: '2.5 GB', status: 'مكتملة' },
    { date: '2024-01-14 02:00', size: '2.4 GB', status: 'مكتملة' },
    { date: '2024-01-13 02:00', size: '2.3 GB', status: 'فشلت' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          عمليات النسخ الاحتياطي
        </CardTitle>
        <CardDescription>
          إنشاء واستعادة النسخ الاحتياطية يدوياً
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Button 
            onClick={handleBackupNow} 
            disabled={isLoading}
            className="w-full gap-2"
          >
            <Download className="h-4 w-4" />
            إنشاء نسخة احتياطية الآن
          </Button>

          <Separator />

          <div className="space-y-2">
            <Label>استعادة من نسخة احتياطية</Label>
            <div className="flex gap-2">
              <Input placeholder="اختر ملف النسخة الاحتياطية" readOnly />
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleRestoreData}
            disabled={isLoading}
            variant="outline"
            className="w-full gap-2"
          >
            <Upload className="h-4 w-4" />
            استعادة البيانات
          </Button>
        </div>

        <Separator />

        {/* آخر النسخ الاحتياطية */}
        <div className="space-y-3">
          <h4 className="font-medium">آخر النسخ الاحتياطية</h4>
          <div className="space-y-2">
            {backupHistory.map((backup, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="text-sm">
                  <div className="font-medium">{backup.date}</div>
                  <div className="text-muted-foreground">{backup.size}</div>
                </div>
                <Badge variant={backup.status === 'مكتملة' ? 'default' : 'destructive'}>
                  {backup.status === 'مكتملة' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                  {backup.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}