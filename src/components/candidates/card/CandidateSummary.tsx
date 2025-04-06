
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CandidateSummaryProps {
  summary?: string;
}

const CandidateSummary = ({ summary }: CandidateSummaryProps) => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  
  if (!summary) return null;

  // Truncate summary to approximately 4 lines (around 320 characters)
  const truncatedSummary = summary.length > 320 
    ? `${summary.substring(0, 320)}...` 
    : summary;

  return (
    <div className="mb-4 bg-gradient-to-br from-grey-800/30 to-grey-800/20 
      p-4 rounded-md border border-grey-700/30 hover:border-gold/30 
      transition-all duration-500
      shadow-inner shadow-black/10 hover:shadow-inner hover:shadow-black/15">
      <p className="text-grey-200 text-sm leading-relaxed min-h-[5rem]">
        {showFullSummary ? summary : truncatedSummary}
        {summary.length > 320 && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFullSummary(!showFullSummary);
            }}
            className="inline-flex items-center ml-1 text-gold hover:text-gold hover:underline text-xs 
              transition-colors font-medium group"
          >
            {showFullSummary ? "Show less" : "Read more"}
            <ChevronRight size={12} className={`ml-0.5 transition-transform duration-300 group-hover:translate-x-0.5 ${showFullSummary ? "rotate-90" : ""}`} />
          </button>
        )}
      </p>
    </div>
  );
};

export default CandidateSummary;
