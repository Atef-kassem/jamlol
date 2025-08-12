import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from "lucide-react";
import { getStatusColor } from "@/lib/productConstants";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableActions from "./ProductTableActions";

const ProductsTable = ({ products }) => {

  return (
    <Card>
      <div className="p-6">
        <ProductTableHeader />
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">رمز المنتج</TableHead>
              <TableHead className="text-right">اسم المنتج</TableHead>
              <TableHead className="text-right">التصنيف</TableHead>
              <TableHead className="text-right">المورد</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">وحدة القياس</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-mono font-medium">{product.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell className="font-mono">{product.price} ر.س</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(product.status)}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ProductTableActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;