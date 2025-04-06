
import React from "react";
import { SkillsProps } from "./types";
import { highLevelSkills } from "./form-data";
import SelectionSection from "./SelectionSection";

const SkillsSection = ({
  selectedSkills,
  onSkillChange,
  customSkills,
  onAddCustomSkill,
  onCustomSkillChange,
  onRemoveCustomSkill
}: SkillsProps) => {
  return (
    <SelectionSection
      title="Select relevant skills:"
      items={highLevelSkills}
      selectedItems={selectedSkills}
      onItemChange={onSkillChange}
      customItems={customSkills}
      onAddCustomItem={onAddCustomSkill}
      onCustomItemChange={onCustomSkillChange}
      onRemoveCustomItem={onRemoveCustomSkill}
      placeholder="Enter custom skill"
    />
  );
};

export default SkillsSection;
