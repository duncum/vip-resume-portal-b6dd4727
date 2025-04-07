
import { useCustomListState } from './useCustomListState';

export const useSectorsState = () => {
  const {
    selectedItems: selectedSectors,
    handleItemChange: handleSectorChange,
    customItems: customSectors,
    addCustomItem: addCustomSector,
    handleCustomItemChange: handleCustomSectorChange,
    removeCustomItem: removeCustomSector,
    reset: resetSectors,
    getAllItems: getAllSectors
  } = useCustomListState({ itemName: 'sectors' });

  return {
    selectedSectors,
    handleSectorChange,
    customSectors,
    addCustomSector,
    handleCustomSectorChange,
    removeCustomSector,
    resetSectors,
    getAllSectors
  };
};
