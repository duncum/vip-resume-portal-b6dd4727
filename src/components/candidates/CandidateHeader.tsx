
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Globe } from "lucide-react";
import { Candidate } from "@/utils/sheets";

interface CandidateHeaderProps {
  candidate: Candidate;
}

const categoryColors = {
  "Executive": "bg-gold/80 border-gold/60",
  "Director": "bg-gold/60 border-gold/40",
  "Mid-Senior level": "bg-gold/40 border-gold/30",
  "Emerging Executives": "bg-gold/30 border-gold/20",
  "One Man Army": "bg-gold border-gold/80"
};

const relocationBadge = {
  "willing": { color: "bg-grey-800 text-gold border-gold/30", text: "Open to Relocation" },
  "remote-only": { color: "bg-grey-800 text-white/80 border-grey-700", text: "Remote Only" },
  "flexible": { color: "bg-grey-800 text-gold/70 border-gold/20", text: "Flexible Location" }
};

const CandidateHeader = ({ candidate }: CandidateHeaderProps) => {
  // Determine relocation badge properties
  const showRelocationBadge = !candidate.relocationPreference || candidate.relocationPreference === "willing" || candidate.relocationPreference === "flexible";
  
  const relocationText = candidate.relocationPreference ? 
    relocationBadge[candidate.relocationPreference as keyof typeof relocationBadge]?.text || candidate.relocationPreference :
    "Open to Relocation";
  
  const relocationColor = candidate.relocationPreference ?
    relocationBadge[candidate.relocationPreference as keyof typeof relocationBadge]?.color || "bg-grey-800 text-gold border-gold/30" :
    "bg-grey-800 text-gold border-gold/30";

  return (
    <div className="mb-6 md:mb-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/candidates" className="flex items-center text-grey-600 hover:text-gold">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Candidates
        </Link>
      </Button>
      
      {candidate.category && (
        <div className="mb-4">
          <Badge 
            className={`${categoryColors[candidate.category as keyof typeof categoryColors] || "bg-grey-800 border-grey-700"} text-black mr-2`}
          >
            {candidate.category}
          </Badge>
          {candidate.title && (
            <span className="text-grey-500">
              {candidate.title}
            </span>
          )}
        </div>
      )}
      
      <h1 className="text-2xl md:text-3xl font-bold font-display mb-4">
        {candidate.headline}
      </h1>
      
      {candidate.summary && (
        <p className="text-grey-300 mb-4 md:mb-6">
          {candidate.summary}
        </p>
      )}
      
      <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
        {candidate.location && (
          <div className="flex items-center text-grey-400">
            <MapPin size={16} className="mr-2" />
            <span>{candidate.location}</span>
          </div>
        )}
        
        {/* Show relocation badge */}
        {showRelocationBadge && (
          <Badge className={`flex items-center gap-1 ${relocationColor}`}>
            <Globe size={12} className="opacity-80" />
            {relocationText}
          </Badge>
        )}
        
        {/* Show Remote Only badge when specified */}
        {candidate.relocationPreference === "remote-only" && (
          <Badge className="flex items-center gap-1 bg-grey-800 text-white/80 border-grey-700">
            <Globe size={12} className="opacity-80" />
            Remote Only
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CandidateHeader;
