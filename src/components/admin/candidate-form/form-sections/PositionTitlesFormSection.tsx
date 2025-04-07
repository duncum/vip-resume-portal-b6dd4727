
import React from "react";
import { useFormContext } from "../context/FormContext";
import CollapsibleSection from "../CollapsibleSection";
import PositionTitles from "../PositionTitles";

interface PositionTitlesFormSectionProps {
  disabled?: boolean;
}

const PositionTitlesFormSection = ({ disabled = false }: PositionTitlesFormSectionProps) => {
  const {
    selectedTitleCategories,
    handleTitleCategoryChange,
    selectedTitles,
    handleTitleChange,
    customTitles,
    handleCustomTitleChange,
    addAnotherCustomTitle,
    removeCustomTitle
  } = useFormContext();
  
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
