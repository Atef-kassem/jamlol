import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BranchSelector } from "@/components/BranchSelector";
import { Clock, Activity } from "lucide-react";

const DateTimeFilter = () => {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const handleApplyFilter = () => {
    console.log("تطبيق الفلتر من:", startDateTime, "إلى:", endDateTime);
  };

  return (
    <Card className="shadow-card bg-gradient-to-r from-card to-card/80 border">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-end gap-4 lg:gap-6">
          {/* من تاريخ ووقت */}
          <div className="flex flex-col gap-2 min-w-[200px]">
            <Label htmlFor="start-datetime" className="text-sm font-medium text-foreground">من تاريخ ووقت:</Label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <Input
                id="start-datetime"
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="bg-background border-border focus:ring-2 focus:ring-primary/20"
                placeholder="يوم/شهر/سنة --:--"
              />
            </div>
          </div>
          
          {/* إلى تاريخ ووقت */}
          <div className="flex flex-col gap-2 min-w-[200px]">
            <Label htmlFor="end-datetime" className="text-sm font-medium text-foreground">إلى تاريخ ووقت:</Label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <Input
                id="end-datetime"
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="bg-background border-border focus:ring-2 focus:ring-primary/20"
                placeholder="يوم/شهر/سنة --:--"
              />
            </div>
          </div>
          
          {/* اختيار الفرع */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <Label className="text-sm font-medium text-foreground">اختيار الفرع:</Label>
            <BranchSelector />
          </div>
          
          {/* تطبيق الفلتر */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium opacity-0">تطبيق</Label>
            <Button 
              onClick={handleApplyFilter}
              className="bg-gradient-to-r from-primary to-secondary-blue hover:from-primary/90 hover:to-secondary-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!startDateTime || !endDateTime}
            >
              <Activity className="w-4 h-4 mr-2" />
              تطبيق الفلتر
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateTimeFilter;