import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, PRODUCT_UNITS, PRODUCT_STATUSES } from "@/lib/productConstants";
import FormField from "./FormField";

const ProductForm = ({ 
  isOpen, 
  onClose, 
  newProduct, 
  setNewProduct, 
  onSubmit 
}) => {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إضافة منتج جديد</DialogTitle>
          <DialogDescription>
            أضف منتجاً جديداً إلى قائمة المنتجات المتاحة
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField
            label="اسم المنتج"
            value={newProduct.name}
            onChange={(value) => setNewProduct({...newProduct, name: value})}
            placeholder="أدخل اسم المنتج"
          />
          
          <FormField
            label="التصنيف"
            type="select"
            value={newProduct.category}
            onChange={(value) => setNewProduct({...newProduct, category: value})}
            placeholder="اختر التصنيف"
            options={PRODUCT_CATEGORIES}
          />
          
          <FormField
            label="المورد"
            value={newProduct.supplier}
            onChange={(value) => setNewProduct({...newProduct, supplier: value})}
            placeholder="اسم المورد"
          />
          
          <FormField
            label="السعر (ر.س)"
            type="number"
            value={newProduct.price}
            onChange={(value) => setNewProduct({...newProduct, price: value})}
            placeholder="0.00"
          />
          
          <FormField
            label="وحدة القياس"
            type="select"
            value={newProduct.unit}
            onChange={(value) => setNewProduct({...newProduct, unit: value})}
            placeholder="اختر وحدة القياس"
            options={PRODUCT_UNITS}
          />
          
          <FormField
            label="الحالة"
            type="select"
            value={newProduct.status}
            onChange={(value) => setNewProduct({...newProduct, status: value})}
            options={PRODUCT_STATUSES}
          />
          
          <div className="col-span-2">
            <FormField
              label="وصف المنتج"
              type="textarea"
              value={newProduct.description}
              onChange={(value) => setNewProduct({...newProduct, description: value})}
              placeholder="أدخل وصف المنتج..."
              rows={3}
            />
          </div>
          
          <div className="col-span-2">
            <FormField
              label="صورة المنتج"
              type="file"
              onChange={(file) => setNewProduct({...newProduct, image: file})}
              accept="image/*"
            />
            {newProduct.image && (
              <p className="text-sm text-muted-foreground mt-1">
                تم اختيار: {newProduct.image.name}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={onSubmit}>
            إضافة المنتج
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;