
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import { CategoryBadge, SectorBadges, SkillBadges, LocationInfo, RelocationBadge, NotableEmployers, CandidateSummary } from "./card";
import { trackIpAddress } from "@/utils/tracking";

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
  // Clean ID to ensure it ONLY includes the ID part and nothing else
  const cleanId = id?.trim().split(',')[0] || "";
  
  const handleCardClick = () => {
    // Track card view
    try {
      trackIpAddress(cleanId, 'view-profile');
    } catch (error) {
      console.error("Error tracking card view:", error);
    }
  };
  
  const hasResume = resumeUrl && resumeUrl !== "Missing";
  
  return (
    <Card className="relative h-full flex flex-col bg-gradient-to-b from-grey-900/40 to-grey-900/20 
      border-2 border-transparent hover:border-gold/30 transition-all duration-500 
      text-white overflow-hidden backdrop-blur-sm 
      shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.2)]
      hover:shadow-[0_20px_30px_-8px_rgba(0,0,0,0.3),0_16px_20px_-10px_rgba(171,135,85,0.2)]
      transform perspective-1000 preserve-3d hover:translate-y-[-6px] hover:rotate-y-1 
      rounded-xl group">
      
      {/* Gold corner accent */}
      <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-28 h-1.5 bg-gradient-to-r from-gold/80 to-transparent transform origin-left rotate-45 translate-y-4 -translate-x-6 group-hover:from-gold"></div>
        <div className="absolute top-0 left-0 h-28 w-1.5 bg-gradient-to-b from-gold/80 to-transparent transform origin-top rotate-45 translate-x-4 -translate-y-6 group-hover:from-gold"></div>
      </div>
      
      {/* Gold corner accent bottom right */}
      <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-28 h-1.5 bg-gradient-to-l from-gold/80 to-transparent transform origin-right -rotate-45 -translate-y-4 -translate-x-[-6px] group-hover:from-gold"></div>
        <div className="absolute bottom-0 right-0 h-28 w-1.5 bg-gradient-to-t from-gold/80 to-transparent transform origin-bottom -rotate-45 -translate-x-4 -translate-y-[-6px] group-hover:from-gold"></div>
      </div>
      
      <CardContent className="relative flex-grow p-6 space-y-4 z-10">
        {category && <CategoryBadge category={category} title={title} />}
        
        <h2 className="text-xl font-medium line-clamp-2 font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-grey-300 group-hover:from-white group-hover:to-gold/90 transition-all duration-500">{headline}</h2>
        
        {summary && <CandidateSummary summary={summary} />}
        
        <div className="pt-1 space-y-3">
          {sectors && sectors.length > 0 && <SectorBadges sectors={sectors} />}
          {tags && tags.length > 0 && <SkillBadges tags={tags} />}
        </div>
        
        <div className="space-y-2 mt-auto pt-4">
          {location && <LocationInfo location={location} relocationPreference={relocationPreference} />}
          {notableEmployers && <NotableEmployers employers={notableEmployers} />}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 border-t border-grey-800/50 bg-gradient-to-r from-grey-900/50 via-grey-850/60 to-grey-900/50 relative z-10">
        <Button 
          asChild
          variant="default" 
          className={`w-full relative overflow-hidden ${hasResume ? 'bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold' : 'bg-gold hover:bg-gold/90'} 
            text-black font-medium shadow-sm transition-all duration-300 transform hover:scale-[1.02]
            hover:shadow-md hover:shadow-gold/20 group`}
          onClick={handleCardClick}
        >
          <Link to={`/candidate/${cleanId}`} className="flex items-center justify-center">
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full animate-shimmer group-hover:opacity-100 opacity-0 transition-opacity duration-1000"></span>
            
            {hasResume ? (
              <>
                <Eye className="mr-1.5 h-4 w-4" />
                <span className="mr-1">View Profile</span>
                <span className="mx-1.5 text-black/60">|</span>
                <FileText className="mr-1.5 h-4 w-4" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
