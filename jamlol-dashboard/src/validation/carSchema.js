import * as yup from "yup";

export const carSchema = yup.object({
  plate_num: yup
    .number()
    .integer("يجب أن يكون رقم اللوحة رقماً صحيحاً")
    .min(1, "يجب أن يكون رقم اللوحة على الأقل 1")
    .required("رقم اللوحة مطلوب"),
  
  license_number: yup
    .number()
    .integer("يجب أن يكون رقم الرخصة رقماً صحيحاً")
    .min(1, "يجب أن يكون رقم الرخصة على الأقل 1")
    .required("رقم الرخصة مطلوب"),
  
  license_end_date: yup
    .string()
    .required("تاريخ انتهاء الرخصة مطلوب"),
  
  insurance_end_date: yup
    .string()
    .required("تاريخ انتهاء التأمين مطلوب"),
  
  year: yup
    .number()
    .integer("يجب أن يكون العام رقماً صحيحاً")
    .required("العام مطلوب"),
  
  driver_id: yup
    .number()
    .integer("يجب أن يكون معرف السائق رقماً صحيحاً")
    .min(1, "يجب أن يكون معرف السائق على الأقل 1")
    .required("معرف السائق مطلوب"),
  
  model_id: yup
    .number()
    .integer("يجب أن يكون معرف الموديل رقماً صحيحاً")
    .min(1, "يجب أن يكون معرف الموديل على الأقل 1")
    .required("معرف الموديل مطلوب"),
  
  naqel_id: yup
    .number()
    .integer("يجب أن يكون معرف الناقل رقماً صحيحاً")
    .min(1, "يجب أن يكون معرف الناقل على الأقل 1")
    .required("معرف الناقل مطلوب"),
  
  allowed_cars_num: yup
    .number()
    .integer("يجب أن يكون عدد السيارات المسموحة رقماً صحيحاً")
    .min(1, "يجب أن يكون عدد السيارات المسموحة على الأقل 1")
    .required("عدد السيارات المسموحة مطلوب"),
  
  allowed_drivers_num: yup
    .number()
    .integer("يجب أن يكون عدد السائقين المسموحين رقماً صحيحاً")
    .min(1, "يجب أن يكون عدد السائقين المسموحين على الأقل 1")
    .required("عدد السائقين المسموحين مطلوب"),
});

export default carSchema;