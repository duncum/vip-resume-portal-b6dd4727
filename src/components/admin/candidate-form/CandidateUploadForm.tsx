
import React from "react";
import { FormProvider } from "./context/FormContext";
import FormLayout from "./FormLayout";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import SubmitButton from "./SubmitButton";
import ApiKeyWarning from "./ApiKeyWarning";
import { useApiKeyValidation } from "./hooks/useApiKeyValidation";
import { type Candidate } from "@/utils/sheets";

interface CandidateUploadFormProps {
  candidateCount?: number;
  candidateToEdit?: Candidate | null;
  onSuccess?: () => void;
}

const CandidateUploadForm: React.FC<CandidateUploadFormProps> = ({
  candidateCount = 0,
  candidateToEdit,
  onSuccess
}) => {
  // Check if we're in API key only mode
  const { isApiKeyOnly } = useApiKeyValidation();
  
  // If we're in API key only mode, show the warning
  // but only if we're not editing a candidate
  if (isApiKeyOnly && !candidateToEdit) {
    return <ApiKeyWarning />;
  }
  
  return (
    <FormProvider 
      onSuccess={onSuccess} 
      candidateToEdit={candidateToEdit || undefined}
      isApiKeyOnly={isApiKeyOnly}
    >
      <FormLayout>
        <FormHeader 
          isUploadMode={!candidateToEdit}
          candidateCount={candidateCount}
        />
        
        <form className="space-y-6">
          <FormContent
            disabled={false}
            isApiKeyOnly={isApiKeyOnly}
          />
          
          <SubmitButton 
            disabled={false}
          />
        </form>
      </FormLayout>
    </FormProvider>
  );
};

export default CandidateUploadForm;
