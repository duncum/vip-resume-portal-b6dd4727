
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface SkillBadgesProps {
  tags: string[];
}

const SkillBadges = ({ tags }: SkillBadgesProps) => {
  const isMobile = useIsMobile();
  
  if (!tags.length) return null;
  
  return (
    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
      {tags.slice(0, isMobile ? 3 : 5).map((tag, index) => (
        <Badge 
          key={index} 
          className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 
            transition-colors text-xs whitespace-nowrap rounded-md px-2 py-1
            hover:shadow-sm hover:shadow-gold/10"
        >
          {tag}
        </Badge>
      ))}
      {tags.length > (isMobile ? 3 : 5) && (
        <Badge className="bg-grey-800/50 hover:bg-grey-700/60 text-grey-400 
          border-grey-700 text-xs rounded-md px-2 py-1 hover:text-grey-300 transition-colors">
          +{tags.length - (isMobile ? 3 : 5)} more
        </Badge>
      )}
    </div>
  );
};

export default SkillBadges;
