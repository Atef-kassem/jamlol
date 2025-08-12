import * as Yup from "yup";

const appInfoSchema = Yup.object().shape({
  app_name: Yup.string()
    .min(5, "يجب أن يكون اسم التطبيق على الأقل 5 أحرف")
    .max(50, "يجب ألا يزيد اسم التطبيق عن 50 حرفًا")
    .required("اسم التطبيق مطلوب"),
  
  app_email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  
  app_phone: Yup.string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\d{7,15}$/,
      "رقم الهاتف غير صحيح (يجب أن يحتوي على 7-15 رقمًا، ويمكن أن يبدأ برمز الدولة)"
    )
    .min(7, "رقم الهاتف قصير جدًا (يجب أن يكون 7 أرقام على الأقل)")
    .max(15, "رقم الهاتف طويل جدًا (يجب ألا يتجاوز 15 رقمًا)")
    .required("رقم الهاتف مطلوب"),
  
  app_address: Yup.string().nullable(),
  app_description: Yup.string().nullable(),
  app_logo: Yup.mixed().nullable(), // Changed to mixed to support File objects
  app_footer_text: Yup.string().nullable(),
  app_primary_color: Yup.string().nullable(),
  
  maintenance_mode: Yup.string()
    .oneOf(["enabled", "disabled"], "القيمة يجب أن تكون enabled أو disabled")
    .required("حالة الصيانة مطلوبة"),
  
  currency: Yup.string().nullable(),
  app_website: Yup.string().url("رابط الموقع غير صحيح").nullable(),
  app_facebook: Yup.string().url("رابط فيسبوك غير صحيح").nullable(),
  app_twitter: Yup.string().url("رابط تويتر غير صحيح").nullable(),
  app_instagram: Yup.string().url("رابط انستجرام غير صحيح").nullable(),
  app_snapchat: Yup.string().url("رابط سناب شات غير صحيح").nullable(),
  app_whatsapp: Yup.string().nullable(),
});

export default appInfoSchema;