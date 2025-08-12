import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductsStats = () => {
  const stats = [
    {
      title: "إجمالي المنتجات",
      value: "1,856",
      change: "+67 هذا الشهر",
      valueColor: "text-primary"
    },
    {
      title: "منتجات متاحة",
      value: "1,523",
      change: "82% من الإجمالي",
      valueColor: "text-green-600"
    },
    {
      title: "قيد المراجعة",
      value: "234",
      change: "13% من الإجمالي",
      valueColor: "text-yellow-600"
    },
    {
      title: "تصنيفات المنتجات",
      value: "45",
      change: "تصنيف مختلف",
      valueColor: "text-blue-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.valueColor}`}>{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductsStats;