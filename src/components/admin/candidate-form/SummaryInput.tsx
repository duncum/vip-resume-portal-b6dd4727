
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { SummaryInputProps } from "./types";

const SummaryInput = ({ summary, onSummaryChange, disabled }: SummaryInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Candidate Summary</label>
      <Textarea 
        placeholder="Brief description of candidate's background and strengths"
        value={summary}
        onChange={(e) => onSummaryChange(e.target.value)}
        className="min-h-[100px]"
        disabled={disabled}
      />
    </div>
  );
};

export default SummaryInput;
