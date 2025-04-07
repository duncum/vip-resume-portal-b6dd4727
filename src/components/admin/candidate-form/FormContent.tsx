
import React from "react";
import {
  BasicInfoFormSection,
  CandidateLevelsFormSection,
  PositionTitlesFormSection,
  SkillsFormSection,
  AssetTypesFormSection,
  SectorsFormSection
} from "./form-sections";

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
      <BasicInfoFormSection
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
        disabled={disabled}
      />
      
      <CandidateLevelsFormSection
        selectedLevels={selectedLevels}
        handleLevelChange={handleLevelChange}
        disabled={disabled}
      />
      
      <PositionTitlesFormSection
        selectedTitleCategories={selectedTitleCategories}
        handleTitleCategoryChange={handleTitleCategoryChange}
        selectedTitles={selectedTitles}
        handleTitleChange={handleTitleChange}
        customTitles={customTitles}
        handleCustomTitleChange={handleCustomTitleChange}
        addAnotherCustomTitle={addAnotherCustomTitle}
        removeCustomTitle={removeCustomTitle}
        disabled={disabled}
      />
      
      <SkillsFormSection
        selectedSkills={selectedSkills}
        handleSkillChange={handleSkillChange}
        customSkills={customSkills}
        addCustomSkill={addCustomSkill}
        handleCustomSkillChange={handleCustomSkillChange}
        removeCustomSkill={removeCustomSkill}
        disabled={disabled}
      />
      
      <AssetTypesFormSection
        selectedAssetTypes={selectedAssetTypes}
        handleAssetTypeChange={handleAssetTypeChange}
        customAssetTypes={customAssetTypes}
        addCustomAssetType={addCustomAssetType}
        handleCustomAssetTypeChange={handleCustomAssetTypeChange}
        removeCustomAssetType={removeCustomAssetType}
        disabled={disabled}
      />
      
      <SectorsFormSection
        selectedSectors={selectedSectors}
        handleSectorChange={handleSectorChange}
        customSectors={customSectors}
        addCustomSector={addCustomSector}
        handleCustomSectorChange={handleCustomSectorChange}
        removeCustomSector={removeCustomSector}
        disabled={disabled}
      />
    </>
  );
};

export default FormContent;
