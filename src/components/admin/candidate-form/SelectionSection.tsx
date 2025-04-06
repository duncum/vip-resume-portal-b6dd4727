
import React from "react";
import CheckboxList from "./CheckboxList";
import CustomItems from "./CustomItems";

export interface SelectionSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onItemChange: (item: string, checked: boolean) => void;
  customItems: string[];
  onAddCustomItem: () => void;
  onCustomItemChange: (index: number, value: string) => void;
  onRemoveCustomItem: (index: number) => void;
  placeholder: string;
}

const SelectionSection = ({
  title,
  items,
  selectedItems,
  onItemChange,
  customItems,
  onAddCustomItem,
  onCustomItemChange,
  onRemoveCustomItem,
  placeholder
}: SelectionSectionProps) => {
  return (
    <>
      <p className="text-xs text-grey-600 mb-2">{title}</p>
      <CheckboxList 
        items={items}
        selectedItems={selectedItems}
        onChange={onItemChange}
        columns={3}
      />
      
      <CustomItems
        items={customItems}
        onAdd={onAddCustomItem}
        onChange={onCustomItemChange}
        onRemove={onRemoveCustomItem}
        placeholder={placeholder}
      />
    </>
  );
};

export default SelectionSection;
