
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
  onHeadlineChange: (headline: string) => void;
  disabled?: boolean;
}

export interface SummaryInputProps {
  summary: string;
  onSummaryChange: (summary: string) => void;
  disabled?: boolean;
}

export interface TagsInputProps {
  tags: string;
  onTagsChange: (tags: string) => void;
  disabled?: boolean;
}

export interface LocationSectionProps {
  location: string;
  onLocationChange: (location: string) => void;
  relocationPreference: string;
  onRelocationChange: (preference: string) => void;
  disabled?: boolean;
}

export interface SubmitButtonProps {
  isUploading: boolean;
  disabled?: boolean;
}

export interface CandidateLevelsProps {
  selectedLevels: string[];
  onLevelChange: (level: string, checked: boolean) => void;
  disabled?: boolean;
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
  disabled?: boolean;
}

export interface SkillsProps {
  selectedSkills: string[];
  onSkillChange: (item: string, checked: boolean) => void;
  customSkills: string[];
  onAddCustomSkill: () => void;
  onCustomSkillChange: (index: number, value: string) => void;
  onRemoveCustomSkill: (index: number) => void;
  disabled?: boolean;
}

export interface AssetTypesProps {
  selectedAssetTypes: string[];
  onAssetTypeChange: (item: string, checked: boolean) => void;
  customAssetTypes: string[];
  onAddCustomAssetType: () => void;
  onCustomAssetTypeChange: (index: number, value: string) => void;
  onRemoveCustomAssetType: (index: number) => void;
  disabled?: boolean;
}

export interface SectorsProps {
  selectedSectors: string[];
  onSectorChange: (item: string, checked: boolean) => void;
  customSectors: string[];
  onAddCustomSector: () => void;
  onCustomSectorChange: (index: number, value: string) => void;
  onRemoveCustomSector: (index: number) => void;
  disabled?: boolean;
}

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ResumeUploaderProps {
  candidateId: string;
  onCandidateIdChange: (id: string) => void;
  onResumeUrlChange: (url: string) => void;
  onResumeTextChange?: (text: string) => void;
  disabled?: boolean;
}
