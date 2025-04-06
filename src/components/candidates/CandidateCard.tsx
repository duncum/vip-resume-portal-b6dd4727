
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CategoryBadge,
  RelocationBadge,
  LocationInfo,
  SectorBadges,
  CandidateSummary,
  SkillBadges,
  ResumeLink,
  NotableEmployers
} from "./card";

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
  notableEmployers?: string;
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
  notableEmployers
}: CandidateCardProps) => {
  const isOneManArmy = category === "One Man Army";
  const isMobile = useIsMobile();

  return (
    <Card className="h-full relative min-h-[280px] md:min-h-[320px] overflow-hidden
      border border-gold/20 
      bg-gradient-to-b from-grey-900/90 via-grey-900/80 to-grey-800/70 
      backdrop-blur-sm 
      transition-all duration-300 
      hover:border-gold/40
      hover:shadow-[0_10px_40px_-15px_rgba(171,135,85,0.3)]
      hover:translate-y-[-4px] 
      group">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40"></div>
      
      {/* One Man Army badge */}
      {isOneManArmy && (
        <div className="absolute top-0 right-3 md:right-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]">
          <img 
            src="/lovable-uploads/e1ac2dc5-b6bf-42e4-a501-cf37986c19ee.png" 
            alt="One Man Army" 
            className="h-12 md:h-16 w-auto"
          />
        </div>
      )}
      
      {/* Star decoration */}
      <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 text-gold/30 transition-opacity duration-300 group-hover:opacity-50">
        <Star size={isMobile ? 30 : 40} strokeWidth={1} className="opacity-20" />
      </div>
      
      <CardHeader className="pb-1 md:pb-2 relative z-10">
        <div className="flex justify-between items-start mb-2">
          <CategoryBadge category={category} title={title} />
        </div>
        
        <CardTitle className="text-lg md:text-2xl font-display text-white leading-tight line-clamp-2 
          group-hover:text-gold/90 transition-colors duration-300">
          {headline}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-0 z-10 relative">
        <LocationInfo 
          location={location} 
          relocationPreference={relocationPreference} 
        />
        <NotableEmployers employers={notableEmployers} />
        <CandidateSummary summary={summary} />
      </CardContent>
      
      <CardFooter className="flex-col items-start pt-0 mt-auto z-10 relative">
        <SectorBadges sectors={sectors} />
        <SkillBadges tags={tags} />
        <div className="w-full mt-2">
          <ResumeLink resumeUrl={resumeUrl} candidateId={id} />
        </div>
      </CardFooter>
      
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gold/0 opacity-0 group-hover:opacity-5 group-hover:bg-gold/5 transition-all duration-300 pointer-events-none"></div>
      
      <Link to={`/candidate/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View candidate details</span>
      </Link>
    </Card>
  );
};

export default CandidateCard;
