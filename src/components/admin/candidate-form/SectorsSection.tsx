
import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectorsProps } from "./types";
import { sectorExperience } from "./form-data";
import CheckboxList from "./CheckboxList";

const SectorsSection = ({
  selectedSectors,
  onSectorChange,
  customSectors,
  onAddCustomSector,
  onCustomSectorChange,
  onRemoveCustomSector
}: SectorsProps) => {
  return (
    <>
      <p className="text-xs text-grey-600 mb-2">Select relevant sectors:</p>
      <CheckboxList 
        items={sectorExperience}
        selectedItems={selectedSectors}
        onChange={onSectorChange}
        columns={3}
      />
      
      {customSectors.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-grey-600">Custom sectors:</p>
          {customSectors.map((sector, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                placeholder="Enter custom sector" 
                value={sector}
                onChange={(e) => onCustomSectorChange(index, e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveCustomSector(index)}
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
        onClick={onAddCustomSector}
        className="flex items-center mt-3 border-dashed border-gray-300 text-gray-500"
      >
        <Plus className="h-3 w-3 mr-1" /> Add Custom Sector
      </Button>
    </>
  );
};

export default SectorsSection;
