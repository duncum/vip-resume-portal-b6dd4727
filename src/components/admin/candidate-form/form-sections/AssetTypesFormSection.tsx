
import React from "react";
import CollapsibleSection from "../CollapsibleSection";
import AssetTypesSection from "../AssetTypesSection";

interface AssetTypesFormSectionProps {
  selectedAssetTypes: string[];
  handleAssetTypeChange: (assetType: string, checked: boolean) => void;
  customAssetTypes: string[];
  addCustomAssetType: () => void;
  handleCustomAssetTypeChange: (index: number, value: string) => void;
  removeCustomAssetType: (index: number) => void;
  disabled?: boolean;
}

const AssetTypesFormSection = ({
  selectedAssetTypes,
  handleAssetTypeChange,
  customAssetTypes,
  addCustomAssetType,
  handleCustomAssetTypeChange,
  removeCustomAssetType,
  disabled = false
}: AssetTypesFormSectionProps) => {
  return (
    <CollapsibleSection title="Asset Type Experience">
      <AssetTypesSection 
        selectedAssetTypes={selectedAssetTypes}
        onAssetTypeChange={handleAssetTypeChange}
        customAssetTypes={customAssetTypes}
        onAddCustomAssetType={addCustomAssetType}
        onCustomAssetTypeChange={handleCustomAssetTypeChange}
        onRemoveCustomAssetType={removeCustomAssetType}
        disabled={disabled}
      />
    </CollapsibleSection>
  );
};

export default AssetTypesFormSection;
