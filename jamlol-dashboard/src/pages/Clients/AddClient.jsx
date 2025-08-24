import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clientSchema } from "../../validation/clientSchema";
import { useCreateClientMutation } from "../../redux/Slices/client";
import { useGetAllRegionsQuery } from "../../redux/Slices/region";

const AddClient = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [createClient, { isLoading: isCreating }] = useCreateClientMutation();
  const {
    data: regions,
    isLoading: isRegionsLoading,
    error: regionsError,
  } = useGetAllRegionsQuery();

  // Form state based on backend model
  const [formData, setFormData] = useState({
    name: "",
    jwal: "",
    address: "",
    region_id: null,
    active: "inactive",
  });

  // Form errors state
  const [formErrors, setFormErrors] = useState({});

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get Arabic field names for error messages
  const getFieldArabicName = (fieldName) => {
    const fieldNames = {
      name: "اسم المشتري",
      jwal: "رقم الجوال",
      address: "العنوان",
      region_id: "المنطقة",
      active: "الحالة",
    };
    return fieldNames[fieldName] || fieldName;
  };

  const validateForm = () => {
    try {
      clientSchema.validateSync(formData, { abortEarly: false });
      setFormErrors({});
      return true;
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
      return false;
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await createClient(formData).unwrap();
      console.log(res);
      toast({
        title: "تم التسجيل بنجاح",
        description: "تم تسجيل المشتري الجديد بنجاح",
        variant: "default",
      });

      // Reset form
      setFormData({
        name: "",
        jwal: "",
        address: "",
        region_id: null,
        active: "inactive",
      });
      setFormErrors({}); // Clear all errors on success
      navigate("/clients");
    } catch (error) {
      console.log("Error details:", error);

      // Handle Sequelize unique constraint errors
      if (error?.data?.error?.name === "SequelizeUniqueConstraintError") {
        if (error.data.error.errors && error.data.error.errors.length > 0) {
          const uniqueError = error.data.error.errors[0];

          // Set field-specific errors with better messages
          if (uniqueError.path === "jwal") {
            setFormErrors((prev) => ({
              ...prev,
              jwal: "رقم الجوال مستخدم بالفعل من قبل مشتري آخر، يرجى استخدام رقم آخر",
            }));
          } else if (uniqueError.path === "name") {
            setFormErrors((prev) => ({
              ...prev,
              name: "اسم المشتري مستخدم بالفعل من قبل مشتري آخر، يرجى استخدام اسم آخر",
            }));
          }

          toast({
            title: "خطأ في البيانات",
            description: `الحقل "${getFieldArabicName(
              uniqueError.path
            )}" مستخدم بالفعل، يرجى تصحيح البيانات`,
            variant: "destructive",
          });

          setIsSubmitting(false);
          return;
        }
      }

      // Handle other types of errors
      if (error?.data?.message) {
        toast({
          title: "خطأ في التسجيل",
          description: error.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطأ في التسجيل",
          description: "حدث خطأ أثناء تسجيل المشتري",
          variant: "destructive",
        });
      }
    }
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    navigate("/clients");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-foreground">
            إضافة مشتري جديد
          </h1>
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
          <CardTitle className="text-xl text-right">بيانات المشتري</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                onSubmit();
              }
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* اسم المشتري */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block">
                  اسم المشتري *
                </Label>
                <Input
                  id="name"
                  placeholder="أدخل اسم المشتري"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (formErrors.name) {
                      setFormErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  className="text-right"
                />
                {formErrors.name && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.name}
                  </div>
                )}
              </div>

              {/* رقم الجوال */}
              <div className="space-y-2">
                <Label htmlFor="jwal" className="text-right block">
                  رقم الجوال *
                </Label>
                <Input
                  id="jwal"
                  placeholder="أدخل رقم الجوال"
                  value={formData.jwal}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, jwal: e.target.value }));
                    if (formErrors.jwal) {
                      setFormErrors((prev) => ({ ...prev, jwal: undefined }));
                    }
                  }}
                  className="text-right"
                />
                {formErrors.jwal && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.jwal}
                  </div>
                )}
              </div>

              {/* المنطقة */}
              <div className="space-y-2">
                <Label className="text-right block">المنطقة *</Label>
                <Select
                  value={
                    formData.region_id ? formData.region_id.toString() : ""
                  }
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      region_id: value ? parseInt(value) : null,
                    }));
                    if (formErrors.region_id) {
                      setFormErrors((prev) => ({
                        ...prev,
                        region_id: undefined,
                      }));
                    }
                  }}
                  disabled={isRegionsLoading}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions?.map((region) => (
                      <SelectItem key={region.id} value={region.id.toString()}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.region_id && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.region_id}
                  </div>
                )}
              </div>

              {/* الحالة */}
              <div className="space-y-2">
                <Label className="text-right block">الحالة</Label>
                <Select
                  value={formData.active}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, active: value }));
                    if (formErrors.active) {
                      setFormErrors((prev) => ({ ...prev, active: undefined }));
                    }
                  }}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.active && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.active}
                  </div>
                )}
              </div>
            </div>

            {/* العنوان */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-right block">
                  العنوان (اختياري)
                </Label>
                <Textarea
                  id="address"
                  placeholder="أدخل العنوان الكامل"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }));
                    if (formErrors.address) {
                      setFormErrors((prev) => ({
                        ...prev,
                        address: undefined,
                      }));
                    }
                  }}
                  rows={3}
                  className="text-right"
                />
                {formErrors.address && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formErrors.address}
                  </div>
                )}
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-right mb-2">معلومات إضافية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="text-right">
                  <span className="font-medium">تاريخ الإنشاء:</span>{" "}
                  {new Date().toLocaleDateString("ar-EG")}
                </div>
                <div className="text-right">
                  <span className="font-medium">تاريخ آخر تعديل:</span>{" "}
                  {new Date().toLocaleDateString("ar-EG")}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
              <Button type="submit" disabled={isSubmitting || isCreating}>
                <Save className="w-4 h-4 ml-2" />
                {isSubmitting || isCreating
                  ? "جاري التسجيل..."
                  : "تسجيل المشتري"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddClient;
