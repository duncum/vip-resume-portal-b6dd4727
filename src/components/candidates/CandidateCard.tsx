
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  relocationPreference
}: CandidateCardProps) => {
  const isOneManArmy = category === "One Man Army";
  const isMobile = useIsMobile();

  // Category to color mapping
  const categoryColors = {
    "Executive": "bg-blue-600 border-blue-400",
    "Director": "bg-purple-600 border-purple-400",
    "Mid-Senior level": "bg-green-600 border-green-400",
    "Emerging Executives": "bg-amber-600 border-amber-400",
    "One Man Army": "bg-red-600 border-red-400"
  };

  // Relocation badge color and text
  const relocationBadge = {
    "willing": { color: "bg-green-100 text-green-800 border-green-200", text: "Open to Relocation" },
    "remote-only": { color: "bg-blue-100 text-blue-800 border-blue-200", text: "Remote Only" },
    "flexible": { color: "bg-purple-100 text-purple-800 border-purple-200", text: "Flexible" }
  };

  return (
    <Link to={`/candidate/${id}`}>
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
                className={`${categoryColors[category as keyof typeof categoryColors] || "bg-gray-600 border-gray-400"} text-white text-xs`}
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
          {summary && (
            <p className="text-grey-300 text-sm mb-3 line-clamp-2">
              {summary}
            </p>
          )}
          
          {location && (
            <div className="flex items-center text-grey-400 text-xs mb-3">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
              
              {relocationPreference && (
                <Badge 
                  className={`ml-2 text-[10px] ${relocationBadge[relocationPreference as keyof typeof relocationBadge]?.color || ""}`}
                >
                  {relocationBadge[relocationPreference as keyof typeof relocationBadge]?.text || relocationPreference}
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
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
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-1 md:gap-2 pt-0">
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
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CandidateCard;
