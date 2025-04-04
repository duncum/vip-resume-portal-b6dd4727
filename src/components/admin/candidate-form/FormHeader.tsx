
import React from "react";
import { Badge } from "@/components/ui/badge";

interface FormHeaderProps {
  candidateId: string;
  candidateCount: number;
}

const FormHeader = ({ candidateId, candidateCount }: FormHeaderProps) => {
  return (
    <div className="flex justify-between items-center pb-4 mb-4 border-b">
      <div>
        <h3 className="text-xl font-medium">Upload New Resume</h3>
        <p className="text-sm text-gray-500">Candidate ID: <span className="font-mono text-gold">{candidateId}</span></p>
      </div>
      <Badge variant="outline" className="text-gold border-gold">
        {candidateCount} Candidates
      </Badge>
    </div>
  );
};

export default FormHeader;
