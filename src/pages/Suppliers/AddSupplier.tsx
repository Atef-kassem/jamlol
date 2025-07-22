import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const addSupplierSchema = z.object({
  supplierNumber: z.string().min(1, "رقم المورد مطلوب"),
  relatedUserId: z.string().min(1, "معرف المستخدم مطلوب"),
  companyName: z.string().optional(),
  mobileNumber: z.string().min(10, "رقم الجوال يجب أن يكون 10 أرقام على الأقل"),
  address: z.string().min(1, "العنوان مطلوب"),
  phoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
  verificationStatus: z.enum(["verified", "not_verified"], {
    required_error: "حالة التحقق مطلوبة"
  }),
});

type AddSupplierForm = z.infer<typeof addSupplierSchema>;

const AddSupplier: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<AddSupplierForm>({
    resolver: zodResolver(addSupplierSchema),
    defaultValues: {
      verificationStatus: "not_verified"
    }
  });

  const verificationStatus = watch("verificationStatus");

  const onSubmit = async (data: AddSupplierForm) => {
    try {
      // إضافة تواريخ الإنشاء والتعديل
      const supplierData = {
        ...data,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      };

      console.log("Supplier data:", supplierData);
      
      // هنا يمكن إضافة API call لحفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة API call
      
      toast({
        title: "تم إضافة المورد بنجاح",
        description: `تم إنشاء المورد برقم ${data.supplierNumber}`,
      });

      reset();
      navigate("/suppliers");
    } catch (error) {
      toast({
        title: "خطأ في إضافة المورد",
        description: "حدث خطأ أثناء حفظ بيانات المورد",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    navigate("/suppliers");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-foreground">إضافة مورد جديد</h1>
          <ArrowRight className="h-6 w-6 text-primary" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 ml-2" />
            إلغاء
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-right">بيانات المورد</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* رقم المورد */}
              <div className="space-y-2">
                <Label htmlFor="supplierNumber" className="text-right block">
                  رقم المورد *
                </Label>
                <Input
                  id="supplierNumber"
                  {...register("supplierNumber")}
                  placeholder="أدخل رقم المورد"
                  className="text-right"
                />
                {errors.supplierNumber && (
                  <p className="text-sm text-destructive text-right">
                    {errors.supplierNumber.message}
                  </p>
                )}
              </div>

              {/* معرف المستخدم المرتبط */}
              <div className="space-y-2">
                <Label htmlFor="relatedUserId" className="text-right block">
                  معرف المستخدم المرتبط *
                </Label>
                <Input
                  id="relatedUserId"
                  {...register("relatedUserId")}
                  placeholder="أدخل معرف المستخدم"
                  className="text-right"
                />
                {errors.relatedUserId && (
                  <p className="text-sm text-destructive text-right">
                    {errors.relatedUserId.message}
                  </p>
                )}
              </div>

              {/* اسم المؤسسة */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-right block">
                  اسم المؤسسة (اختياري)
                </Label>
                <Input
                  id="companyName"
                  {...register("companyName")}
                  placeholder="أدخل اسم المؤسسة"
                  className="text-right"
                />
              </div>

              {/* رقم الجوال */}
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-right block">
                  رقم الجوال *
                </Label>
                <Input
                  id="mobileNumber"
                  {...register("mobileNumber")}
                  placeholder="05xxxxxxxx"
                  className="text-right"
                  dir="ltr"
                />
                {errors.mobileNumber && (
                  <p className="text-sm text-destructive text-right">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-right block">
                  رقم الهاتف *
                </Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="01xxxxxxx"
                  className="text-right"
                  dir="ltr"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive text-right">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* حالة التحقق */}
              <div className="space-y-2">
                <Label className="text-right block">
                  حالة التحقق من الهوية *
                </Label>
                <Select 
                  value={verificationStatus} 
                  onValueChange={(value) => setValue("verificationStatus", value as "verified" | "not_verified")}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر حالة التحقق" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified" className="text-right">
                      تم التحقق
                    </SelectItem>
                    <SelectItem value="not_verified" className="text-right">
                      لم يتم التحقق
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.verificationStatus && (
                  <p className="text-sm text-destructive text-right">
                    {errors.verificationStatus.message}
                  </p>
                )}
              </div>
            </div>

            {/* العنوان */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-right block">
                العنوان *
              </Label>
              <Textarea
                id="address"
                {...register("address")}
                placeholder="أدخل العنوان الكامل للمورد"
                className="text-right min-h-[100px]"
                rows={4}
              />
              {errors.address && (
                <p className="text-sm text-destructive text-right">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* معلومات إضافية */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-right mb-2">معلومات إضافية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="text-right">
                  <span className="font-medium">تاريخ الإنشاء:</span> {new Date().toLocaleDateString('ar-SA')}
                </div>
                <div className="text-right">
                  <span className="font-medium">تاريخ آخر تعديل:</span> {new Date().toLocaleDateString('ar-SA')}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                إلغاء
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    جاري الحفظ...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ المورد
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSupplier;