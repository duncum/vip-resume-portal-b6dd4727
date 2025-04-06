
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Briefcase } from "lucide-react";

interface NotableEmployersInputProps {
  notableEmployers: string;
  onNotableEmployersChange: (value: string) => void;
  disabled?: boolean;
}

const NotableEmployersInput = ({
  notableEmployers,
  onNotableEmployersChange,
  disabled = false
}: NotableEmployersInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="notableEmployers" className="flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-gold/80" />
        Notable Employers
      </Label>
      <Input
        id="notableEmployers"
        placeholder="e.g. Microsoft, Google, Amazon"
        value={notableEmployers}
        onChange={(e) => onNotableEmployersChange(e.target.value)}
        className="w-full"
        disabled={disabled}
      />
      <p className="text-sm text-gray-500">
        List notable previous employers (comma separated if multiple)
      </p>
    </div>
  );
};

export default NotableEmployersInput;
