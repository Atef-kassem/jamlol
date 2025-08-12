import { useState, useRef } from "react";
import { Plus, Store, Building, Phone, MapPin, Users, Folder, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BranchStatsCards } from "@/components/Settings/BranchSettings/BranchStatsCards";
import { BranchesTable } from "@/components/Settings/BranchSettings/BranchesTable";
import { BranchBasicInfo } from "@/components/Settings/BranchSettings/BranchBasicInfo";
import { BranchContactInfo } from "@/components/Settings/BranchSettings/BranchContactInfo";
import { BranchAddressInfo } from "@/components/Settings/BranchSettings/BranchAddressInfo";
import { BranchManagementInfo } from "@/components/Settings/BranchSettings/BranchManagementInfo";

// Branch structure: { id, name, code, nameEn, description, phone, mobile, email, website, country, city, district, street, postalCode, status, manager, supervisor, capacity, openingHours }

export default function BranchSettings() {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const [editingBranch, setEditingBranch] = useState(null);
  const [activeTab, setActiveTab] = useState("list");

  const tabs = ["list", "details", "contact", "address", "management", "attachments"];
  
  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };
  
  const [branches, setBranches] = useState([
    {
      id: "1",
      name: "الفرع الرئيسي - دجليوة",
      code: "MAIN-DGL",
      nameEn: "Dagliwa Main Branch",
      description: "الفرع الرئيسي لمغاسل دجليوة للسيارات في منطقة الرياض",
      phone: "+966112345678",
      mobile: "+966501234567",
      email: "main@dagliwa.com",
      website: "www.dagliwa.com",
      country: "المملكة العربية السعودية",
      city: "الرياض",
      district: "حي الملقا",
      street: "شارع الملك فهد",
      postalCode: "12345",
      status: "active",
      manager: "أحمد محمد العتيبي",
      supervisor: "سعد أحمد الشهري",
      capacity: 20,
      openingHours: "6:00 ص - 12:00 م"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    nameEn: "",
    description: "",
    phone: "",
    mobile: "",
    email: "",
    website: "",
    countryId: "",
    cityId: "",
    districtId: "",
    street: "",
    postalCode: "",
    status: "active",
    manager: "",
    supervisor: "",
    capacity: 10,
    openingHours: "6:00 ص - 12:00 م"
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (editingBranch) {
        setBranches(prev => prev.map(branch => 
          branch.id === editingBranch.id ? { ...branch, ...formData } : branch
        ));
        toast({ title: "تم التحديث بنجاح", description: "تم تحديث بيانات الفرع بنجاح" });
      } else {
        const newBranch = { id: Date.now().toString(), ...formData };
        setBranches(prev => [...prev, newBranch]);
        toast({ title: "تم الإضافة بنجاح", description: "تم إضافة الفرع الجديد بنجاح" });
      }
      setEditingBranch(null);
      resetForm();
    } catch (error) {
      toast({ title: "خطأ في الحفظ", description: "حدث خطأ أثناء حفظ البيانات", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", code: "", nameEn: "", description: "", phone: "", mobile: "", email: "", website: "",
      countryId: "", cityId: "", districtId: "", street: "", postalCode: "",
      status: "active", manager: "", supervisor: "", capacity: 10, openingHours: "6:00 ص - 12:00 م"
    });
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData(branch);
    setActiveTab("details");
  };

  const handleDelete = (branchId) => {
    setBranches(prev => prev.filter(branch => branch.id !== branchId));
    toast({ title: "تم الحذف", description: "تم حذف الفرع بنجاح" });
  };

  const handleToggleStatus = (branchId) => {
    setBranches(prev => prev.map(branch => 
      branch.id === branchId ? { ...branch, status: branch.status === "active" ? "inactive" : "active" } : branch
    ));
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      toast({ 
        title: "تم رفع الملفات", 
        description: `تم رفع ${files.length} ملف بنجاح` 
      });
      // يمكن إضافة منطق إضافي هنا لمعالجة الملفات
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-blue bg-clip-text text-transparent">إدارة الفروع</h1>
          <p className="text-muted-foreground">إدارة فروع الشركة ومواقعها والمسؤولين عنها</p>
        </div>
        <Button 
          onClick={() => { setEditingBranch(null); resetForm(); setActiveTab("details"); }}
          className="gap-2 bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          إضافة فرع جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 p-1 bg-gradient-to-r from-card to-card/80 border shadow-lg">
          <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105">
            <Store className="w-4 h-4" />قائمة الفروع
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105">
            <Building className="w-4 h-4" />البيانات الأساسية
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105">
            <Phone className="w-4 h-4" />معلومات الاتصال
          </TabsTrigger>
          <TabsTrigger value="address" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105">
            <MapPin className="w-4 h-4" />العنوان
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105">
            <Users className="w-4 h-4" />المسؤولين
          </TabsTrigger>
          <TabsTrigger value="attachments" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary-blue data-[state=active]:text-white transition-all duration-300 hover:scale-105">
            <Folder className="w-4 h-4" />المرفقات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <BranchStatsCards branches={branches} />
          <BranchesTable branches={branches} handleEdit={handleEdit} handleDelete={handleDelete} handleToggleStatus={handleToggleStatus} />
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <BranchBasicInfo formData={formData} handleInputChange={handleInputChange} editingBranch={editingBranch} />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => { resetForm(); setActiveTab("list"); }}>إلغاء</Button>
            <Button onClick={handleNext} className="gap-2"><ArrowRight className="w-4 h-4" />التالي</Button>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <BranchContactInfo formData={formData} handleInputChange={handleInputChange} />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => { resetForm(); setActiveTab("list"); }}>إلغاء</Button>
            <Button onClick={handleNext} className="gap-2"><ArrowRight className="w-4 h-4" />التالي</Button>
          </div>
        </TabsContent>

        <TabsContent value="address" className="space-y-6">
          <BranchAddressInfo formData={formData} handleInputChange={handleInputChange} />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => { resetForm(); setActiveTab("list"); }}>إلغاء</Button>
            <Button onClick={handleNext} className="gap-2"><ArrowRight className="w-4 h-4" />التالي</Button>
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <BranchManagementInfo formData={formData} handleInputChange={handleInputChange} />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => { resetForm(); setActiveTab("list"); }}>إلغاء</Button>
            <Button onClick={handleNext} className="gap-2"><ArrowRight className="w-4 h-4" />التالي</Button>
          </div>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-6">
          <div className="grid gap-6">
            <div 
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
              onClick={handleFileSelect}
            >
              <Folder className="w-12 h-12 mx-auto text-muted-foreground mb-4 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
              <p className="text-lg font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">رفع المرفقات</p>
              <p className="text-sm text-muted-foreground mt-2">اسحب وأفلت الملفات أو انقر للاختيار</p>
              <Button 
                variant="outline" 
                className="mt-4 group-hover:border-primary group-hover:text-primary transition-all duration-200"
                onClick={handleFileSelect}
              >
                اختيار الملفات
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => { resetForm(); setActiveTab("list"); }}>إلغاء</Button>
            <Button onClick={handleSave} className="gap-2"><Folder className="w-4 h-4" />{editingBranch ? "تحديث الفرع" : "إضافة الفرع"}</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}