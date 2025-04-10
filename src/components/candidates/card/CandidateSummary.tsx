
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateSummaryProps {
  summary?: string;
}

const CandidateSummary = ({ summary }: CandidateSummaryProps) => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  
  if (!summary) return null;

  // Convert summary to sentence case and improve formatting
  const formatSummary = (text: string): string => {
    // Split the text by periods, exclamation marks, and question marks followed by a space
    const sentences = text.split(/(?<=[.!?])\s+/);
    
    // Capitalize the first letter of each sentence and keep the rest as is
    const formattedSentences = sentences.map(sentence => {
      if (sentence.length === 0) return sentence;
      return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
    });
    
    // Join the sentences back together
    return formattedSentences.join(' ');
  };

  const formattedSummary = formatSummary(summary);

  // Truncate summary to approximately 4 lines (around 250 characters)
  const truncatedSummary = formattedSummary.length > 250 
    ? `${formattedSummary.substring(0, 250)}...` 
    : formattedSummary;

  return (
    <div className="mb-4 bg-gradient-to-br from-grey-800/30 to-grey-800/10 
      p-4 rounded-md border border-grey-700/30 hover:border-gold/20 
      transition-all duration-500
      shadow-inner shadow-black/10 hover:shadow-inner hover:shadow-black/15">
      <p className="text-grey-200 text-sm leading-relaxed min-h-[4.5rem]">
        {showFullSummary ? formattedSummary : truncatedSummary}
        {formattedSummary.length > 250 && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFullSummary(!showFullSummary);
            }}
            className="inline-flex items-center ml-1 text-gold hover:text-gold-light hover:underline text-xs 
              transition-colors font-medium group"
          >
            {showFullSummary ? "Show less" : "Read more"}
            <ChevronRight size={12} className={cn(`ml-0.5 transition-transform duration-300 group-hover:translate-x-0.5`, showFullSummary ? "rotate-90" : "")} />
          </button>
        )}
      </p>
    </div>
  );
};

export default CandidateSummary;
