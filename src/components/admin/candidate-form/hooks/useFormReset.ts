
export const useFormReset = (
  resetFunctions: {
    resetBasicInfo: () => void;
    resetLevels: () => void;
    resetTitles: () => void;
    resetSkills: () => void;
    resetAssetTypes: () => void;
    resetSectors: () => void;
  }
) => {
  const { 
    resetBasicInfo,
    resetLevels,
    resetTitles,
    resetSkills,
    resetAssetTypes,
    resetSectors
  } = resetFunctions;
  
  // Reset all form states
  const resetForm = () => {
    resetBasicInfo();
    resetLevels();
    resetTitles();
    resetSkills();
    resetAssetTypes();
    resetSectors();
  };

  return { resetForm };
};
