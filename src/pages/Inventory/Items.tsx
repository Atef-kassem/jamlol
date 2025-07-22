import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Plus, 
  Package, 
  Car, 
  Wrench, 
  Edit,
  Eye,
  MoreVertical,
  Filter,
  Save,
  FileText,
  DollarSign,
  Clock,
  Image,
  Upload,
  Folder,
  Activity,
  TrendingUp,
  ShoppingCart,
  Info,
  Camera,
  X,
  Trash2,
  CheckCircle,
  Settings,
  PackageOpen,
  ArrowRightLeft,
  ClipboardCheck,
  Shield,
  Gem,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Item {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  type: "خدمة" | "منتج" | "مستهلكات" | "قطعة غيار";
  category: string;
  subcategory?: string;
  unit: string;
  price: number;
  costPrice?: number;
  wholesalePrice?: number;
  discountPrice?: number;
  duration?: number; // للخدمات بالدقائق
  quantity?: number;
  minStock?: number;
  maxStock?: number;
  reorderPoint?: number;
  status: "نشط" | "غير نشط";
  description: string;
  barcode?: string;
  supplier?: string;
  manufacturer?: string;
  partNumber?: string;
  expiryDate?: string;
  warehouse?: string;
  image?: string;
  consumables?: ConsumableItem[]; // للخدمات
}

interface ConsumableItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  cost: number;
}

const Items = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<string>("");
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

  // التعامل مع معاملات الرابط لفتح التبويب المطلوب
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['list', 'add', 'categories', 'unit-templates', 'consumption', 'reports'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // أنواع الأصناف
  const itemTypes = [
    { value: "خدمة", label: "خدمة", icon: Wrench, color: "bg-blue-500" },
    { value: "منتج", label: "منتج", icon: Package, color: "bg-green-500" },
    { value: "مستهلكات", label: "مستهلكات", icon: ShoppingCart, color: "bg-orange-500" },
    { value: "قطعة غيار", label: "قطع غيار", icon: Settings, color: "bg-purple-500" },
  ];

  // الفئات الشجرية
  const categories = [
    { value: "خدمات > غسيل > خارجي", label: "خدمات > غسيل > خارجي" },
    { value: "خدمات > غسيل > داخلي", label: "خدمات > غسيل > داخلي" },
    { value: "خدمات > تشحيم > محرك", label: "خدمات > تشحيم > محرك" },
    { value: "مواد استهلاكية > زيوت > زيت محرك", label: "مواد استهلاكية > زيوت > زيت محرك" },
    { value: "مواد استهلاكية > منظفات > صابون", label: "مواد استهلاكية > منظفات > صابون" },
    { value: "قطع غيار > فلاتر > فلتر زيت", label: "قطع غيار > فلاتر > فلتر زيت" },
  ];

  // وحدات القياس
  const units = [
    "خدمة", "قطعة", "لتر", "جرام", "كيلو", "عبوة", "كرتون", "متر", "دقيقة", "زوج", "جالون"
  ];

  // المستودعات
  const warehouses = [
    { value: "main", label: "المستودع الرئيسي" },
    { value: "branch1", label: "مستودع فرع الدمام" },
    { value: "branch2", label: "مستودع فرع الرياض" },
  ];

  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      code: "SV-EXT-001",
      nameAr: "غسيل خارجي مطور",
      nameEn: "Advanced Exterior Wash",
      type: "خدمة",
      category: "خدمات > غسيل > خارجي",
      unit: "خدمة",
      price: 40,
      duration: 20,
      status: "نشط",
      description: "تنظيف خارجي متكامل للسيارة مع شمع وحماية للطلاء",
      warehouse: "main",
      consumables: [
        { itemId: "soap-001", itemName: "صابون مركز", quantity: 0.05, unit: "لتر", cost: 0.80 },
        { itemId: "towel-001", itemName: "فوطة ميكروفايبر", quantity: 1, unit: "قطعة", cost: 1.50 }
      ]
    },
    {
      id: "2",
      code: "OIL-EN-005",
      nameAr: "زيت محرك شل 5W-30",
      nameEn: "Shell Engine Oil 5W-30",
      type: "منتج",
      category: "مواد استهلاكية > زيوت > زيت محرك",
      unit: "لتر",
      price: 40,
      costPrice: 25,
      wholesalePrice: 30,
      quantity: 150,
      minStock: 50,
      maxStock: 500,
      status: "نشط",
      description: "زيت تخليقي عالي الجودة مناسب لجميع أنواع السيارات",
      barcode: "1234567890123",
      supplier: "شركة شل",
      manufacturer: "Shell",
      partNumber: "SH-5W30-1L",
      warehouse: "main"
    },
    {
      id: "3",
      code: "CONS-SOAP-001",
      nameAr: "صابون سيارات مركز",
      nameEn: "Concentrated Car Soap",
      type: "مستهلكات",
      category: "مواد استهلاكية > منظفات > صابون",
      unit: "لتر",
      price: 15,
      costPrice: 8,
      quantity: 200,
      minStock: 30,
      status: "نشط",
      description: "صابون مركز عالي الجودة لغسيل السيارات",
      barcode: "2345678901234",
      supplier: "مصنع المنظفات الحديثة",
      warehouse: "main"
    }
  ]);

  const [formData, setFormData] = useState<Partial<Item>>({
    code: "",
    nameAr: "",
    nameEn: "",
    type: "منتج",
    category: "",
    unit: "قطعة",
    price: 0,
    costPrice: 0,
    wholesalePrice: 0,
    discountPrice: 0,
    duration: 0,
    quantity: 0,
    minStock: 0,
    maxStock: 0,
    reorderPoint: 0,
    status: "نشط",
    description: "",
    barcode: "",
    supplier: "",
    manufacturer: "",
    partNumber: "",
    expiryDate: "",
    warehouse: "main",
    consumables: []
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (!formData.nameAr || !formData.type || !formData.category || !formData.unit) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }

      // توليد كود تلقائي إذا لم يتم إدخاله
      if (!formData.code) {
        const typePrefix = {
          "خدمة": "SV",
          "منتج": "PRD",
          "مستهلكات": "CONS",
          "قطعة غيار": "PART"
        }[formData.type as string] || "ITM";
        
        formData.code = `${typePrefix}-${Date.now().toString().slice(-6)}`;
      }

      if (editingItem) {
        setItems(prev => prev.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        ));
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات الصنف بنجاح",
        });
      } else {
        const newItem: Item = {
          id: Date.now().toString(),
          ...formData as Item
        };
        setItems(prev => [...prev, newItem]);
        toast({
          title: "تم الإضافة بنجاح",
          description: "تم إضافة الصنف الجديد بنجاح",
        });
      }
      
      setEditingItem(null);
      resetForm();
      setSelectedItemType("");
      setActiveTab("list");
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      nameAr: "",
      nameEn: "",
      type: "منتج",
      category: "",
      unit: "قطعة",
      price: 0,
      costPrice: 0,
      wholesalePrice: 0,
      discountPrice: 0,
      duration: 0,
      quantity: 0,
      minStock: 0,
      maxStock: 0,
      reorderPoint: 0,
      status: "نشط",
      description: "",
      barcode: "",
      supplier: "",
      manufacturer: "",
      partNumber: "",
      expiryDate: "",
      warehouse: "main",
      consumables: []
    });
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setFormData(item);
    setSelectedItemType(item.type);
    setActiveTab("add");
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "خدمة":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "منتج":
        return "bg-green-100 text-green-800 border-green-200";
      case "مستهلكات":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "قطعة غيار":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "نشط" 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200";
  };

  const calculateConsumablesCost = (consumables: ConsumableItem[] = []) => {
    return consumables.reduce((total, item) => total + item.cost, 0);
  };

  // Categories Management Component
  const CategoriesManagementComponent = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [categoryName, setCategoryName] = useState("");
    const [categoryNameEn, setCategoryNameEn] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categoryCode, setCategoryCode] = useState("");
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

    // Mock hierarchical categories data
    const [categories, setCategories] = useState([
      {
        id: "1",
        code: "SERV",
        nameAr: "خدمات",
        nameEn: "Services",
        description: "جميع أنواع الخدمات",
        parentId: null,
        level: 0,
        children: [
          {
            id: "2",
            code: "SERV-WASH",
            nameAr: "غسيل",
            nameEn: "Washing",
            description: "خدمات الغسيل",
            parentId: "1",
            level: 1,
            children: [
              {
                id: "3",
                code: "SERV-WASH-EXT",
                nameAr: "خارجي",
                nameEn: "Exterior",
                description: "غسيل خارجي",
                parentId: "2",
                level: 2,
                children: []
              },
              {
                id: "4",
                code: "SERV-WASH-INT",
                nameAr: "داخلي",
                nameEn: "Interior",
                description: "غسيل داخلي",
                parentId: "2",
                level: 2,
                children: []
              }
            ]
          },
          {
            id: "5",
            code: "SERV-MAINT",
            nameAr: "تشحيم",
            nameEn: "Lubrication",
            description: "خدمات التشحيم",
            parentId: "1",
            level: 1,
            children: [
              {
                id: "6",
                code: "SERV-MAINT-ENG",
                nameAr: "محرك",
                nameEn: "Engine",
                description: "تشحيم المحرك",
                parentId: "5",
                level: 2,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: "7",
        code: "PROD",
        nameAr: "منتجات",
        nameEn: "Products",
        description: "جميع المنتجات",
        parentId: null,
        level: 0,
        children: [
          {
            id: "8",
            code: "PROD-OILS",
            nameAr: "زيوت",
            nameEn: "Oils",
            description: "زيوت مختلفة",
            parentId: "7",
            level: 1,
            children: [
              {
                id: "9",
                code: "PROD-OILS-ENG",
                nameAr: "زيت محرك",
                nameEn: "Engine Oil",
                description: "زيوت المحرك",
                parentId: "8",
                level: 2,
                children: []
              }
            ]
          },
          {
            id: "10",
            code: "PROD-CLEAN",
            nameAr: "منظفات",
            nameEn: "Cleaners",
            description: "مواد التنظيف",
            parentId: "7",
            level: 1,
            children: [
              {
                id: "11",
                code: "PROD-CLEAN-SOAP",
                nameAr: "صابون",
                nameEn: "Soap",
                description: "صابون السيارات",
                parentId: "10",
                level: 2,
                children: []
              }
            ]
          }
        ]
      }
    ]);

    const resetForm = () => {
      setCategoryName("");
      setCategoryNameEn("");
      setParentCategory("none");
      setCategoryDescription("");
      setCategoryCode("");
      setEditingCategory(null);
    };

    const toggleNode = (nodeId: string) => {
      setExpandedNodes(prev => 
        prev.includes(nodeId) 
          ? prev.filter(id => id !== nodeId)
          : [...prev, nodeId]
      );
    };

    const handleSaveCategory = () => {
      if (!categoryName || !categoryCode) {
        toast({
          variant: "destructive",
          title: "خطأ في البيانات",
          description: "يرجى ملء الحقول المطلوبة"
        });
        return;
      }

      const newCategory = {
        id: editingCategory?.id || Date.now().toString(),
        code: categoryCode,
        nameAr: categoryName,
        nameEn: categoryNameEn,
        description: categoryDescription,
        parentId: (parentCategory && parentCategory !== "none") ? parentCategory : null,
        level: (parentCategory && parentCategory !== "none") ? getParentLevel(parentCategory) + 1 : 0,
        children: editingCategory?.children || []
      };

      if (editingCategory) {
        updateCategoryInTree(categories, newCategory);
        setCategories([...categories]);
        toast({
          title: "تم التحديث",
          description: "تم تحديث الفئة بنجاح"
        });
      } else {
        if (parentCategory && parentCategory !== "none") {
          addCategoryToParent(categories, parentCategory, newCategory);
        } else {
          setCategories([...categories, newCategory]);
        }
        toast({
          title: "تم الحفظ",
          description: "تم إضافة الفئة بنجاح"
        });
      }

      setIsDialogOpen(false);
      resetForm();
    };

    const getParentLevel = (parentId: string): number => {
      const findLevel = (cats: any[], id: string): number => {
        for (const cat of cats) {
          if (cat.id === id) return cat.level;
          if (cat.children) {
            const level = findLevel(cat.children, id);
            if (level !== -1) return level;
          }
        }
        return 0;
      };
      return findLevel(categories, parentId);
    };

    const updateCategoryInTree = (cats: any[], updatedCategory: any) => {
      for (let i = 0; i < cats.length; i++) {
        if (cats[i].id === updatedCategory.id) {
          cats[i] = { ...cats[i], ...updatedCategory };
          return;
        }
        if (cats[i].children) {
          updateCategoryInTree(cats[i].children, updatedCategory);
        }
      }
    };

    const addCategoryToParent = (cats: any[], parentId: string, newCategory: any) => {
      for (const cat of cats) {
        if (cat.id === parentId) {
          cat.children.push(newCategory);
          return;
        }
        if (cat.children) {
          addCategoryToParent(cat.children, parentId, newCategory);
        }
      }
    };

    const handleEditCategory = (category: any) => {
      setEditingCategory(category);
      setCategoryName(category.nameAr);
      setCategoryNameEn(category.nameEn);
      setCategoryCode(category.code);
      setCategoryDescription(category.description);
      setParentCategory(category.parentId || "none");
      setIsDialogOpen(true);
    };

    const handleDeleteCategory = (categoryId: string) => {
      const deleteFromTree = (cats: any[], id: string): any[] => {
        return cats.filter(cat => {
          if (cat.id === id) return false;
          if (cat.children) {
            cat.children = deleteFromTree(cat.children, id);
          }
          return true;
        });
      };
      
      setCategories(deleteFromTree(categories, categoryId));
      toast({
        title: "تم الحذف",
        description: "تم حذف الفئة بنجاح"
      });
    };

    const flattenCategories = (cats: any[]): any[] => {
      const result: any[] = [];
      const flatten = (categories: any[], parentPath = "") => {
        categories.forEach(cat => {
          const fullPath = parentPath ? `${parentPath} > ${cat.nameAr}` : cat.nameAr;
          result.push({ ...cat, fullPath });
          if (cat.children && cat.children.length > 0) {
            flatten(cat.children, fullPath);
          }
        });
      };
      flatten(cats);
      return result;
    };

    const renderCategoryTree = (cats: any[], level = 0) => {
      return cats.map(category => (
        <div key={category.id} className="space-y-2">
          <Card className={`p-4 ${level > 0 ? 'ml-6 border-l-2 border-l-blue-200' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {category.children && category.children.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleNode(category.id)}
                    className="p-1"
                  >
                    <ChevronDown className={`h-4 w-4 transform transition-transform ${
                      expandedNodes.includes(category.id) ? 'rotate-180' : 'rotate-0'
                    }`} />
                  </Button>
                )}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {category.code}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{category.nameAr}</h4>
                    <p className="text-sm text-muted-foreground">{category.nameEn}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  المستوى {category.level + 1}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditCategory(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {category.description && (
              <p className="text-sm text-muted-foreground mt-2">{category.description}</p>
            )}
          </Card>
          
          {category.children && 
           category.children.length > 0 && 
           expandedNodes.includes(category.id) && (
            <div className="space-y-2">
              {renderCategoryTree(category.children, level + 1)}
            </div>
          )}
        </div>
      ));
    };

    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">إدارة الفئات والتصنيف الهرمي</h2>
            <p className="text-muted-foreground">تنظيم الأصناف في فئات هرمية متدرجة</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة فئة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl" dir="rtl">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}
                </DialogTitle>
                <DialogDescription>
                  قم بإدخال بيانات الفئة الجديدة أو تعديل الفئة الحالية
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryCode">كود الفئة *</Label>
                    <Input
                      id="categoryCode"
                      value={categoryCode}
                      onChange={(e) => setCategoryCode(e.target.value)}
                      placeholder="مثال: SERV-WASH"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentCategory">الفئة الأب</Label>
                    <Select value={parentCategory} onValueChange={setParentCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة الأب (اختياري)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">لا يوجد (فئة رئيسية)</SelectItem>
                        {flattenCategories(categories).map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.fullPath}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryName">اسم الفئة (عربي) *</Label>
                    <Input
                      id="categoryName"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="مثال: خدمات الغسيل"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryNameEn">اسم الفئة (إنجليزي)</Label>
                    <Input
                      id="categoryNameEn"
                      value={categoryNameEn}
                      onChange={(e) => setCategoryNameEn(e.target.value)}
                      placeholder="مثال: Washing Services"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryDescription">وصف الفئة</Label>
                  <Textarea
                    id="categoryDescription"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    placeholder="وصف مختصر للفئة..."
                    rows={3}
                  />
                </div>

                <Separator />

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleSaveCategory}>
                    {editingCategory ? "تحديث" : "حفظ"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Tree */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              شجرة الفئات
            </CardTitle>
            <CardDescription>
              عرض هرمي لجميع الفئات والتصنيفات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.length > 0 ? (
                renderCategoryTree(categories)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد فئات محددة بعد. قم بإضافة الفئة الأولى.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{flattenCategories(categories).length}</p>
              <p className="text-sm text-gray-600">إجمالي الفئات</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{categories.length}</p>
              <p className="text-sm text-gray-600">الفئات الرئيسية</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.max(...flattenCategories(categories).map(c => c.level)) + 1}
              </p>
              <p className="text-sm text-gray-600">أعمق مستوى</p>
            </div>
          </Card>
        </div>
      </div>
    );
  };
  const UnitTemplatesComponent = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<any>(null);
    const [templateName, setTemplateName] = useState("");
    const [baseUnit, setBaseUnit] = useState("");
    const [baseUnitSymbol, setBaseUnitSymbol] = useState("");
    const [conversions, setConversions] = useState<any[]>([]);
    const [currentConversion, setCurrentConversion] = useState({
      unitName: "",
      unitSymbol: "",
      conversionFactor: 1,
      largerUnitName: "",
      largerUnitSymbol: ""
    });

    // Mock data
    const [templates, setTemplates] = useState([
      {
        id: "1",
        templateName: "قالب التغليف الصغير",
        baseUnit: "حبة",
        baseUnitSymbol: "PCS",
        conversions: [
          {
            id: "1",
            unitName: "حبة",
            unitSymbol: "PCS",
            conversionFactor: 12,
            largerUnitName: "درزن",
            largerUnitSymbol: "DZ"
          },
          {
            id: "2",
            unitName: "درزن",
            unitSymbol: "DZ",
            conversionFactor: 8,
            largerUnitName: "كرتون",
            largerUnitSymbol: "CTN"
          }
        ],
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15"
      }
    ]);

    const resetForm = () => {
      setTemplateName("");
      setBaseUnit("");
      setBaseUnitSymbol("");
      setConversions([]);
      setCurrentConversion({
        unitName: "",
        unitSymbol: "",
        conversionFactor: 1,
        largerUnitName: "",
        largerUnitSymbol: ""
      });
      setEditingTemplate(null);
    };

    const handleAddConversion = () => {
      if (!currentConversion.unitName || !currentConversion.largerUnitName || currentConversion.conversionFactor < 1) {
        toast({
          variant: "destructive",
          title: "خطأ في البيانات",
          description: "يرجى ملء جميع الحقول والتأكد من أن معامل التحويل أكبر من أو يساوي 1"
        });
        return;
      }

      const newConversion = {
        id: Date.now().toString(),
        ...currentConversion
      };

      setConversions([...conversions, newConversion]);
      setCurrentConversion({
        unitName: "",
        unitSymbol: "",
        conversionFactor: 1,
        largerUnitName: "",
        largerUnitSymbol: ""
      });
    };

    const handleRemoveConversion = (id: string) => {
      setConversions(conversions.filter(conv => conv.id !== id));
    };

    const handleSaveTemplate = () => {
      if (!templateName || !baseUnit || !baseUnitSymbol) {
        toast({
          variant: "destructive",
          title: "خطأ في البيانات",
          description: "يرجى ملء جميع الحقول الأساسية"
        });
        return;
      }

      const newTemplate = {
        id: editingTemplate?.id || Date.now().toString(),
        templateName,
        baseUnit,
        baseUnitSymbol,
        conversions,
        createdAt: editingTemplate?.createdAt || new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      if (editingTemplate) {
        setTemplates(templates.map(t => t.id === editingTemplate.id ? newTemplate : t));
        toast({
          title: "تم التحديث",
          description: "تم تحديث قالب الوحدة بنجاح"
        });
      } else {
        setTemplates([...templates, newTemplate]);
        toast({
          title: "تم الحفظ",
          description: "تم إضافة قالب الوحدة بنجاح"
        });
      }

      setIsDialogOpen(false);
      resetForm();
    };

    const handleEditTemplate = (template: any) => {
      setEditingTemplate(template);
      setTemplateName(template.templateName);
      setBaseUnit(template.baseUnit);
      setBaseUnitSymbol(template.baseUnitSymbol);
      setConversions(template.conversions);
      setIsDialogOpen(true);
    };

    const handleDeleteTemplate = (id: string) => {
      setTemplates(templates.filter(t => t.id !== id));
      toast({
        title: "تم الحذف",
        description: "تم حذف قالب الوحدة بنجاح"
      });
    };

    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">إعدادات قوالب الوحدات</h2>
            <p className="text-muted-foreground">إدارة قوالب تحويل وحدات القياس للمنتجات</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="gap-2">
                <Plus className="h-4 w-4" />
                أضف قالب الوحدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
              <DialogHeader>
                <DialogTitle>
                  {editingTemplate ? "تعديل قالب الوحدة" : "إضافة قالب وحدة جديد"}
                </DialogTitle>
                <DialogDescription>
                  قم بتعريف العلاقة بين الوحدات المختلفة للمنتج مع معاملات التحويل
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Template Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات القالب الأساسية</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="templateName">اسم القالب</Label>
                      <Input
                        id="templateName"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        placeholder="مثال: قالب التغليف الصغير"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="baseUnit">الوحدة الأساسية</Label>
                      <Input
                        id="baseUnit"
                        value={baseUnit}
                        onChange={(e) => setBaseUnit(e.target.value)}
                        placeholder="مثال: حبة"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="baseUnitSymbol">رمز الوحدة الأساسية</Label>
                      <Input
                        id="baseUnitSymbol"
                        value={baseUnitSymbol}
                        onChange={(e) => setBaseUnitSymbol(e.target.value)}
                        placeholder="مثال: PCS"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Add Conversion */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إضافة طبقة تحويل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="unitName">اسم الوحدة</Label>
                        <Input
                          id="unitName"
                          value={currentConversion.unitName}
                          onChange={(e) => setCurrentConversion({...currentConversion, unitName: e.target.value})}
                          placeholder="مثال: حبة"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unitSymbol">رمز الوحدة</Label>
                        <Input
                          id="unitSymbol"
                          value={currentConversion.unitSymbol}
                          onChange={(e) => setCurrentConversion({...currentConversion, unitSymbol: e.target.value})}
                          placeholder="مثال: PCS"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="conversionFactor">معامل التحويل</Label>
                        <Input
                          id="conversionFactor"
                          type="number"
                          min="1"
                          value={currentConversion.conversionFactor}
                          onChange={(e) => setCurrentConversion({...currentConversion, conversionFactor: parseInt(e.target.value) || 1})}
                          placeholder="12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="largerUnitName">الوحدة الأكبر</Label>
                        <Input
                          id="largerUnitName"
                          value={currentConversion.largerUnitName}
                          onChange={(e) => setCurrentConversion({...currentConversion, largerUnitName: e.target.value})}
                          placeholder="مثال: درزن"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="largerUnitSymbol">رمز الوحدة الأكبر</Label>
                        <Input
                          id="largerUnitSymbol"
                          value={currentConversion.largerUnitSymbol}
                          onChange={(e) => setCurrentConversion({...currentConversion, largerUnitSymbol: e.target.value})}
                          placeholder="مثال: DZ"
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddConversion} variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      أضف الوحدة
                    </Button>
                  </CardContent>
                </Card>

                {/* Conversions Table */}
                {conversions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">طبقات التحويل المضافة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {conversions.map((conversion, index) => (
                          <div key={conversion.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center gap-4">
                              <span>{index + 1}</span>
                              <span>{conversion.unitName}</span>
                              <Badge variant="secondary">{conversion.unitSymbol}</Badge>
                              <span>×{conversion.conversionFactor}</span>
                              <span>→</span>
                              <span>{conversion.largerUnitName}</span>
                              <Badge variant="secondary">{conversion.largerUnitSymbol}</Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveConversion(conversion.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Separator />

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleSaveTemplate}>
                    {editingTemplate ? "تحديث" : "حفظ"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Templates List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5" />
              قوالب الوحدات المعرفة
            </CardTitle>
            <CardDescription>
              جميع قوالب تحويل الوحدات المتاحة في النظام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template) => (
                <Card key={template.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="font-medium">{template.templateName}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">الوحدة الأساسية:</span>
                        <span>{template.baseUnit}</span>
                        <Badge variant="outline">{template.baseUnitSymbol}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.conversions.map((conv, index) => (
                          <div key={conv.id} className="flex items-center gap-1 text-sm">
                            <Badge variant="secondary" className="text-xs">
                              {conv.unitSymbol}
                            </Badge>
                            <span>→</span>
                            <Badge variant="secondary" className="text-xs">
                              {conv.largerUnitSymbol}
                            </Badge>
                            <span className="text-muted-foreground">({conv.conversionFactor})</span>
                            {index < template.conversions.length - 1 && <span className="mx-1">|</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* العنوان والإحصائيات */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المنتجات والخدمات</h1>
            <p className="text-gray-600">إضافة وإدارة جميع أنواع الأصناف والخدمات</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{items.length}</p>
                <p className="text-sm text-gray-600">إجمالي الأصناف</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{items.filter(i => i.type === "خدمة").length}</p>
                <p className="text-sm text-gray-600">الخدمات</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{items.filter(i => i.type === "منتج").length}</p>
                <p className="text-sm text-gray-600">المنتجات</p>
              </div>
            </Card>
          </div>
        </div>

          {/* التبويبات الرئيسية */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6 gap-1">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              قائمة الأصناف
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة صنف
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              الفئات
            </TabsTrigger>
            <TabsTrigger value="unit-templates" className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4" />
              قوالب الوحدات
            </TabsTrigger>
            <TabsTrigger value="consumption" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              توزيع المستهلكات
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          {/* قائمة الأصناف */}
          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <CardTitle>قائمة الأصناف والخدمات</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="البحث في الأصناف..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="تصفية حسب النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        <SelectItem value="خدمة">خدمة</SelectItem>
                        <SelectItem value="منتج">منتج</SelectItem>
                        <SelectItem value="مستهلكات">مستهلكات</SelectItem>
                        <SelectItem value="قطعة غيار">قطع غيار</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="تصفية حسب الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الفئات</SelectItem>
                        {categories.map((category, index) => (
                          <SelectItem key={index} value={category.value}>{category.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className={getTypeColor(item.type)}>
                                {item.type}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </div>
                            <Badge variant="outline" className="mb-2">{item.code}</Badge>
                            <h3 className="font-bold text-lg mb-1">{item.nameAr}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.nameEn}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            {item.image ? (
                              <img src={item.image} alt={item.nameAr} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <Camera className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">السعر:</span>
                            <span className="font-bold text-green-600">{item.price} ر.س</span>
                          </div>
                          {item.type === "خدمة" && item.duration && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">المدة:</span>
                              <span className="text-sm">{item.duration} دقيقة</span>
                            </div>
                          )}
                          {item.type !== "خدمة" && item.quantity !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">المخزون:</span>
                              <span className={`text-sm ${item.quantity <= (item.minStock || 0) ? 'text-red-600 font-medium' : ''}`}>
                                {item.quantity} {item.unit}
                              </span>
                            </div>
                          )}
                          {item.costPrice && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">التكلفة:</span>
                              <span className="text-sm">{item.costPrice} ر.س</span>
                            </div>
                          )}
                          {item.type === "خدمة" && item.consumables && item.consumables.length > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">تكلفة المستهلكات:</span>
                              <span className="text-sm text-orange-600">{calculateConsumablesCost(item.consumables).toFixed(2)} ر.س</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(item)}>
                            <Edit className="w-4 h-4 mr-2" />
                            تعديل
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* إضافة صنف جديد */}
          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingItem ? `تعديل: ${editingItem.nameAr}` : "إضافة صنف/خدمة جديدة"}
                </CardTitle>
                <CardDescription>
                  املأ البيانات الأساسية للصنف الجديد
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* نوع الصنف */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">نوع الصنف *</Label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {itemTypes.map((type) => (
                      <Card 
                        key={type.value}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedItemType === type.value || formData.type === type.value
                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedItemType(type.value);
                          handleInputChange("type", type.value);
                        }}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${type.color} flex items-center justify-center`}>
                            <type.icon className="w-6 h-6 text-white" />
                          </div>
                          <p className="font-medium">{type.label}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {(selectedItemType || editingItem) && (
                  <>
                    <Separator />

                    {/* بيانات الصنف الأساسية */}
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">البيانات الأساسية</TabsTrigger>
                        <TabsTrigger value="pricing">الأسعار</TabsTrigger>
                        <TabsTrigger value="inventory">المخزون</TabsTrigger>
                        {(selectedItemType === 'خدمة' || formData.type === 'خدمة') && (
                          <TabsTrigger value="consumption">المستهلكات</TabsTrigger>
                        )}
                      </TabsList>

                      {/* البيانات الأساسية */}
                      <TabsContent value="basic" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="code">كود الصنف</Label>
                            <Input 
                              id="code" 
                              value={formData.code}
                              onChange={(e) => handleInputChange("code", e.target.value)}
                              placeholder="سيتم توليده تلقائياً أو أدخله يدوياً" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nameAr">الاسم بالعربية *</Label>
                            <Input 
                              id="nameAr" 
                              value={formData.nameAr}
                              onChange={(e) => handleInputChange("nameAr", e.target.value)}
                              placeholder="اسم الصنف بالعربية" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nameEn">الاسم بالإنجليزية</Label>
                            <Input 
                              id="nameEn" 
                              value={formData.nameEn}
                              onChange={(e) => handleInputChange("nameEn", e.target.value)}
                              placeholder="اسم الصنف بالإنجليزية" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">الفئة الشجرية *</Label>
                            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر أو أضف فئة جديدة" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category, index) => (
                                  <SelectItem key={index} value={category.value}>{category.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="unit">وحدة القياس *</Label>
                            <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر وحدة القياس" />
                              </SelectTrigger>
                              <SelectContent>
                                {units.map((unit, index) => (
                                  <SelectItem key={index} value={unit}>{unit}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {(selectedItemType === 'خدمة' || formData.type === 'خدمة') && (
                            <div className="space-y-2">
                              <Label htmlFor="duration">مدة الخدمة (دقيقة)</Label>
                              <Input 
                                id="duration" 
                                type="number" 
                                value={formData.duration}
                                onChange={(e) => handleInputChange("duration", parseFloat(e.target.value))}
                                placeholder="20" 
                              />
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">الوصف</Label>
                          <Textarea 
                            id="description" 
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="وصف مفصل للصنف..." 
                            rows={3} 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>صورة الصنف</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-2">اضغط لرفع صورة أو اسحبها هنا</p>
                            <Button variant="outline">اختر صورة</Button>
                          </div>
                        </div>
                      </TabsContent>

                      {/* الأسعار */}
                      <TabsContent value="pricing" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {(selectedItemType !== 'خدمة' && formData.type !== 'خدمة') && (
                            <div className="space-y-2">
                              <Label htmlFor="costPrice">سعر التكلفة *</Label>
                              <Input 
                                id="costPrice" 
                                type="number" 
                                value={formData.costPrice}
                                onChange={(e) => handleInputChange("costPrice", parseFloat(e.target.value))}
                                placeholder="25.00" 
                              />
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="price">
                              {(selectedItemType === 'خدمة' || formData.type === 'خدمة') ? 'سعر الخدمة *' : 'سعر البيع *'}
                            </Label>
                            <Input 
                              id="price" 
                              type="number" 
                              value={formData.price}
                              onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                              placeholder="40.00" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="discountPrice">سعر بعد الخصم</Label>
                            <Input 
                              id="discountPrice" 
                              type="number" 
                              value={formData.discountPrice}
                              onChange={(e) => handleInputChange("discountPrice", parseFloat(e.target.value))}
                              placeholder="35.00" 
                            />
                          </div>
                          {(selectedItemType !== 'خدمة' && formData.type !== 'خدمة') && (
                            <div className="space-y-2">
                              <Label htmlFor="wholesalePrice">سعر الجملة</Label>
                              <Input 
                                id="wholesalePrice" 
                                type="number" 
                                value={formData.wholesalePrice}
                                onChange={(e) => handleInputChange("wholesalePrice", parseFloat(e.target.value))}
                                placeholder="30.00" 
                              />
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* المخزون */}
                      <TabsContent value="inventory" className="space-y-4">
                        {(selectedItemType !== 'خدمة' && formData.type !== 'خدمة') && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="quantity">الرصيد الافتتاحي</Label>
                              <Input 
                                id="quantity" 
                                type="number" 
                                value={formData.quantity}
                                onChange={(e) => handleInputChange("quantity", parseInt(e.target.value))}
                                placeholder="100" 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="minStock">الحد الأدنى للمخزون</Label>
                              <Input 
                                id="minStock" 
                                type="number" 
                                value={formData.minStock}
                                onChange={(e) => handleInputChange("minStock", parseInt(e.target.value))}
                                placeholder="10" 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="maxStock">الحد الأعلى للمخزون</Label>
                              <Input 
                                id="maxStock" 
                                type="number" 
                                value={formData.maxStock}
                                onChange={(e) => handleInputChange("maxStock", parseInt(e.target.value))}
                                placeholder="500" 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reorderPoint">نقطة إعادة الطلب</Label>
                              <Input 
                                id="reorderPoint" 
                                type="number" 
                                value={formData.reorderPoint}
                                onChange={(e) => handleInputChange("reorderPoint", parseInt(e.target.value))}
                                placeholder="20" 
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="warehouse">المستودع الافتراضي</Label>
                            <Select value={formData.warehouse} onValueChange={(value) => handleInputChange("warehouse", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المستودع" />
                              </SelectTrigger>
                              <SelectContent>
                                {warehouses.map((warehouse) => (
                                  <SelectItem key={warehouse.value} value={warehouse.value}>{warehouse.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {(selectedItemType !== 'خدمة' && formData.type !== 'خدمة') && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="barcode">الباركود</Label>
                                <Input 
                                  id="barcode" 
                                  value={formData.barcode}
                                  onChange={(e) => handleInputChange("barcode", e.target.value)}
                                  placeholder="1234567890123" 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="supplier">المورد الافتراضي</Label>
                                <Input 
                                  id="supplier" 
                                  value={formData.supplier}
                                  onChange={(e) => handleInputChange("supplier", e.target.value)}
                                  placeholder="اسم المورد" 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="manufacturer">الشركة المصنعة</Label>
                                <Input 
                                  id="manufacturer" 
                                  value={formData.manufacturer}
                                  onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                                  placeholder="اسم الشركة المصنعة" 
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </TabsContent>

                      {/* المستهلكات للخدمات */}
                      {(selectedItemType === 'خدمة' || formData.type === 'خدمة') && (
                        <TabsContent value="consumption" className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">المواد المستهلكة في الخدمة</h3>
                            <Button variant="outline" size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              إضافة مادة
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            {/* مثال على مادة مستهلكة */}
                            <Card>
                              <CardContent className="p-4">
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
                                  <div className="space-y-2">
                                    <Label>المادة المستهلكة</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="اختر المادة" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="soap">صابون مركز</SelectItem>
                                        <SelectItem value="towel">فوطة ميكروفايبر</SelectItem>
                                        <SelectItem value="wax">شمع سيارات</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>الكمية</Label>
                                    <Input type="number" placeholder="0.05" step="0.01" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>الوحدة</Label>
                                    <Input value="لتر" readOnly />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>التكلفة التقديرية</Label>
                                    <Input value="0.80" readOnly />
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">إجمالي تكلفة المستهلكات:</span>
                              <span className="text-lg font-bold text-green-600">2.55 ر.س</span>
                            </div>
                          </div>
                        </TabsContent>
                      )}
                    </Tabs>

                    {/* أزرار الحفظ */}
                    <Separator />
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Switch 
                          id="active" 
                          checked={formData.status === "نشط"}
                          onCheckedChange={(checked) => handleInputChange("status", checked ? "نشط" : "غير نشط")}
                        />
                        <Label htmlFor="active">فعال</Label>
                      </div>
                      
                      <div className="flex gap-2 lg:ml-auto">
                        <Button variant="outline" onClick={() => {
                          setActiveTab("list");
                          resetForm();
                          setSelectedItemType("");
                          setEditingItem(null);
                        }}>
                          <X className="w-4 h-4 mr-2" />
                          إلغاء
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          {editingItem ? "تحديث الصنف" : "حفظ الصنف"}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* إدارة الفئات */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الفئات والتصنيف الهرمي</CardTitle>
                <CardDescription>
                  إنشاء وتنظيم الفئات الشجرية للأصناف
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">قريباً - إدارة الفئات الشجرية</p>
                  <p className="text-sm text-gray-500">ستتمكن من إنشاء وتنظيم الفئات الهرمية للأصناف</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* إدارة الفئات */}
          <TabsContent value="categories" className="space-y-6">
            <CategoriesManagementComponent />
          </TabsContent>

          {/* قوالب الوحدات */}
          <TabsContent value="unit-templates" className="space-y-6">
            <UnitTemplatesComponent />
          </TabsContent>

          {/* توزيع المستهلكات */}
          <TabsContent value="consumption" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>شاشة توزيع المستهلكات على الخدمات</CardTitle>
                <CardDescription>
                  ربط المواد المستهلكة بالخدمات لحساب التكلفة الفعلية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Wrench className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">قريباً - إدارة توزيع المستهلكات</p>
                  <p className="text-sm text-gray-500">ستتمكن من ربط المواد المستهلكة بالخدمات وحساب التكاليف</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* التقارير */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تقارير الأصناف والمنتجات</CardTitle>
                <CardDescription>
                  تقارير شاملة عن الأصناف والمبيعات والمخزون
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">قريباً - تقارير الأصناف</p>
                  <p className="text-sm text-gray-500">ستحصل على تقارير مفصلة عن الأصناف والحركات المخزنية</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Items;