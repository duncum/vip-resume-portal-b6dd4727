
import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import CandidateLevels from "./CandidateLevels";
import PositionTitles from "./PositionTitles";
import SkillsSection from "./SkillsSection";
import AssetTypesSection from "./AssetTypesSection";
import SectorsSection from "./SectorsSection";
import HeadlineInput from "./HeadlineInput";
import SummaryInput from "./SummaryInput";
import TagsInput from "./TagsInput";
import LocationSection from "./LocationSection";
import NotableEmployersInput from "./NotableEmployersInput";

interface FormContentProps {
  headline: string;
  setHeadline: (headline: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
  location: string;
  setLocation: (location: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  relocationPreference: string;
  setRelocationPreference: (preference: string) => void;
  notableEmployers: string;
  setNotableEmployers: (employers: string) => void;
  
  // Levels
  selectedLevels: string[];
  handleLevelChange: (level: string, checked: boolean) => void;
  
  // Titles
  selectedTitleCategories: string[];
  handleTitleCategoryChange: (category: string, checked: boolean) => void;
  selectedTitles: Record<string, string[]>;
  handleTitleChange: (category: string, title: string, checked: boolean) => void;
  customTitles: Record<string, string[]>;
  handleCustomTitleChange: (category: string, index: number, value: string) => void;
  addAnotherCustomTitle: (category: string) => void;
  removeCustomTitle: (category: string, index: number) => void;
  
  // Skills
  selectedSkills: string[];
  handleSkillChange: (skill: string, checked: boolean) => void;
  customSkills: string[];
  addCustomSkill: () => void;
  handleCustomSkillChange: (index: number, value: string) => void;
  removeCustomSkill: (index: number) => void;
  
  // Asset Types
  selectedAssetTypes: string[];
  handleAssetTypeChange: (assetType: string, checked: boolean) => void;
  customAssetTypes: string[];
  addCustomAssetType: () => void;
  handleCustomAssetTypeChange: (index: number, value: string) => void;
  removeCustomAssetType: (index: number) => void;
  
  // Sectors
  selectedSectors: string[];
  handleSectorChange: (sector: string, checked: boolean) => void;
  customSectors: string[];
  addCustomSector: () => void;
  handleCustomSectorChange: (index: number, value: string) => void;
  removeCustomSector: (index: number) => void;
  
  disabled?: boolean;
}

const FormContent = ({
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
  
  disabled = false
}: FormContentProps) => {
  return (
    <>
      <HeadlineInput headline={headline} onHeadlineChange={setHeadline} disabled={disabled} />
      
      <CollapsibleSection title="Candidate Level / Hierarchy">
        <CandidateLevels 
          selectedLevels={selectedLevels}
          onLevelChange={handleLevelChange}
          disabled={disabled}
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
          disabled={disabled}
        />
      </CollapsibleSection>
      
      <NotableEmployersInput 
        notableEmployers={notableEmployers}
        onNotableEmployersChange={setNotableEmployers}
        disabled={disabled}
      />
      
      <CollapsibleSection title="High-Level Skills">
        <SkillsSection 
          selectedSkills={selectedSkills}
          onSkillChange={handleSkillChange}
          customSkills={customSkills}
          onAddCustomSkill={addCustomSkill}
          onCustomSkillChange={handleCustomSkillChange}
          onRemoveCustomSkill={removeCustomSkill}
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
        />
      </CollapsibleSection>
      
      <SummaryInput summary={summary} onSummaryChange={setSummary} disabled={disabled} />
      
      <TagsInput tags={tags} onTagsChange={setTags} disabled={disabled} />
      
      <LocationSection
        location={location}
        onLocationChange={setLocation}
        relocationPreference={relocationPreference}
        onRelocationChange={setRelocationPreference}
        disabled={disabled}
      />
    </>
  );
};

export default FormContent;
