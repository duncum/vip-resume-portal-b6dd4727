
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CandidateSummaryProps {
  summary?: string;
}

const CandidateSummary = ({ summary }: CandidateSummaryProps) => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  
  if (!summary) return null;

  // Truncate summary to approximately 4 lines (around 200 characters)
  const truncatedSummary = summary.length > 200 
    ? `${summary.substring(0, 200)}...` 
    : summary;

  return (
    <div className="mb-4 bg-gradient-to-br from-grey-800/40 to-grey-800/30 
      p-2 rounded-md border border-grey-700/40 hover:border-grey-700/60 transition-colors">
      <p className="text-grey-300 text-sm leading-relaxed min-h-[5rem]">
        {showFullSummary ? summary : truncatedSummary}
        {summary.length > 200 && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFullSummary(!showFullSummary);
            }}
            className="inline-flex items-center ml-1 text-gold hover:text-gold/80 hover:underline text-xs transition-colors"
          >
            {showFullSummary ? "Show less" : "Read more"}
            <ChevronRight size={12} className={`ml-0.5 transition-transform duration-300 ${showFullSummary ? "rotate-90" : ""}`} />
          </button>
        )}
      </p>
    </div>
  );
};

export default CandidateSummary;
