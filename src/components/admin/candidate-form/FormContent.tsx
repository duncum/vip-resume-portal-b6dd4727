
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
    <>
      <BasicInfoFormSection disabled={disabled} />
      <CandidateLevelsFormSection disabled={disabled} />
      <PositionTitlesFormSection disabled={disabled} />
      <SkillsFormSection disabled={disabled} />
      <AssetTypesFormSection disabled={disabled} />
      <SectorsFormSection disabled={disabled} />
    </>
  );
};

export default FormContent;
