
import SearchInput from "@/components/candidates/SearchInput";
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

interface CandidateSearchProps {
  onSearch: (query: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CandidateSearch = ({ 
  onSearch, 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CandidateSearchProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-3xl mx-auto mb-6 md:mb-8">
      <SearchInput onSearch={onSearch} />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        categoryDescriptions={categoryDescriptions}
        isMobile={isMobile}
      />
    </div>
  );
};

export default CandidateSearch;
