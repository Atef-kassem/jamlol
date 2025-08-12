import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, User, Clock } from 'lucide-react';

export function BranchManagementInfo({ formData, handleInputChange }) {
  return (
    <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-warning/5 border-l-4 border-l-warning">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Users className="w-4 h-4 text-warning" />
          </div>
          المسؤولين والإدارة
        </CardTitle>
        <CardDescription>المسؤولين عن إدارة الفرع والعمليات</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="manager" className="flex items-center gap-2">
              <User className="w-3 h-3 text-primary" />
              مدير الفرع *
            </Label>
            <Input
              id="manager"
              value={formData.manager || ''}
              onChange={(e) => handleInputChange("manager", e.target.value)}
              placeholder="اسم مدير الفرع"
              className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <div>
            <Label htmlFor="supervisor" className="flex items-center gap-2">
              <User className="w-3 h-3 text-secondary-blue" />
              المشرف المساعد
            </Label>
            <Input
              id="supervisor"
              value={formData.supervisor || ''}
              onChange={(e) => handleInputChange("supervisor", e.target.value)}
              placeholder="اسم المشرف المساعد"
              className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="capacity" className="flex items-center gap-2">
              <Users className="w-3 h-3 text-success" />
              سعة الفرع (عدد السيارات)
            </Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity || ''}
              onChange={(e) => handleInputChange("capacity", parseInt(e.target.value))}
              placeholder="20"
              min="1"
              className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
            />
          </div>
          <div>
            <Label htmlFor="openingHours" className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-warning" />
              ساعات العمل
            </Label>
            <Input
              id="openingHours"
              value={formData.openingHours || ''}
              onChange={(e) => handleInputChange("openingHours", e.target.value)}
              placeholder="6:00 ص - 12:00 م"
              className="focus:ring-2 focus:ring-warning/20 transition-all duration-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}