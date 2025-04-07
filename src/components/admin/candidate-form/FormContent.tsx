
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
  disabled?: boolean;
}

const FormContent = ({ disabled = false }: FormContentProps) => {
  return (
    <div className="space-y-8">
      <div className="p-4 bg-gray-50 rounded-md text-sm text-gray-600">
        <p>Please complete all sections below based on the resume content. Organize information in order of importance.</p>
      </div>
      
      <BasicInfoFormSection disabled={disabled} />
      <PositionTitlesFormSection disabled={disabled} />
      <SkillsFormSection disabled={disabled} />
      <CandidateLevelsFormSection disabled={disabled} />
      <SectorsFormSection disabled={disabled} />
      <AssetTypesFormSection disabled={disabled} />
    </div>
  );
};

export default FormContent;
