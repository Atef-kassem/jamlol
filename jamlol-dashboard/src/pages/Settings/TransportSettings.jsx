import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTransport } from "@/contexts/TransportContext";
import { useToast } from "@/hooks/use-toast";
import { Truck, Plus, Trash2, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const TransportSettings = () => {
  const { toast } = useToast();
  const {
    transportMethods,
    addTransportMethod,
    deleteTransportMethod,
    updateTransportMethod,
  } = useTransport();

  const [newTransportMethod, setNewTransportMethod] = useState({
    name: "",
    capacity: "",
    status: "نشط",
  });

  const handleAddTransportMethod = () => {
    if (newTransportMethod.name.trim() && newTransportMethod.capacity.trim()) {
      addTransportMethod(newTransportMethod);
      setNewTransportMethod({ name: "", capacity: "", status: "نشط" });
      toast({
        title: "تم الإضافة بنجاح",
        description: "تم إضافة وسيلة النقل الجديدة",
      });
    }
  };

  const handleDeleteTransportMethod = (id) => {
    deleteTransportMethod(id);
    toast({
      title: "تم الحذف",
      description: "تم حذف وسيلة النقل بنجاح",
    });
  };

  const toggleMethodStatus = (id) => {
    const method = transportMethods.find((m) => m.id === id);
    if (method) {
      updateTransportMethod(id, {
        status: method.status === "نشط" ? "غير نشط" : "نشط",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            إعدادات وسائل النقل
          </h1>
          <p className="text-lg text-muted-foreground">
            إدارة أنواع وسائل النقل المتاحة في المنصة
          </p>
        </div>
      </div>

      <Separator />

      {/* إضافة وسيلة نقل جديدة */}
      <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            إضافة وسيلة نقل جديدة
          </CardTitle>
          <CardDescription>
            أضف نوع جديد من وسائل النقل لتكون متاحة للناقلين
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">اسم وسيلة النقل</label>
              <Input
                placeholder="مثال: شاحنة صغيرة"
                value={newTransportMethod.name}
                onChange={(e) =>
                  setNewTransportMethod({
                    ...newTransportMethod,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">سعة الحمولة</label>
              <Input
                placeholder="مثال: 1-3 طن"
                value={newTransportMethod.capacity}
                onChange={(e) =>
                  setNewTransportMethod({
                    ...newTransportMethod,
                    capacity: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium invisible">إضافة</label>
              <Button
                onClick={handleAddTransportMethod}
                className="w-full"
                disabled={
                  !newTransportMethod.name.trim() ||
                  !newTransportMethod.capacity.trim()
                }
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة وسيلة النقل
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة وسائل النقل الحالية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            وسائل النقل المتاحة ({transportMethods.length})
          </CardTitle>
          <CardDescription>
            إدارة وتعديل وسائل النقل الموجودة في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {transportMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {method.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      سعة الحمولة: {method.capacity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={method.status === "نشط" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => toggleMethodStatus(method.id)}
                  >
                    {method.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTransportMethod(method.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {transportMethods.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">لا توجد وسائل نقل مضافة بعد</p>
              <p className="text-sm">ابدأ بإضافة وسيلة النقل الأولى</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportSettings;
