
import { FormEvent } from "react";
import { useBasicInfoState } from "./hooks/useBasicInfoState";
import { useLevelsState } from "./hooks/useLevelsState";
import { useTitlesState } from "./hooks/useTitlesState";
import { useCustomListState } from "./hooks/useCustomListState";
import { useFormSubmission, FormData } from "./hooks/useFormSubmission";

export const useFormState = (onSuccess?: () => void) => {
  // Basic information
  const basicInfo = useBasicInfoState();
  
  // Levels
  const levels = useLevelsState();
  
  // Titles
  const titles = useTitlesState();
  
  // Skills
  const skills = useCustomListState({ itemName: 'skill' });
  
  // Asset Types
  const assetTypes = useCustomListState({ itemName: 'asset type' });
  
  // Sectors
  const sectors = useCustomListState({ itemName: 'sector' });

  // Reset all form data
  const resetForm = () => {
    basicInfo.resetBasicInfo();
    levels.resetLevels();
    titles.resetTitles();
    skills.reset();
    assetTypes.reset();
    sectors.reset();
  };
  
  // Form submission
  const formSubmission = useFormSubmission({ 
    onSuccess, 
    resetForm 
  });

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const formData: FormData = {
      id: basicInfo.candidateId,
      headline: basicInfo.headline,
      levels: levels.selectedLevels,
      titleCategories: titles.selectedTitleCategories,
      titles: titles.getProcessedTitles(),
      summary: basicInfo.summary,
      location: basicInfo.location,
      relocationPreference: basicInfo.relocationPreference,
      skills: skills.getAllItems(),
      assetTypes: assetTypes.getAllItems(),
      sectors: sectors.getAllItems(),
      tags: basicInfo.tags.split(",").map(t => t.trim()).filter(t => t !== ""),
      resumeUrl: basicInfo.resumeUrl
    };
    
    await formSubmission.submitForm(formData);
  };

  return {
    // From basicInfo
    candidateId: basicInfo.candidateId,
    setCandidateId: basicInfo.setCandidateId,
    resumeUrl: basicInfo.resumeUrl,
    setResumeUrl: basicInfo.setResumeUrl,
    headline: basicInfo.headline,
    setHeadline: basicInfo.setHeadline,
    summary: basicInfo.summary,
    setSummary: basicInfo.setSummary,
    location: basicInfo.location,
    setLocation: basicInfo.setLocation,
    tags: basicInfo.tags,
    setTags: basicInfo.setTags,
    relocationPreference: basicInfo.relocationPreference,
    setRelocationPreference: basicInfo.setRelocationPreference,
    
    // From levels
    selectedLevels: levels.selectedLevels,
    handleLevelChange: levels.handleLevelChange,
    
    // From titles
    selectedTitleCategories: titles.selectedTitleCategories,
    handleTitleCategoryChange: titles.handleTitleCategoryChange,
    selectedTitles: titles.selectedTitles,
    handleTitleChange: titles.handleTitleChange,
    customTitles: titles.customTitles,
    handleCustomTitleChange: titles.handleCustomTitleChange,
    addAnotherCustomTitle: titles.addAnotherCustomTitle,
    removeCustomTitle: titles.removeCustomTitle,
    
    // From skills
    selectedSkills: skills.selectedItems,
    handleSkillChange: skills.handleItemChange,
    customSkills: skills.customItems,
    addCustomSkill: skills.addCustomItem,
    handleCustomSkillChange: skills.handleCustomItemChange,
    removeCustomSkill: skills.removeCustomItem,
    
    // From assetTypes
    selectedAssetTypes: assetTypes.selectedItems,
    handleAssetTypeChange: assetTypes.handleItemChange,
    customAssetTypes: assetTypes.customItems,
    addCustomAssetType: assetTypes.addCustomItem,
    handleCustomAssetTypeChange: assetTypes.handleCustomItemChange,
    removeCustomAssetType: assetTypes.removeCustomItem,
    
    // From sectors
    selectedSectors: sectors.selectedItems,
    handleSectorChange: sectors.handleItemChange,
    customSectors: sectors.customItems,
    addCustomSector: sectors.addCustomItem,
    handleCustomSectorChange: sectors.handleCustomItemChange,
    removeCustomSector: sectors.removeCustomItem,
    
    // Form submission
    isUploading: formSubmission.isUploading,
    handleSubmit
  };
};
