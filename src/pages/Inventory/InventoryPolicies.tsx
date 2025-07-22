import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Settings, 
  TrendingUp, 
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  BarChart,
  ArrowUpDown,
  Trash2,
  Eye,
  Edit,
  Bell,
  Lock,
  RefreshCw,
  Calendar,
  Zap,
  Target,
  Database,
  Activity,
  DollarSign,
  Truck,
  ClipboardCheck,
  Plus,
  Save
} from 'lucide-react';

interface StoragePolicy {
  id: string;
  itemCategory: string;
  minLevel: number;
  maxLevel: number;
  reorderPoint: number;
  unit: string;
  autoReorder: boolean;
  alertThreshold: number;
}

interface IssuePolicy {
  id: string;
  method: 'FIFO' | 'LIFO' | 'FEFO' | 'AVERAGE';
  description: string;
  requireApproval: boolean;
  approvalThreshold: number;
  approverRole: string;
}

interface InventoryPolicy {
  id: string;
  type: 'PERIODIC' | 'CONTINUOUS' | 'SURPRISE';
  frequency: string;
  responsible: string;
  tolerance: number;
  autoAdjustment: boolean;
  requireManagerApproval: boolean;
}

interface SecurityPolicy {
  id: string;
  operation: string;
  requiredRole: string;
  approvalRequired: boolean;
  documentationRequired: boolean;
  auditLog: boolean;
}

export default function InventoryPolicies() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [storagePolicies, setStoragePolicies] = useState<StoragePolicy[]>([
    {
      id: '1',
      itemCategory: 'منتجات تنظيف',
      minLevel: 50,
      maxLevel: 500,
      reorderPoint: 100,
      unit: 'قطعة',
      autoReorder: true,
      alertThreshold: 75
    },
    {
      id: '2',
      itemCategory: 'قطع غيار',
      minLevel: 10,
      maxLevel: 100,
      reorderPoint: 25,
      unit: 'قطعة',
      autoReorder: false,
      alertThreshold: 15
    }
  ]);

  const [issuePolicies, setIssuePolicies] = useState<IssuePolicy[]>([
    {
      id: '1',
      method: 'FIFO',
      description: 'الوارد أولاً يخرج أولاً - للمنتجات ذات الصلاحية',
      requireApproval: false,
      approvalThreshold: 0,
      approverRole: ''
    },
    {
      id: '2',
      method: 'FEFO',
      description: 'أول انتهاء يخرج أولاً - للمنتجات منتهية الصلاحية',
      requireApproval: true,
      approvalThreshold: 100,
      approverRole: 'مدير المخزون'
    }
  ]);

  const [inventoryPolicies, setInventoryPolicies] = useState<InventoryPolicy[]>([
    {
      id: '1',
      type: 'PERIODIC',
      frequency: 'شهرياً',
      responsible: 'فريق الجرد',
      tolerance: 2,
      autoAdjustment: false,
      requireManagerApproval: true
    },
    {
      id: '2',
      type: 'CONTINUOUS',
      frequency: 'يومياً',
      responsible: 'مشرف المخزون',
      tolerance: 1,
      autoAdjustment: true,
      requireManagerApproval: false
    }
  ]);

  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>([
    {
      id: '1',
      operation: 'إضافة صنف جديد',
      requiredRole: 'مدير المخزون',
      approvalRequired: true,
      documentationRequired: true,
      auditLog: true
    },
    {
      id: '2',
      operation: 'صرف كمية كبيرة',
      requiredRole: 'مشرف المخزون',
      approvalRequired: true,
      documentationRequired: true,
      auditLog: true
    },
    {
      id: '3',
      operation: 'تسوية الجرد',
      requiredRole: 'مدير المخزون',
      approvalRequired: true,
      documentationRequired: true,
      auditLog: true
    }
  ]);

  const handleSavePolicies = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "تم حفظ السياسات بنجاح",
        description: "تم تطبيق جميع السياسات والإجراءات على النظام",
      });
    } catch (error) {
      toast({
        title: "خطأ في حفظ السياسات",
        description: "حدث خطأ أثناء حفظ السياسات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPolicyBadgeColor = (type: string) => {
    switch (type) {
      case 'FIFO': return 'bg-green-500';
      case 'LIFO': return 'bg-blue-500';
      case 'FEFO': return 'bg-red-500';
      case 'AVERAGE': return 'bg-purple-500';
      case 'PERIODIC': return 'bg-orange-500';
      case 'CONTINUOUS': return 'bg-teal-500';
      case 'SURPRISE': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const workflows = [
    {
      title: 'إجراء إضافة صنف جديد',
      steps: [
        'تعبئة نموذج تعريف شامل للصنف',
        'تحديد التصنيف وحد الطلب ووحدة القياس',
        'إضافة الباركود والصلاحية والصورة',
        'موافقة الإدارة أو مسؤول النظام',
        'تفعيل الصنف في النظام'
      ],
      icon: Plus,
      color: 'text-green-500'
    },
    {
      title: 'إجراء الاستلام المخزني',
      steps: [
        'استلام الكميات والتحقق من الفاتورة وأمر الشراء',
        'فحص الجودة وإثبات المطابقة',
        'تسجيل الدفعة وربطها برقم التشغيلة',
        'تحديث الرصيد وطباعة الباركود',
        'إشعار الأقسام المعنية'
      ],
      icon: Package,
      color: 'text-blue-500'
    },
    {
      title: 'إجراء الصرف المخزني',
      steps: [
        'استلام طلب الصرف من القسم المستفيد',
        'مراجعة واعتماد الطلب حسب السياسة',
        'صرف حسب نظام FIFO/FEFO',
        'خصم الكمية وتوثيق الرصيد',
        'التوقيع الإلكتروني عند الاستلام'
      ],
      icon: ArrowUpDown,
      color: 'text-orange-500'
    },
    {
      title: 'إجراء التحويل بين المخازن',
      steps: [
        'إنشاء طلب تحويل وتحديد التفاصيل',
        'اعتماد التحويل إلكترونياً',
        'متابعة مرحلة النقل الفعلي',
        'تأكيد الاستلام من المخزن المستلم',
        'تحديث الأرصدة في كلا المخزنين'
      ],
      icon: Truck,
      color: 'text-purple-500'
    },
    {
      title: 'إجراء الجرد',
      steps: [
        'فتح دورة جرد جديدة',
        'توزيع قوائم الجرد على الفرق',
        'توثيق الفروقات وتحليل الأسباب',
        'اعتماد التسويات اللازمة',
        'إصدار تقرير نهائي للإدارة'
      ],
      icon: ClipboardCheck,
      color: 'text-indigo-500'
    },
    {
      title: 'إجراء التالف أو الفاقد',
      steps: [
        'تسجيل حالة التالف مع التقرير والصور',
        'اعتماد الإتلاف من الإدارة العليا',
        'تسوية الرصيد في النظام',
        'إنشاء قيد محاسبي تلقائي',
        'أرشفة المستندات'
      ],
      icon: Trash2,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">السياسات والإجراءات</h1>
          <p className="text-muted-foreground">إدارة سياسات المخزون والإجراءات التشغيلية</p>
        </div>
        <Button onClick={handleSavePolicies} disabled={isLoading} className="gap-2">
          <Save className="h-4 w-4" />
          حفظ جميع السياسات
        </Button>
      </div>

      <Tabs defaultValue="storage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="storage" className="gap-2">
            <Database className="h-4 w-4" />
            حدود التخزين
          </TabsTrigger>
          <TabsTrigger value="issue" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            سياسة الصرف
          </TabsTrigger>
          <TabsTrigger value="inventory" className="gap-2">
            <ClipboardCheck className="h-4 w-4" />
            سياسة الجرد
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            الأمان والصلاحيات
          </TabsTrigger>
          <TabsTrigger value="workflows" className="gap-2">
            <Activity className="h-4 w-4" />
            الإجراءات التشغيلية
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <BarChart className="h-4 w-4" />
            المراقبة والتحليل
          </TabsTrigger>
        </TabsList>

        {/* سياسة حدود التخزين */}
        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                إعدادات حدود التخزين وإعادة الطلب
              </CardTitle>
              <CardDescription>
                تحديد الحد الأدنى والأقصى ونقطة إعادة الطلب لكل فئة من المنتجات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {storagePolicies.map((policy, index) => (
                  <Card key={policy.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{policy.itemCategory}</CardTitle>
                        <Badge variant="outline" className="gap-1">
                          <Target className="h-3 w-3" />
                          {policy.unit}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>الحد الأدنى</Label>
                          <Input
                            type="number"
                            value={policy.minLevel}
                            onChange={(e) => {
                              const newPolicies = [...storagePolicies];
                              newPolicies[index].minLevel = parseInt(e.target.value);
                              setStoragePolicies(newPolicies);
                            }}
                            className="text-center"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الحد الأقصى</Label>
                          <Input
                            type="number"
                            value={policy.maxLevel}
                            onChange={(e) => {
                              const newPolicies = [...storagePolicies];
                              newPolicies[index].maxLevel = parseInt(e.target.value);
                              setStoragePolicies(newPolicies);
                            }}
                            className="text-center"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>نقطة إعادة الطلب</Label>
                          <Input
                            type="number"
                            value={policy.reorderPoint}
                            onChange={(e) => {
                              const newPolicies = [...storagePolicies];
                              newPolicies[index].reorderPoint = parseInt(e.target.value);
                              setStoragePolicies(newPolicies);
                            }}
                            className="text-center"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>حد التنبيه</Label>
                          <Input
                            type="number"
                            value={policy.alertThreshold}
                            onChange={(e) => {
                              const newPolicies = [...storagePolicies];
                              newPolicies[index].alertThreshold = parseInt(e.target.value);
                              setStoragePolicies(newPolicies);
                            }}
                            className="text-center"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={policy.autoReorder}
                            onCheckedChange={(checked) => {
                              const newPolicies = [...storagePolicies];
                              newPolicies[index].autoReorder = checked;
                              setStoragePolicies(newPolicies);
                            }}
                          />
                          <Label>الطلب التلقائي</Label>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button className="w-full gap-2" variant="outline">
                  <Plus className="h-4 w-4" />
                  إضافة سياسة تخزين جديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* سياسة الصرف */}
        <TabsContent value="issue" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  طرق الصرف المعتمدة
                </CardTitle>
                <CardDescription>
                  تحديد طريقة صرف الأصناف وقواعد الموافقة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {issuePolicies.map((policy, index) => (
                  <Card key={policy.id} className="border">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge className={`${getPolicyBadgeColor(policy.method)} text-white`}>
                            {policy.method}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {policy.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>يتطلب موافقة</Label>
                            <Switch
                              checked={policy.requireApproval}
                              onCheckedChange={(checked) => {
                                const newPolicies = [...issuePolicies];
                                newPolicies[index].requireApproval = checked;
                                setIssuePolicies(newPolicies);
                              }}
                            />
                          </div>
                          
                          {policy.requireApproval && (
                            <>
                              <div className="space-y-2">
                                <Label>حد الموافقة (الكمية)</Label>
                                <Input
                                  type="number"
                                  value={policy.approvalThreshold}
                                  onChange={(e) => {
                                    const newPolicies = [...issuePolicies];
                                    newPolicies[index].approvalThreshold = parseInt(e.target.value);
                                    setIssuePolicies(newPolicies);
                                  }}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label>دور المعتمد</Label>
                                <Select 
                                  value={policy.approverRole}
                                  onValueChange={(value) => {
                                    const newPolicies = [...issuePolicies];
                                    newPolicies[index].approverRole = value;
                                    setIssuePolicies(newPolicies);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر دور المعتمد" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="مدير المخزون">مدير المخزون</SelectItem>
                                    <SelectItem value="مشرف المخزون">مشرف المخزون</SelectItem>
                                    <SelectItem value="المدير المالي">المدير المالي</SelectItem>
                                    <SelectItem value="مدير العمليات">مدير العمليات</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  إعدادات الصلاحية والانتهاء
                </CardTitle>
                <CardDescription>
                  إدارة المنتجات ذات الصلاحية المحددة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>تفعيل تنبيهات الصلاحية</Label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>تنبيه قبل انتهاء الصلاحية (بالأيام)</Label>
                    <Input type="number" defaultValue={30} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>إجراء المنتجات منتهية الصلاحية</Label>
                    <Select defaultValue="isolate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="isolate">عزل تلقائي</SelectItem>
                        <SelectItem value="alert">تنبيه فقط</SelectItem>
                        <SelectItem value="auto-issue">صرف تلقائي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>إلزام باستخدام الباركود</Label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>تتبع رقم الدفعة</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* سياسة الجرد */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                سياسات الجرد والتسوية
              </CardTitle>
              <CardDescription>
                تحديد أنواع الجرد وإجراءات التسوية المعتمدة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {inventoryPolicies.map((policy, index) => (
                  <Card key={policy.id} className={`border-l-4 ${
                    policy.type === 'PERIODIC' ? 'border-l-orange-500' :
                    policy.type === 'CONTINUOUS' ? 'border-l-teal-500' : 'border-l-yellow-500'
                  }`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getPolicyBadgeColor(policy.type)} text-white`}>
                            {policy.type === 'PERIODIC' ? 'دوري' : 
                             policy.type === 'CONTINUOUS' ? 'مستمر' : 'مفاجئ'}
                          </Badge>
                          <span className="font-medium">{policy.frequency}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>المسؤول</Label>
                          <Input value={policy.responsible} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>نسبة التسامح (%)</Label>
                          <Input
                            type="number"
                            value={policy.tolerance}
                            onChange={(e) => {
                              const newPolicies = [...inventoryPolicies];
                              newPolicies[index].tolerance = parseInt(e.target.value);
                              setInventoryPolicies(newPolicies);
                            }}
                            step="0.1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>التكرار</Label>
                          <Select 
                            value={policy.frequency}
                            onValueChange={(value) => {
                              const newPolicies = [...inventoryPolicies];
                              newPolicies[index].frequency = value;
                              setInventoryPolicies(newPolicies);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="يومياً">يومياً</SelectItem>
                              <SelectItem value="أسبوعياً">أسبوعياً</SelectItem>
                              <SelectItem value="شهرياً">شهرياً</SelectItem>
                              <SelectItem value="ربع سنوي">ربع سنوي</SelectItem>
                              <SelectItem value="سنوياً">سنوياً</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={policy.autoAdjustment}
                              onCheckedChange={(checked) => {
                                const newPolicies = [...inventoryPolicies];
                                newPolicies[index].autoAdjustment = checked;
                                setInventoryPolicies(newPolicies);
                              }}
                            />
                            <Label>التسوية التلقائية</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={policy.requireManagerApproval}
                              onCheckedChange={(checked) => {
                                const newPolicies = [...inventoryPolicies];
                                newPolicies[index].requireManagerApproval = checked;
                                setInventoryPolicies(newPolicies);
                              }}
                            />
                            <Label>موافقة المدير</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button className="w-full gap-2" variant="outline">
                  <Plus className="h-4 w-4" />
                  إضافة سياسة جرد جديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الأمان والصلاحيات */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                سياسات الأمان والصلاحيات
              </CardTitle>
              <CardDescription>
                تحديد الصلاحيات المطلوبة لكل عملية ومستوى التوثيق
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityPolicies.map((policy, index) => (
                  <Card key={policy.id} className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">{policy.operation}</h4>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>الدور المطلوب</Label>
                          <Select 
                            value={policy.requiredRole}
                            onValueChange={(value) => {
                              const newPolicies = [...securityPolicies];
                              newPolicies[index].requiredRole = value;
                              setSecurityPolicies(newPolicies);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="مدير المخزون">مدير المخزون</SelectItem>
                              <SelectItem value="مشرف المخزون">مشرف المخزون</SelectItem>
                              <SelectItem value="موظف المخزون">موظف المخزون</SelectItem>
                              <SelectItem value="المدير المالي">المدير المالي</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>يتطلب موافقة</Label>
                            <Switch
                              checked={policy.approvalRequired}
                              onCheckedChange={(checked) => {
                                const newPolicies = [...securityPolicies];
                                newPolicies[index].approvalRequired = checked;
                                setSecurityPolicies(newPolicies);
                              }}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label>توثيق مطلوب</Label>
                            <Switch
                              checked={policy.documentationRequired}
                              onCheckedChange={(checked) => {
                                const newPolicies = [...securityPolicies];
                                newPolicies[index].documentationRequired = checked;
                                setSecurityPolicies(newPolicies);
                              }}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label>سجل المراجعة</Label>
                            <Switch
                              checked={policy.auditLog}
                              onCheckedChange={(checked) => {
                                const newPolicies = [...securityPolicies];
                                newPolicies[index].auditLog = checked;
                                setSecurityPolicies(newPolicies);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button className="w-full gap-2" variant="outline">
                  <Plus className="h-4 w-4" />
                  إضافة سياسة أمان جديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الإجراءات التشغيلية */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  الإجراءات التشغيلية (Workflows)
                </CardTitle>
                <CardDescription>
                  خطوات العمل المترجمة من السياسات إلى إجراءات قابلة للتنفيذ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {workflows.map((workflow, index) => (
                    <Card key={index} className="border-l-4" style={{borderLeftColor: workflow.color.replace('text-', '')}}>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-background border`}>
                            <workflow.icon className={`h-5 w-5 ${workflow.color}`} />
                          </div>
                          {workflow.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {workflow.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start gap-3">
                              <div className={`w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0 mt-0.5`}>
                                {stepIndex + 1}
                              </div>
                              <p className="text-sm text-muted-foreground">{step}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            عرض التفاصيل
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Edit className="h-4 w-4" />
                            تعديل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* المراقبة والتحليل */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  مراقبة الالتزام بالسياسات
                </CardTitle>
                <CardDescription>
                  تتبع مدى الالتزام بالسياسات والإجراءات المحددة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">التزام سياسة الصرف</span>
                    <Badge variant="default" className="bg-green-500">98%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">دقة الجرد</span>
                    <Badge variant="default" className="bg-blue-500">95%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">التزام حدود التخزين</span>
                    <Badge variant="default" className="bg-orange-500">87%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">توثيق العمليات</span>
                    <Badge variant="default" className="bg-purple-500">92%</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium">التنبيهات النشطة</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span>5 أصناف تحت الحد الأدنى</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span>3 منتجات قاربت انتهاء الصلاحية</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>تم إكمال الجرد الشهري</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  إعدادات الإشعارات والتنبيهات
                </CardTitle>
                <CardDescription>
                  تخصيص الإشعارات الآلية للسياسات والإجراءات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>تنبيه الحد الأدنى</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>تنبيه انتهاء الصلاحية</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>تنبيه طلبات الموافقة</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>تنبيه فروقات الجرد</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>تنبيه العمليات الاستثنائية</Label>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>طرق الإشعار</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">البريد الإلكتروني</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">إشعارات داخل النظام</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">الرسائل النصية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">إشعارات الجوال</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                تقارير السياسات والالتزام
              </CardTitle>
              <CardDescription>
                تقارير دورية لمراقبة الالتزام بالسياسات وتحليل الأداء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  تقرير الالتزام الشهري
                </Button>
                <Button variant="outline" className="gap-2">
                  <BarChart className="h-4 w-4" />
                  تحليل فعالية السياسات
                </Button>
                <Button variant="outline" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  تقرير المخالفات والانحرافات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}