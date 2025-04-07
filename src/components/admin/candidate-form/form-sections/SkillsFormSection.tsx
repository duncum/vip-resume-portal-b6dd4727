
import React from "react";
import CollapsibleSection from "../CollapsibleSection";
import SkillsSection from "../SkillsSection";

interface SkillsFormSectionProps {
  selectedSkills: string[];
  handleSkillChange: (skill: string, checked: boolean) => void;
  customSkills: string[];
  addCustomSkill: () => void;
  handleCustomSkillChange: (index: number, value: string) => void;
  removeCustomSkill: (index: number) => void;
  disabled?: boolean;
}

const SkillsFormSection = ({
  selectedSkills,
  handleSkillChange,
  customSkills,
  addCustomSkill,
  handleCustomSkillChange,
  removeCustomSkill,
  disabled = false
}: SkillsFormSectionProps) => {
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
