
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="flex gap-2 items-center mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-400" size={18} />
          <Input
            type="text"
            placeholder="Search by skills, position, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-2 border-grey-800 focus:border-gold"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-700"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Button type="submit" className="bg-gold hover:bg-gold-dark text-white">
          Search
        </Button>
      </form>

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
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help ml-1">
                    <Info size={14} className="text-grey-400 hover:text-gold transition-colors" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-grey-900 text-white border border-gold/20">
                  <p>{categoryDescriptions[category]}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateSearch;
