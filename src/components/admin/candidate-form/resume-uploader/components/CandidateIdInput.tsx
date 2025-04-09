
import React from "react";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CandidateIdInputProps {
  candidateId: string;
  onCandidateIdChange: (id: string) => void;
  disabled?: boolean;
  errorMessage?: string | null;
}

const CandidateIdInput = ({ 
  candidateId, 
  onCandidateIdChange, 
  disabled,
  errorMessage
}: CandidateIdInputProps) => {
  return (
    <div className="flex items-start flex-col space-y-1 pb-4 border-b border-grey-200">
      <div className="flex items-center space-x-2 w-full">
        <FileText className="h-5 w-5 text-gold" />
        <div className="flex-1">
          <Label className="text-sm font-medium">Candidate ID <span className="text-red-500">*</span></Label>
          <div className="text-xs text-gray-500 mb-1">Enter a unique identifier for this candidate</div>
          <Input
            value={candidateId}
            onChange={(e) => onCandidateIdChange?.(e.target.value)}
            placeholder="Enter candidate ID"
            className={`font-mono text-sm ${errorMessage ? 'border-red-500 focus-visible:ring-red-300' : ''}`}
            required
            disabled={disabled}
          />
        </div>
      </div>
      {errorMessage && (
        <div className="text-red-500 text-xs ml-7">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CandidateIdInput;
