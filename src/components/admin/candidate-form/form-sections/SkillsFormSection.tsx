
import React from "react";
import { useFormContext } from "../context/FormContext";
import CollapsibleSection from "../CollapsibleSection";
import SkillsSection from "../SkillsSection";

interface SkillsFormSectionProps {
  disabled?: boolean;
}

const SkillsFormSection = ({ disabled = false }: SkillsFormSectionProps) => {
  const {
    selectedSkills,
    handleSkillChange,
    customSkills,
    addCustomSkill,
    handleCustomSkillChange,
    removeCustomSkill
  } = useFormContext();
  
  return (
    <CollapsibleSection title="High-Level Skills">
      <SkillsSection 
        selectedSkills={selectedSkills}
        onSkillChange={handleSkillChange}
        customSkills={customSkills}
        onAddCustomSkill={addCustomSkill}
        onCustomSkillChange={handleCustomSkillChange}
        onRemoveCustomSkill={removeCustomSkill}
        disabled={disabled}
      />
    </CollapsibleSection>
  );
};

export default SkillsFormSection;
