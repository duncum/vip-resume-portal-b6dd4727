
import { useMemo } from "react";
import CategoryFilter from "@/components/candidates/CategoryFilter";
import { useIsMobile } from "@/hooks/use-mobile";

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  "All": "View all candidates across all position levels",
  "Executive": "C-Suite, VPs, Partners and enterprise-level leaders",
  "Director": "Strategic leaders managing regions, portfolios or departments",
  "Mid-Senior level": "Experienced operators managing functions or teams",
  "Emerging Executives": "Rising talent with high potential for leadership roles",
  "One Man Army": "Versatile professionals with deep expertise across multiple domains"
};

interface CandidateCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const CandidateCategories = ({ 
  activeCategory, 
  onCategoryChange,
  categories
}: CandidateCategoriesProps) => {
  const isMobile = useIsMobile();

  return (
    <CategoryFilter
      categories={categories}
      activeCategory={activeCategory}
      onCategoryChange={onCategoryChange}
      categoryDescriptions={categoryDescriptions}
      isMobile={isMobile}
    />
  );
};

export default CandidateCategories;
