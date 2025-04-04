
import React, { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { uploadResumeToDrive } from "@/utils/googleDrive";
import { Button } from "@/components/ui/button";

interface ResumeUploaderProps {
  candidateId: string;
  onCandidateIdChange?: (value: string) => void;
  isReadOnly?: boolean;
  onResumeUrlChange?: (url: string) => void;
}

const ResumeUploader = ({ 
  candidateId, 
  onCandidateIdChange, 
  isReadOnly = false,
  onResumeUrlChange
}: ResumeUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check if the file is a PDF
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        return;
      }
      
      setSelectedFile(file);
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Check if the file is a PDF
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 pb-2 border-b border-grey-200">
        <FileText className="h-5 w-5 text-gold" />
        <div className="flex-1">
          <Label className="text-sm">Candidate ID</Label>
          {isReadOnly ? (
            <p className="font-mono text-sm">{candidateId}</p>
          ) : (
            <Input
              value={candidateId}
              onChange={(e) => onCandidateIdChange?.(e.target.value)}
              placeholder="Enter candidate ID"
              className="font-mono text-sm"
            />
          )}
        </div>
      </div>
      
      <div 
        className="border-2 border-dashed border-grey-300 rounded-md p-6 flex flex-col items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileInput}
      >
        <Upload className="h-10 w-10 text-grey-400 mb-2" />
        <p className="text-sm text-grey-600 mb-1">
          {selectedFile 
            ? `Selected: ${selectedFile.name}` 
            : "Drag and drop or click to upload PDF resume"}
        </p>
        <p className="text-xs text-grey-500 mb-4">
          Max file size: 10MB
        </p>
        <Input 
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {selectedFile && !uploadedUrl && (
          <Button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              handleUpload();
            }}
            disabled={isUploading}
            className="mt-2"
          >
            {isUploading ? "Uploading..." : "Upload Resume"}
          </Button>
        )}
        
        {uploadedUrl && (
          <div className="mt-2 text-center">
            <p className="text-sm text-green-600 mb-1">Resume uploaded successfully!</p>
            <a 
              href={uploadedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 underline"
              onClick={(e) => e.stopPropagation()}
            >
              View uploaded resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
