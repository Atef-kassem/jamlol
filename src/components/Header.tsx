import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  Car,
  Droplets,
  Calendar,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getCurrentFiscalYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    // العام المالي يبدأ من أبريل
    const fiscalYear = now.getMonth() >= 3 ? year : year - 1;
    return `${fiscalYear}/${fiscalYear + 1}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-l from-background via-background to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-elegant">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Right side - Sidebar trigger and Search */}
        <div className="flex items-center gap-4 order-1">
          <SidebarTrigger className="text-foreground hover:bg-accent hover:scale-105 transition-all duration-200 p-2 rounded-lg" />
          
          <div className="relative w-80 max-w-sm animate-fade-in">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              className="pr-10 pl-4 bg-muted/30 border-muted focus:bg-background transition-all duration-300 rounded-xl"
            />
          </div>
        </div>

        {/* Center - Date, Time & Fiscal Year */}
        <div className="flex items-center order-2 animate-fade-in">
          <div className="flex items-center gap-6">
            {/* Date */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/50">
              <Calendar className="h-4 w-4 text-primary" />
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{formatDate(currentDate)}</p>
              </div>
            </div>
            
            {/* Time */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/50">
              <Clock className="h-4 w-4 text-primary" />
              <div className="text-right">
                <p className="text-lg font-bold text-primary font-mono">{formatTime(currentDate)}</p>
              </div>
            </div>
            
            {/* Fiscal Year */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-brand text-white">
              <div className="text-center">
                <p className="text-xs">العام المالي</p>
                <p className="text-sm font-bold">{getCurrentFiscalYear()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left side - Actions */}
        <div className="flex items-center gap-3 order-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:bg-accent hover:scale-105 transition-all duration-200 rounded-xl"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">تبديل الوضع</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-accent hover:scale-105 transition-all duration-200 rounded-xl">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-secondary text-white animate-bounce-gentle">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 bg-card/95 backdrop-blur-xl border border-border/50 shadow-glass animate-scale-in">
              <div className="p-4 border-b border-border/50">
                <h4 className="font-bold text-primary">الإشعارات</h4>
              </div>
              <div className="p-2 max-h-64 overflow-y-auto">
                <div className="flex items-start gap-3 p-3 hover:bg-accent rounded-xl transition-all duration-200 hover:scale-105">
                  <div className="w-3 h-3 bg-gradient-secondary rounded-full mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">طلب نقل جديد من المورد</p>
                    <p className="text-xs text-muted-foreground">منذ 5 دقائق</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-accent rounded-xl transition-all duration-200 hover:scale-105">
                  <div className="w-3 h-3 bg-warning rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">عرض سعر جديد من الناقل</p>
                    <p className="text-xs text-muted-foreground">منذ 15 دقيقة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-accent rounded-xl transition-all duration-200 hover:scale-105">
                  <div className="w-3 h-3 bg-success rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">تم تأكيد الشحن بنجاح</p>
                    <p className="text-xs text-muted-foreground">منذ ساعة</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-accent hover:scale-105 transition-all duration-200 rounded-xl p-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold">أحمد محمد</p>
                  <p className="text-xs text-muted-foreground">مدير المنصة</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white flex items-center justify-center shadow-brand">
                  <User className="h-5 w-5" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-card/95 backdrop-blur-xl border border-border/50 shadow-glass animate-scale-in">
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand text-white flex items-center justify-center shadow-brand">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">أحمد محمد</p>
                    <p className="text-xs text-muted-foreground">ahmed@jamlool.com</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <DropdownMenuItem asChild className="gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-200 cursor-pointer">
                  <a href="/profile">
                    <User className="h-4 w-4" />
                    الملف الشخصي
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-200 cursor-pointer">
                  <a href="/user-settings">
                    <Settings className="h-4 w-4" />
                    الإعدادات
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem 
                  className="gap-3 p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    // تسجيل الخروج والعودة لصفحة الدخول
                    window.location.href = '/';
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}