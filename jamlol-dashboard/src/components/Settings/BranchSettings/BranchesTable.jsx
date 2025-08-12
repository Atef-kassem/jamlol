import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Store, Edit, Trash2 } from 'lucide-react';

export function BranchesTable({ branches, handleEdit, handleDelete, handleToggleStatus }) {
  return (
    <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Store className="w-4 h-4 text-primary" />
          </div>
          قائمة الفروع
        </CardTitle>
        <CardDescription>جميع فروع الشركة ومعلوماتها</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الفرع</TableHead>
              <TableHead>الرمز</TableHead>
              <TableHead>المدينة</TableHead>
              <TableHead>المدير</TableHead>
              <TableHead>السعة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id} className="hover:bg-muted/50 transition-colors duration-200">
                <TableCell className="font-medium">{branch.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{branch.code}</Badge>
                </TableCell>
                <TableCell>{branch.city}</TableCell>
                <TableCell>{branch.manager}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{branch.capacity} سيارة</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={branch.status === "active"}
                      onCheckedChange={() => handleToggleStatus(branch.id)}
                    />
                    <Badge variant={branch.status === "active" ? "default" : "secondary"}>
                      {branch.status === "active" ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(branch)}
                      className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(branch.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}