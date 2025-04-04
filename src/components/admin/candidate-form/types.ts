
export interface CandidateUploadFormProps {
  onSuccess?: () => void;
  candidateCount?: number;
}

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
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

export interface CheckboxListProps {
  items: string[];
  selectedItems: string[];
  onChange: (item: string, checked: boolean) => void;
  descriptions?: Record<string, string>;
  columns?: number;
}

export interface CustomItemsProps {
  items: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

export interface ResumeUploaderProps {
  candidateId?: string;
}
