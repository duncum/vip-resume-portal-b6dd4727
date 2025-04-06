
import React from "react";
import { SkillsProps } from "./types";
import { highLevelSkills } from "./form-data";
import CheckboxList from "./CheckboxList";
import CustomItems from "./CustomItems";

const SkillsSection = ({
  selectedSkills,
  onSkillChange,
  customSkills,
  onAddCustomSkill,
  onCustomSkillChange,
  onRemoveCustomSkill
}: SkillsProps) => {
  return (
    <>
      <p className="text-xs text-grey-600 mb-2">Select relevant skills:</p>
      <CheckboxList 
        items={highLevelSkills}
        selectedItems={selectedSkills}
        onChange={onSkillChange}
        columns={3}
      />
      
      <CustomItems
        items={customSkills}
        onAdd={onAddCustomSkill}
        onChange={onCustomSkillChange}
        onRemove={onRemoveCustomSkill}
        placeholder="Enter custom skill"
      />
    </>
  );
};

export default SkillsSection;
