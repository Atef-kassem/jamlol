import * as Yup from 'yup';

const managementSchema = Yup.object().shape({
    name: Yup.string()
      .required("الاسم مطلوب"),

  });
export default managementSchema;
