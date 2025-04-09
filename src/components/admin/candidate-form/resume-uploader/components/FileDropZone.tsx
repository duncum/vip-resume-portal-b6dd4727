
import React, { useState, useRef } from "react";
import { Upload, FileIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileDropZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onUploadClick: () => void;
  isUploading: boolean;
  isExtracting: boolean;
  disabled?: boolean;
  candidateIdEntered?: boolean;
}

const FileDropZone = ({
  selectedFile,
  onFileSelect,
  onUploadClick,
  isUploading,
  isExtracting,
  disabled = false,
  candidateIdEntered = false
}: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // If Candidate ID is not entered, show a clear message
  if (!candidateIdEntered) {
    return (
      <div className="w-full text-center py-6">
        <AlertCircle className="mx-auto mb-3 h-10 w-10 text-amber-500" />
        <p className="text-sm font-medium mb-2 text-gray-700">
          Please enter a Candidate ID first
        </p>
        <p className="text-xs text-gray-500">
          You must provide a Candidate ID before uploading a resume
        </p>
      </div>
    );
  }
  
  return (
    <div
      className={`w-full flex flex-col items-center justify-center py-4 ${isDragging ? 'bg-blue-50' : ''} transition-colors duration-200 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf"
        className="hidden"
        disabled={disabled || isUploading || isExtracting}
      />
      
      {isExtracting ? (
        <div className="text-center">
          <div className="animate-spin mx-auto mb-2 h-8 w-8 rounded-full border-4 border-blue-200 border-t-blue-500"></div>
          <p className="text-sm text-gray-500">Extracting text from PDF...</p>
        </div>
      ) : selectedFile ? (
        <div className="w-full text-center">
          <FileIcon className="mx-auto mb-2 h-8 w-8 text-blue-500" />
          <p className="text-sm mb-2 truncate max-w-full px-4">{selectedFile.name}</p>
          <p className="text-xs text-gray-500 mb-4">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          
          <Button
            type="button"
            variant="default"
            disabled={disabled || isUploading}
            onClick={onUploadClick}
            className="bg-gold hover:bg-gold-dark"
          >
            {isUploading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </>
            )}
          </Button>
          
          <button
            type="button"
            className="mt-2 text-xs text-gray-500 hover:text-gray-700"
            onClick={handleButtonClick}
            disabled={disabled || isUploading || isExtracting}
          >
            Choose a different file
          </button>
        </div>
      ) : (
        <div 
          className="w-full text-center" 
          onClick={disabled ? undefined : handleButtonClick}
        >
          <Upload className="mx-auto mb-2 h-10 w-10 text-gray-400" />
          <p className="text-sm font-medium mb-1">
            Drag and drop your resume, or <span className="text-blue-500">browse</span>
          </p>
          <p className="text-xs text-gray-500 mb-1">PDF files only (max 10MB)</p>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;
