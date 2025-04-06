
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category?: string;
  title?: string;
}

// Category color mapping with enhanced styling
const categoryColors = {
  "Executive": "bg-gradient-to-r from-gold to-gold/80 text-black border-gold/80 hover:bg-gold/90",
  "Director": "bg-gradient-to-r from-gold/70 to-gold/60 text-black border-gold/50 hover:bg-gold/70",
  "Mid-Senior level": "bg-gradient-to-r from-purple-500 to-purple-400 text-white border-purple-300 hover:bg-purple-400",
  "Emerging Executives": "bg-gradient-to-r from-sky-500 to-sky-400 text-white border-sky-300 hover:bg-sky-400",
  "One Man Army": "bg-gradient-to-r from-red-500 to-red-400 text-white border-red-300 hover:bg-red-400"
};

const CategoryBadge = ({ category, title }: CategoryBadgeProps) => {
  if (!category) return null;
  
  // Split the category and title into individual words
  const categoryWords = category.split(' ');
  const titleWords = title ? title.split(' ') : [];
  
  // Get the base color for this category
  const baseColor = categoryColors[category as keyof typeof categoryColors] || "bg-gradient-to-r from-grey-800 to-grey-700 text-white border-grey-600 hover:bg-grey-700";
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {categoryWords.map((word, index) => (
          <Badge 
            key={`category-${index}`}
            className={`${baseColor} text-xs px-2.5 py-1 rounded-full shadow-md transition-all duration-200 font-medium`}
          >
            {word}
          </Badge>
        ))}
      </div>
      
      {title && (
        <span className="text-grey-400 text-xs">
          {title}
        </span>
      )}
    </div>
  );
};

export default CategoryBadge;
