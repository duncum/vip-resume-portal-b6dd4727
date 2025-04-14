
import { Link } from "react-router-dom";
import { UserRound, MapPin, Building, Search } from "lucide-react";
import { Candidate } from "@/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  searchQuery?: string;
}

const CandidateCard = ({ candidate, searchQuery = "" }: CandidateCardProps) => {
  const {
    id,
    headline,
    sectors,
    tags,
    category,
    title,
    summary,
    location,
    relocationPreference,
    notableEmployers,
    resumeMatchCount
  } = candidate;
  
  // Determine if this card has resume matches
  const hasResumeMatches = resumeMatchCount && resumeMatchCount > 0;
  
  return (
    <Link
      to={`/candidates/${id}`}
      className="block h-full"
    >
      <div className="group bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-lg h-full overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:shadow-amber-500/10 hover:shadow-lg relative">
        {/* Resume Match Badge */}
        {hasResumeMatches && (
          <div className="absolute top-3 right-3 bg-amber-500/90 text-black text-xs py-1 px-2 rounded-full flex items-center gap-1 animate-pulse">
            <Search size={12} />
            <span>{resumeMatchCount} in resume</span>
          </div>
        )}
        
        <div className="p-6">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-800/70 text-gray-300 mb-4">
            {category || "Uncategorized"}
          </div>
          
          {/* Headline */}
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-500 transition-colors line-clamp-2">{headline}</h3>
          
          {/* Job Title */}
          {title && (
            <div className="text-sm text-gray-300 mb-4 font-medium">
              {title}
            </div>
          )}
          
          {/* Summary */}
          {summary && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 line-clamp-3">{summary}</p>
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
                  <span className="inline-block px-2 py-1 text-xs rounded bg-gray-800/50 text-gray-400">
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
                    className="inline-block px-2 py-1 text-xs rounded bg-gray-800/50 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 4 && (
                  <span className="inline-block px-2 py-1 text-xs rounded bg-gray-800/50 text-gray-400">
                    +{tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Location */}
          {location && (
            <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
              <MapPin size={12} className="text-gray-500" />
              <span className="font-medium text-gray-300">{location}</span>
              {relocationPreference && (
                <span className="ml-1 text-xs">
                  ({relocationPreference.includes("Open") ? "Open to relocation" : "Not open to relocation"})
                </span>
              )}
            </div>
          )}
          
          {/* Notable Employers */}
          {notableEmployers && (
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Building size={12} className="text-gray-500" />
              <span className="font-medium text-gray-300">{notableEmployers}</span>
            </div>
          )}
          
          {/* View Profile Button */}
          <div className="mt-4 text-center">
            <span className="inline-block text-sm text-amber-500 border border-amber-500/30 rounded px-3 py-1 hover:bg-amber-500/10 transition-colors">
              View Full Profile
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CandidateCard;
