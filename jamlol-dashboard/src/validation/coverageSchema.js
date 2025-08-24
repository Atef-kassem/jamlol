import * as yup from "yup";

export const coverageSchema = yup.object({
  carrier_id: yup
    .number()
    .integer("يجب أن يكون معرف الناقل رقماً صحيحاً")
    .min(1, "يجب أن يكون معرف الناقل على الأقل 1")
    .required("معرف الناقل مطلوب"),
  country_id: yup
    .number()
    .integer("يجب أن تكون معرف الدولة رقماً صحيحاً")
    .min(1, "يجب أن تكون معرف الدولة على الأقل 1")
    .required("معرف الدولة مطلوب"),
  region_id: yup
    .number()
    .integer("يجب أن يكون معرف المنطقة رقماً صحيحاً")
    .min(1, "يجب أن يكون معرف المنطقة على الأقل 1")
    .required("معرف المنطقة مطلوب"),
  city_id: yup
    .number()
    .integer("يجب أن يكون معرف المدينة رقماً صحيحاً")
    .min(1, "يجب أن يكون معرف المدينة على الأقل 1")
    .required("معرف المدينة مطلوب"),
  neighborhood_id: yup
    .number()
    .integer("يجب أن يكون معرف الحي رقماً صحيحاً")
    .min(1, "يجب أن يكون معرف الحي على الأقل 1")
    .optional(),
  additional_areas: yup
    .string()
    .max(500, "لا يمكن أن يتجاوز النص 500 حرف")
    .optional(),
  capacity: yup
    .number()
    .integer("يجب أن تكون السعة رقماً صحيحاً")
    .min(1, "يجب أن تكون السعة على الأقل 1")
    .max(10000, "لا يمكن أن تتجاوز السعة 10000")
    .required("السعة مطلوبة"),
  response_time: yup
    .string()
    .min(2, "يجب أن يكون وقت الاستجابة على الأقل حرفين")
    .max(50, "لا يمكن أن يتجاوز وقت الاستجابة 50 حرف")
    .required("وقت الاستجابة مطلوب"),
  service_level: yup
    .string()
    .oneOf(["basic", "medium", "advanced", "excellent"], "يجب أن يكون مستوى الخدمة إما 'أساسي' أو 'متوسط' أو 'متقدم' أو 'ممتاز'")
    .required("مستوى الخدمة مطلوب"),
  notes: yup
    .string()
    .max(1000, "لا يمكن أن يتجاوز النص 1000 حرف")
    .optional(),
});

export default coverageSchema;
