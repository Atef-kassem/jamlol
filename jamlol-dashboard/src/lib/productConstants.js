export const PRODUCT_CATEGORIES = [
  "الحبوب والبقوليات",
  "التمور والمكسرات", 
  "الزيوت والدهون",
  "منتجات الألبان",
  "اللحوم والدواجن",
  "الخضار والفواكه",
  "المواد الغذائية المعلبة"
];

export const PRODUCT_UNITS = [
  "كيلو", "لتر", "قطعة", "عبوة", "كيس", "علبة", "حبة"
];

export const PRODUCT_STATUSES = [
  "متاح", "قيد المراجعة", "غير متاح", "نفد المخزون"
];

export const getStatusColor = (status) => {
  const statusColors = {
    "متاح": "bg-green-100 text-green-800",
    "قيد المراجعة": "bg-yellow-100 text-yellow-800",
    "غير متاح": "bg-red-100 text-red-800",
    "نفد المخزون": "bg-gray-100 text-gray-800"
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};