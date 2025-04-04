
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomItemsProps } from "./types";

const CustomItems = ({ 
  items, 
  onAdd, 
  onChange, 
  onRemove, 
  placeholder 
}: CustomItemsProps) => {
  return (
    <div className="mt-3 space-y-2">
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                placeholder={placeholder} 
                value={item}
                onChange={(e) => onChange(index, e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="flex items-center mt-1 border-dashed border-gray-300 text-gray-500"
      >
        <Plus className="h-3 w-3 mr-1" /> Add Custom Item
      </Button>
    </div>
  );
};

export default CustomItems;
