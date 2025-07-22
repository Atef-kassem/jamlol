import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Settings,
  Building,
  Users,
  Palette,
  Database,
  Shield,
  Car,
  Sparkles,
  FileText,
  BarChart,
  Package,
  Calendar,
  CreditCard,
  Headphones,
  ChevronDown,
  ChevronLeft,
  Store,
  TrendingUp,
  Zap,
  Gem,
  Stars,
  Activity,
  DollarSign,
  Globe,
  Lock,
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
  Award,
  Timer,
  Target,
  Bookmark,
  ArrowLeft,
  Receipt,
  Monitor
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

// Main menu structure for Jamlool Transport Platform with enhanced icons and styling
const menuSections = [
  {
    title: "",
    items: [
      {
        title: "لوحة التحكم",
        url: "/dashboard",
        icon: TrendingUp,
        color: "bg-gradient-to-r from-green-500 to-emerald-500",
        description: "نظرة عامة شاملة على أداء المنصة"
      },
    ],
  },
  {
    title: "إدارة النظام",
    items: [
      {
        title: "إعدادات النظام",
        icon: Settings,
        url: "/settings",
        color: "bg-gradient-to-r from-green-600 to-green-700",
        description: "إعدادات المنصة الشاملة",
        submenu: [
          { title: "البيانات الأساسية", url: "/settings/company", icon: Building, color: "text-green-600", description: "معلومات المنصة الأساسية" },
          { title: "اضافة فرع", url: "/settings/branches", icon: Globe, color: "text-blue-500", description: "إدارة المناطق والمدن" },
          
          { title: "المستخدمون", url: "/settings/users", icon: Users, color: "text-violet-500", description: "إدارة المستخدمين" },
          { title: "الأدوار والصلاحيات", url: "/settings/roles", icon: Shield, color: "text-red-500", description: "تحديد الصلاحيات" },
          { title: "إعدادات السمات", url: "/settings/themes", icon: Palette, color: "text-pink-500", description: "تخصيص المظهر" },
          { title: "إعدادات النظام العامة", url: "/settings/system", icon: Settings, color: "text-indigo-500", description: "إعدادات النظام والخدمات" }
        ],
      },
    ],
  },
  {
    title: "إدارة الموردين",
    items: [
      {
        title: "الموردين",
        icon: Users,
        url: "/suppliers",
        color: "bg-gradient-to-r from-blue-500 to-blue-600",
        description: "إدارة شاملة للموردين",
        submenu: [
          {
            title: "قائمة الموردين",
            url: "/suppliers/list",
            icon: Users,
            color: "text-blue-500",
            description: "عرض وإدارة جميع الموردين"
          },
          {
            title: "إضافة مورد جديد",
            url: "/suppliers/add",
            icon: Users,
            color: "text-green-500",
            description: "تسجيل مورد جديد في المنصة"
          },
          {
            title: "طلبات الموافقة",
            url: "/suppliers/approval",
            icon: CheckCircle,
            color: "text-orange-500",
            description: "مراجعة وموافقة طلبات الموردين"
          },
          {
            title: "تقييم الموردين",
            url: "/suppliers/evaluation",
            icon: Award,
            color: "text-yellow-500",
            description: "تقييم أداء وجودة الموردين"
          },
          {
            title: "المنتجات المعروضة",
            url: "/suppliers/products",
            icon: Package,
            color: "text-purple-500",
            description: "المنتجات المعروضة من الموردين"
          },
          {
            title: "تقارير الموردين",
            url: "/suppliers/reports",
            icon: BarChart,
            color: "text-indigo-500",
            description: "تقارير وتحليلات الموردين"
          }
        ],
      },
    ],
  },
  {
    title: "إدارة المشترين",
    items: [
      {
        title: "المشترين",
        icon: ShoppingCart,
        url: "/clients",
        color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
        description: "إدارة شاملة للمشترين",
        submenu: [
          {
            title: "قائمة المشترين",
            url: "/clients/list",
            icon: Users,
            color: "text-emerald-500",
            description: "عرض وإدارة جميع المشترين"
          },
          {
            title: "طلبات التسجيل",
            url: "/clients/registration",
            icon: FileText,
            color: "text-blue-500",
            description: "طلبات تسجيل المشترين الجدد"
          },
          {
            title: "الطلبات النشطة",
            url: "/clients/orders",
            icon: ShoppingCart,
            color: "text-orange-500",
            description: "الطلبات النشطة من المشترين"
          },
          {
            title: "سجل المشتريات",
            url: "/clients/purchase-history",
            icon: Activity,
            color: "text-purple-500",
            description: "تاريخ وسجل مشتريات العملاء"
          },
          {
            title: "تقييم المشترين",
            url: "/clients/evaluation",
            icon: Award,
            color: "text-yellow-500",
            description: "تقييم سلوك ونشاط المشترين"
          },
          {
            title: "تقارير المشترين",
            url: "/clients/reports",
            icon: BarChart,
            color: "text-indigo-500",
            description: "تقارير وإحصائيات المشترين"
          }
        ],
      },
    ],
  },
  {
    title: "إدارة الناقلين",
    items: [
      {
        title: "الناقلين",
        icon: Car,
        url: "/carriers",
        color: "bg-gradient-to-r from-yellow-500 to-orange-500",
        description: "إدارة شاملة لشركات النقل",
        submenu: [
          {
            title: "قائمة الناقلين",
            url: "/carriers/list",
            icon: Car,
            color: "text-yellow-600",
            description: "عرض وإدارة جميع الناقلين"
          },
          {
            title: "طلبات التسجيل",
            url: "/carriers/registration",
            icon: FileText,
            color: "text-blue-500",
            description: "طلبات انضمام ناقلين جدد"
          },
          {
            title: "وسائل النقل",
            url: "/carriers/vehicles",
            icon: Car,
            color: "text-gray-600",
            description: "إدارة أنواع وسائل النقل"
          },
          {
            title: "أسعار النقل",
            url: "/carriers/pricing",
            icon: DollarSign,
            color: "text-green-500",
            description: "إدارة أسعار وتكاليف النقل"
          },
          {
            title: "المناطق المخدومة",
            url: "/carriers/coverage",
            icon: Globe,
            color: "text-blue-600",
            description: "المناطق الجغرافية المخدومة"
          },
          {
            title: "تقييم الناقلين",
            url: "/carriers/evaluation",
            icon: Award,
            color: "text-yellow-500",
            description: "تقييم أداء وجودة الناقلين"
          },
          {
            title: "تقارير النقل",
            url: "/carriers/reports",
            icon: BarChart,
            color: "text-indigo-500",
            description: "تقارير وإحصائيات النقل"
          }
        ],
      },
    ],
  },
  {
    title: "إدارة الطلبات",
    items: [
      {
        title: "الطلبات",
        icon: Package,
        url: "/orders",
        color: "bg-gradient-to-r from-purple-500 to-purple-600",
        description: "إدارة شاملة للطلبات",
        submenu: [
          {
            title: "الطلبات الجديدة",
            url: "/orders/new",
            icon: FileText,
            color: "text-blue-500",
            description: "الطلبات الواردة حديثاً"
          },
          {
            title: "قيد المراجعة",
            url: "/orders/pending",
            icon: Timer,
            color: "text-orange-500",
            description: "الطلبات قيد المراجعة والموافقة"
          },
          {
            title: "قيد التنفيذ",
            url: "/orders/processing",
            icon: Activity,
            color: "text-purple-500",
            description: "الطلبات قيد التنفيذ والشحن"
          },
          {
            title: "الطلبات المكتملة",
            url: "/orders/completed",
            icon: CheckCircle,
            color: "text-green-500",
            description: "الطلبات المكتملة بنجاح"
          },
          {
            title: "الطلبات المُلغاة",
            url: "/orders/cancelled",
            icon: AlertTriangle,
            color: "text-red-500",
            description: "الطلبات المُلغاة أو المرفوضة"
          },
          {
            title: "متابعة الشحنات",
            url: "/orders/tracking",
            icon: Target,
            color: "text-indigo-500",
            description: "تتبع ومتابعة حالة الشحنات"
          }
        ],
      },
    ],
  },
  {
    title: "المنتجات",
    items: [
      {
        title: "المنتجات",
        icon: Package,
        url: "/products",
        color: "bg-gradient-to-r from-teal-500 to-teal-600",
        description: "إدارة كاتالوج المنتجات",
        submenu: [
          {
            title: "جميع المنتجات",
            url: "/products/all",
            icon: Package,
            color: "text-teal-500",
            description: "عرض جميع المنتجات المتاحة"
          },
          {
            title: "التصنيفات",
            url: "/products/categories",
            icon: Bookmark,
            color: "text-blue-500",
            description: "إدارة تصنيفات المنتجات"
          },
          {
            title: "وحدات القياس",
            url: "/products/units",
            icon: Target,
            color: "text-orange-500",
            description: "إدارة وحدات القياس والوزن"
          },
          {
            title: "منتجات مُعتمدة",
            url: "/products/approved",
            icon: CheckCircle,
            color: "text-green-500",
            description: "المنتجات المُعتمدة للعرض"
          },
          {
            title: "في انتظار الموافقة",
            url: "/products/pending",
            icon: Timer,
            color: "text-yellow-500",
            description: "منتجات تحتاج موافقة الإدارة"
          },
          {
            title: "تقارير المنتجات",
            url: "/products/reports",
            icon: BarChart,
            color: "text-indigo-500",
            description: "تقارير وإحصائيات المنتجات"
          }
        ],
      },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(["إدارة النظام", "إدارة الموردين", "إدارة المشترين", "إدارة الناقلين", "إدارة الطلبات", "المنتجات"]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const collapsed = state === "collapsed";

  const toggleMenu = (menuTitle: string) => {
    setOpenMenus(prev =>
      prev.includes(menuTitle)
        ? prev.filter(item => item !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isSubmenuActive = (submenu: any[]) =>
    submenu?.some(item => location.pathname === item.url);

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "جديد": return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "متميز": return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case "عاجل": return "bg-gradient-to-r from-red-500 to-rose-500 text-white animate-pulse";
      case "متقدم": return "bg-gradient-to-r from-purple-500 to-indigo-500 text-white";
      case "تحليل": return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "إضافة": return "bg-gradient-to-r from-teal-500 to-green-500 text-white";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  return (
    <Sidebar className="border-l border-white/20 bg-gradient-to-b from-green-600 to-green-700 backdrop-blur-sm order-2 shadow-2xl" side="right">
      <SidebarHeader className="p-6 border-b border-white/20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src="/lovable-uploads/a95d1fc4-09d1-468a-8b81-1742a9993fed.png" 
              alt="جملول" 
              className="w-12 h-12 rounded-xl shadow-lg ring-2 ring-white/30 hover:ring-white/50 transition-all duration-300 hover:scale-110"
            />
          </div>
          {!collapsed && (
            <div className="text-right">
              <h3 className="font-bold text-xl text-white">
                جملول
              </h3>
              <p className="text-sm text-white/80 font-medium">منصة النقل الذكية</p>
              <div className="flex items-center gap-1 mt-1">
                <Stars className="w-3 h-3 text-yellow-300" />
                <span className="text-xs text-yellow-200 font-semibold">ربط ذكي وفعال</span>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar overflow-y-auto bg-gradient-to-b from-green-600 to-green-700">
        {menuSections.map((section, sectionIndex) => (
          <SidebarGroup key={section.title} className="px-3 py-2">
            {!collapsed && section.title && (
              <SidebarGroupLabel className="text-white/70 font-bold text-xs uppercase tracking-wider mb-3 px-2">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className="space-y-1">
              <SidebarMenu>
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={item.title}>
                    {item.submenu ? (
                      <Collapsible
                        open={openMenus.includes(item.title)}
                        onOpenChange={() => toggleMenu(item.title)}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={`group w-full justify-between p-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                              isSubmenuActive(item.submenu)
                                ? "bg-white/20 text-white font-semibold shadow-lg border border-white/30"
                                : "hover:bg-white/10 text-white/90 hover:text-white"
                            }`}
                            onMouseEnter={() => setHoveredItem(item.title)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${item.color || "bg-gradient-to-r from-gray-500 to-gray-600"} shadow-lg`}>
                                <item.icon className="w-4 h-4 text-white" />
                              </div>
                              {!collapsed && (
                                <div className="flex-1 text-right">
                                  <span className="font-medium">{item.title}</span>
                                </div>
                              )}
                            </div>
                            {!collapsed && (
                              <ChevronDown
                                className={`w-4 h-4 transition-all duration-300 ${
                                  openMenus.includes(item.title) ? "rotate-180 text-white" : "text-white/70"
                                }`}
                              />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 animate-accordion-down">
                          <SidebarMenuSub className="space-y-1 pr-4">
                            {item.submenu.map((subItem, subIndex) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                                    isActive(subItem.url)
                                      ? "bg-white/20 text-white font-semibold shadow-lg border border-white/30"
                                      : "hover:bg-white/10 text-white/90 hover:text-white"
                                  }`}
                                  onMouseEnter={() => setHoveredItem(subItem.title)}
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  <NavLink to={subItem.url} className="flex items-center gap-3 w-full">
                                     <div className="relative">
                                       <subItem.icon className={`w-4 h-4 text-white/80 transition-colors duration-300`} />
                                       {isActive(subItem.url) && (
                                         <div className="absolute -inset-1 bg-white/20 rounded-full animate-ping"></div>
                                       )}
                                     </div>
                                     <div className="flex-1 text-right">
                                       <span className="text-sm font-medium text-white">{subItem.title}</span>
                                     </div>
                                    {isActive(subItem.url) && (
                                      <CheckCircle className="w-3 h-3 text-green-500" />
                                    )}
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                          isActive(item.url)
                            ? "bg-white/20 text-white font-semibold shadow-lg border border-white/30"
                            : "hover:bg-white/10 text-white/90 hover:text-white"
                        }`}
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <NavLink to={item.url} className="flex items-center gap-3 w-full">
                          <div className={`p-2 rounded-lg ${item.color || "bg-gradient-to-r from-gray-500 to-gray-600"} shadow-lg`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          {!collapsed && (
                            <div className="flex-1 text-right">
                              <span className="font-medium text-white">{item.title}</span>
                            </div>
                          )}
                          {isActive(item.url) && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}