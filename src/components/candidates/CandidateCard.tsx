
import { Link } from "react-router-dom";
import { Candidate } from "@/utils/sheets/types";
import { Search } from "lucide-react";

interface CandidateCardProps extends Candidate {
  resumeMatchCount?: number;
  searchQuery?: string;
}

const CandidateCard = ({ 
  id, 
  headline, 
  sectors, 
  tags, 
  category,
  title,
  summary,
  location,
  relocationPreference,
  resumeUrl,
  notableEmployers,
  resumeMatchCount,
  searchQuery
}: CandidateCardProps) => {
  // Format the category for display
  const displayCategory = category?.split(',')[0] || 'Uncategorized';
  
  // Determine if this card has resume matches
  const hasResumeMatches = resumeMatchCount && resumeMatchCount > 0;
  
  return (
    <Link
      to={`/candidate/${id}`}
      className="block h-full"
    >
      <div className="group bg-gradient-to-b from-grey-900/50 to-grey-900/30 backdrop-blur-sm border border-grey-800/50 rounded-lg h-full overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-gold/10 hover:shadow-lg relative">
        {/* Resume Match Badge */}
        {hasResumeMatches && (
          <div className="absolute top-3 right-3 bg-gold/90 text-black text-xs py-1 px-2 rounded-full flex items-center gap-1 animate-pulse">
            <Search size={12} />
            <span>{resumeMatchCount} in resume</span>
          </div>
        )}
        
        <div className="p-6">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-grey-800/70 text-grey-300 mb-4">
            {displayCategory}
          </div>
          
          {/* Headline */}
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gold transition-colors line-clamp-2">{headline}</h3>
          
          {/* Job Title */}
          {title && (
            <div className="text-sm text-grey-300 mb-4 font-medium">
              {title}
            </div>
          )}
          
          {/* Summary */}
          {summary && (
            <div className="mb-4">
              <p className="text-sm text-grey-400 line-clamp-3">{summary}</p>
            </div>
          )}
          
          {/* Sectors */}
          {sectors && sectors.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {sectors.slice(0, 3).map((sector, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-2 py-1 text-xs rounded bg-blue-900/20 text-blue-300 border border-blue-900/30"
                  >
                    {sector}
                  </span>
                ))}
                {sectors.length > 3 && (
                  <span className="inline-block px-2 py-1 text-xs rounded bg-grey-800/50 text-grey-400">
                    +{sectors.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 4).map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-2 py-1 text-xs rounded bg-grey-800/50 text-grey-300"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 4 && (
                  <span className="inline-block px-2 py-1 text-xs rounded bg-grey-800/50 text-grey-400">
                    +{tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Location */}
          {location && (
            <div className="text-xs text-grey-400 mb-2">
              <span className="font-medium text-grey-300">Location:</span> {location}
              {relocationPreference && (
                <span className="ml-1 text-xs">
                  ({relocationPreference.includes("Open") ? "Open to relocation" : "Not open to relocation"})
                </span>
              )}
            </div>
          )}
          
          {/* Notable Employers */}
          {notableEmployers && (
            <div className="text-xs text-grey-400">
              <span className="font-medium text-grey-300">Notable Employers:</span> {notableEmployers}
            </div>
          )}
          
          {/* View Profile Button */}
          <div className="mt-4 text-center">
            <span className="inline-block text-sm text-gold border border-gold/30 rounded px-3 py-1 hover:bg-gold/10 transition-colors">
              View Full Profile
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CandidateCard;
