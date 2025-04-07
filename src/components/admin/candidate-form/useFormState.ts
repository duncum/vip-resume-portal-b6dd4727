
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
  const {
    selectedItems: selectedSkills,
    handleItemChange: handleSkillChange,
    customItems: customSkills,
    addCustomItem: addCustomSkill,
    handleCustomItemChange: handleCustomSkillChange,
    removeCustomItem: removeCustomSkill,
    reset: resetSkills
  } = useCustomListState({ itemName: 'skills' });

  // Asset Types state
  const {
    selectedItems: selectedAssetTypes,
    handleItemChange: handleAssetTypeChange,
    customItems: customAssetTypes,
    addCustomItem: addCustomAssetType,
    handleCustomItemChange: handleCustomAssetTypeChange,
    removeCustomItem: removeCustomAssetType,
    reset: resetAssetTypes
  } = useCustomListState({ itemName: 'assetTypes' });

  // Sectors state
  const {
    selectedItems: selectedSectors,
    handleItemChange: handleSectorChange,
    customItems: customSectors,
    addCustomItem: addCustomSector,
    handleCustomItemChange: handleCustomSectorChange,
    removeCustomItem: removeCustomSector,
    reset: resetSectors
  } = useCustomListState({ itemName: 'sectors' });

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

  // Effect to populate form with candidate data when editing
  useEffect(() => {
    if (candidateToEdit) {
      // Set basic info
      setCandidateId(candidateToEdit.id || '');
      setResumeUrl(candidateToEdit.resumeUrl || '');
      if (candidateToEdit.resumeText) {
        setResumeText(candidateToEdit.resumeText);
      }
      setHeadline(candidateToEdit.headline || '');
      setSummary(candidateToEdit.summary || '');
      setLocation(candidateToEdit.location || '');
      setTags(candidateToEdit.tags ? candidateToEdit.tags.join(', ') : '');
      setRelocationPreference(candidateToEdit.relocationPreference || 'flexible');
      setNotableEmployers(candidateToEdit.notableEmployers || '');

      // Handle levels
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
