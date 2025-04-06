
export interface CandidateUploadFormProps {
  onSuccess?: () => void;
  candidateCount?: number;
}

export interface FormHeaderProps {
  candidateId: string;
  candidateCount: number;
}

export interface HeadlineInputProps {
  headline: string;
  onHeadlineChange: (value: string) => void;
}

export interface SummaryInputProps {
  summary: string;
  onSummaryChange: (value: string) => void;
}

export interface TagsInputProps {
  tags: string;
  onTagsChange: (value: string) => void;
}

export interface LocationSectionProps {
  location: string;
  onLocationChange: (value: string) => void;
  relocationPreference: string;
  onRelocationChange: (value: string) => void;
}

export interface SubmitButtonProps {
  isUploading: boolean;
}

export interface CandidateLevelsProps {
  selectedLevels: string[];
  onLevelChange: (level: string, checked: boolean) => void;
}

export interface PositionTitlesProps {
  selectedTitleCategories: string[];
  onTitleCategoryChange: (category: string, checked: boolean) => void;
  selectedTitles: Record<string, string[]>;
  onTitleChange: (category: string, title: string, checked: boolean) => void;
  customTitles: Record<string, string[]>;
  onCustomTitleChange: (category: string, index: number, value: string) => void;
  onAddCustomTitle: (category: string) => void;
  onRemoveCustomTitle: (category: string, index: number) => void;
}

export interface SkillsProps {
  selectedSkills: string[];
  onSkillChange: (skill: string, checked: boolean) => void;
  customSkills: string[];
  onAddCustomSkill: () => void;
  onCustomSkillChange: (index: number, value: string) => void;
  onRemoveCustomSkill: (index: number) => void;
}

export interface AssetTypesProps {
  selectedAssetTypes: string[];
  onAssetTypeChange: (assetType: string, checked: boolean) => void;
  customAssetTypes: string[];
  onAddCustomAssetType: () => void;
  onCustomAssetTypeChange: (index: number, value: string) => void;
  onRemoveCustomAssetType: (index: number) => void;
}

export interface SectorsProps {
  selectedSectors: string[];
  onSectorChange: (sector: string, checked: boolean) => void;
  customSectors: string[];
  onAddCustomSector: () => void;
  onCustomSectorChange: (index: number, value: string) => void;
  onRemoveCustomSector: (index: number) => void;
}

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ResumeUploaderProps {
  candidateId: string;
  onCandidateIdChange?: (value: string) => void;
  isReadOnly?: boolean;
  onResumeUrlChange?: (url: string) => void;
}
