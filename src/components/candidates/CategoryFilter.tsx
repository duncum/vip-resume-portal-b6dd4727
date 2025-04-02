
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
}

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  categoryDescriptions 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <TooltipProvider key={category}>
          {category !== "All" ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeCategory === category ? "default" : "outline"}
                  className={
                    activeCategory === category 
                      ? "bg-gold hover:bg-gold-dark text-black border border-gold" 
                      : "bg-transparent text-white border border-grey-700 hover:border-gold"
                  }
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-grey-900 text-white border border-gold/20 px-4 py-2 shadow-lg text-xs">
                <p>{categoryDescriptions[category]}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant={activeCategory === category ? "default" : "outline"}
              className={
                activeCategory === category 
                  ? "bg-gold hover:bg-gold-dark text-black border border-gold" 
                  : "bg-transparent text-white border border-grey-700 hover:border-gold"
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
