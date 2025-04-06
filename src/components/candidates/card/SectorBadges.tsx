
import { Badge } from "@/components/ui/badge";

interface SectorBadgesProps {
  sectors: string[];
}

const SectorBadges = ({ sectors }: SectorBadgesProps) => {
  if (!sectors.length) return null;
  
  return (
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
  );
};

export default SectorBadges;
