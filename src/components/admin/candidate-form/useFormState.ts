
import { useState, useEffect } from 'react';
import { useBasicInfoState, useLevelsState, useTitlesState, useCustomListState, useFormSubmission } from './hooks';
import { type Candidate } from '@/utils/sheets';

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
    setNotableEmployers
  } = useBasicInfoState();

  // Levels state
  const { selectedLevels, handleLevelChange } = useLevelsState();

  // Titles state
  const {
    selectedTitleCategories,
    handleTitleCategoryChange,
    selectedTitles,
    handleTitleChange,
    customTitles,
    handleCustomTitleChange,
    addAnotherCustomTitle,
    removeCustomTitle
  } = useTitlesState();

  // Skills state
  const {
    selectedItems: selectedSkills,
    handleItemChange: handleSkillChange,
    customItems: customSkills,
    addCustomItem: addCustomSkill,
    handleCustomItemChange: handleCustomSkillChange,
    removeCustomItem: removeCustomSkill
  } = useCustomListState('skills');

  // Asset Types state
  const {
    selectedItems: selectedAssetTypes,
    handleItemChange: handleAssetTypeChange,
    customItems: customAssetTypes,
    addCustomItem: addCustomAssetType,
    handleCustomItemChange: handleCustomAssetTypeChange,
    removeCustomItem: removeCustomAssetType
  } = useCustomListState('assetTypes');

  // Sectors state
  const {
    selectedItems: selectedSectors,
    handleItemChange: handleSectorChange,
    customItems: customSectors,
    addCustomItem: addCustomSector,
    handleCustomItemChange: handleCustomSectorChange,
    removeCustomItem: removeCustomSector
  } = useCustomListState('sectors');

  // Form submission
  const { isUploading, handleSubmit } = useFormSubmission({
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

  // Effect to populate form with candidate data when editing
  useEffect(() => {
    if (candidateToEdit) {
      // Set basic info
      setCandidateId(candidateToEdit.id || '');
      setResumeUrl(candidateToEdit.resumeUrl || '');
      setHeadline(candidateToEdit.headline || '');
      setSummary(candidateToEdit.summary || '');
      setLocation(candidateToEdit.location || '');
      setTags(candidateToEdit.tags || '');
      setRelocationPreference(candidateToEdit.relocationPreference || '');
      setNotableEmployers(candidateToEdit.notableEmployers || '');

      // Handle levels, titles, skills, assetTypes, and sectors if they exist in the candidateToEdit
      // These will need more complex logic to properly populate the form
      // For example, for levels:
      if (candidateToEdit.levels && Array.isArray(candidateToEdit.levels)) {
        candidateToEdit.levels.forEach(level => {
          handleLevelChange(level, true);
        });
      }

      // For title categories and titles, this would require more complex mapping
      // This is just an example, you may need to adjust based on your data structure
      if (candidateToEdit.category) {
        handleTitleCategoryChange(candidateToEdit.category, true);
      }
      
      // For skills
      if (candidateToEdit.skills && Array.isArray(candidateToEdit.skills)) {
        candidateToEdit.skills.forEach(skill => {
          handleSkillChange(skill, true);
        });
      }
      
      // For asset types
      if (candidateToEdit.assetTypes && Array.isArray(candidateToEdit.assetTypes)) {
        candidateToEdit.assetTypes.forEach(assetType => {
          handleAssetTypeChange(assetType, true);
        });
      }
      
      // For sectors
      if (candidateToEdit.sectors && Array.isArray(candidateToEdit.sectors)) {
        candidateToEdit.sectors.forEach(sector => {
          handleSectorChange(sector, true);
        });
      }
    }
  }, [candidateToEdit]);

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
