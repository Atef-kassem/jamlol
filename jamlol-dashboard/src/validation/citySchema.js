import * as yup from "yup";

const citySchema = yup.object({
  name: yup
    .string()
    .required("اسم المدينة مطلوب")
    .min(3, "اسم المدينة يجب أن يكون على الأقل 3 حروف"),
  country_id: yup
    .number()
    .required("يجب اختيار البلد")
    .integer("معرف البلد يجب أن يكون رقم صحيح"),
});

export default citySchema;
