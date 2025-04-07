
import React, { useEffect, useState } from "react";
import { useFormState } from "./useFormState";
import ResumeUploader from "./ResumeUploader";
import FormHeader from "./FormHeader";
import SubmitButton from "./SubmitButton";
import { CandidateUploadFormProps } from "./types";
import FormContent from "./FormContent";
import ApiKeyWarning from "./ApiKeyWarning";

const CandidateUploadForm = ({ onSuccess, candidateCount = 0, candidateToEdit }: CandidateUploadFormProps) => {
  const [isApiKeyOnly, setIsApiKeyOnly] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if we're in API key only mode
    const clientId = localStorage.getItem('google_client_id');
    const apiKey = localStorage.getItem('google_api_key');
    
    setIsApiKeyOnly((apiKey && apiKey !== '') && (!clientId || clientId === ''));
  }, []);
  
  const {
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
  } = useFormState(onSuccess, candidateToEdit);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isApiKeyOnly && <ApiKeyWarning />}
      
      <FormHeader candidateId={candidateId} candidateCount={candidateCount} />
      
      <ResumeUploader 
        candidateId={candidateId}
        onCandidateIdChange={setCandidateId}
        onResumeUrlChange={setResumeUrl}
        onResumeTextChange={setResumeText}
        disabled={isApiKeyOnly}
      />
      
      <FormContent 
        headline={headline}
        setHeadline={setHeadline}
        summary={summary}
        setSummary={setSummary}
        location={location}
        setLocation={setLocation}
        tags={tags}
        setTags={setTags}
        relocationPreference={relocationPreference}
        setRelocationPreference={setRelocationPreference}
        notableEmployers={notableEmployers}
        setNotableEmployers={setNotableEmployers}
        selectedLevels={selectedLevels}
        handleLevelChange={handleLevelChange}
        selectedTitleCategories={selectedTitleCategories}
        handleTitleCategoryChange={handleTitleCategoryChange}
        selectedTitles={selectedTitles}
        handleTitleChange={handleTitleChange}
        customTitles={customTitles}
        handleCustomTitleChange={handleCustomTitleChange}
        addAnotherCustomTitle={addAnotherCustomTitle}
        removeCustomTitle={removeCustomTitle}
        selectedSkills={selectedSkills}
        handleSkillChange={handleSkillChange}
        customSkills={customSkills}
        addCustomSkill={addCustomSkill}
        handleCustomSkillChange={handleCustomSkillChange}
        removeCustomSkill={removeCustomSkill}
        selectedAssetTypes={selectedAssetTypes}
        handleAssetTypeChange={handleAssetTypeChange}
        customAssetTypes={customAssetTypes}
        addCustomAssetType={addCustomAssetType}
        handleCustomAssetTypeChange={handleCustomAssetTypeChange}
        removeCustomAssetType={removeCustomAssetType}
        selectedSectors={selectedSectors}
        handleSectorChange={handleSectorChange}
        customSectors={customSectors}
        addCustomSector={addCustomSector}
        handleCustomSectorChange={handleCustomSectorChange}
        removeCustomSector={removeCustomSector}
        disabled={isApiKeyOnly}
      />
      
      <SubmitButton isUploading={isUploading} disabled={isApiKeyOnly} />
    </form>
  );
};

export default CandidateUploadForm;
