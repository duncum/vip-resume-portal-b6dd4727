
import React from "react";
import { AssetTypesProps } from "./types";
import { assetTypes } from "./form-data";
import SelectionSection from "./SelectionSection";

const AssetTypesSection = ({
  selectedAssetTypes,
  onAssetTypeChange,
  customAssetTypes,
  onAddCustomAssetType,
  onCustomAssetTypeChange,
  onRemoveCustomAssetType
}: AssetTypesProps) => {
  return (
    <SelectionSection
      title="Select relevant asset types:"
      items={assetTypes}
      selectedItems={selectedAssetTypes}
      onItemChange={onAssetTypeChange}
      customItems={customAssetTypes}
      onAddCustomItem={onAddCustomAssetType}
      onCustomItemChange={onCustomAssetTypeChange}
      onRemoveCustomItem={onRemoveCustomAssetType}
      placeholder="Enter custom asset type"
    />
  );
};

export default AssetTypesSection;
