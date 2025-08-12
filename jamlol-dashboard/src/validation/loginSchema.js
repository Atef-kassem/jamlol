import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة"),
  });
export default loginSchema;
