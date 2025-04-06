
import { useState } from "react";
import { toast } from "sonner";

interface UseCustomListStateParams {
  itemName: string;
  maxItems?: number;
}

export function useCustomListState({ itemName, maxItems = 50 }: UseCustomListStateParams) {
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
    if (customItems.length >= maxItems) {
      toast.warning(`You've reached the maximum of ${maxItems} custom ${itemName}s`);
      return;
    }
    
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

  const reset = () => {
    setSelectedItems([]);
    setCustomItems([]);
  };

  const getAllItems = (): string[] => {
    return [
      ...selectedItems,
      ...customItems.filter(item => item.trim() !== "")
    ];
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
