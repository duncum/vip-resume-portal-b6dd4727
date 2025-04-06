
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CandidateSummaryProps {
  summary?: string;
}

const CandidateSummary = ({ summary }: CandidateSummaryProps) => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  
  if (!summary) return null;

  // Truncate summary to approximately 4 lines (around 320 characters)
  // 320 characters is approximately 4 lines in the current font size and container width
  const truncatedSummary = summary.length > 320 
    ? `${summary.substring(0, 320)}...` 
    : summary;

  return (
    <div className="mb-4 bg-gradient-to-br from-grey-800/40 to-grey-800/30 
      p-3 rounded-md border border-grey-700/40 hover:border-gold/30 transition-all duration-300
      shadow-inner shadow-black/20">
      <p className="text-grey-300 text-sm leading-relaxed min-h-[5rem]">
        {showFullSummary ? summary : truncatedSummary}
        {summary.length > 320 && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFullSummary(!showFullSummary);
            }}
            className="inline-flex items-center ml-1 text-gold/90 hover:text-gold hover:underline text-xs transition-colors"
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
