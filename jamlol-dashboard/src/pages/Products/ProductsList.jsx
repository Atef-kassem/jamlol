import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ProductsHeader from "@/components/Products/ProductsHeader";
import ProductsStats from "@/components/Products/ProductsStats";
import ProductForm from "@/components/Products/ProductForm";
import ProductsTable from "@/components/Products/ProductsTable";

const ProductsList = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([
    {
      id: "PRD-001",
      name: "أرز أبيض مصري فاخر",
      category: "الحبوب والبقوليات",
      supplier: "شركة الرياض للمواد الغذائية",
      price: "45.50",
      unit: "كيس 50 كيلو",
      status: "متاح",
      stock: 150,
      rating: 4.8,
      orders: 234,
      description: "أرز أبيض مصري عالي الجودة"
    },
    {
      id: "PRD-002",
      name: "تمر مجهول فاخر", 
      category: "التمور والمكسرات",
      supplier: "مؤسسة النخيل للتمور",
      price: "89.00",
      unit: "كيلو",
      status: "متاح",
      stock: 78,
      rating: 4.9,
      orders: 156,
      description: "تمر مجهول فاخر من أجود الأنواع"
    },
    {
      id: "PRD-003",
      name: "زيت الزيتون البكر الممتاز",
      category: "الزيوت والدهون",
      supplier: "شركة الأندلس للزيوت",
      price: "125.75",
      unit: "لتر",
      status: "قيد المراجعة",
      stock: 45,
      rating: 4.6,
      orders: 89,
      description: "زيت زيتون بكر ممتاز من أجود الأنواع"
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    supplier: '',
    price: '',
    unit: '',
    status: 'متاح',
    stock: 0,
    description: '',
    image: null
  });


  const handleAddProduct = () => {
    const productToAdd = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      ...newProduct,
      rating: 0,
      orders: 0
    };

    setProducts([...products, productToAdd]);
    setIsDialogOpen(false);
    setNewProduct({
      name: '',
      category: '',
      supplier: '',
      price: '',
      unit: '',
      status: 'متاح',
      stock: 0,
      description: '',
      image: null
    });
    
    toast({
      title: "تم إضافة المنتج بنجاح",
      description: "تم إضافة المنتج الجديد إلى قائمة المنتجات"
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <ProductsHeader onAddClick={() => setIsDialogOpen(true)} />
      
      <ProductsStats />
      
      <ProductsTable products={products} />
      
      <ProductForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default ProductsList;