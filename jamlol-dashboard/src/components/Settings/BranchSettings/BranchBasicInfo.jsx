import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building } from 'lucide-react';

export function BranchBasicInfo({ formData, handleInputChange, editingBranch }) {
  return (
    <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Building className="w-4 h-4 text-primary" />
          </div>
          {editingBranch ? `تعديل بيانات: ${editingBranch.name}` : "إضافة فرع جديد"}
        </CardTitle>
        <CardDescription>المعلومات الأساسية والهوية البصرية للفرع</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building className="w-3 h-3 text-primary" />
              اسم الفرع (عربي) *
            </Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="أدخل اسم الفرع بالعربية"
              className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          
          <div>
            <Label htmlFor="nameEn" className="flex items-center gap-2">
              <Building className="w-3 h-3 text-secondary-blue" />
              اسم الفرع (إنجليزي)
            </Label>
            <Input
              id="nameEn"
              value={formData.nameEn || ''}
              onChange={(e) => handleInputChange("nameEn", e.target.value)}
              placeholder="Enter branch name in English"
              className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
            />
          </div>
          
          <div>
            <Label htmlFor="code" className="flex items-center gap-2">
              <Building className="w-3 h-3 text-success" />
              رمز الفرع *
            </Label>
            <Input
              id="code"
              value={formData.code || ''}
              onChange={(e) => handleInputChange("code", e.target.value)}
              placeholder="BRANCH-001"
              className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description" className="flex items-center gap-2">
            <Building className="w-3 h-3 text-warning" />
            وصف الفرع
          </Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="وصف مختصر عن الفرع وموقعه ونشاطه"
            rows={3}
            className="focus:ring-2 focus:ring-warning/20 transition-all duration-200"
          />
        </div>
      </CardContent>
    </Card>
  );
}