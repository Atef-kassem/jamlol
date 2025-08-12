// إعدادات التاريخ الميلادي للمشروع
import { enUS, ar } from "date-fns/locale";

// استخدام التقويم الميلادي مع اللغة العربية
export const dateLocale = {
  ...ar,
  // إعادة تعريف خصائص التقويم لضمان استخدام التقويم الميلادي
  options: {
    ...ar.options,
    // استخدام التقويم الميلادي
    calendar: 'gregory',
    numberingSystem: 'latn'
  }
};

// خيارات تنسيق التاريخ الميلادي
export const dateFormatOptions = {
  weekday: 'long',
  year: 'numeric', 
  month: 'long',
  day: 'numeric',
  calendar: 'gregory'
};

export const timeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit', 
  second: '2-digit',
  hour12: false
};

// Locale للاستخدام مع date-fns (ميلادي)
export const gregorianLocale = 'ar-EG';