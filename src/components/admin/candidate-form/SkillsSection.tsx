
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
      
      {customSkills.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-grey-600">Custom skills:</p>
          {customSkills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                placeholder="Enter custom skill" 
                value={skill}
                onChange={(e) => onCustomSkillChange(index, e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveCustomSkill(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAddCustomSkill}
        className="flex items-center mt-3 border-dashed border-gray-300 text-gray-500"
      >
        <Plus className="h-3 w-3 mr-1" /> Add Custom Skill
      </Button>
    </>
  );
};

export default SkillsSection;
