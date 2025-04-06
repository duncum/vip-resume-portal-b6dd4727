
import { Badge } from "@/components/ui/badge";

interface SectorBadgesProps {
  sectors: string[];
}

const SectorBadges = ({ sectors }: SectorBadgesProps) => {
  if (!sectors.length) return null;
  
  return (
    <div className="flex flex-wrap gap-1.5 mb-2.5">
      {sectors.map((sector, index) => (
        <Badge 
          key={index} 
          variant="outline" 
          className="bg-grey-800/50 text-grey-300 border border-grey-700/80 
            text-xs whitespace-nowrap rounded-md px-2 py-0.5
            hover:bg-grey-700/60 hover:text-grey-200 transition-colors"
        >
          {sector}
        </Badge>
      ))}
    </div>
  );
};

export default SectorBadges;
