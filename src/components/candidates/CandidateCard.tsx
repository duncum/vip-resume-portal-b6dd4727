
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import CategoryBadge from "./card/CategoryBadge";
import SectorBadges from "./card/SectorBadges";
import SkillBadges from "./card/SkillBadges";
import CandidateSummary from "./card/CandidateSummary";
import LocationInfo from "./card/LocationInfo";
import RelocationBadge from "./card/RelocationBadge";
import NotableEmployers from "./card/NotableEmployers";

interface CandidateCardProps {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  category: string;
  title: string;
  summary: string;
  location: string;
  relocationPreference: string;
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
  return (
    <Link 
      to={`/candidate/${id}`}
      className="block bg-gray-900/60 rounded-lg border border-gray-800/70 p-5 hover:border-gold/50 transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="mb-3">
          <CategoryBadge category={category} />
          <h3 className="text-lg font-medium mt-2 text-white/90 line-clamp-2 leading-tight">
            {headline || title}
          </h3>
        </div>
        
        <div className="mb-4">
          <SectorBadges sectors={sectors} />
        </div>
        
        <CandidateSummary summary={summary} />
        
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <LocationInfo location={location} />
            <RelocationBadge relocationPreference={relocationPreference} />
          </div>
          
          <NotableEmployers notableEmployers={notableEmployers} />
          
          <div className="mt-4">
            <SkillBadges tags={tags} />
          </div>
          
          <div className="mt-4 text-right">
            <Badge variant="outline" className="bg-transparent border-gold/30 text-gold/80">
              View Profile
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CandidateCard;
