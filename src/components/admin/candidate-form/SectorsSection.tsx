
import React from "react";
import { SectorsProps } from "./types";
import { sectorExperience } from "./form-data";
import SelectionSection from "./SelectionSection";

const SectorsSection = ({
  selectedSectors,
  onSectorChange,
  customSectors,
  onAddCustomSector,
  onCustomSectorChange,
  onRemoveCustomSector
}: SectorsProps) => {
  return (
    <SelectionSection
      title="Select relevant sectors:"
      items={sectorExperience}
      selectedItems={selectedSectors}
      onItemChange={onSectorChange}
      customItems={customSectors}
      onAddCustomItem={onAddCustomSector}
      onCustomItemChange={onCustomSectorChange}
      onRemoveCustomItem={onRemoveCustomSector}
      placeholder="Enter custom sector"
    />
  );
};

export default SectorsSection;
