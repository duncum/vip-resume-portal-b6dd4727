
import SearchInput from "@/components/candidates/SearchInput";
import CategoryFilter from "@/components/candidates/CategoryFilter";

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  "All": "View all candidates across all position levels",
  "Executive": "C-Suite, Partners, or those functioning at an enterprise level. Titles: VP, SVP, EVP, COO, CEO, CIO, President, Founder, Principal, Partner",
  "Director": "Strategic leaders, possibly overseeing regions, portfolios, or departments. Titles: Director, Regional Director, Head of [X], Senior Director",
  "Mid-Senior level": "Proven operators, hands-on leaders, often managing functions or teams. Titles: Manager, Senior Manager, Asset Manager, Development Manager, Acquisitions Manager, etc.",
  "Emerging Executives": "Folks on the rise. Smart bets, maybe not yet at the table but getting close. Titles might include: Analyst, Associate, Senior Analyst, Senior Associate, Manager (early stage)",
  "One Man Army": "One hire with a deep knowledge base to do the work of three or unique backgrounds that don't fit a mold but could replace multiple hires."
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
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <SearchInput onSearch={onSearch} />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        categoryDescriptions={categoryDescriptions}
      />
    </div>
  );
};

export default CandidateSearch;
