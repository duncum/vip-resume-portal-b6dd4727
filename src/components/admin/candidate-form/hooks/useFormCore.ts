
import { useBasicInfoState, useLevelsState, useTitlesState, useCustomListState, useFormSubmission } from './';
import { type Candidate } from '@/utils/sheets/types';
import { useCandidateEdit } from './useCandidateEdit';

export const useFormCore = (onSuccess?: () => void, candidateToEdit?: Candidate) => {
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

  // Use candidate edit hook to populate form when editing
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
  const submissionState = useFormSubmission({
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

  // Return all the created state objects for easier access in useFormState
  return {
    basicInfoState,
    levelsState,
    titlesState,
    skillsState,
    assetTypesState,
    sectorsState,
    submissionState
  };
};
