import * as yup from "yup";

const permissionSchema = yup.object().shape({
  name: yup.string().required("اسم الصلاحية مطلوب"),
  slug: yup.string().required("الاسم المختصر مطلوب"),
  management_id: yup.number().required("الادارة مطلوبة")
});

export default permissionSchema;