import React from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const ProductsHeader = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-primary">قائمة المنتجات</h1>
        <p className="text-muted-foreground">إدارة وعرض جميع المنتجات المتاحة في المنصة</p>
      </div>
      <Button className="gap-2" onClick={onAddClick}>
        <Plus className="w-4 h-4" />
        إضافة منتج جديد
      </Button>
    </div>
  );
};

export default ProductsHeader;