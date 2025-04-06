
import React from "react";
import { SectorsProps } from "./types";
import { sectorExperience } from "./form-data";
import CheckboxList from "./CheckboxList";
import CustomItems from "./CustomItems";

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
      
      <CustomItems
        items={customSectors}
        onAdd={onAddCustomSector}
        onChange={onCustomSectorChange}
        onRemove={onRemoveCustomSector}
        placeholder="Enter custom sector"
      />
    </>
  );
};

export default SectorsSection;
