
import { Star, MapPin } from "lucide-react";
import { type Candidate } from "@/utils/sheets";
import { RelocationBadge } from "../candidates/card";

interface CandidateHeaderProps {
  candidate: Candidate;
}

const CandidateHeader = ({ candidate }: CandidateHeaderProps) => {
  const isOneManArmy = candidate.category === "One Man Army";
  
  return (
    <div className="mb-6 relative">
      {/* Gold gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40"></div>
      
      {/* One Man Army badge */}
      {isOneManArmy && (
        <div className="absolute top-2 right-0">
          <img 
            src="/lovable-uploads/e1ac2dc5-b6bf-42e4-a501-cf37986c19ee.png" 
            alt="One Man Army" 
            className="h-16 w-auto"
          />
        </div>
      )}
      
      {/* Category badge */}
      <div className="mt-4 mb-3">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-gold/30 to-gold/10 text-gold border border-gold/30">
          {candidate.category || "Candidate"} {candidate.title ? `• ${candidate.title}` : ""}
        </span>
      </div>
      
      {/* Headline */}
      <h1 className="text-2xl md:text-3xl font-display text-white mb-2 pr-20">
        {candidate.headline}
      </h1>
      
      {/* Location and relocation preference */}
      <div className="flex items-center justify-between text-grey-400 text-sm mb-4">
        <div className="flex items-center">
          {candidate.location && (
            <>
              <MapPin size={16} className="mr-1.5 text-gold/70" />
              <span>{candidate.location}</span>
            </>
          )}
        </div>
        {candidate.relocationPreference && (
          <RelocationBadge relocationPreference={candidate.relocationPreference} />
        )}
      </div>
      
      {/* Notable employers */}
      {candidate.notableEmployers && (
        <div className="mb-4 text-grey-300">
          <span className="text-gold/90 font-medium">Notable Experience:</span> {candidate.notableEmployers}
        </div>
      )}
      
      {/* Summary */}
      {candidate.summary && (
        <div className="text-grey-300 text-sm md:text-base border-l-2 border-gold/30 pl-4 py-1 my-4">
          {candidate.summary}
        </div>
      )}
      
      <div className="absolute bottom-2 left-0 text-gold/40">
        <Star size={40} strokeWidth={1} className="opacity-20" />
      </div>
    </div>
  );
};

export default CandidateHeader;
