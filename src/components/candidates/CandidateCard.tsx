
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CategoryBadge,
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
      bg-gradient-to-b from-grey-900/95 via-grey-900/90 to-grey-850/80 
      backdrop-blur-lg
      transition-all duration-500 
      hover:border-gold/40
      hover:shadow-[0_10px_40px_-10px_rgba(171,135,85,0.4)]
      hover:translate-y-[-4px] 
      group">
      {/* Premium gold accent line with animated gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40 group-hover:animate-shimmer"></div>
      
      {/* One Man Army badge with enhanced animation */}
      {isOneManArmy && (
        <div className="absolute top-1 right-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg] z-10">
          <img 
            src="/lovable-uploads/e1ac2dc5-b6bf-42e4-a501-cf37986c19ee.png" 
            alt="One Man Army" 
            className="h-10 md:h-12 w-auto opacity-90 group-hover:opacity-100 drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"
          />
        </div>
      )}
      
      <CardHeader className="pb-1 pt-5 px-5 md:px-6 relative z-10">
        <div className="mb-2">
          <CategoryBadge category={category} title={title} />
        </div>
        
        <CardTitle className="text-lg md:text-xl font-display text-white leading-tight line-clamp-2 
          group-hover:text-gradient-gold transition-all duration-500 mt-1 tracking-wide">
          {headline}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-0 pt-1 px-5 md:px-6 z-10 relative">
        <LocationInfo 
          location={location} 
          relocationPreference={relocationPreference} 
        />
        <NotableEmployers employers={notableEmployers} />
        <CandidateSummary summary={summary} />
      </CardContent>
      
      <CardFooter className="flex-col items-start pt-0 px-5 md:px-6 mt-auto z-10 relative">
        <SectorBadges sectors={sectors} />
        <SkillBadges tags={tags} />
        <div className="w-full mt-3">
          <ResumeLink resumeUrl={resumeUrl} candidateId={id} />
        </div>
      </CardFooter>
      
      {/* Multi-layered background effect for depth and luxury */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/0 to-gold/0 opacity-0 
        group-hover:opacity-10 group-hover:from-gold/5 group-hover:to-gold/15 
        transition-all duration-700 pointer-events-none"></div>
      
      {/* Subtle radial glow effect */}
      <div className="absolute inset-0 bg-radial-gold opacity-0 group-hover:opacity-10 
        transition-all duration-700 pointer-events-none"></div>
      
      <Link to={`/candidate/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View candidate details</span>
      </Link>
    </Card>
  );
};

export default CandidateCard;
