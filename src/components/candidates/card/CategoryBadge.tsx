
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category?: string;
  title?: string;
}

// Updated category to color mapping with better contrast
const categoryColors = {
  "Executive": "bg-gold text-black border-gold/80",
  "Director": "bg-gold/80 text-black border-gold/60",
  "Mid-Senior level": "bg-purple-500 text-white border-purple-400",
  "Emerging Executives": "bg-sky-500 text-white border-sky-400",
  "One Man Army": "bg-red-500 text-white border-red-400"
};

const CategoryBadge = ({ category, title }: CategoryBadgeProps) => {
  if (!category) return null;
  
  return (
    <div className="flex flex-col space-y-1">
      <Badge 
        className={`${categoryColors[category as keyof typeof categoryColors] || "bg-grey-800 border-grey-700 text-white"} text-xs`}
      >
        {category}
      </Badge>
      {title && (
        <span className="text-grey-400 text-xs">
          {title}
        </span>
      )}
    </div>
  );
};

export default CategoryBadge;
