
import React from "react";
import { Check } from "lucide-react";

interface UploadedFilePreviewProps {
  uploadedUrl: string;
}

const UploadedFilePreview = ({ uploadedUrl }: UploadedFilePreviewProps) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-2">
        <Check className="h-10 w-10 text-green-500" />
      </div>
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
  );
};

export default UploadedFilePreview;
