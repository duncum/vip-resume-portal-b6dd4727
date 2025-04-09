
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
  const { candidateId, setCandidateId, resumeUrl, setResumeUrl, setResumeText } = useFormContext();
  
  return (
    <div className="space-y-8">
      {isApiKeyOnly && <ApiKeyWarning />}
      
      {/* Ensure the BasicInfoFormSection always appears first */}
      <BasicInfoFormSection disabled={disabled} />
      
      {/* Then show other form sections */}
      <PositionTitlesFormSection disabled={disabled} />
      <SkillsFormSection disabled={disabled} />
      <CandidateLevelsFormSection disabled={disabled} />
      <SectorsFormSection disabled={disabled} />
      <AssetTypesFormSection disabled={disabled} />
    </div>
  );
};

export default FormContent;
