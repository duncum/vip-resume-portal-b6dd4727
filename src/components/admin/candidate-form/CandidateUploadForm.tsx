
import React from "react";
import { FormProvider } from "./context/FormContext";
import { useApiKeyValidation } from "./hooks/useApiKeyValidation";
import FormLayout from "./FormLayout";
import { CandidateUploadFormProps } from "./types";

const CandidateUploadForm = ({ 
  onSuccess, 
  candidateCount = 0, 
  candidateToEdit 
}: CandidateUploadFormProps) => {
  const { isApiKeyOnly } = useApiKeyValidation();
  
  return (
    <FormProvider 
      onSuccess={onSuccess} 
      candidateToEdit={candidateToEdit}
      isApiKeyOnly={isApiKeyOnly}
    >
      <FormLayout candidateCount={candidateCount} />
    </FormProvider>
  );
};

export default CandidateUploadForm;
