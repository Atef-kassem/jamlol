import * as yup from "yup";

export const supplierSchema = yup.object({
  name: yup
    .string()
    .min(2, "يجب أن يكون اسم المورد على الأقل حرفين")
    .required("اسم المورد مطلوب"),

  supplier_type: yup
    .string()
    .oneOf(["person", "company"], "نوع المورد يجب أن يكون إما شخص أو شركة")
    .required("نوع المورد مطلوب"),

  identification_number: yup
    .string()
    .min(1, "رقم الهوية مطلوب")
    .required("رقم الهوية مطلوب"),

  identification_type: yup
    .string()
    .oneOf(["card", "sgl"], "نوع الهوية يجب أن يكون إما بطاقة أو سجل")
    .required("نوع الهوية مطلوب"),

  jwal: yup
    .string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\d{7,15}$/,
      "رقم الجوال يجب أن يكون صحيحاً ويحتوي على 7-15 رقم"
    )
    .min(7, "رقم الجوال يجب أن يكون على الأقل 7 أرقام")
    .max(15, "رقم الجوال يجب أن لا يتجاوز 15 رقم")
    .required("رقم الجوال مطلوب"),

  address: yup
    .string()
    .min(5, "العنوان يجب أن يكون على الأقل 5 أحرف")
    .required("العنوان مطلوب"),

  region_id: yup
    .mixed()
    .test("is-valid-region", "يجب اختيار المنطقة", function (value) {
      // Check if value exists and is not empty string or null
      if (!value || value === "" || value === "0" || value === null) {
        return false;
      }
      // Convert to number and check if it's valid
      const numValue = Number(value);
      return !isNaN(numValue) && numValue > 0;
    })
    .transform((value) => {
      // Transform string to number for valid values
      if (value && value !== "" && value !== "0" && value !== null) {
        const numValue = Number(value);
        return !isNaN(numValue) ? numValue : value;
      }
      return value;
    })
    .required("يجب اختيار المنطقة"),

  active: yup
    .string()
    .oneOf(["active", "inactive"], "الحالة يجب أن تكون إما نشط أو غير نشط")
    .default("inactive"),
});

export default supplierSchema;
