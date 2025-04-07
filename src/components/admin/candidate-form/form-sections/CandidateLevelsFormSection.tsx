
import React from "react";
import CollapsibleSection from "../CollapsibleSection";
import CandidateLevels from "../CandidateLevels";

interface CandidateLevelsFormSectionProps {
  selectedLevels: string[];
  handleLevelChange: (level: string, checked: boolean) => void;
  disabled?: boolean;
}

const CandidateLevelsFormSection = ({
  selectedLevels,
  handleLevelChange,
  disabled = false
}: CandidateLevelsFormSectionProps) => {
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
