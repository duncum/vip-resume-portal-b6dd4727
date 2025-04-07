
import { useBasicInfoState, useLevelsState, useTitlesState, useCustomListState, useFormSubmission } from './';
import { useCandidateEdit } from './useCandidateEdit';
import { type Candidate } from '@/utils/sheets/types';

export const useFormState = (onSuccess?: () => void, candidateToEdit?: Candidate) => {
  // Basic info states
  const basicInfoState = useBasicInfoState();
  
  // Levels state
  const levelsState = useLevelsState();
  
  // Titles state
  const titlesState = useTitlesState();
  
  // Skills state
  const skillsState = useCustomListState({ itemName: 'skills' });
  
  // Asset Types state
  const assetTypesState = useCustomListState({ itemName: 'assetTypes' });
  
  // Sectors state
  const sectorsState = useCustomListState({ itemName: 'sectors' });

  // Use candidate edit hook
  useCandidateEdit({
    candidateToEdit,
    setCandidateId: basicInfoState.setCandidateId,
    setResumeUrl: basicInfoState.setResumeUrl,
    setResumeText: basicInfoState.setResumeText,
    setHeadline: basicInfoState.setHeadline,
    setSummary: basicInfoState.setSummary,
    setLocation: basicInfoState.setLocation,
    setTags: basicInfoState.setTags,
    setRelocationPreference: basicInfoState.setRelocationPreference,
    setNotableEmployers: basicInfoState.setNotableEmployers,
    handleLevelChange: levelsState.handleLevelChange,
    handleTitleCategoryChange: titlesState.handleTitleCategoryChange,
    handleSkillChange: skillsState.handleItemChange,
    handleAssetTypeChange: assetTypesState.handleItemChange,
    handleSectorChange: sectorsState.handleItemChange
  });

  // Form submission
  const { isUploading, handleSubmit: submitForm } = useFormSubmission({
    candidateId: basicInfoState.candidateId,
    resumeUrl: basicInfoState.resumeUrl,
    resumeText: basicInfoState.resumeText,
    headline: basicInfoState.headline,
    summary: basicInfoState.summary,
    location: basicInfoState.location,
    tags: basicInfoState.tags,
    relocationPreference: basicInfoState.relocationPreference,
    notableEmployers: basicInfoState.notableEmployers,
    selectedLevels: levelsState.selectedLevels,
    selectedTitleCategories: titlesState.selectedTitleCategories,
    selectedTitles: titlesState.selectedTitles,
    customTitles: titlesState.customTitles,
    selectedSkills: skillsState.selectedItems,
    customSkills: skillsState.customItems,
    selectedAssetTypes: assetTypesState.selectedItems,
    customAssetTypes: assetTypesState.customItems,
    selectedSectors: sectorsState.selectedItems,
    customSectors: sectorsState.customItems,
    onSuccess
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    return submitForm(e);
  };

  return {
    // Return all the state and handler functions
    isUploading,
    ...basicInfoState,
    
    // Levels
    ...levelsState,
    
    // Titles
    ...titlesState,
    
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
    
    // Form submission
    handleSubmit
  };
};
