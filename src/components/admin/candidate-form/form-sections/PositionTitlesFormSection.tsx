
import React from "react";
import CollapsibleSection from "../CollapsibleSection";
import PositionTitles from "../PositionTitles";

interface PositionTitlesFormSectionProps {
  selectedTitleCategories: string[];
  handleTitleCategoryChange: (category: string, checked: boolean) => void;
  selectedTitles: Record<string, string[]>;
  handleTitleChange: (category: string, title: string, checked: boolean) => void;
  customTitles: Record<string, string[]>;
  handleCustomTitleChange: (category: string, index: number, value: string) => void;
  addAnotherCustomTitle: (category: string) => void;
  removeCustomTitle: (category: string, index: number) => void;
  disabled?: boolean;
}

const PositionTitlesFormSection = ({
  selectedTitleCategories,
  handleTitleCategoryChange,
  selectedTitles,
  handleTitleChange,
  customTitles,
  handleCustomTitleChange,
  addAnotherCustomTitle,
  removeCustomTitle,
  disabled = false
}: PositionTitlesFormSectionProps) => {
  return (
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
  );
};

export default PositionTitlesFormSection;
