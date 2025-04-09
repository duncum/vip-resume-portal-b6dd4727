
import React from "react";
import { useFormContext } from "./context/FormContext";
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
      
      {/* Form sections in logical order */}
      <BasicInfoFormSection disabled={disabled} />
      <CandidateLevelsFormSection disabled={disabled} />
      <PositionTitlesFormSection disabled={disabled} />
      <SkillsFormSection disabled={disabled} />
      <SectorsFormSection disabled={disabled} />
      <AssetTypesFormSection disabled={disabled} />
    </div>
  );
};

export default FormContent;
