
import { useState } from "react";

type CustomListParams = {
  itemName?: string;
};

export function useCustomListState(params?: CustomListParams) {
  const itemName = params?.itemName || 'item';
  
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customItems, setCustomItems] = useState<string[]>([]);

  const handleItemChange = (item: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, item]);
    } else {
      setSelectedItems(prev => prev.filter(i => i !== item));
    }
  };
  
  const addCustomItem = () => {
    setCustomItems(prev => [...prev, ""]);
  };
  
  const handleCustomItemChange = (index: number, value: string) => {
    setCustomItems(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  
  const removeCustomItem = (index: number) => {
    setCustomItems(prev => prev.filter((_, i) => i !== index));
  };

  const getAllItems = () => {
    return [
      ...selectedItems,
      ...customItems.filter(item => item.trim() !== "")
    ];
  };

  const reset = () => {
    setSelectedItems([]);
    setCustomItems([]);
  };

  return {
    selectedItems,
    customItems,
    handleItemChange,
    addCustomItem,
    handleCustomItemChange,
    removeCustomItem,
    getAllItems,
    reset
  };
}
