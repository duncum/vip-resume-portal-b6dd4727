
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CandidateCardProps {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  category?: string;
}

const CandidateCard = ({ id, headline, sectors, tags, category }: CandidateCardProps) => {
  const isOneManArmy = category === "One Man Army";

  return (
    <Link to={`/candidate/${id}`}>
      <Card className="h-full card-hover border border-gold/20 bg-gradient-to-b from-grey-900/90 to-grey-800/70 backdrop-blur-sm relative min-h-[320px] overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_-15px_rgba(171,135,85,0.3)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40"></div>
        
        {isOneManArmy && (
          <div className="absolute top-0 right-5">
            <img 
              src="/lovable-uploads/e1ac2dc5-b6bf-42e4-a501-cf37986c19ee.png" 
              alt="One Man Army" 
              className="h-16 w-auto"
            />
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 text-gold/40">
          <Star size={40} strokeWidth={1} className="opacity-20" />
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-display text-white leading-tight">
            {headline}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pb-0">
          <div className="flex flex-wrap gap-2 mb-6">
            {sectors.map((sector, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-grey-800/70 text-grey-200 border-grey-700 backdrop-blur-sm shadow-sm"
              >
                {sector}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              className="bg-gold/10 hover:bg-gold/20 text-gold border-gold/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CandidateCard;
