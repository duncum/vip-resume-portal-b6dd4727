
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword } from "lucide-react";

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
      <Card className="h-full card-hover border border-gold/20 bg-grey-900/80 backdrop-blur-sm relative min-h-[280px]">
        {isOneManArmy && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-gold/20 text-gold border-0 flex items-center gap-1">
              <Sword size={14} />
              <span className="text-xs">One Man Army</span>
            </Badge>
          </div>
        )}
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-display text-white leading-tight">
            {headline}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex flex-wrap gap-2 mb-6">
            {sectors.map((sector, index) => (
              <Badge key={index} variant="outline" className="bg-grey-800 text-grey-200 border-grey-700">
                {sector}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          {tags.map((tag, index) => (
            <Badge key={index} className="bg-gold/10 text-gold border-gold/20">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CandidateCard;
