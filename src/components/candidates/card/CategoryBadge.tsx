
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category?: string;
  title?: string;
}

// Category color mapping with enhanced styling
const categoryColors = {
  "Executive": "bg-gold/90 text-black border-gold hover:bg-gold/80",
  "Director": "bg-gold/70 text-black border-gold/60 hover:bg-gold/60",
  "Mid-Senior level": "bg-purple-500 text-white border-purple-400 hover:bg-purple-400",
  "Emerging Executives": "bg-sky-500 text-white border-sky-400 hover:bg-sky-400",
  "One Man Army": "bg-red-500 text-white border-red-400 hover:bg-red-400"
};

const CategoryBadge = ({ category, title }: CategoryBadgeProps) => {
  if (!category) return null;
  
  // Split the category and title into individual words
  const categoryWords = category.split(' ');
  const titleWords = title ? title.split(' ') : [];
  
  // Get the base color for this category
  const baseColor = categoryColors[category as keyof typeof categoryColors] || "bg-grey-800 text-white border-grey-700 hover:bg-grey-700";
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {categoryWords.map((word, index) => (
          <Badge 
            key={`category-${index}`}
            className={`${baseColor} text-xs px-2 py-1 shadow-sm transition-colors duration-200`}
          >
            {word}
          </Badge>
        ))}
      </div>
      
      {title && (
        <div className="flex flex-wrap gap-1">
          {titleWords.map((word, index) => (
            <span 
              key={`title-${index}`}
              className="text-grey-400 text-xs bg-grey-800/40 px-2 py-0.5 rounded-full border border-grey-700/30"
            >
              {word}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBadge;
