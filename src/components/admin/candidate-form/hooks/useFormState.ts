
import { useBasicInfoState, useLevelsState, useTitlesState, useCustomListState, useFormSubmission } from './';
import { type Candidate } from '@/utils/sheets/types';
import { useCandidateEdit } from './useCandidateEdit';

export const useFormState = (onSuccess?: () => void, candidateToEdit?: Candidate) => {
  // Basic info states
  const {
    candidateId,
    setCandidateId,
    resumeUrl,
    setResumeUrl,
    resumeText,
    setResumeText,
    headline,
    setHeadline,
    summary,
    setSummary,
    location,
    setLocation,
    tags,
    setTags,
    relocationPreference,
    setRelocationPreference,
    notableEmployers,
    setNotableEmployers,
    resetBasicInfo
  } = useBasicInfoState();

  // Levels state
  const { selectedLevels, handleLevelChange, resetLevels } = useLevelsState();

  // Titles state
  const {
    selectedTitleCategories,
    handleTitleCategoryChange,
    selectedTitles,
    handleTitleChange,
    customTitles,
    handleCustomTitleChange,
    addAnotherCustomTitle,
    removeCustomTitle,
    resetTitles
  } = useTitlesState();

  // Skills state
  const skillsState = useCustomListState({ itemName: 'skills' });
  const {
    selectedItems: selectedSkills,
    handleItemChange: handleSkillChange,
    customItems: customSkills,
    addCustomItem: addCustomSkill,
    handleCustomItemChange: handleCustomSkillChange,
    removeCustomItem: removeCustomSkill,
    reset: resetSkills
  } = skillsState;

  // Asset Types state
  const assetTypesState = useCustomListState({ itemName: 'assetTypes' });
  const {
    selectedItems: selectedAssetTypes,
    handleItemChange: handleAssetTypeChange,
    customItems: customAssetTypes,
    addCustomItem: addCustomAssetType,
    handleCustomItemChange: handleCustomAssetTypeChange,
    removeCustomItem: removeCustomAssetType,
    reset: resetAssetTypes
  } = assetTypesState;

  // Sectors state
  const sectorsState = useCustomListState({ itemName: 'sectors' });
  const {
    selectedItems: selectedSectors,
    handleItemChange: handleSectorChange,
    customItems: customSectors,
    addCustomItem: addCustomSector,
    handleCustomItemChange: handleCustomSectorChange,
    removeCustomItem: removeCustomSector,
    reset: resetSectors
  } = sectorsState;

  // Use candidate edit hook
  useCandidateEdit({
    candidateToEdit,
    setCandidateId,
    setResumeUrl,
    setResumeText,
    setHeadline,
    setSummary,
    setLocation,
    setTags,
    setRelocationPreference,
    setNotableEmployers,
    handleLevelChange,
    handleTitleCategoryChange,
    handleSkillChange,
    handleAssetTypeChange,
    handleSectorChange
  });

  // Form submission
  const { isUploading, handleSubmit: submitForm } = useFormSubmission({
    candidateId,
    resumeUrl,
    resumeText,
    headline,
    summary,
    location,
    tags,
    relocationPreference,
    notableEmployers,
    selectedLevels,
    selectedTitleCategories,
    selectedTitles,
    customTitles,
    selectedSkills,
    customSkills,
    selectedAssetTypes,
    customAssetTypes,
    selectedSectors,
    customSectors,
    onSuccess
  });

  // Reset all form states
  const resetForm = () => {
    resetBasicInfo();
    resetLevels();
    resetTitles();
    resetSkills();
    resetAssetTypes();
    resetSectors();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    return submitForm(e);
  };

  return {
    // Return all the state and handler functions
    isUploading,
    candidateId,
    setCandidateId,
    resumeUrl,
    setResumeUrl,
    resumeText,
    setResumeText,
    headline,
    setHeadline,
    summary,
    setSummary,
    location,
    setLocation,
    tags,
    setTags,
    relocationPreference,
    setRelocationPreference,
    notableEmployers,
    setNotableEmployers,
    
    // Levels
    selectedLevels,
    handleLevelChange,
    
    // Titles
    selectedTitleCategories,
    handleTitleCategoryChange,
    selectedTitles,
    handleTitleChange,
    customTitles,
    handleCustomTitleChange,
    addAnotherCustomTitle,
    removeCustomTitle,
    
    // Skills
    selectedSkills,
    handleSkillChange,
    customSkills,
    addCustomSkill,
    handleCustomSkillChange,
    removeCustomSkill,
    
    // Asset Types
    selectedAssetTypes,
    handleAssetTypeChange,
    customAssetTypes,
    addCustomAssetType,
    handleCustomAssetTypeChange,
    removeCustomAssetType,
    
    // Sectors
    selectedSectors,
    handleSectorChange,
    customSectors,
    addCustomSector,
    handleCustomSectorChange,
    removeCustomSector,
    
    // Form submission
    handleSubmit
  };
};
