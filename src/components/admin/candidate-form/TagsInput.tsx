
import React from "react";
import { Input } from "@/components/ui/input";
import { TagsInputProps } from "./types";

const TagsInput = ({ tags, onTagsChange, disabled }: TagsInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Additional Tags (comma separated)</label>
      <Input 
        placeholder="e.g. Leadership, Digital Marketing, Strategic Planning"
        value={tags}
        onChange={(e) => onTagsChange(e.target.value)}
        disabled={disabled}
      />
      <p className="text-xs text-grey-500">Use tags for additional searchable keywords</p>
    </div>
  );
};

export default TagsInput;
