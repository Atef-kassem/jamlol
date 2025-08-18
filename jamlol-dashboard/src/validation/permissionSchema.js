import * as yup from "yup";

const permissionSchema = yup.object().shape({
  name: yup.string().required("اسم الصلاحية مطلوب"),
  slug: yup.string().required("الوصف مطلوب"),
  groupBy: yup.string().required("التصنيف مطلوب")
});

export default permissionSchema;