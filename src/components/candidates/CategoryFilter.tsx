
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryDescriptions: Record<string, string>;
  isMobile?: boolean;
}

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  categoryDescriptions,
  isMobile = false
}: CategoryFilterProps) => {
  // For mobile, only show the first 3 categories by default plus a "More" dropdown
  const displayCategories = categories;
  
  return (
    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6 justify-center md:justify-start">
      {displayCategories.map((category) => (
        <TooltipProvider key={category}>
          {category !== "All" && !isMobile ? (
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeCategory === category ? "default" : "outline"}
                  className={
                    activeCategory === category 
                      ? "bg-gold hover:bg-gold-dark text-black border border-gold px-2 md:px-3 py-1 h-auto text-xs md:text-sm" 
                      : "bg-transparent text-white border border-grey-700 hover:border-gold px-2 md:px-3 py-1 h-auto text-xs md:text-sm"
                  }
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-grey-900 text-white border border-gold/20 px-3 py-1.5 shadow-lg text-xs">
                <p>{categoryDescriptions[category]}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant={activeCategory === category ? "default" : "outline"}
              className={
                activeCategory === category 
                  ? "bg-gold hover:bg-gold-dark text-black border border-gold px-2 md:px-3 py-1 h-auto text-xs md:text-sm" 
                  : "bg-transparent text-white border border-grey-700 hover:border-gold px-2 md:px-3 py-1 h-auto text-xs md:text-sm"
              }
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          )}
        </TooltipProvider>
      ))}
    </div>
  );
};

export default CategoryFilter;
