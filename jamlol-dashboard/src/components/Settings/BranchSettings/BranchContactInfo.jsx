import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Mail, Globe } from 'lucide-react';

export function BranchContactInfo({ formData, handleInputChange }) {
  return (
    <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary-blue/5 border-l-4 border-l-secondary-blue">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Phone className="w-4 h-4 text-secondary-blue" />
          </div>
          معلومات الاتصال
        </CardTitle>
        <CardDescription>طرق التواصل مع الفرع</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-primary" />
              الهاتف *
            </Label>
            <Input
              id="phone"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+966xxxxxxxxx"
              className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <div>
            <Label htmlFor="mobile" className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-secondary-blue" />
              الجوال
            </Label>
            <Input
              id="mobile"
              value={formData.mobile || ''}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              placeholder="+966xxxxxxxxx"
              className="focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-success" />
            البريد الإلكتروني *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="branch@company.com"
            className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
          />
        </div>

        <div>
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-warning" />
            الموقع الإلكتروني
          </Label>
          <Input
            id="website"
            value={formData.website || ''}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="www.company.com"
            className="focus:ring-2 focus:ring-warning/20 transition-all duration-200"
          />
        </div>
      </CardContent>
    </Card>
  );
}