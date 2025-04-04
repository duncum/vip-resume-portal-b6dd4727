
import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AssetTypesProps } from "./types";
import { assetTypes } from "./form-data";
import CheckboxList from "./CheckboxList";

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
      
      {customAssetTypes.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-grey-600">Custom asset types:</p>
          {customAssetTypes.map((type, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                placeholder="Enter custom asset type" 
                value={type}
                onChange={(e) => onCustomAssetTypeChange(index, e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveCustomAssetType(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAddCustomAssetType}
        className="flex items-center mt-3 border-dashed border-gray-300 text-gray-500"
      >
        <Plus className="h-3 w-3 mr-1" /> Add Custom Asset Type
      </Button>
    </>
  );
};

export default AssetTypesSection;
