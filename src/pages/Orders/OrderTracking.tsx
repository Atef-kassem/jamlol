import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  Mail,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  location: string;
  completed: boolean;
  active: boolean;
}

interface OrderTracking {
  id: string;
  orderNumber: string;
  status: string;
  progress: number;
  estimatedDelivery: string;
  currentLocation: string;
  recipient: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  carrier: {
    name: string;
    phone: string;
    vehicleNumber: string;
  };
  steps: TrackingStep[];
}

const OrderTracking = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [trackingData, setTrackingData] = useState<OrderTracking | null>(null);

  // بيانات تجريبية
  const mockTrackingData: OrderTracking = {
    id: "ORD-2024-001",
    orderNumber: "ORD-2024-001",
    status: "في الطريق",
    progress: 75,
    estimatedDelivery: "2024-07-21 14:00",
    currentLocation: "الرياض - طريق الملك فهد",
    recipient: {
      name: "محمد أحمد العلي",
      phone: "+966 50 123 4567",
      email: "mohamed.ali@email.com",
      address: "الرياض، حي الملز، شارع التحلية، مبنى 123"
    },
    carrier: {
      name: "أحمد سالم",
      phone: "+966 55 987 6543",
      vehicleNumber: "ABC-1234"
    },
    steps: [
      {
        id: "1",
        title: "تم تأكيد الطلب",
        description: "تم استلام وتأكيد الطلب بنجاح",
        timestamp: "2024-07-20 09:00",
        location: "مستودع الرياض",
        completed: true,
        active: false
      },
      {
        id: "2",
        title: "تم التعبئة والتغليف",
        description: "تم تحضير البضاعة وتعبئتها",
        timestamp: "2024-07-20 10:30",
        location: "مستودع الرياض",
        completed: true,
        active: false
      },
      {
        id: "3",
        title: "خرج للتوصيل",
        description: "تم تحميل البضاعة في المركبة",
        timestamp: "2024-07-20 11:00",
        location: "مستودع الرياض",
        completed: true,
        active: false
      },
      {
        id: "4",
        title: "في الطريق",
        description: "المركبة في الطريق إلى العنوان",
        timestamp: "2024-07-20 11:30",
        location: "الرياض - طريق الملك فهد",
        completed: false,
        active: true
      },
      {
        id: "5",
        title: "تم التسليم",
        description: "تم تسليم البضاعة بنجاح",
        timestamp: "",
        location: "عنوان العميل",
        completed: false,
        active: false
      }
    ]
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setTrackingData(mockTrackingData);
      toast({
        title: "تم العثور على الطلب",
        description: `رقم الطلب: ${searchQuery}`
      });
    } else {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الطلب للبحث",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "تم التسليم": return "bg-green-500";
      case "في الطريق": return "bg-blue-500";
      case "قيد التحضير": return "bg-yellow-500";
      case "ملغى": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Package className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">تتبع الطلبات</h1>
          <p className="text-muted-foreground">تتبع حالة وموقع طلباتك</p>
        </div>
      </div>

      {/* شريط البحث */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            البحث عن طلب
          </CardTitle>
          <CardDescription>
            أدخل رقم الطلب أو رقم التتبع للعثور على الطلب
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="ORD-2024-001"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              بحث
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* نتائج التتبع */}
      {trackingData && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* معلومات الطلب */}
          <div className="lg:col-span-2 space-y-6">
            {/* حالة الطلب */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    طلب رقم: {trackingData.orderNumber}
                  </CardTitle>
                  <Badge className={`${getStatusColor(trackingData.status)} text-white`}>
                    {trackingData.status}
                  </Badge>
                </div>
                <CardDescription>
                  الموقع الحالي: {trackingData.currentLocation}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>تقدم التوصيل</span>
                      <span>{trackingData.progress}%</span>
                    </div>
                    <Progress value={trackingData.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">موعد التسليم المتوقع</p>
                        <p className="text-muted-foreground">{trackingData.estimatedDelivery}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">المركبة</p>
                        <p className="text-muted-foreground">{trackingData.carrier.vehicleNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* تاريخ التتبع */}
            <Card>
              <CardHeader>
                <CardTitle>تاريخ التتبع</CardTitle>
                <CardDescription>
                  تفاصيل رحلة الطلب من البداية حتى التسليم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.steps.map((step, index) => (
                    <div key={step.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : step.active 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-200'
                        }`}>
                          {step.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : step.active ? (
                            <AlertCircle className="h-4 w-4" />
                          ) : (
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          )}
                        </div>
                        {index < trackingData.steps.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium ${
                            step.active ? 'text-blue-600' : ''
                          }`}>
                            {step.title}
                          </h4>
                          {step.timestamp && (
                            <span className="text-sm text-muted-foreground">
                              {step.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {step.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* معلومات إضافية */}
          <div className="space-y-6">
            {/* معلومات المستلم */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات المستلم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{trackingData.recipient.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Phone className="h-3 w-3" />
                    {trackingData.recipient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {trackingData.recipient.email}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="font-medium text-sm mb-1">العنوان</p>
                  <p className="text-sm text-muted-foreground">
                    {trackingData.recipient.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* معلومات السائق */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات السائق</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{trackingData.carrier.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {trackingData.carrier.phone}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="font-medium text-sm mb-1">رقم المركبة</p>
                  <p className="text-sm text-muted-foreground">
                    {trackingData.carrier.vehicleNumber}
                  </p>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض على الخريطة
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;