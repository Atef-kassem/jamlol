import * as yup from "yup";

const roleSchema = yup.object().shape({
  name: yup.string().min(2, "اسم الدور يجب أن يكون على الأقل حرفين").required("اسم الدور مطلوب")
});

export default roleSchema;