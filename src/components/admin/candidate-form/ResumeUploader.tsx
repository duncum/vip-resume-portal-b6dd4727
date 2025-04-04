
import React from "react";
import { Upload, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResumeUploaderProps {
  candidateId: string;
  onCandidateIdChange?: (value: string) => void;
  isReadOnly?: boolean;
}

const ResumeUploader = ({ candidateId, onCandidateIdChange, isReadOnly = false }: ResumeUploaderProps) => {
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
      
      <div className="border-2 border-dashed border-grey-300 rounded-md p-6 flex flex-col items-center justify-center">
        <Upload className="h-10 w-10 text-grey-400 mb-2" />
        <p className="text-sm text-grey-600 mb-4">Drag and drop or click to upload PDF resume</p>
        <Input 
          type="file"
          accept=".pdf"
          className="max-w-xs"
        />
      </div>
    </div>
  );
};

export default ResumeUploader;
