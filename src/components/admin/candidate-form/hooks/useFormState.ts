
import { type Candidate } from '@/utils/sheets/types';
import { useFormCore } from './useFormCore';
import { useFormReset } from './useFormReset';

export const useFormState = (onSuccess?: () => void, candidateToEdit?: Candidate) => {
  // Get all form state from useFormCore which delegates to more specialized hooks
  const {
    basicInfoState,
    levelsState,
    titlesState,
    skillsState,
    assetTypesState,
    sectorsState,
    submissionState
  } = useFormCore(onSuccess, candidateToEdit);

  // Extract the reset functions to use with useFormReset
  const resetFunctions = {
    resetBasicInfo: basicInfoState.resetBasicInfo,
    resetLevels: levelsState.resetLevels,
    resetTitles: titlesState.resetTitles,
    resetSkills: skillsState.reset,
    resetAssetTypes: assetTypesState.reset,
    resetSectors: sectorsState.reset
  };

  // Create form reset functionality
  const { resetForm } = useFormReset(resetFunctions);

  // Handle form submission (wrapper around submissionState.handleSubmit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    return submissionState.handleSubmit(e);
  };

  // Return a flat object that contains all the state and handlers
  // This maintains the same API as the original hook
  return {
    // Form submission
    isUploading: submissionState.isUploading,
    handleSubmit,
    
    // Basic info
    candidateId: basicInfoState.candidateId,
    setCandidateId: basicInfoState.setCandidateId,
    resumeUrl: basicInfoState.resumeUrl,
    setResumeUrl: basicInfoState.setResumeUrl,
    resumeText: basicInfoState.resumeText,
    setResumeText: basicInfoState.setResumeText,
    headline: basicInfoState.headline,
    setHeadline: basicInfoState.setHeadline,
    summary: basicInfoState.summary,
    setSummary: basicInfoState.setSummary,
    location: basicInfoState.location,
    setLocation: basicInfoState.setLocation,
    tags: basicInfoState.tags,
    setTags: basicInfoState.setTags,
    relocationPreference: basicInfoState.relocationPreference,
    setRelocationPreference: basicInfoState.setRelocationPreference,
    notableEmployers: basicInfoState.notableEmployers,
    setNotableEmployers: basicInfoState.setNotableEmployers,
    
    // Levels
    selectedLevels: levelsState.selectedLevels,
    handleLevelChange: levelsState.handleLevelChange,
    
    // Titles
    selectedTitleCategories: titlesState.selectedTitleCategories,
    handleTitleCategoryChange: titlesState.handleTitleCategoryChange,
    selectedTitles: titlesState.selectedTitles,
    handleTitleChange: titlesState.handleTitleChange,
    customTitles: titlesState.customTitles,
    handleCustomTitleChange: titlesState.handleCustomTitleChange,
    addAnotherCustomTitle: titlesState.addAnotherCustomTitle,
    removeCustomTitle: titlesState.removeCustomTitle,
    
    // Skills
    selectedSkills: skillsState.selectedItems,
    handleSkillChange: skillsState.handleItemChange,
    customSkills: skillsState.customItems,
    addCustomSkill: skillsState.addCustomItem,
    handleCustomSkillChange: skillsState.handleCustomItemChange,
    removeCustomSkill: skillsState.removeCustomItem,
    
    // Asset Types
    selectedAssetTypes: assetTypesState.selectedItems,
    handleAssetTypeChange: assetTypesState.handleItemChange,
    customAssetTypes: assetTypesState.customItems,
    addCustomAssetType: assetTypesState.addCustomItem,
    handleCustomAssetTypeChange: assetTypesState.handleCustomItemChange,
    removeCustomAssetType: assetTypesState.removeCustomItem,
    
    // Sectors
    selectedSectors: sectorsState.selectedItems,
    handleSectorChange: sectorsState.handleItemChange,
    customSectors: sectorsState.customItems,
    addCustomSector: sectorsState.addCustomItem,
    handleCustomSectorChange: sectorsState.handleCustomItemChange,
    removeCustomSector: sectorsState.removeCustomItem,
  };
};
