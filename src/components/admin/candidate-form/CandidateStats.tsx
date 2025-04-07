
import React from "react";
import { Badge } from "@/components/ui/badge";

interface CandidateStatsProps {
  candidateCount: number;
}

const CandidateStats = ({ candidateCount }: CandidateStatsProps) => {
  return (
    <Badge variant="outline" className="text-gold border-gold">
      {candidateCount} Candidates
    </Badge>
  );
};

export default CandidateStats;
