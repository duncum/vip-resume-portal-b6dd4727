
import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FileDropZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onUploadClick: () => void;
  isUploading: boolean;
  isExtracting: boolean;
  disabled?: boolean;
}

const FileDropZone = ({
  selectedFile,
  onFileSelect,
  onUploadClick,
  isUploading,
  isExtracting,
  disabled
}: FileDropZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        return; // Error handling is in the parent component
      }
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'application/pdf') {
        return; // Error handling is in the parent component
      }
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div 
        className={`border-2 border-dashed border-grey-300 rounded-md p-6 flex flex-col items-center justify-center ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
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
          disabled={disabled}
        />
      </div>
      
      {selectedFile && !disabled && (
        <Button 
          type="button" 
          onClick={(e) => {
            e.stopPropagation();
            onUploadClick();
          }}
          disabled={isUploading || isExtracting || disabled}
          className="mt-4 w-full"
        >
          {isUploading ? "Uploading..." : isExtracting ? "Extracting text..." : "Upload Resume"}
        </Button>
      )}
    </>
  );
};

export default FileDropZone;
