
import React from "react";
import { AssetTypesProps } from "./types";
import { assetTypes } from "./form-data";
import CheckboxList from "./CheckboxList";
import CustomItems from "./CustomItems";

const AssetTypesSection = ({
  selectedAssetTypes,
  onAssetTypeChange,
  customAssetTypes,
  onAddCustomAssetType,
  onCustomAssetTypeChange,
  onRemoveCustomAssetType
}: AssetTypesProps) => {
  return (
    <>
      <p className="text-xs text-grey-600 mb-2">Select relevant asset types:</p>
      <CheckboxList 
        items={assetTypes}
        selectedItems={selectedAssetTypes}
        onChange={onAssetTypeChange}
        columns={3}
      />
      
      <CustomItems
        items={customAssetTypes}
        onAdd={onAddCustomAssetType}
        onChange={onCustomAssetTypeChange}
        onRemove={onRemoveCustomAssetType}
        placeholder="Enter custom asset type"
      />
    </>
  );
};

export default AssetTypesSection;
