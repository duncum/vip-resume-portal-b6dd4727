
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "./context/FormContext";

interface FormHeaderProps {
  isUploadMode: boolean;
  candidateCount: number;
  candidateId?: string;
}

const FormHeader = ({ isUploadMode, candidateCount, candidateId: propCandidateId }: FormHeaderProps) => {
  const { candidateId: contextCandidateId } = useFormContext();
  const candidateId = propCandidateId || contextCandidateId;
  
  return (
    <div className="flex justify-between items-center pb-4 mb-4 border-b">
      <div>
        <h3 className="text-xl font-medium">
          {isUploadMode ? "Upload New Resume" : "Edit Candidate"}
        </h3>
        {candidateId && (
          <p className="text-sm text-gray-500">Candidate ID: <span className="font-mono text-gold">{candidateId}</span></p>
        )}
      </div>
      <Badge variant="outline" className="text-gold border-gold">
        {candidateCount} Candidates
      </Badge>
    </div>
  );
};

export default FormHeader;
