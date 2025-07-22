import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Search, 
  Filter,
  User,
  Building2,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SupplierRequest {
  id: string;
  supplierNumber: string;
  relatedUserId: string;
  companyName?: string;
  mobileNumber: string;
  address: string;
  phoneNumber: string;
  verificationStatus: "verified" | "not_verified";
  requestStatus: "pending" | "approved" | "rejected";
  submittedAt: string;
  submittedBy: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

const mockRequests: SupplierRequest[] = [
  {
    id: "1",
    supplierNumber: "SUP001",
    relatedUserId: "USR001",
    companyName: "شركة التجارة المتقدمة",
    mobileNumber: "0501234567",
    address: "الرياض، حي الملقا، شارع الملك فهد",
    phoneNumber: "0112345678",
    verificationStatus: "verified",
    requestStatus: "pending",
    submittedAt: "2024-01-15T10:30:00Z",
    submittedBy: "أحمد محمد"
  },
  {
    id: "2",
    supplierNumber: "SUP002",
    relatedUserId: "USR002",
    companyName: "مؤسسة الخدمات الذكية",
    mobileNumber: "0509876543",
    address: "جدة، حي الحمراء، طريق الملك عبدالعزيز",
    phoneNumber: "0123456789",
    verificationStatus: "not_verified",
    requestStatus: "pending",
    submittedAt: "2024-01-14T14:20:00Z",
    submittedBy: "سارة أحمد"
  },
  {
    id: "3",
    supplierNumber: "SUP003",
    relatedUserId: "USR003",
    mobileNumber: "0551234567",
    address: "الدمام، حي الفيصلية، شارع الأمير محمد",
    phoneNumber: "0138765432",
    verificationStatus: "verified",
    requestStatus: "approved",
    submittedAt: "2024-01-13T09:15:00Z",
    submittedBy: "محمد علي",
    reviewedAt: "2024-01-13T11:30:00Z",
    reviewedBy: "مدير النظام"
  }
];

const SupplierApproval: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<SupplierRequest[]>(mockRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<SupplierRequest | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "في الانتظار";
      case "approved":
        return "مقبول";
      case "rejected":
        return "مرفوض";
      default:
        return status;
    }
  };

  const getVerificationStatusColor = (status: string) => {
    return status === "verified" 
      ? "bg-green-100 text-green-800" 
      : "bg-orange-100 text-orange-800";
  };

  const getVerificationStatusText = (status: string) => {
    return status === "verified" ? "تم التحقق" : "لم يتم التحقق";
  };

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id 
        ? { 
            ...req, 
            requestStatus: "approved",
            reviewedAt: new Date().toISOString(),
            reviewedBy: "المدير الحالي"
          }
        : req
    ));

    toast({
      title: "تم قبول الطلب",
      description: "تم قبول طلب إضافة المورد بنجاح",
    });
  };

  const handleReject = (id: string, reason?: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id 
        ? { 
            ...req, 
            requestStatus: "rejected",
            reviewedAt: new Date().toISOString(),
            reviewedBy: "المدير الحالي",
            rejectionReason: reason || "غير محدد"
          }
        : req
    ));

    toast({
      title: "تم رفض الطلب",
      description: "تم رفض طلب إضافة المورد",
      variant: "destructive",
    });
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.supplierNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.relatedUserId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || request.requestStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = requests.filter(r => r.requestStatus === "pending").length;
  const approvedCount = requests.filter(r => r.requestStatus === "approved").length;
  const rejectedCount = requests.filter(r => r.requestStatus === "rejected").length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">طلبات الموافقة على الموردين</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold">{requests.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">مقبولة</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">مرفوضة</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث برقم المورد أو اسم الشركة أو معرف المستخدم..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-right pr-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="text-right">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue placeholder="فلترة بالحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-right">جميع الحالات</SelectItem>
                  <SelectItem value="pending" className="text-right">في الانتظار</SelectItem>
                  <SelectItem value="approved" className="text-right">مقبولة</SelectItem>
                  <SelectItem value="rejected" className="text-right">مرفوضة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
                  {/* Basic Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="font-semibold">{request.supplierNumber}</span>
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    {request.companyName && (
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm">{request.companyName}</span>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm">{request.mobileNumber}</span>
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Status & Verification */}
                  <div className="space-y-2">
                    <div className="flex justify-end">
                      <Badge className={getStatusColor(request.requestStatus)}>
                        {getStatusText(request.requestStatus)}
                      </Badge>
                    </div>
                    <div className="flex justify-end">
                      <Badge className={getVerificationStatusColor(request.verificationStatus)}>
                        {getVerificationStatusText(request.verificationStatus)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm text-muted-foreground">
                        {new Date(request.submittedAt).toLocaleDateString('ar-SA')}
                      </span>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                          className="w-full"
                        >
                          <Eye className="h-4 w-4 ml-2" />
                          عرض التفاصيل
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-right">تفاصيل طلب المورد</DialogTitle>
                          <DialogDescription className="text-right">
                            مراجعة بيانات طلب إضافة المورد
                          </DialogDescription>
                        </DialogHeader>
                        {selectedRequest && (
                          <div className="space-y-4 text-right">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="font-semibold">رقم المورد:</span>
                                <p>{selectedRequest.supplierNumber}</p>
                              </div>
                              <div>
                                <span className="font-semibold">معرف المستخدم:</span>
                                <p>{selectedRequest.relatedUserId}</p>
                              </div>
                              {selectedRequest.companyName && (
                                <div>
                                  <span className="font-semibold">اسم الشركة:</span>
                                  <p>{selectedRequest.companyName}</p>
                                </div>
                              )}
                              <div>
                                <span className="font-semibold">رقم الجوال:</span>
                                <p>{selectedRequest.mobileNumber}</p>
                              </div>
                              <div>
                                <span className="font-semibold">رقم الهاتف:</span>
                                <p>{selectedRequest.phoneNumber}</p>
                              </div>
                              <div>
                                <span className="font-semibold">حالة التحقق:</span>
                                <p>{getVerificationStatusText(selectedRequest.verificationStatus)}</p>
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold">العنوان:</span>
                              <p>{selectedRequest.address}</p>
                            </div>
                            <div>
                              <span className="font-semibold">تاريخ التقديم:</span>
                              <p>{new Date(selectedRequest.submittedAt).toLocaleDateString('ar-SA')}</p>
                            </div>
                            <div>
                              <span className="font-semibold">مقدم بواسطة:</span>
                              <p>{selectedRequest.submittedBy}</p>
                            </div>
                            {selectedRequest.reviewedAt && (
                              <>
                                <div>
                                  <span className="font-semibold">تاريخ المراجعة:</span>
                                  <p>{new Date(selectedRequest.reviewedAt).toLocaleDateString('ar-SA')}</p>
                                </div>
                                <div>
                                  <span className="font-semibold">تمت المراجعة بواسطة:</span>
                                  <p>{selectedRequest.reviewedBy}</p>
                                </div>
                              </>
                            )}
                            {selectedRequest.rejectionReason && (
                              <div>
                                <span className="font-semibold">سبب الرفض:</span>
                                <p>{selectedRequest.rejectionReason}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {request.requestStatus === "pending" && (
                      <div className="flex gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" className="flex-1">
                              <CheckCircle className="h-4 w-4 ml-2" />
                              قبول
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-right">تأكيد القبول</AlertDialogTitle>
                              <AlertDialogDescription className="text-right">
                                هل أنت متأكد من قبول طلب إضافة المورد {request.supplierNumber}؟
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleApprove(request.id)}>
                                قبول
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="flex-1">
                              <XCircle className="h-4 w-4 ml-2" />
                              رفض
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-right">تأكيد الرفض</AlertDialogTitle>
                              <AlertDialogDescription className="text-right">
                                هل أنت متأكد من رفض طلب إضافة المورد {request.supplierNumber}؟
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleReject(request.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                رفض
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRequests.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد طلبات</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "لا توجد طلبات تطابق معايير البحث المحددة"
                  : "لا توجد طلبات موافقة في الوقت الحالي"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SupplierApproval;