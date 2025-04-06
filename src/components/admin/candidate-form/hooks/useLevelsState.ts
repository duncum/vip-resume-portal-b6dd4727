
import { useState } from "react";

export function useLevelsState() {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels(prev => [...prev, level]);
    } else {
      setSelectedLevels(prev => prev.filter(l => l !== level));
    }
  };

  const resetLevels = () => {
    setSelectedLevels([]);
  };

  return {
    selectedLevels,
    handleLevelChange,
    resetLevels
  };
}
