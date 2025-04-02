
import { Button } from "@/components/ui/button";
import CategoryTooltip from "@/components/candidates/CategoryTooltip";

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
        <div key={category} className="flex items-center">
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
          {category !== "All" && (
            <CategoryTooltip description={categoryDescriptions[category]} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
