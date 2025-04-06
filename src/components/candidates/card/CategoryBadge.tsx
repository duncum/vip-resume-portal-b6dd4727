
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category?: string;
  title?: string;
}

// Category to color mapping - consistent with site theme
const categoryColors = {
  "Executive": "bg-gold/80 border-gold/60",
  "Director": "bg-gold/60 border-gold/40",
  "Mid-Senior level": "bg-gold/40 border-gold/30",
  "Emerging Executives": "bg-gold/30 border-gold/20",
  "One Man Army": "bg-gold border-gold/80"
};

const CategoryBadge = ({ category, title }: CategoryBadgeProps) => {
  if (!category) return null;
  
  return (
    <div>
      <Badge 
        className={`${categoryColors[category as keyof typeof categoryColors] || "bg-grey-800 border-grey-700"} text-black text-xs`}
      >
        {category}
      </Badge>
      {title && (
        <span className="text-grey-400 text-xs ml-2">
          {title}
        </span>
      )}
    </div>
  );
};

export default CategoryBadge;
