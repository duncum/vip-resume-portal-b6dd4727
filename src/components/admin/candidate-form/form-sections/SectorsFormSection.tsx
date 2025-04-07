
import React from "react";
import CollapsibleSection from "../CollapsibleSection";
import SectorsSection from "../SectorsSection";

interface SectorsFormSectionProps {
  selectedSectors: string[];
  handleSectorChange: (sector: string, checked: boolean) => void;
  customSectors: string[];
  addCustomSector: () => void;
  handleCustomSectorChange: (index: number, value: string) => void;
  removeCustomSector: (index: number) => void;
  disabled?: boolean;
}

const SectorsFormSection = ({
  selectedSectors,
  handleSectorChange,
  customSectors,
  addCustomSector,
  handleCustomSectorChange,
  removeCustomSector,
  disabled = false
}: SectorsFormSectionProps) => {
  return (
    <CollapsibleSection title="Sector / Ownership Experience">
      <SectorsSection 
        selectedSectors={selectedSectors}
        onSectorChange={handleSectorChange}
        customSectors={customSectors}
        onAddCustomSector={addCustomSector}
        onCustomSectorChange={handleCustomSectorChange}
        onRemoveCustomSector={removeCustomSector}
        disabled={disabled}
      />
    </CollapsibleSection>
  );
};

export default SectorsFormSection;
