import * as yup from "yup";

export const naqelSchema = yup.object({
  name: yup
    .string()
    .min(2, "يجب أن يكون الاسم على الأقل حرفين")
    .required("الاسم مطلوب (يجب أن يكون فريداً)"),
  
  naqlen_type: yup
    .string()
    .oneOf(["person", "company"], "يجب أن يكون النوع إما 'فرد' أو 'شركة'")
    .required("نوع الناقل مطلوب"),
  
  identification_number: yup
    .string()
    .required("رقم الهوية مطلوب (يجب أن يكون فريداً)"),
  
  jwal: yup
    .string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\d{7,15}$/,
      "يجب أن يكون رقم الهاتف بين 7-15 رقم ويمكن أن يتضمن رمز الدولة"
    )
    .min(7, "يجب أن يكون رقم الهاتف على الأقل 7 أرقام")
    .max(15, "لا يمكن أن يتجاوز رقم الهاتف 15 رقم")
    .required("رقم الهاتف مطلوب (يجب أن يكون فريداً)"),
  
  address: yup
    .string()
    .min(5, "يجب أن يكون العنوان على الأقل 5 أحرف")
    .required("العنوان مطلوب"),
  
  active: yup
    .string()
    .oneOf(["active", "inactive"], "يجب أن تكون الحالة إما 'نشط' أو 'غير نشط'")
    .optional(),
  
  regions: yup
    .array()
    .of(yup.number().integer("يجب أن يكون معرف المنطقة رقماً صحيحاً"))
    .min(1, "يجب اختيار منطقة واحدة على الأقل")
    .required("المناطق مطلوبة"),
});

export default naqelSchema;