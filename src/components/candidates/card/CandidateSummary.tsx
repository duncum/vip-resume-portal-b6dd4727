
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CandidateSummaryProps {
  summary?: string;
}

const CandidateSummary = ({ summary }: CandidateSummaryProps) => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  
  if (!summary) return null;

  // Truncate summary to 100 characters for preview
  const truncatedSummary = summary.length > 100 
    ? `${summary.substring(0, 100)}...` 
    : summary;

  return (
    <div className="mb-4 bg-grey-800/40 p-2 rounded-md border border-grey-700/40">
      <p className="text-grey-300 text-sm">
        {showFullSummary ? summary : truncatedSummary}
        {summary.length > 100 && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFullSummary(!showFullSummary);
            }}
            className="inline-flex items-center ml-1 text-gold hover:underline text-xs"
          >
            {showFullSummary ? "Show less" : "Read more"}
            <ChevronRight size={12} className={`ml-0.5 transition-transform ${showFullSummary ? "rotate-90" : ""}`} />
          </button>
        )}
      </p>
    </div>
  );
};

export default CandidateSummary;
