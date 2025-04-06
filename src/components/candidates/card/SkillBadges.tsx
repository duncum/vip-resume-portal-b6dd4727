
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface SkillBadgesProps {
  tags: string[];
}

const SkillBadges = ({ tags }: SkillBadgesProps) => {
  const isMobile = useIsMobile();
  
  if (!tags.length) return null;
  
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {tags.slice(0, isMobile ? 3 : 5).map((tag, index) => (
        <Badge 
          key={index} 
          className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 
            transition-all duration-300 text-xs whitespace-nowrap rounded-full px-2.5 py-0.5
            hover:shadow-sm hover:shadow-gold/20"
        >
          {tag}
        </Badge>
      ))}
      {tags.length > (isMobile ? 3 : 5) && (
        <Badge className="bg-grey-800/40 hover:bg-grey-700/50 text-grey-300 hover:text-grey-200
          border border-grey-700/60 hover:border-grey-600 text-xs rounded-full px-2.5 py-0.5 transition-all duration-300">
          +{tags.length - (isMobile ? 3 : 5)} more
        </Badge>
      )}
    </div>
  );
};

export default SkillBadges;
