
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
    isDeleting,
    uploadedUrl,
    errorMessage,
    handleFileSelect,
    handleUpload,
    resetUpload
  } = useResumeUpload({
    candidateId,
    onResumeUrlChange,
    onResumeTextChange,
    disabled
  });

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-md mb-4 flex items-center gap-2">
        <span className="text-blue-600 font-medium text-sm">Step 1:</span>
        <span className="text-slate-700">Enter a Candidate ID below</span>
      </div>
      
      <CandidateIdInput 
        candidateId={candidateId}
        onCandidateIdChange={onCandidateIdChange}
        disabled={disabled}
        errorMessage={errorMessage}
      />
      
      <div className="bg-blue-50 p-4 rounded-md mb-2 flex items-center gap-2">
        <span className="text-blue-600 font-medium text-sm">Step 2:</span>
        <span className="text-slate-700">Upload candidate's resume</span>
      </div>
      
      <div 
        className={`border-2 border-dashed ${uploadedUrl ? 'border-green-300 bg-green-50' : errorMessage ? 'border-red-200 bg-red-50' : candidateId ? 'border-grey-300' : 'border-grey-200 bg-gray-50'} rounded-md p-6 flex flex-col items-center justify-center ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {uploadedUrl ? (
          <UploadedFilePreview 
            uploadedUrl={uploadedUrl}
            onReset={resetUpload}
            disabled={disabled}
            isDeleting={isDeleting}
          />
        ) : (
          <FileDropZone 
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            onUploadClick={handleUpload}
            isUploading={isUploading}
            isExtracting={isExtracting}
            disabled={disabled}
            candidateIdEntered={candidateId.trim().length > 0}
          />
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
