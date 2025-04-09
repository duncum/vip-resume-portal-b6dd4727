
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryDescriptions?: Record<string, string>;
  isMobile?: boolean;
}

const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
  categoryDescriptions,
  isMobile = false,
}: CategoryFilterProps) => {
  const handleCategoryClick = (category: string) => {
    console.log(`Category filter clicked: ${category}`);
    onCategoryChange(category);
  };

  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap pb-3">
        <div className={`flex ${isMobile ? 'gap-1.5' : 'gap-2'} w-full`}>
          {categories.map((category) => {
            const isActive = category === activeCategory;
            
            return (
              <TooltipProvider key={`category-button-${category}`}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? "default" : "outline"}
                      size={isMobile ? "sm" : "default"}
                      onClick={() => handleCategoryClick(category)}
                      className={
                        isActive
                          ? "bg-gold hover:bg-gold-dark"
                          : "hover:bg-gold/10 hover:text-gold hover:border-gold/30"
                      }
                    >
                      {category}
                    </Button>
                  </TooltipTrigger>
                  {categoryDescriptions && categoryDescriptions[category] && (
                    <TooltipContent side="bottom" className="max-w-[250px] text-center">
                      <p>{categoryDescriptions[category]}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
