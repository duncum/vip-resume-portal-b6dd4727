
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category?: string;
  title?: string;
}

// Enhanced category color mapping with luxury styling
const categoryColors = {
  "Executive": "bg-gradient-to-r from-gold/90 to-gold/80 text-black border-gold/70 hover:from-gold hover:to-gold/90 hover:shadow-md hover:shadow-gold/30",
  "Director": "bg-gradient-to-r from-gold/70 to-gold/60 text-black border-gold/50 hover:from-gold/80 hover:to-gold/70 hover:shadow-md hover:shadow-gold/20",
  "Mid-Senior level": "bg-gradient-to-r from-purple-600/90 to-purple-500/90 text-white border-purple-400/50 hover:from-purple-600 hover:to-purple-500 hover:shadow-md hover:shadow-purple-500/30",
  "Emerging Executives": "bg-gradient-to-r from-sky-600/90 to-sky-500/90 text-white border-sky-400/50 hover:from-sky-600 hover:to-sky-500 hover:shadow-md hover:shadow-sky-500/30",
  "One Man Army": "bg-gradient-to-r from-red-600/90 to-red-500/90 text-white border-red-400/50 hover:from-red-600 hover:to-red-500 hover:shadow-md hover:shadow-red-500/30"
};

const CategoryBadge = ({ category, title }: CategoryBadgeProps) => {
  if (!category) return null;
  
  // Split category by comma and trim whitespace
  const categories = category.split(',').map(cat => cat.trim());
  
  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex flex-wrap gap-1.5">
        {categories.map((singleCategory, index) => {
          // Get the base color for this category
          const baseColor = categoryColors[singleCategory as keyof typeof categoryColors] || 
            "bg-gradient-to-r from-grey-800 to-grey-700 text-white border-grey-600/50 hover:from-grey-700 hover:to-grey-600 hover:shadow-md hover:shadow-grey-700/20";
          
          return (
            <Badge 
              key={index}
              className={`${baseColor} text-xs font-medium px-3 py-1 rounded-full shadow-sm transition-all duration-300 backdrop-blur-sm`}
            >
              {singleCategory}
            </Badge>
          );
        })}
      </div>
      
      {title && (
        <span className="text-white text-sm font-medium hover:text-gold/90 transition-colors duration-300 tracking-wide">
          {title}
        </span>
      )}
    </div>
  );
};

export default CategoryBadge;
