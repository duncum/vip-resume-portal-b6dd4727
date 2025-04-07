
import { useCustomListState } from './useCustomListState';

export const useAssetTypesState = () => {
  const {
    selectedItems: selectedAssetTypes,
    handleItemChange: handleAssetTypeChange,
    customItems: customAssetTypes,
    addCustomItem: addCustomAssetType,
    handleCustomItemChange: handleCustomAssetTypeChange,
    removeCustomItem: removeCustomAssetType,
    reset: resetAssetTypes,
    getAllItems: getAllAssetTypes
  } = useCustomListState({ itemName: 'assetTypes' });

  return {
    selectedAssetTypes,
    handleAssetTypeChange,
    customAssetTypes,
    addCustomAssetType,
    handleCustomAssetTypeChange,
    removeCustomAssetType,
    resetAssetTypes,
    getAllAssetTypes
  };
};
