import * as yup from "yup";

const countrySchema = yup.object({
  name: yup
    .string()
    .required("اسم البلد مطلوب")
    .min(3, "اسم البلد يجب أن يكون على الأقل 3 حروف")
});

export default countrySchema;