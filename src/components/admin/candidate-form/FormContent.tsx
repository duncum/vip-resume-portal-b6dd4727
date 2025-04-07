
import React from "react";
import {
  BasicInfoFormSection,
  CandidateLevelsFormSection,
  PositionTitlesFormSection,
  SkillsFormSection,
  AssetTypesFormSection,
  SectorsFormSection
} from "./form-sections";
import ApiKeyWarning from "./ApiKeyWarning";

interface FormContentProps {
  disabled?: boolean;
  isApiKeyOnly?: boolean;
}

const FormContent = ({ disabled = false, isApiKeyOnly = false }: FormContentProps) => {
  return (
    <div className="space-y-8">
      {isApiKeyOnly && <ApiKeyWarning />}
      
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
