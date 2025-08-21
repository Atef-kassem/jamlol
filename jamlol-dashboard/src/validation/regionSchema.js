import * as yup from "yup";

const regionSchema = yup.object({
  name: yup
    .string()
    .required("اسم المنطقة مطلوب")
    .min(3, "اسم المنطقة يجب أن يكون على الأقل 3 حروف"),
  city_id: yup
    .number()
    .required("يجب اختيار المدينة")
    .integer("معرف المدينة يجب أن يكون رقم صحيح"),
});

export default regionSchema;
