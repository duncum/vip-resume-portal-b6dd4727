
import React, { useState } from "react";
import { toast } from "sonner";
import { uploadResumeToDrive } from "@/utils/drive";
import { extractTextFromPdf } from "@/utils/pdf";
import { ResumeUploaderProps } from "./types";
import { CandidateIdInput, FileDropZone, UploadedFilePreview } from "./resume-uploader";

const ResumeUploader = ({ 
  candidateId, 
  onCandidateIdChange, 
  onResumeUrlChange,
  onResumeTextChange,
  disabled
}: ResumeUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const handleFileSelect = async (file: File) => {
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }
    
    setSelectedFile(file);
    
    // Extract text from the PDF
    if (onResumeTextChange) {
      try {
        setIsExtracting(true);
        const extractedText = await extractTextFromPdf(file);
        onResumeTextChange(extractedText);
        toast.success('Resume text extracted successfully');
      } catch (error) {
        console.error('Error extracting text from PDF:', error);
        toast.error('Failed to extract text from PDF');
      } finally {
        setIsExtracting(false);
      }
    }
  };

  const handleUpload = async () => {
    if (!candidateId.trim()) {
      toast.error('Please enter a Candidate ID first');
      return;
    }
    
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const resumeUrl = await uploadResumeToDrive(selectedFile, candidateId);
      setUploadedUrl(resumeUrl);
      
      if (onResumeUrlChange) {
        onResumeUrlChange(resumeUrl);
      }
      
      toast.success('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = async () => {
    setIsDeleting(true);
    
    try {
      // Clear the form state
      setSelectedFile(null);
      setUploadedUrl("");
      
      if (onResumeUrlChange) {
        onResumeUrlChange("");
      }
      
      if (onResumeTextChange) {
        onResumeTextChange("");
      }
      
      toast.success('Resume removed successfully');
    } catch (error) {
      console.error('Error removing resume:', error);
      toast.error('Failed to remove resume');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <CandidateIdInput 
        candidateId={candidateId}
        onCandidateIdChange={onCandidateIdChange}
        disabled={disabled}
      />
      
      <div 
        className={`border-2 border-dashed ${uploadedUrl ? 'border-green-300 bg-green-50' : 'border-grey-300'} rounded-md p-6 flex flex-col items-center justify-center ${disabled ? 'opacity-70' : ''}`}
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
          />
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
