
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxListProps } from "./types";

const CheckboxList = ({ 
  items, 
  selectedItems, 
  onChange, 
  descriptions,
  columns = 2
}: CheckboxListProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-2 mb-2`}>
      {items.map((item) => (
        <div key={item} className="flex items-start space-x-2">
          <Checkbox 
            id={`checkbox-${item}`} 
            checked={selectedItems.includes(item)}
            onCheckedChange={(checked) => onChange(item, checked === true)}
          />
          <div>
            <label 
              htmlFor={`checkbox-${item}`} 
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
