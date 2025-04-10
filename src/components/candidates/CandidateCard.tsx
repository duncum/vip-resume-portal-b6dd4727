
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
    <Card className="h-full flex flex-col bg-gradient-to-b from-grey-900/40 to-grey-900/20 
      border border-grey-800 hover:border-gold/30 transition-all duration-300 
      text-white overflow-hidden backdrop-blur-sm shadow-md hover:shadow-lg
      hover:shadow-gold/5">
      <CardContent className="flex-grow p-6 space-y-4">
        {category && <CategoryBadge category={category} title={title} />}
        
        <h2 className="text-xl font-medium line-clamp-2 font-display">{headline}</h2>
        
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
      
      <CardFooter className="px-6 py-4 border-t border-grey-800/50 bg-grey-900/30">
        <Button 
          asChild
          variant="default" 
          className={`w-full ${hasResume ? 'bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold' : 'bg-gold hover:bg-gold/90'} 
            text-black font-medium shadow-sm transition-all duration-300 transform hover:scale-[1.02]`}
          onClick={handleCardClick}
        >
          <Link to={`/candidate/${cleanId}`} className="flex items-center justify-center">
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
