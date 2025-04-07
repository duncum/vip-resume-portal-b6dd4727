
import React from "react";
import { useFormContext } from "../context/FormContext";
import CollapsibleSection from "../CollapsibleSection";
import SectorsSection from "../SectorsSection";

interface SectorsFormSectionProps {
  disabled?: boolean;
}

const SectorsFormSection = ({ disabled = false }: SectorsFormSectionProps) => {
  const {
    selectedSectors,
    handleSectorChange,
    customSectors,
    addCustomSector,
    handleCustomSectorChange,
    removeCustomSector
  } = useFormContext();
  
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
