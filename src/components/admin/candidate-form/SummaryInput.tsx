
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface SummaryInputProps {
  summary: string;
  onSummaryChange: (value: string) => void;
}

const SummaryInput = ({ summary, onSummaryChange }: SummaryInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Candidate Summary</label>
      <Textarea 
        placeholder="Brief description of candidate's background and strengths"
        value={summary}
        onChange={(e) => onSummaryChange(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
};

export default SummaryInput;
