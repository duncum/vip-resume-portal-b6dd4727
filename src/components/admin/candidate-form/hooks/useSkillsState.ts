
import { useCustomListState } from './useCustomListState';

export const useSkillsState = () => {
  const {
    selectedItems: selectedSkills,
    handleItemChange: handleSkillChange,
    customItems: customSkills,
    addCustomItem: addCustomSkill,
    handleCustomItemChange: handleCustomSkillChange,
    removeCustomItem: removeCustomSkill,
    reset: resetSkills,
    getAllItems: getAllSkills
  } = useCustomListState({ itemName: 'skills' });

  return {
    selectedSkills,
    handleSkillChange,
    customSkills,
    addCustomSkill,
    handleCustomSkillChange,
    removeCustomSkill,
    resetSkills,
    getAllSkills
  };
};
