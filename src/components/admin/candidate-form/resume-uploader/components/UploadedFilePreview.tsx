
import React from "react";
import { Check } from "lucide-react";
import DeleteButton from "./DeleteButton";

interface UploadedFilePreviewProps {
  uploadedUrl: string;
  onReset: () => void;
  disabled?: boolean;
  isDeleting?: boolean;
}

const UploadedFilePreview = ({ 
  uploadedUrl, 
  onReset, 
  disabled = false,
  isDeleting = false
}: UploadedFilePreviewProps) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-2">
        <Check className="h-10 w-10 text-green-500" />
      </div>
      <p className="text-sm text-green-600 mb-1">Resume uploaded successfully!</p>
      <div className="flex items-center justify-center space-x-2">
        <a 
          href={uploadedUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-500 underline"
          onClick={(e) => e.stopPropagation()}
        >
          View resume
        </a>
        <DeleteButton 
          onDelete={onReset}
          disabled={disabled}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};

export default UploadedFilePreview;
