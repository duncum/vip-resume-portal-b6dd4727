
import React from "react";
import { Input } from "@/components/ui/input";

interface HeadlineInputProps {
  headline: string;
  onHeadlineChange: (value: string) => void;
}

const HeadlineInput = ({ headline, onHeadlineChange }: HeadlineInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Candidate Headline</label>
      <Input 
        placeholder="e.g. Senior Marketing Executive with 10+ years experience" 
        value={headline}
        onChange={(e) => onHeadlineChange(e.target.value)}
      />
    </div>
  );
};

export default HeadlineInput;
