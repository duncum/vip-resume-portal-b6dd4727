
import React from "react";
import { Input } from "@/components/ui/input";

interface TagsInputProps {
  tags: string;
  onTagsChange: (value: string) => void;
}

const TagsInput = ({ tags, onTagsChange }: TagsInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Additional Tags (comma separated)</label>
      <Input 
        placeholder="e.g. Leadership, Digital Marketing, Strategic Planning"
        value={tags}
        onChange={(e) => onTagsChange(e.target.value)}
      />
      <p className="text-xs text-grey-500">Use tags for additional searchable keywords</p>
    </div>
  );
};

export default TagsInput;
