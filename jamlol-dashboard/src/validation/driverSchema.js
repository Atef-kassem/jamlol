import * as yup from "yup";

export const driverSchema = yup.object({
  driver_name: yup
    .string()
    .min(2, "يجب أن يكون اسم السائق على الأقل حرفين")
    .required("اسم السائق مطلوب"),
  
  naqel_id: yup
    .number()
    .integer("يجب أن يكون معرف الناقل رقماً صحيحاً")
    .required("معرف الناقل مطلوب"),
  
  license_num: yup
    .number()
    .integer("يجب أن يكون رقم الرخصة رقماً صحيحاً")
    .required("رقم الرخصة مطلوب"),
  
  license_end_date: yup
    .string()
    .required("تاريخ انتهاء الرخصة مطلوب"),
});

export default driverSchema;