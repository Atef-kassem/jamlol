import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const FormField = ({ 
  label, 
  type = "input", 
  value, 
  onChange, 
  placeholder, 
  options = [], 
  ...props 
}) => {
  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            {...props}
          />
        );
      case "file":
        return (
          <Input
            type="file"
            onChange={(e) => onChange(e.target.files[0])}
            className="cursor-pointer"
            {...props}
          />
        );
      default:
        return (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            {...props}
          />
        );
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      {renderField()}
    </div>
  );
};

export default FormField;