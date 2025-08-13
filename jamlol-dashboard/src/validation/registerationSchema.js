import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("الاسم مطلوب"),
  username: Yup.string()
    .required("اسم المستخدم مطلوب"),
  phone: Yup.string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\d{7,15}$/,
      "رقم الهاتف غير صحيح (يجب أن يحتوي على 7-15 رقمًا، ويمكن أن يبدأ برمز الدولة)"
    )
    .min(7, "رقم الهاتف قصير جدًا (يجب أن يكون 7 أرقام على الأقل)")
    .max(15, "رقم الهاتف طويل جدًا (يجب ألا يتجاوز 15 رقمًا)")
    .nullable(),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  photo: Yup.string()
    .nullable(),
  address: Yup.string()
    .nullable(),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "كلمة المرور يجب أن تحتوي على حرف، رقم، و رمز خاص (@$!%*#?&)"
    )
    .required("كلمة المرور مطلوبة"),
  person_type: Yup.string()
    .oneOf(
      ["supplier", "client", "carrier", "admin"],
      "يجب أن يكون نوع الشخص إما supplier، client، carrier، أو admin"
    )
    .required("نوع الشخص مطلوب"),
  approval_code: Yup.string()
    .nullable(),
  status: Yup.string().oneOf(
    ["active", "inActive"],
    "الحالة يجب أن تكون  مفعلة أوغير مفعلة"
  )
    .nullable(),
  role_id: Yup.number()
    .integer("معرف الدور يجب أن يكون عددًا صحيحًا")
    .required("معرف الدور مطلوب"),
});

export default registerSchema;