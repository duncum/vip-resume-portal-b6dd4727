
import React from "react";
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
import SubmitButton from "./SubmitButton";
import { CandidateUploadFormProps } from "./types";

const CandidateUploadForm = ({ onSuccess, candidateCount = 0 }: CandidateUploadFormProps) => {
  const {
    isUploading,
    candidateId,
    setCandidateId,
    resumeUrl,
    setResumeUrl,
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
  } = useFormState(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormHeader candidateId={candidateId} candidateCount={candidateCount} />
      
      <ResumeUploader 
        candidateId={candidateId}
        onCandidateIdChange={setCandidateId}
        onResumeUrlChange={setResumeUrl}
      />
      
      <HeadlineInput headline={headline} onHeadlineChange={setHeadline} />
      
      <CollapsibleSection title="Candidate Level / Hierarchy">
        <CandidateLevels 
          selectedLevels={selectedLevels}
          onLevelChange={handleLevelChange}
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
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="High-Level Skills">
        <SkillsSection 
          selectedSkills={selectedSkills}
          onSkillChange={handleSkillChange}
          customSkills={customSkills}
          onAddCustomSkill={addCustomSkill}
          onCustomSkillChange={handleCustomSkillChange}
          onRemoveCustomSkill={removeCustomSkill}
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
        />
      </CollapsibleSection>
      
      <SummaryInput summary={summary} onSummaryChange={setSummary} />
      
      <TagsInput tags={tags} onTagsChange={setTags} />
      
      <LocationSection
        location={location}
        onLocationChange={setLocation}
        relocationPreference={relocationPreference}
        onRelocationChange={setRelocationPreference}
      />
      
      <SubmitButton isUploading={isUploading} />
    </form>
  );
};

export default CandidateUploadForm;
