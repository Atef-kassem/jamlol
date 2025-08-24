import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Settings,
  Building,
  Building2,
  Users,
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
  Monitor,
  Check,
  MapPin,
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
        url: "/",
        icon: TrendingUp,
        color: "bg-gradient-to-r from-green-500 to-emerald-500",
        description: "نظرة عامة شاملة على أداء المنصة",
      },
    ],
  },
  {
    // title: "إدارة النظام",
    items: [
      {
        title: "إعدادات النظام",
        icon: Settings,
        url: "/settings",
        color: "bg-gradient-to-r from-green-600 to-green-700",
        description: "إعدادات المنصة الشاملة",
        submenu: [
          {
            title: "البيانات الأساسية",
            url: "/settings/company",
            icon: Building,
            color: "text-green-600",
            description: "معلومات المنصة الأساسية",
          },
          {
            title: "إدارات النظام",
            url: "/settings/managements",
            icon: Building2,
            color: "text-blue-500",
            description: "إدارة أقسام النظام",
          },
          {
            title: "المستخدمون",
            url: "/settings/users",
            icon: Users,
            color: "text-violet-500",
            description: "إدارة المستخدمين",
          },
          {
            title: "الأدوار والصلاحيات",
            url: "/settings/roles",
            icon: Shield,
            color: "text-red-500",
            description: "تحديد الصلاحيات",
          },
          {
            title: "ادارة العناوين",
            url: "/settings/geolocation",
            icon: Settings,
            color: "text-indigo-500",
            description: "إعدادات النظام والخدمات",
          },
        ],
      },
    ],
  },
  {
    // title: "إدارة الموردين",
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
            description: "عرض وإدارة جميع الموردين",
          },
          {
            title: "إضافة مورد جديد",
            url: "/suppliers/add",
            icon: Users,
            color: "text-green-500",
            description: "تسجيل مورد جديد في المنصة",
          },
        ],
      },
    ],
  },
  {
    // title: "إدارة المشترين",
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
            description: "عرض وإدارة جميع المشترين",
          },
          {
            title: "سجل المشتريات",
            url: "/clients/purchase-history",
            icon: Activity,
            color: "text-purple-500",
            description: "تاريخ وسجل مشتريات العملاء",
          },
        ],
      },
    ],
  },
  {
    // title: "إدارة الناقلين",
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
            description: "عرض وإدارة جميع الناقلين",
          },
          {
            title: "وسائل النقل",
            url: "/carriers/vehicles",
            icon: Car,
            color: "text-gray-600",
            description: "إدارة أنواع وسائل النقل",
          },
          {
            title: "أسعار النقل",
            url: "/carriers/pricing",
            icon: DollarSign,
            color: "text-green-500",
            description: "إدارة أسعار وتكاليف النقل",
          },
          {
            title: "السائقين",
            url: "/carriers/drivers",
            icon: Users,
            color: "text-blue-500",
            description: "إدارة السائقين وبياناتهم",
          },
        ],
      },
    ],
  },
  {
    // title: "إدارة الطلبات",
    items: [
      {
        title: "الطلبات",
        icon: Package,
        url: "/orders",
        color: "bg-gradient-to-r from-purple-500 to-purple-600",
        description: "إدارة شاملة للطلبات",
        submenu: [
          {
            title: "متابعة الطلبات",
            url: "/orders/pending",
            icon: Timer,
            color: "text-orange-500",
            description: "الطلبات قيد المراجعة والموافقة",
          },
        ],
      },
    ],
  },
  {
    // title: "المنتجات",
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
            description: "عرض جميع المنتجات المتاحة",
          },
          {
            title: "التصنيفات",
            url: "/products/categories",
            icon: Bookmark,
            color: "text-blue-500",
            description: "إدارة تصنيفات المنتجات",
          },
          {
            title: "منتجات مُعتمدة",
            url: "/products/approved",
            icon: CheckCircle,
            color: "text-green-500",
            description: "المنتجات المُعتمدة للعرض",
          },
          {
            title: "في انتظار الموافقة",
            url: "/products/pending",
            icon: Timer,
            color: "text-yellow-500",
            description: "منتجات تحتاج موافقة الإدارة",
          },
          {
            title: "تقارير المنتجات",
            url: "/products/reports",
            icon: BarChart,
            color: "text-indigo-500",
            description: "تقارير وإحصائيات المنتجات",
          },
        ],
      },
    ],
  },
  {
    // title: "إدارة التقارير",
    items: [
      {
        title: "التقارير",
        icon: FileText,
        url: "/reports",
        color: "bg-gradient-to-r from-cyan-500 to-cyan-600",
        description: "إدارة شاملة للتقارير والتحليلات",
        submenu: [
          {
            title: "لوحة تحكم التقارير",
            url: "/reports/dashboard",
            icon: Monitor,
            color: "text-cyan-500",
            description: "نظرة عامة على جميع التقارير",
          },
          {
            title: "تقارير المبيعات",
            url: "/reports/sales",
            icon: TrendingUp,
            color: "text-green-500",
            description: "تقارير وتحليلات المبيعات",
          },
          {
            title: "تقارير العملاء",
            url: "/reports/clients",
            icon: Users,
            color: "text-purple-500",
            description: "تقارير أداء وسلوك العملاء",
          },
          {
            title: "تقارير الموردين",
            url: "/reports/suppliers",
            icon: Building2,
            color: "text-orange-500",
            description: "تقارير أداء وتقييم الموردين",
          },
                     {
             title: "تقارير الناقلين",
             url: "/reports/carriers",
             icon: Car,
             color: "text-red-500",
             description: "تقارير أداء خدمات النقل",
           },
          {
            title: "التقارير المالية",
            url: "/reports/financial",
            icon: DollarSign,
            color: "text-emerald-500",
            description: "التقارير والتحليلات المالية",
          },
          {
            title: "إعدادات التقارير",
            url: "/reports/settings",
            icon: Settings,
            color: "text-gray-500",
            description: "إعدادات وقوالب التقارير",
          },
        ],
      },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState([
    "إدارة النظام",
    "إدارة التقارير",
    "إدارة الموردين",
    "إدارة المشترين",
    "إدارة الناقلين",
    "إدارة الطلبات",
    "المنتجات",
  ]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const collapsed = state === "collapsed";

  const toggleMenu = (menuTitle) => {
    setOpenMenus((prev) =>
      prev.includes(menuTitle)
        ? prev.filter((item) => item !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  const isActive = (path) => location.pathname === path;
  const isSubmenuActive = (submenu) =>
    submenu?.some((item) => location.pathname === item.url);

  const getBadgeVariant = (badge) => {
    switch (badge) {
      case "جديد":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "متميز":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case "عاجل":
        return "bg-gradient-to-r from-red-500 to-rose-500 text-white animate-pulse";
      case "متقدم":
        return "bg-gradient-to-r from-purple-500 to-indigo-500 text-white";
      case "تحليل":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "إضافة":
        return "bg-gradient-to-r from-teal-500 to-green-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  return (
    <Sidebar
      className="border-l border-white/20 bg-gradient-to-b from-green-600 to-green-700 backdrop-blur-sm order-2 shadow-2xl"
      side="right"
    >
      <SidebarHeader className="p-3 border-b border-white/20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="flex flex-col items-center gap-1 w-full mb-2">
          <div className="relative flex flex-col items-center w-full">
            <img
              src="/logo.png"
              alt="جملول"
              className="w-24 h-24 object-contain mx-auto "
            />
            <span className="block text-white text-xs font-normal ">منصة النقل الذكية</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar overflow-y-auto bg-gradient-to-b from-green-600 to-green-700 pr-1">
        {menuSections.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex} className="px-3 py-2">
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
                              <div
                                className={`p-2 rounded-lg ${
                                  item.color ||
                                  "bg-gradient-to-r from-gray-500 to-gray-600"
                                } shadow-lg`}
                              >
                                <item.icon className="w-4 h-4 text-white" />
                              </div>
                              {!collapsed && (
                                <div className="flex-1 text-right">
                                  <span className="font-medium">
                                    {item.title}
                                  </span>
                                </div>
                              )}
                            </div>
                            {!collapsed && (
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${
                                  openMenus.includes(item.title)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="space-y-1 mt-2">
                          <SidebarMenuSub className="mr-4 border-r border-white/20 pr-4">
                            {item.submenu.map((subItem, subIndex) => (
                              <SidebarMenuSubItem
                                key={subItem.title}
                                className="group"
                              >
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subItem.url}
                                    className={({ isActive }) =>
                                      `group flex items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                                        isActive
                                          ? "bg-white/20 text-white font-semibold shadow-md border border-white/30 transform scale-105"
                                          : "text-white/80 hover:bg-white/10 hover:text-white"
                                      }`
                                    }
                                  >
                                    <div
                                      className={`p-1.5 rounded-md shadow-sm ${
                                        subItem.color
                                          ? "bg-white/10"
                                          : "bg-white/5"
                                      }`}
                                    >
                                      <subItem.icon
                                        className={`w-3.5 h-3.5 ${
                                          subItem.color || "text-white/70"
                                        }`}
                                      />
                                    </div>
                                    {!collapsed && (
                                      <div className="flex-1 text-right flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                          {subItem.title}
                                        </span>
                                        {location.pathname === subItem.url && (
                                          <Check className="w-4 h-4 text-green-300" />
                                        )}
                                        {subItem.badge && (
                                          <Badge
                                            className={`ml-2 text-xs px-2 py-0.5 ${getBadgeVariant(
                                              subItem.badge
                                            )}`}
                                          >
                                            {subItem.badge}
                                          </Badge>
                                        )}
                                      </div>
                                    )}
                                    {collapsed &&
                                      location.pathname === subItem.url && (
                                        <Check className="w-4 h-4 text-green-300" />
                                      )}
                                    {subItem.count !== undefined && (
                                      <Badge className="bg-white/20 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                                        {subItem.count}
                                      </Badge>
                                    )}
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `group flex items-center gap-4 rounded-xl p-3 my-1 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg ` +
                            (isActive && item.title === "لوحة التحكم"
                              ? "bg-white text-green-900 font-semibold scale-105 rounded-2xl border-0 shadow-none"
                              : isActive
                              ? "bg-white/30 text-white font-extrabold shadow-lg border border-white/40 scale-105 drop-shadow-lg"
                              : "text-white/90 hover:bg-white/10 hover:text-white"
                            )
                          }
                          onMouseEnter={() => setHoveredItem(item.title)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              item.color ||
                              "bg-gradient-to-r from-gray-500 to-gray-600"
                            } ${item.title === "لوحة التحكم" ? "shadow-none border-0" : "shadow-lg"}`}
                          >
                            <item.icon className={`w-4 h-4 ${item.title === "لوحة التحكم" ? "text-green-700" : "text-white"}`} />
                          </div>
                          {!collapsed && (
                            <div className="flex-1 text-right">
                              <span className={`font-semibold text-base ${item.title === "لوحة التحكم" ? "text-green-900" : "text-white"}`}>{item.title}</span>
                            </div>
                          )}
                          {item.badge && (
                            <Badge
                              className={`text-xs px-2 py-0.5 ${getBadgeVariant(
                                item.badge
                              )}`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                          {item.count !== undefined && (
                            <Badge className="bg-white/20 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                              {item.count}
                            </Badge>
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
