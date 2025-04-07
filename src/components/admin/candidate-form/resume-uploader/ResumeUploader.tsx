
import React from "react";
import { ResumeUploaderProps } from "../types";
import { CandidateIdInput, FileDropZone, UploadedFilePreview } from "./components";
import { useResumeUpload } from "./hooks/useResumeUpload";

const ResumeUploader = ({ 
  candidateId, 
  onCandidateIdChange, 
  onResumeUrlChange,
  onResumeTextChange,
  disabled
}: ResumeUploaderProps) => {
  const {
    selectedFile,
    isUploading,
    isExtracting,
    uploadedUrl,
    handleFileSelect,
    handleUpload
  } = useResumeUpload({
    candidateId,
    onResumeUrlChange,
    onResumeTextChange,
    disabled
  });

  return (
    <div className="space-y-4">
      <CandidateIdInput 
        candidateId={candidateId}
        onCandidateIdChange={onCandidateIdChange}
        disabled={disabled}
      />
      
      <div 
        className={`border-2 border-dashed ${uploadedUrl ? 'border-green-300 bg-green-50' : 'border-grey-300'} rounded-md p-6 flex flex-col items-center justify-center ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {uploadedUrl ? (
          <UploadedFilePreview uploadedUrl={uploadedUrl} />
        ) : (
          <FileDropZone 
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            onUploadClick={handleUpload}
            isUploading={isUploading}
            isExtracting={isExtracting}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
