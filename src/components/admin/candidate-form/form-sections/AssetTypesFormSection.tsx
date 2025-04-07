
import React from "react";
import { useFormContext } from "../context/FormContext";
import CollapsibleSection from "../CollapsibleSection";
import AssetTypesSection from "../AssetTypesSection";

interface AssetTypesFormSectionProps {
  disabled?: boolean;
}

const AssetTypesFormSection = ({ disabled = false }: AssetTypesFormSectionProps) => {
  const {
    selectedAssetTypes,
    handleAssetTypeChange,
    customAssetTypes,
    addCustomAssetType,
    handleCustomAssetTypeChange,
    removeCustomAssetType
  } = useFormContext();
  
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
