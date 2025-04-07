
import React from "react";
import { useFormContext } from "./context/FormContext";
import FormHeader from "./FormHeader";
import { ResumeUploader } from "./resume-uploader";
import FormContent from "./FormContent";
import SubmitButton from "./SubmitButton";

interface FormLayoutProps {
  candidateCount: number;
}

const FormLayout = ({ candidateCount }: FormLayoutProps) => {
  const { 
    handleSubmit, 
    isUploading, 
    isApiKeyOnly,
    candidateId,
    setCandidateId,
    setResumeUrl,
    setResumeText
  } = useFormContext();

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormHeader candidateId={candidateId} candidateCount={candidateCount} />
        
        <ResumeUploader 
          candidateId={candidateId}
          onCandidateIdChange={setCandidateId}
          onResumeUrlChange={setResumeUrl}
          onResumeTextChange={setResumeText}
          disabled={isApiKeyOnly}
        />
        
        <FormContent disabled={isApiKeyOnly} isApiKeyOnly={isApiKeyOnly} />
        
        <SubmitButton isUploading={isUploading} disabled={isApiKeyOnly} />
      </form>
    </div>
  );
};

export default FormLayout;
