
import React from "react";
import { useFormContext } from "../context/FormContext";
import CollapsibleSection from "../CollapsibleSection";
import CandidateLevels from "../CandidateLevels";

interface CandidateLevelsFormSectionProps {
  disabled?: boolean;
}

const CandidateLevelsFormSection = ({ disabled = false }: CandidateLevelsFormSectionProps) => {
  const { selectedLevels, handleLevelChange } = useFormContext();
  
  return (
    <CollapsibleSection title="Candidate Level / Hierarchy">
      <CandidateLevels 
        selectedLevels={selectedLevels}
        onLevelChange={handleLevelChange}
        disabled={disabled}
      />
    </CollapsibleSection>
  );
};

export default CandidateLevelsFormSection;
