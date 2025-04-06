
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category?: string;
  title?: string;
}

// Enhanced category color mapping with improved styling
const categoryColors = {
  "Executive": "bg-gradient-to-r from-gold to-gold/80 text-black border-gold/80 hover:bg-gold/90 hover:shadow-md hover:shadow-gold/20",
  "Director": "bg-gradient-to-r from-gold/70 to-gold/60 text-black border-gold/50 hover:bg-gold/70 hover:shadow-md hover:shadow-gold/10",
  "Mid-Senior level": "bg-gradient-to-r from-purple-500 to-purple-400 text-white border-purple-300 hover:bg-purple-400 hover:shadow-md hover:shadow-purple-500/20",
  "Emerging Executives": "bg-gradient-to-r from-sky-500 to-sky-400 text-white border-sky-300 hover:bg-sky-400 hover:shadow-md hover:shadow-sky-500/20",
  "One Man Army": "bg-gradient-to-r from-red-500 to-red-400 text-white border-red-300 hover:bg-red-400 hover:shadow-md hover:shadow-red-500/20"
};

const CategoryBadge = ({ category, title }: CategoryBadgeProps) => {
  if (!category) return null;
  
  // Split category by comma and trim whitespace
  const categories = category.split(',').map(cat => cat.trim());
  
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-wrap gap-1.5">
        {categories.map((singleCategory, index) => {
          // Get the base color for this category
          const baseColor = categoryColors[singleCategory as keyof typeof categoryColors] || 
            "bg-gradient-to-r from-grey-800 to-grey-700 text-white border-grey-600 hover:bg-grey-700 hover:shadow-md hover:shadow-grey-700/20";
          
          return (
            <Badge 
              key={index}
              className={`${baseColor} text-xs font-medium px-3 py-1 rounded-full shadow-sm transition-all duration-200 backdrop-blur-sm`}
            >
              {singleCategory}
            </Badge>
          );
        })}
      </div>
      
      {title && (
        <span className="text-white text-sm font-medium hover:text-gold/90 transition-colors">
          {title}
        </span>
      )}
    </div>
  );
};

export default CategoryBadge;
