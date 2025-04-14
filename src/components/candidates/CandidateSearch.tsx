
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

interface CandidateSearchProps {
  onSearch: (query: string) => void;
}

const CandidateSearch = ({ onSearch }: CandidateSearchProps) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
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
    onSearch(searchQuery);
    
    // Update URL with search query
    if (searchQuery) {
      navigate(`?search=${encodeURIComponent(searchQuery)}`, { replace: true });
    } else {
      navigate("", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-grey-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, skills, location..."
          className="w-full pl-12 pr-4 py-3 bg-grey-900/60 border border-grey-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-grey-800 hover:bg-grey-700 text-grey-300 px-3 py-1 rounded-md text-sm transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default CandidateSearch;
