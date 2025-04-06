
import { Badge } from "@/components/ui/badge";

interface SectorBadgesProps {
  sectors: string[];
}

const SectorBadges = ({ sectors }: SectorBadgesProps) => {
  if (!sectors.length) return null;
  
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {sectors.map((sector, index) => (
        <Badge 
          key={index} 
          variant="outline" 
          className="bg-grey-800/40 text-grey-300 border border-grey-700/60 
            text-xs whitespace-nowrap rounded-md px-2.5 py-0.5
            hover:bg-grey-700/50 hover:text-grey-100 hover:border-grey-600
            transition-all duration-300 shadow-sm"
        >
          {sector}
        </Badge>
      ))}
    </div>
  );
};

export default SectorBadges;
