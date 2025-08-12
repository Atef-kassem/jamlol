import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const ProductTableHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">قائمة المنتجات</h3>
        <p className="text-sm text-muted-foreground">عرض وإدارة جميع المنتجات المتاحة</p>
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="البحث عن منتج..." className="pr-10 w-64" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductTableHeader;