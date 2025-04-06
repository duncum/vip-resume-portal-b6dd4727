
import { Badge } from "@/components/ui/badge";

interface CandidateTagsProps {
  sectors: string[];
  tags: string[];
}

const CandidateTags = ({ sectors, tags }: CandidateTagsProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
        {sectors.map((sector, index) => (
          <Badge key={index} variant="outline" className="bg-grey-800/70 text-grey-200 border-grey-700 backdrop-blur-sm shadow-sm text-xs md:text-sm">
            {sector}
          </Badge>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-1 mb-6 md:mb-8">
        {tags.map((tag, index) => (
          <Badge key={index} className="bg-gold/10 hover:bg-gold/20 text-gold border-gold/20 text-xs md:text-sm">
            {tag}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default CandidateTags;
