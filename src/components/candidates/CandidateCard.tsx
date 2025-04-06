
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
  ResumeLink
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
        <div className="flex justify-between items-start mb-2">
          <CategoryBadge category={category} title={title} />
          <RelocationBadge relocationPreference={relocationPreference} />
        </div>
        
        <CardTitle className="text-lg md:text-2xl font-display text-white leading-tight line-clamp-2">
          {headline}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-0">
        <LocationInfo location={location} />
        <SectorBadges sectors={sectors} />
        <CandidateSummary summary={summary} />
        <SkillBadges tags={tags} />
      </CardContent>
      
      <CardFooter className="pt-0 justify-center">
        <ResumeLink resumeUrl={resumeUrl} />
      </CardFooter>
      
      <Link to={`/candidate/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View candidate details</span>
      </Link>
    </Card>
  );
};

export default CandidateCard;
