
import React from "react";
import { ResumeUploaderProps } from "../types";
import { FileDropZone, UploadedFilePreview } from "./components";
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
      
      {errorMessage && (
        <div className="text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
