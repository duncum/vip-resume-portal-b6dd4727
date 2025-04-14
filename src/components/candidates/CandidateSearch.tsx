
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
    
    // Execute search
    onSearch(searchQuery);
    
    // Reset searching state after a short delay
    setTimeout(() => setIsSearching(false), 500);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative w-full flex items-center gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, skills, resume content..."
            className="w-full pl-10 pr-10 py-3 bg-gray-900/60 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-colors h-12"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 h-12 whitespace-nowrap"
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "Search Resumes"}
        </Button>
      </div>
    </form>
  );
};

export default CandidateSearch;
