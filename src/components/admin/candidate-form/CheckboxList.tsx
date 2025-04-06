
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxListProps {
  items: string[];
  selectedItems: string[];
  onChange: (item: string, checked: boolean) => void;
  descriptions?: Record<string, string>;
  columns?: number;
}

const CheckboxList = ({ 
  items, 
  selectedItems, 
  onChange, 
  descriptions, 
  columns = 2 
}: CheckboxListProps) => {
  // Hardcode the column classes to avoid runtime template string issues
  return (
    <div className={columns === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-2 mb-2" : 
                     columns === 3 ? "grid grid-cols-1 md:grid-cols-3 gap-2 mb-2" : 
                     columns === 4 ? "grid grid-cols-1 md:grid-cols-4 gap-2 mb-2" : 
                     "grid grid-cols-1 gap-2 mb-2"}>
      {items.map((item) => (
        <div key={item} className="flex items-start space-x-2">
          <Checkbox 
            id={`item-${item}`} 
            checked={selectedItems.includes(item)}
            onCheckedChange={(checked) => onChange(item, checked === true)}
          />
          <div>
            <label 
              htmlFor={`item-${item}`} 
              className="text-sm cursor-pointer"
            >
              {item}
            </label>
            {descriptions && descriptions[item] && (
              <p className="text-xs text-grey-500">
                {descriptions[item]}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
