
import React from "react";
import { CandidateLevelsProps } from "./types";
import { candidateLevels, categoryDescriptions } from "./form-data";
import CheckboxList from "./CheckboxList";

const CandidateLevels = ({ selectedLevels, onLevelChange }: CandidateLevelsProps) => {
  return (
    <>
      <p className="text-xs text-grey-600 mb-2">Select all levels that apply:</p>
      <CheckboxList 
        items={candidateLevels}
        selectedItems={selectedLevels}
        onChange={onLevelChange}
        descriptions={categoryDescriptions}
      />
    </>
  );
};

export default CandidateLevels;
