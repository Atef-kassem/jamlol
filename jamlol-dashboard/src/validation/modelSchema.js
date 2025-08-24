import * as yup from "yup";

export const modelSchema = yup.object({
  title: yup
    .string()
    .min(2, "يجب أن يكون العنوان على الأقل حرفين")
    .required("العنوان مطلوب"),
});

export default modelSchema;