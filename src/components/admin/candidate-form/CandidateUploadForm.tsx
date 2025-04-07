
import React, { useEffect, useState } from "react";
import { useFormState } from "./useFormState";
import CollapsibleSection from "./CollapsibleSection";
import CandidateLevels from "./CandidateLevels";
import PositionTitles from "./PositionTitles";
import SkillsSection from "./SkillsSection";
import AssetTypesSection from "./AssetTypesSection";
import SectorsSection from "./SectorsSection";
import ResumeUploader from "./ResumeUploader";
import FormHeader from "./FormHeader";
import HeadlineInput from "./HeadlineInput";
import SummaryInput from "./SummaryInput";
import TagsInput from "./TagsInput";
import LocationSection from "./LocationSection";
import NotableEmployersInput from "./NotableEmployersInput";
import SubmitButton from "./SubmitButton";
import { CandidateUploadFormProps } from "./types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { type Candidate } from "@/utils/sheets"; // Import the Candidate type

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
  } = useFormState(onSuccess, candidateToEdit); // Pass candidateToEdit to useFormState

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isApiKeyOnly && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Key Only Mode</AlertTitle>
          <AlertDescription>
            You are in API key only mode which does not support adding candidates.
            Please add a Google OAuth Client ID in the Google Integration settings to enable this feature.
          </AlertDescription>
        </Alert>
      )}
      
      <FormHeader candidateId={candidateId} candidateCount={candidateCount} />
      
      <ResumeUploader 
        candidateId={candidateId}
        onCandidateIdChange={setCandidateId}
        onResumeUrlChange={setResumeUrl}
        onResumeTextChange={setResumeText}
        disabled={isApiKeyOnly}
      />
      
      <HeadlineInput headline={headline} onHeadlineChange={setHeadline} disabled={isApiKeyOnly} />
      
      <CollapsibleSection title="Candidate Level / Hierarchy">
        <CandidateLevels 
          selectedLevels={selectedLevels}
          onLevelChange={handleLevelChange}
          disabled={isApiKeyOnly}
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="Position Titles">
        <PositionTitles 
          selectedTitleCategories={selectedTitleCategories}
          onTitleCategoryChange={handleTitleCategoryChange}
          selectedTitles={selectedTitles}
          onTitleChange={handleTitleChange}
          customTitles={customTitles}
          onCustomTitleChange={handleCustomTitleChange}
          onAddCustomTitle={addAnotherCustomTitle}
          onRemoveCustomTitle={removeCustomTitle}
          disabled={isApiKeyOnly}
        />
      </CollapsibleSection>
      
      <NotableEmployersInput 
        notableEmployers={notableEmployers}
        onNotableEmployersChange={setNotableEmployers}
        disabled={isApiKeyOnly}
      />
      
      <CollapsibleSection title="High-Level Skills">
        <SkillsSection 
          selectedSkills={selectedSkills}
          onSkillChange={handleSkillChange}
          customSkills={customSkills}
          onAddCustomSkill={addCustomSkill}
          onCustomSkillChange={handleCustomSkillChange}
          onRemoveCustomSkill={removeCustomSkill}
          disabled={isApiKeyOnly}
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="Asset Type Experience">
        <AssetTypesSection 
          selectedAssetTypes={selectedAssetTypes}
          onAssetTypeChange={handleAssetTypeChange}
          customAssetTypes={customAssetTypes}
          onAddCustomAssetType={addCustomAssetType}
          onCustomAssetTypeChange={handleCustomAssetTypeChange}
          onRemoveCustomAssetType={removeCustomAssetType}
          disabled={isApiKeyOnly}
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="Sector / Ownership Experience">
        <SectorsSection 
          selectedSectors={selectedSectors}
          onSectorChange={handleSectorChange}
          customSectors={customSectors}
          onAddCustomSector={addCustomSector}
          onCustomSectorChange={handleCustomSectorChange}
          onRemoveCustomSector={removeCustomSector}
          disabled={isApiKeyOnly}
        />
      </CollapsibleSection>
      
      <SummaryInput summary={summary} onSummaryChange={setSummary} disabled={isApiKeyOnly} />
      
      <TagsInput tags={tags} onTagsChange={setTags} disabled={isApiKeyOnly} />
      
      <LocationSection
        location={location}
        onLocationChange={setLocation}
        relocationPreference={relocationPreference}
        onRelocationChange={setRelocationPreference}
        disabled={isApiKeyOnly}
      />
      
      <SubmitButton isUploading={isUploading} disabled={isApiKeyOnly} />
    </form>
  );
};

export default CandidateUploadForm;
