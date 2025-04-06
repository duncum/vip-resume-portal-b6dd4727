
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, FileText, ChevronRight, Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CandidateCardProps {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  category?: string;
  title?: string;
  summary?: string;
  location?: string;
  relocationPreference?: string;
  resumeUrl?: string;
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
  resumeUrl
}: CandidateCardProps) => {
  const isOneManArmy = category === "One Man Army";
  const isMobile = useIsMobile();
  const [showFullSummary, setShowFullSummary] = useState(false);

  // Category to color mapping - updated to be more cohesive with site theme
  const categoryColors = {
    "Executive": "bg-gold/80 border-gold/60",
    "Director": "bg-gold/60 border-gold/40",
    "Mid-Senior level": "bg-gold/40 border-gold/30",
    "Emerging Executives": "bg-gold/30 border-gold/20",
    "One Man Army": "bg-gold border-gold/80"
  };

  // Relocation badge color and text - enhanced for better visual appeal
  const relocationBadge = {
    "willing": { color: "bg-gold/20 text-gold border-gold/40", text: "Open to Relocation" },
    "remote-only": { color: "bg-grey-800 text-white/80 border-grey-700", text: "Remote Only" },
    "flexible": { color: "bg-gold/10 text-gold/90 border-gold/30", text: "Flexible Location" }
  };

  // Truncate summary to 100 characters for preview
  const truncatedSummary = summary && summary.length > 100 
    ? `${summary.substring(0, 100)}...` 
    : summary;

  return (
    <Card className="h-full card-hover border border-gold/20 bg-gradient-to-b from-grey-900/90 to-grey-800/70 backdrop-blur-sm relative min-h-[280px] md:min-h-[320px] overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_-15px_rgba(171,135,85,0.3)]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40"></div>
      
      {isOneManArmy && (
        <div className="absolute top-0 right-3 md:right-5">
          <img 
            src="/lovable-uploads/e1ac2dc5-b6bf-42e4-a501-cf37986c19ee.png" 
            alt="One Man Army" 
            className="h-12 md:h-16 w-auto"
          />
        </div>
      )}
      
      <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 text-gold/40">
        <Star size={isMobile ? 30 : 40} strokeWidth={1} className="opacity-20" />
      </div>
      
      <CardHeader className="pb-1 md:pb-2">
        {category && (
          <div className="mb-2">
            <Badge 
              className={`${categoryColors[category as keyof typeof categoryColors] || "bg-grey-800 border-grey-700"} text-black text-xs`}
            >
              {category}
            </Badge>
            {title && (
              <span className="text-grey-400 text-xs ml-2">
                {title}
              </span>
            )}
          </div>
        )}
        <CardTitle className="text-lg md:text-2xl font-display text-white leading-tight line-clamp-2">
          {headline}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-0">
        {/* Location and Relocation Preference - at the top of content */}
        {location && (
          <div className="flex items-center justify-between text-grey-400 text-xs mb-3">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 text-gold/70" />
              <span>{location}</span>
            </div>
            
            {relocationPreference && (
              <Badge 
                className={`flex items-center gap-1 ${relocationBadge[relocationPreference as keyof typeof relocationBadge]?.color || "bg-grey-800 text-grey-300 border-grey-700"}`}
              >
                <Globe size={10} className="opacity-80" />
                {relocationBadge[relocationPreference as keyof typeof relocationBadge]?.text || relocationPreference}
              </Badge>
            )}
          </div>
        )}
        
        {/* Sectors/Industries */}
        <div className="flex flex-wrap gap-1 md:gap-2 mb-3">
          {sectors.map((sector, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-grey-800/70 text-grey-200 border-grey-700 backdrop-blur-sm shadow-sm text-xs whitespace-nowrap"
            >
              {sector}
            </Badge>
          ))}
        </div>
        
        {/* Summary with Read More option */}
        {summary && (
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
        )}
        
        {/* Skills/Tags with more vibrant colors */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
          {tags.slice(0, isMobile ? 3 : 5).map((tag, index) => (
            <Badge 
              key={index} 
              className="bg-gold/10 hover:bg-gold/20 text-gold border-gold/20 transition-colors text-xs whitespace-nowrap"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > (isMobile ? 3 : 5) && (
            <Badge className="bg-grey-800/50 text-grey-400 border-grey-700 text-xs">
              +{tags.length - (isMobile ? 3 : 5)} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 justify-center">
        {/* View Resume Button - moved to the bottom */}
        {resumeUrl && (
          <a 
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-full text-center inline-flex items-center justify-center text-xs px-3 py-2 rounded bg-grey-800 hover:bg-grey-700 text-gold border border-gold/30 transition-all hover:shadow-[0_0_15px_rgba(171,135,85,0.2)] mt-2"
          >
            <FileText size={14} className="mr-1.5" />
            View Confidential Resume
          </a>
        )}
      </CardFooter>
      
      <Link to={`/candidate/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View candidate details</span>
      </Link>
    </Card>
  );
};

export default CandidateCard;
