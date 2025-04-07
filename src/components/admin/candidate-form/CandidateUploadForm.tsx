
import React from "react";
import { useFormState } from "./hooks/useFormState";
import { FormLayout } from "./FormLayout";
import { FormHeader } from "./FormHeader";
import { FormContent } from "./FormContent";
import { SubmitButton } from "./SubmitButton";
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
  const formState = useFormState(onSuccess, candidateToEdit || undefined);
  
  // Check if we're in API key only mode
  const { isApiKeyOnly } = useApiKeyValidation();
  
  // If we're in API key only mode, show the warning
  // but only if we're not editing a candidate
  if (isApiKeyOnly && !candidateToEdit) {
    return <ApiKeyWarning />;
  }
  
  return (
    <FormLayout>
      <FormHeader 
        isUploadMode={!candidateToEdit}
        candidateCount={candidateCount}
      />
      
      <form className="space-y-6" onSubmit={formState.handleSubmit}>
        <FormContent
          formState={formState}
          candidateToEdit={candidateToEdit}
        />
        
        <SubmitButton
          isUploading={formState.isUploading}
          isEditing={!!candidateToEdit}
        />
      </form>
    </FormLayout>
  );
};

export default CandidateUploadForm;
