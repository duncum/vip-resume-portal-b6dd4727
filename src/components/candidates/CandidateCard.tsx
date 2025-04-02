
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CandidateCardProps {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
}

const CandidateCard = ({ id, headline, sectors, tags }: CandidateCardProps) => {
  return (
    <Link to={`/candidate/${id}`}>
      <Card className="h-full card-hover border border-grey-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-display">{headline}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1 mb-3">
            {sectors.map((sector, index) => (
              <Badge key={index} variant="outline" className="bg-grey-100 text-grey-700">
                {sector}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-1 pt-0">
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
