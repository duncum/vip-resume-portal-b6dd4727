
import React from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CustomItemsProps {
  items: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

const CustomItems = ({
  items,
  onAdd,
  onChange,
  onRemove,
  placeholder
}: CustomItemsProps) => {
  if (items.length === 0) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="flex items-center mt-3 border-dashed border-gray-300 text-gray-500"
      >
        <Plus className="h-3 w-3 mr-1" /> Add Custom Item
      </Button>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs text-grey-600">Custom items:</p>
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
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="flex items-center mt-1 border-dashed border-gray-300 text-gray-500"
      >
        <Plus className="h-3 w-3 mr-1" /> Add Another
      </Button>
    </div>
  );
};

export default CustomItems;
