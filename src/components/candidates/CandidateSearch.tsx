
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

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
          <Button
            key={category}
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
        ))}
      </div>
    </div>
  );
};

export default CandidateSearch;
