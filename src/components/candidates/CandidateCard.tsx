
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { CategoryBadge, SectorBadges, SkillBadges, LocationInfo, RelocationBadge, NotableEmployers, CandidateSummary } from "./card";

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
  // Extract just the ID part without any commas or extra data
  const cleanId = id?.trim().split(',')[0] || "";
  
  // Log the clean ID for debugging
  console.log("Card ID:", id, "Clean ID:", cleanId);
  
  return (
    <Card className="h-full flex flex-col bg-grey-900/20 hover:bg-grey-900/40 border border-grey-800 transition-colors text-white overflow-hidden backdrop-blur-sm">
      <CardContent className="flex-grow p-6 space-y-4">
        {category && <CategoryBadge category={category} />}
        
        <h2 className="text-xl font-medium line-clamp-2 font-display">{headline}</h2>
        
        {title && <div className="text-gold text-sm font-medium">{title}</div>}
        
        {summary && <CandidateSummary summary={summary} />}
        
        <div className="pt-1 space-y-3">
          {sectors.length > 0 && <SectorBadges sectors={sectors} />}
          {tags.length > 0 && <SkillBadges tags={tags} />}
        </div>
        
        <div className="space-y-2 mt-auto pt-4">
          {location && <LocationInfo location={location} />}
          {relocationPreference && relocationPreference !== 'no' && 
            <RelocationBadge relocationPreference={relocationPreference} />
          }
          {notableEmployers && <NotableEmployers employers={notableEmployers} />}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 border-t border-grey-800/50 bg-grey-900/30">
        <Button 
          variant="default" 
          className="w-full bg-gold hover:bg-gold/90 text-black"
          asChild
        >
          <Link to={`/candidate/${cleanId}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
