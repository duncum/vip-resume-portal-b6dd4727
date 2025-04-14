
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CandidateSearchProps {
  onSearch: (query: string) => void;
}

const CandidateSearch = ({ onSearch }: CandidateSearchProps) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get search query from URL parameters when component mounts
    const queryParam = searchParams.get("search");
    if (queryParam) {
      setSearchQuery(queryParam);
      onSearch(queryParam);
    }
  }, [searchParams, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Update URL with search query
    if (searchQuery) {
      navigate(`?search=${encodeURIComponent(searchQuery)}`, { replace: true });
    } else {
      navigate("", { replace: true });
    }
    
    // Execute search
    onSearch(searchQuery);
    
    // Reset searching state after a short delay
    setTimeout(() => setIsSearching(false), 500);
  };

  const clearSearch = () => {
    setSearchQuery("");
    navigate("", { replace: true });
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative w-full flex items-center gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-grey-400" />
          </div>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, skills, resume content..."
            className="w-full pl-10 pr-10 py-3 bg-grey-900/60 border border-grey-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-colors h-12"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-3 flex items-center text-grey-400 hover:text-grey-200 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          className="bg-gold hover:bg-gold/90 text-black px-4 py-2 h-12 whitespace-nowrap"
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "Search Resumes"}
        </Button>
      </div>
    </form>
  );
};

export default CandidateSearch;
