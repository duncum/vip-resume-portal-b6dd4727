
import React from "react";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CandidateIdInputProps {
  candidateId: string;
  onCandidateIdChange: (id: string) => void;
  disabled?: boolean;
}

const CandidateIdInput = ({ 
  candidateId, 
  onCandidateIdChange, 
  disabled 
}: CandidateIdInputProps) => {
  return (
    <div className="flex items-center space-x-2 pb-2 border-b border-grey-200">
      <FileText className="h-5 w-5 text-gold" />
      <div className="flex-1">
        <Label className="text-sm">Candidate ID</Label>
        <Input
          value={candidateId}
          onChange={(e) => onCandidateIdChange?.(e.target.value)}
          placeholder="Enter candidate ID"
          className="font-mono text-sm"
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CandidateIdInput;
