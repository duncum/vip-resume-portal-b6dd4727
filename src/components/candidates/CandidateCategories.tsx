
import { Button } from "@/components/ui/button";
import { POSITION_CATEGORIES } from "@/types/candidate";

interface CandidateCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CandidateCategories = ({
  activeCategory,
  onCategoryChange,
}: CandidateCategoriesProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <span className="text-sm text-gray-400 mr-1">Filter:</span>
      
      {POSITION_CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={
            activeCategory === category
              ? "bg-amber-500 hover:bg-amber-600 text-black"
              : "text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
          }
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CandidateCategories;
